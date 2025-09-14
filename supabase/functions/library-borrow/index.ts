import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);

serve(async (req) => {
  const authHeader = req.headers.get("Authorization")!;
  const token = authHeader.replace("Bearer ", "");
  const userSupabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: `Bearer ${token}` } } });

  const { book_id, due_date } = await req.json();
  const { data, error } = await userSupabase.rpc("request_borrow", { book: book_id, due: due_date });

  return new Response(JSON.stringify({ data, error }), { headers: { "Content-Type": "application/json" } });
});
