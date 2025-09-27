import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

serve(async (req) => {
  const { request_id } = await req.json();
  const { error } = await supabase.rpc("mark_returned", { request: request_id });
  return new Response(JSON.stringify({ success: !error, error }), { headers: { "Content-Type": "application/json" } });
});
