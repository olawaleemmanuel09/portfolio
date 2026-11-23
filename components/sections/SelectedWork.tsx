import Link from "next/link";
import { featured } from "@/lib/data/projects";
import WorkRow from "@/components/sections/WorkRow";

export default function SelectedWork() {
  return (
    <section id="work" aria-labelledby="featured-heading" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 pb-12 pt-24 md:px-8 md:pb-20 md:pt-32">
      <div className="mb-10 grid items-end gap-6 border-b border-rule pb-9 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
        <div>
          <p className="text-[0.69rem] font-bold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">01 / Selected engineering work</p>
          <h2 id="featured-heading" className="mt-4 max-w-[18ch] text-[clamp(2.25rem,4.2vw,4rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
            Built around the <span className="text-[var(--color-accent)]">real problem.</span>
          </h2>
        </div>
        <p className="max-w-[45ch] text-[0.99rem] leading-[1.65] text-muted">
          Learning operations, restaurant systems, CRM infrastructure and secure field workflows.
          Each case separates what works today from what still needs verification.
        </p>
      </div>
      <ol className="grid gap-6 md:grid-cols-2 md:gap-7">
        {featured.map((project, index) => (
          <WorkRow key={project.slug} project={project} index={index} total={featured.length} />
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-rule pt-6">
        <p className="text-sm text-muted">More systems, experiments and technical documentation are available in the full catalog.</p>
        <Link href="/work" className="link-underline inline-flex items-center gap-2 text-sm font-semibold">
          Explore all projects
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
