// supabase/functions/send-email/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY")!;

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: "noreply@yourapp.com", name: "Your School" },
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });
  if (!res.ok) {
    const msg = await res.text();
    console.error("SendGrid error:", msg);
    throw new Error(msg);
  }
}

serve(async (req) => {
  try {
    const { to, subject, html } = await req.json();
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: "to, subject, html required" }),
        { status: 400 }
      );
    }
    await sendEmail(to, subject, html);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
});
