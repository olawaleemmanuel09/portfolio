import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import MaskLines from "@/components/motion/MaskLines";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about automation engineering roles or contract work. Based in Lagos, working remotely.",
};

const channels = [
  { label: "Email", value: "olawaleemmanuel100@gmail.com", href: "mailto:olawaleemmanuel100@gmail.com" },
  { label: "GitHub", value: "olawaleemmanuel09", href: "https://github.com/olawaleemmanuel09" },
  { label: "LinkedIn", value: "olawale-olaonipekun", href: "https://www.linkedin.com/in/olawale-olaonipekun-0505303b4" },
  { label: "X", value: "@LaoniAI", href: "https://x.com/LaoniAI" },
];

export default function Contact() {
  return (
    <div className="mx-auto max-w-[1180px] px-6 pb-24 pt-40 md:px-8 md:pt-52">
      <h1 className="t-display max-w-[16ch]" data-hero="0">
        <MaskLines lines={["Tell me what", "needs building."]} />
      </h1>

      <div className="mt-20 grid gap-16 lg:grid-cols-[minmax(0,4fr)_minmax(0,3fr)] lg:gap-24">
        <ContactForm />

        <aside data-hero="1">
          <p className="t-body prose-justify text-muted">
            Open to automation engineer roles, remote or Lagos-based, and to
            contract work. I reply to everything within a day.
          </p>

          <dl className="mt-10">
            {channels.map((c) => (
              <div key={c.label} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 border-b border-rule py-4">
                <dt className="t-small text-muted">{c.label}</dt>
                <dd className="t-small">
                  <a href={c.href} className="group relative inline-block" target="_blank" rel="noreferrer">
                    {c.value}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-[400ms] [transition-timing-function:var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <p className="t-small mt-10 text-muted">
            Lagos, Nigeria. West Africa Time, and I keep hours that overlap
            Europe and the US east coast.
          </p>
        </aside>
      </div>
    </div>
  );
}
