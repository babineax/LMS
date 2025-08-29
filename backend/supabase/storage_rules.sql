-- 1. Create bucket
select storage.create_bucket(
  bucket_id := 'course_content',
  public := false,
  file_size_limit := null,
  allowed_mime_types := array['application/pdf','video/mp4','video/quicktime','video/x-matroska']
);

-- 2. File type enum
do $$ begin
  if not exists (select 1 from pg_type where typname = 'file_type') then
    create type file_type as enum ('pdf','video');
  end if;
end $$;

-- 3. Content table
create table if not exists public.content (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  uploader_id uuid not null default auth.uid() references public.profiles(id),
  storage_path text not null unique,
  file_type file_type not null,
  created_at timestamptz not null default now(),
  constraint content_path_format_chk check (
    storage_path ~ '^[0-9a-fA-F-]{36}/(pdfs|videos)/.+$'
  )
);

alter table public.content enable row level security;

-- Policies
create policy "content_select" on public.content
for select using ( true ); -- students/teachers can view, fine-tune later

create policy "content_insert_staff" on public.content
for insert with check (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role in ('teacher','admin')
));

create policy "content_delete_owner_or_admin" on public.content
for delete using (
  uploader_id = auth.uid()
  or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Storage RLS
alter table storage.objects enable row level security;

create policy "allow_content_insert_staff" on storage.objects
for insert with check (
  bucket_id = 'course_content'
  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('teacher','admin'))
);

create policy "allow_content_read" on storage.objects
for select using (bucket_id = 'course_content');
