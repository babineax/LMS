import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

serve(async (req) => {
  const { method } = req;
  const body = method !== "GET" ? await req.json() : null;

  if (method === "POST") {
    const { title, author } = body;
    const { data, error } = await supabase.from("books").insert({ title, author }).select();
    return new Response(JSON.stringify({ data, error }), { headers: { "Content-Type": "application/json" } });
  }

  if (method === "PATCH") {
    const { book_id, ...fields } = body;
    const { data, error } = await supabase.from("books").update(fields).eq("book_id", book_id).select();
    return new Response(JSON.stringify({ data, error }), { headers: { "Content-Type": "application/json" } });
  }

  if (method === "DELETE") {
    const { book_id } = body;
    const { error } = await supabase.from("books").delete().eq("book_id", book_id);
    return new Response(JSON.stringify({ success: !error, error }), { headers: { "Content-Type": "application/json" } });
  }

  return new Response("Method Not Allowed", { status: 405 });
});
