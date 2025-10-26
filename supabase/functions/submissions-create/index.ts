import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js'

export const handleRequest = async (req: Request) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = Deno.env.toObject()
  const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: req.headers.get('Authorization')! } }
  })

  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  // Expect multipart/form-data (file) or JSON with pre-uploaded file_url.
  const contentType = req.headers.get('content-type') || ''

  const { data: authUser } = await supabase.auth.getUser()
  const userId = authUser.user?.id
  if (!userId) return new Response('Unauthorized', { status: 401 })

  let assignment_id: string | null = null
  let file_url: string | null = null

  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData()
    assignment_id = String(form.get('assignment_id') || '')
    const file = form.get('file') as File | null
    if (!file) return new Response('Missing file', { status: 400 })

    // Path: submissions/{assignment_id}/{userId}/{random-filename}
    const path = `submissions/${assignment_id}/${userId}/${crypto.randomUUID()}-${file.name}`
    const { data: upload, error: upErr } = await supabase.storage
      .from('submissions')
      .upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false })

    if (upErr) return new Response(JSON.stringify({ error: upErr.message }), { status: 400 })
    file_url = upload?.path ?? path
  } else {
    const body = await req.json().catch(() => ({}))
    assignment_id = body.assignment_id
    file_url = body.file_url
  }

  if (!assignment_id || !file_url) return new Response('assignment_id and file/file_url required', { status: 400 })

  // Insert submission (deadline enforced by DB trigger)
  const { data, error } = await supabase
    .from('assignment_submissions')
    .insert({
      student_id: userId,
      assignment_id,
      file_url
    })
    .select('*')
    .single()

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  return new Response(JSON.stringify(data), { status: 201, headers: { 'Content-Type': 'application/json' } })
}

Deno.serve(handleRequest)
