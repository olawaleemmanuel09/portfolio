import { NextResponse } from "next/server";
import { clientAddress, createContactThrottle } from "@/lib/contact-throttle";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32 * 1024;
const rateLimited = createContactThrottle();

/** Strips control characters and newlines, which have no business in a subject. */
function clean(value: unknown, limit: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, limit);
}

/** Multi-line fields keep their line breaks but lose control characters. */
function cleanMultiline(value: unknown, limit: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, limit);
}

export async function POST(request: Request) {
  // Only accept submissions from this site's own pages.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!host || !origin || ![`https://${host}`, `http://${host}`].includes(origin)) {
    return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  }

  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
  }

  // Check the declared size before reading, and enforce the same limit on
  // the actual stream for requests without a trustworthy Content-Length.
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Message is too large." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  try {
    const decoder = new TextDecoder("utf-8", { fatal: true });
    let bytes = 0;
    let raw = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        void reader.cancel().catch(() => {});
        return NextResponse.json({ error: "Message is too large." }, { status: 413 });
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    body = JSON.parse(raw);
  } catch {
    void reader.cancel().catch(() => {});
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  } finally {
    reader.releaseLock();
  }

  // Honeypot. Answer 200 so the bot believes it worked and does not retry.
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  if (clean(body.website, 50)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const need = clean(body.need, 160);
  const message = cleanMultiline(body.message, 5000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are all required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { error: "That email address does not look right." },
      { status: 400 }
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      { error: "Add a little more detail so I can reply usefully." },
      { status: 400 }
    );
  }

  // Only validated mail attempts consume the bounded per-instance quota.
  const ip = clientAddress(request.headers, process.env.VERCEL === "1");
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages just now. Try again shortly, or email me directly." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

  if (!key || !to) {
    console.error("[contact] Not configured: RESEND_API_KEY or CONTACT_TO missing.");
    return NextResponse.json(
      { error: "The form is not connected yet. Please email me directly." },
      { status: 503 }
    );
  }

  const text = [
    `From:    ${name} <${email}>`,
    `Company: ${company || "not given"}`,
    `Needs:   ${need || "not given"}`,
    "",
    message,
  ].join("\n");

  try {


    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });



    if (!res.ok) {
      // Log the provider's reason, never return it: it can echo configuration.
      console.error("[contact] Resend rejected the message", res.status);
      return NextResponse.json(
        { error: "That did not send. Please email me directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    console.error("[contact] Request to Resend failed");
    return NextResponse.json(
      { error: "That did not send. Please email me directly." },
      { status: 502 }
    );
  }
}
