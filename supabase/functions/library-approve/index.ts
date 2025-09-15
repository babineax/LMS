import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

serve(async (req) => {
  const { request_id, due_date } = await req.json();
  const { error } = await supabase.rpc("approve_borrow", { request: request_id, due: due_date });
  return new Response(JSON.stringify({ success: !error, error }), { headers: { "Content-Type": "application/json" } });
});
