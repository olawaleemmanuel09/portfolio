"use client";

import { useState } from "react";

type State = "idle" | "sending" | "sent" | "error";

const needs = [
  "A role on your team",
  "Contract or freelance work",
  "Automating an existing process",
  "Something else",
];

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Read the form BEFORE touching state. React flushes updates from a submit
    // synchronously, which clears the event's currentTarget, and FormData built
    // after that point comes back empty.
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    if (!payload.name?.trim() || !payload.email?.trim() || !payload.message?.trim()) {
      setMessage("Name, email and message are all required.");
      setState("error");
      return;
    }

    setState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setMessage(data.error ?? "That did not send. Try again, or email me directly.");
        setState("error");
        return;
      }

      setState("sent");
    } catch {
      setMessage("That did not send. Try again, or email me directly.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="border-t border-ink pt-8" data-hero="1">
        <p className="t-display-sm">Message received.</p>
        <p className="t-body mt-4 text-muted">
          Thank you for sharing the details.
        </p>
      </div>
    );
  }

  return (
    <form method="post" action="/api/contact" onSubmit={onSubmit} className="grid gap-7" data-hero="1" noValidate>
      <Field name="name" label="Name" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="company" label="Company" />

      <div className="grid gap-2">
        <label htmlFor="need" className="t-small text-muted">
          What do you need help with?
        </label>
        <select
          id="need"
          name="need"
          className="t-body border-b border-rule bg-transparent py-2 outline-none transition-colors focus:border-[var(--color-accent)]"
          defaultValue={needs[0]}
        >
          {needs.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="t-small text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="t-body resize-none border-b border-rule bg-transparent py-2 outline-none transition-colors focus:border-[var(--color-accent)]"
        />
      </div>

      <p className="t-small text-muted">Your contact details and message are emailed to Olawale so he can reply. Please leave out confidential client information.</p>

      <noscript><p className="t-small text-muted">This form requires JavaScript. Please use <a className="underline" href="mailto:olawaleemmanuel100@gmail.com">direct email</a> instead.</p></noscript>

      {/* spam trap, never shown to a person */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-px w-px opacity-0"
      />

      <div className="flex items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="group relative overflow-hidden border border-ink px-7 py-3 disabled:opacity-50"
        >
          <span className="t-small relative z-10 transition-colors duration-[400ms] group-hover:text-paper">
            {state === "sending" ? "Sending" : "Send message"}
          </span>
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--color-accent)] transition-transform duration-[400ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-y-100" />
        </button>

        {state === "error" && (
          <p className="t-small text-live" role="alert">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="t-small text-muted">
        {label}
        {!required && <span className="ml-1.5 text-muted">optional</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="t-body border-b border-rule bg-transparent py-2 outline-none transition-colors focus:border-[var(--color-accent)]"
      />
    </div>
  );
}
