import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js'

export const handleRequest = async (req: Request) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = Deno.env.toObject()
  const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: req.headers.get('Authorization')! } }
  })

  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const { submission_id, grade, feedback } = await req.json().catch(() => ({}))

  if (!submission_id || grade === undefined)
    return new Response('submission_id and grade are required', { status: 400 })

  // Call secure RPC which verifies teacher ownership
  const { error } = await supabase.rpc('grade_submission', {
    p_submission_id: submission_id,
    p_grade: grade,
    p_feedback: feedback ?? null
  })

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 403 })
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

Deno.serve(handleRequest)
