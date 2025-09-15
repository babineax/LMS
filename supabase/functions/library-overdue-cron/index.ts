import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

serve(async () => {
  const { data: overdue, error } = await supabase.from("overdue_books").select("*");
  if (error) return new Response(JSON.stringify({ error }), { headers: { "Content-Type": "application/json" } });

  for (const book of overdue) {
    await supabase.from("notifications").insert({
      user_id: book.borrower_id,
      message: `Book "${book.title}" is overdue! Please return immediately.`
    });

    // Optional: send email via Resend
    if (Deno.env.get("RESEND_API_KEY")) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: Deno.env.get("RESEND_FROM")!,
          to: "student@example.com", // TODO: replace with borrower's email (via join with profiles)
          subject: "Library Book Overdue",
          html: `<p>The book <b>${book.title}</b> was due on ${book.due_date}.</p>`
        })
      });
    }
  }

  return new Response(JSON.stringify({ checked: overdue.length }), { headers: { "Content-Type": "application/json" } });
});
