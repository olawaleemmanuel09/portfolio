import Link from "next/link";
import SystemCanvas from "@/components/sections/SystemCanvas";

export default function Hero() {
  return (
    <section className="hero-shell relative overflow-hidden border-b border-rule">
      <div className="hero-shell-halo pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-6 pb-20 pt-32 md:px-8 md:pb-24 md:pt-40 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-16 lg:py-32">
        <div className="max-w-[700px]">
          <p className="hero-eyebrow text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-deep)]">
            AI Engineer — Growth &amp; Automation Systems
          </p>
          <h1 className="hero-statement mt-7 max-w-[14ch]">
            I build AI systems <span className="hero-statement-accent">businesses rely on.</span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-[1.05rem] leading-[1.72] text-muted md:text-[1.13rem]">
            I engineer the infrastructure behind intelligent operations: AI integration,
            business applications, secure data, CRM workflows and production automation.
            My focus is what keeps working after launch.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="#work" className="hero-primary-cta inline-flex min-h-12 items-center gap-5 rounded-md bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-white">
              Explore selected work
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
                <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/contact" className="link-underline inline-flex min-h-12 items-center text-sm font-semibold">Discuss a project</Link>
          </div>
          <div className="hero-disciplines mt-11 flex flex-wrap gap-x-4 gap-y-2 border-t border-rule pt-5 text-[0.69rem] font-semibold uppercase tracking-[0.1em] text-muted" aria-label="Technical focus">
            <span>AI solutions</span><span className="text-[var(--color-accent)]" aria-hidden="true">/</span>
            <span>CRM &amp; data</span><span className="text-[var(--color-accent)]" aria-hidden="true">/</span>
            <span>Production systems</span>
          </div>
        </div>
        <div className="relative min-w-0">
          <SystemCanvas />
          <p className="mt-3 text-right text-[0.72rem] tracking-[0.02em] text-muted">
            An illustration of my engineering approach, not client production data.
          </p>
        </div>
      </div>
    </section>
  );
}
