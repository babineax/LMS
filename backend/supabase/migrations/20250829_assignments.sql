-- === Assignments Table ===
create table if not exists public.assignments (
  assignment_id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(course_id) on delete cascade,
  teacher_id uuid not null references auth.users(id) on delete restrict,
  title text not null,
  description text,
  deadline timestamptz not null,
  attachment_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- === Submissions Table ===
create table if not exists public.assignment_submissions (
  submission_id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete restrict,
  assignment_id uuid not null references public.assignments(assignment_id) on delete cascade,
  file_url text not null,
  grade numeric(5,2),
  feedback text,
  status text not null default 'submitted', -- submitted | graded
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, assignment_id)
);

-- Trigger to auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_assignments_updated on public.assignments;
create trigger trg_assignments_updated
before update on public.assignments
for each row execute procedure public.set_updated_at();

drop trigger if exists trg_submissions_updated on public.assignment_submissions;
create trigger trg_submissions_updated
before update on public.assignment_submissions
for each row execute procedure public.set_updated_at();

-- Deadline Enforcement
create or replace function public.enforce_deadline()
returns trigger language plpgsql as $$
declare
  due timestamptz;
begin
  select a.deadline into due
  from public.assignments a
  where a.assignment_id = new.assignment_id;

  if now() > due then
    raise exception 'Submission rejected: past deadline %', due;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_enforce_deadline on public.assignment_submissions;
create trigger trg_enforce_deadline
before insert on public.assignment_submissions
for each row execute procedure public.enforce_deadline();

-- RPC for grading (teacher-only)
create or replace function public.grade_submission(
  p_submission_id uuid,
  p_grade numeric,
  p_feedback text
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_teacher uuid;
begin
  select a.teacher_id into v_teacher
  from public.assignment_submissions s
  join public.assignments a on a.assignment_id = s.assignment_id
  where s.submission_id = p_submission_id;

  if v_teacher <> auth.uid() then
    raise exception 'Not allowed: only teacher can grade';
  end if;

  update public.assignment_submissions
     set grade = p_grade,
         feedback = p_feedback,
         status = 'graded',
         updated_at = now()
   where submission_id = p_submission_id;
end;
$$;

-- Enable RLS
alter table public.assignments enable row level security;
alter table public.assignment_submissions enable row level security;
