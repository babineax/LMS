// deno / edge function
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js'

export const handleRequest = async (req: Request) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = Deno.env.toObject()
  const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: req.headers.get('Authorization')! } }
  })

  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  const body = await req.json().catch(() => ({}))
  const { course_id, title, description, deadline, attachment_url } = body

  // Verify caller is a teacher & member of course
  const { data: profile, error: profErr } = await supabase
    .from('profiles').select('id, role').eq('id', (await supabase.auth.getUser()).data.user?.id).single()
  if (profErr || profile?.role !== 'teacher')
    return new Response('Only teachers can create assignments', { status: 403 })

  const { data: membership } = await supabase
    .from('course_memberships')
    .select('user_id, role_in_course').eq('course_id', course_id).eq('user_id', profile.id).maybeSingle()
  if (!membership || membership.role_in_course !== 'teacher')
    return new Response('Not a teacher in this course', { status: 403 })

  const { data, error } = await supabase
    .from('assignments')
    .insert({
      course_id,
      teacher_id: profile.id,
      title,
      description,
      deadline,          // ISO string
      attachment_url
    })
    .select('*')
    .single()

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  return new Response(JSON.stringify(data), { status: 201, headers: { 'Content-Type': 'application/json' } })
}

Deno.serve(handleRequest)
