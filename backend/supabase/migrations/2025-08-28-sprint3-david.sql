
-- 1) Attendance: add status if missing (present/absent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema='public' AND table_name='attendance' AND column_name='status'
  ) THEN
    ALTER TABLE public.attendance
      ADD COLUMN status text CHECK (status IN ('present','absent')) DEFAULT 'present';
  END IF;
END$$;

-- 2) Student performance report
-- Returns: course_id, course_title, total_assignments, submitted_count, pending_count, graded_avg, last_submission_at
CREATE OR REPLACE FUNCTION public.student_performance_report(student_id uuid)
RETURNS TABLE(
  course_id uuid,
  course_title text,
  total_assignments int,
  submitted_count int,
  pending_count int,
  graded_avg numeric,
  last_submission_at timestamp
) LANGUAGE sql STABLE AS $$
  WITH base AS (
    SELECT
      c.id AS course_id,
      c.title AS course_title,
      COUNT(DISTINCT a.id) AS total_assignments
    FROM courses c
    LEFT JOIN assignments a ON a.course_id = c.id
    GROUP BY c.id, c.title
  ),
  subs AS (
    SELECT
      a.course_id,
      COUNT(s.id) FILTER (WHERE s.student_id = student_id) AS submitted_count,
      AVG(NULLIF(s.grade, NULL)) FILTER (WHERE s.student_id = student_id) AS graded_avg,
      MAX(s.submitted_at) FILTER (WHERE s.student_id = student_id) AS last_submission_at
    FROM assignments a
    LEFT JOIN submissions s ON s.assignment_id = a.id
    GROUP BY a.course_id
  )
  SELECT
    b.course_id,
    b.course_title,
    COALESCE(b.total_assignments,0) AS total_assignments,
    COALESCE(s.submitted_count,0) AS submitted_count,
    GREATEST(COALESCE(b.total_assignments,0) - COALESCE(s.submitted_count,0), 0) AS pending_count,
    ROUND(COALESCE(s.graded_avg,0)::numeric, 2) AS graded_avg,
    s.last_submission_at
  FROM base b
  LEFT JOIN subs s ON s.course_id = b.course_id
  ORDER BY b.course_title;
$$;

-- 3) Course performance report
-- Returns: student_id, student_name, submitted_count, pending_count, graded_avg
CREATE OR REPLACE FUNCTION public.course_performance_report(course_id uuid)
RETURNS TABLE(
  student_id uuid,
  student_name text,
  submitted_count int,
  pending_count int,
  graded_avg numeric
) LANGUAGE sql STABLE AS $$
  WITH students_in_course AS (
    -- Students who have any submission OR are enrolled via fees table for this course
    SELECT u.id, u.full_name
    FROM users u
    WHERE u.role = 'student'
  ),
  counts AS (
    SELECT
      s.student_id,
      COUNT(s.id) AS submitted_count,
      AVG(NULLIF(s.grade, NULL)) AS graded_avg
    FROM submissions s
    JOIN assignments a ON a.id = s.assignment_id
    WHERE a.course_id = course_id
    GROUP BY s.student_id
  ),
  totals AS (
    SELECT COUNT(*) AS total_assignments
    FROM assignments a
    WHERE a.course_id = course_id
  )
  SELECT
    st.id AS student_id,
    st.full_name AS student_name,
    COALESCE(c.submitted_count,0) AS submitted_count,
    GREATEST(t.total_assignments - COALESCE(c.submitted_count,0), 0) AS pending_count,
    ROUND(COALESCE(c.graded_avg,0)::numeric, 2) AS graded_avg
  FROM students_in_course st
  CROSS JOIN totals t
  LEFT JOIN counts c ON c.student_id = st.id
  ORDER BY st.full_name;
$$;

-- 4) Attendance report per course
-- Returns: student_id, student_name, present_days, absent_days, attendance_percentage
CREATE OR REPLACE FUNCTION public.attendance_report(course_id uuid)
RETURNS TABLE(
  student_id uuid,
  student_name text,
  present_days int,
  absent_days int,
  attendance_percentage numeric
) LANGUAGE sql STABLE AS $$
  WITH daily AS (
    SELECT
      a.user_id AS student_id,
      u.full_name AS student_name,
      a.status
    FROM attendance a
    JOIN users u ON u.id = a.user_id
    WHERE a.course_id = course_id
  ),
  agg AS (
    SELECT
      student_id,
      student_name,
      COUNT(*) FILTER (WHERE status = 'present') AS present_days,
      COUNT(*) FILTER (WHERE status = 'absent') AS absent_days,
      COUNT(*) AS total_days
    FROM daily
    GROUP BY student_id, student_name
  )
  SELECT
    student_id,
    student_name,
    present_days,
    absent_days,
    ROUND(
      CASE WHEN total_days > 0
        THEN (present_days::decimal / total_days::decimal) * 100
        ELSE 0
      END, 2
    ) AS attendance_percentage
  FROM agg
  ORDER BY student_name;
$$;
