import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

/**
 * Per-IP throttle. Serverless instances are not shared, so this is a speed
 * bump rather than a wall, but it stops a single client hammering the endpoint
 * and burning the daily sending quota in one go.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // keep the map from growing without bound on a long-lived instance
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

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
  if (!origin) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ error: "Request rejected." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Request rejected." }, { status: 403 });
    }
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages just now. Try again shortly, or email me directly." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
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
