// backend/utils/emailClient.js
const fetch = (...args) =>
  import("node-fetch").then(({ default: f }) => f(...args));

const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn("[emailClient] Missing SUPABASE_URL / SUPABASE_ANON_KEY in env");
}

async function sendEmail({ to, subject, html }) {
  const url = `${SUPABASE_URL}/functions/v1/send-email`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, subject, html }),
  });
  const body = await res.text();
  if (!res.ok) {
    throw new Error(`[sendEmail] ${res.status}: ${body}`);
  }
  return body;
}

module.exports = { sendEmail };
