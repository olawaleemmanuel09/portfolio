import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata, shortName } from "@/lib/seo";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = pageMetadata("/work", "Engineering Case Studies | " + shortName, "Explore AI automation, CRM integrations, commerce and operational systems. Case studies distinguish verified evidence, delivery status and pending work.", "/work/headshot.jpg");

const labSlugs = new Set(["ai-job-scraper", "smartbook-ai", "lead-capture-crm-sync", "lead-intelligence-pipeline", "voice-booking-agent", "academy-platform"]);

export default async function Work({ searchParams }: {
  searchParams: Promise<{ stage?: string }>;
}) {
  const { stage } = await searchParams;
  const stages = [...new Set(projects.map((p) => p.status))];
  const activeStage = stages.find((value) => value === stage);
  const visible = activeStage ? projects.filter((p) => p.status === activeStage) : projects;
  const collections = [
    { id: "systems", title: "Business systems", note: "Operational platforms and client-focused engineering.", items: visible.filter((p) => !labSlugs.has(p.slug)) },
    { id: "lab", title: "Engineering lab", note: "Experiments, capstones and reproducible workflow ideas.", items: visible.filter((p) => labSlugs.has(p.slug)) },
  ].filter((group) => group.items.length > 0);
  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-24 pt-28 md:px-8 md:pt-36">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.17em] text-[var(--color-accent-deep)]">Project archive / Engineering evidence</p>
      <h1 className="mt-5 max-w-[16ch] text-[clamp(2.1rem,4vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.04em]">Systems and the decisions behind them.</h1>
      <p className="mt-6 max-w-[66ch] text-[1.05rem] leading-[1.7] text-muted">
        Business applications, AI integrations and smaller engineering studies. Each page distinguishes implemented behavior, verified evidence and outstanding release work.
      </p>
      <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-y border-rule py-5">
        <nav aria-label="Project collections" className="flex flex-wrap gap-6 text-sm font-semibold">
          {collections.map((group) => (
            <a key={group.id} href={"#" + group.id} className="link-underline">{group.title}</a>
          ))}
        </nav>
        <form method="get" action="/work" className="flex flex-wrap items-center gap-3 text-sm">
          <label htmlFor="stage" className="font-medium">Delivery stage</label>
          <select className="min-h-11 rounded-md border border-[#d5d0e0] bg-white px-3" id="stage" name="stage" defaultValue={activeStage || ""}>
            <option value="">All stages</option>
            {stages.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
          <button className="link-underline min-h-11 font-semibold" type="submit">Filter</button>
        </form>
      </div>
      {collections.map((group) => (
        <section id={group.id} key={group.id} className="scroll-mt-28 pt-14 md:pt-20">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-[clamp(1.7rem,2.6vw,2.55rem)] font-semibold tracking-[-0.026em]">{group.title}</h2>
            <p className="max-w-[44ch] text-sm leading-[1.6] text-muted">{group.note}</p>
          </div>
          <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {group.items.map((p) => (
              <li key={p.slug} className="min-w-0">
                <Link prefetch={false} className="work-index-card group flex h-full flex-col overflow-hidden rounded-none border border-rule bg-white" href={"/work/" + p.slug}>
                  <div className="work-index-preview flex aspect-[16/9] items-center justify-center overflow-hidden px-4 py-5 sm:px-7">
                    {p.preview ? (
                      <div className="w-full max-w-[550px] overflow-hidden rounded-md border border-[#dedbe5] bg-white ">
                        <Image src={p.preview} alt="" width={1280} height={670} sizes="(max-width: 768px) 100vw, 45vw" className="h-auto w-full" />
                      </div>
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center rounded-md border border-dashed border-[#cfc7de] text-center">
                        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-[#73688c]">Engineering study</span>
                        <span className="mt-2 max-w-[19ch] text-lg font-semibold tracking-[-0.02em] text-[#3b2c57]">{p.title}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.11em] text-muted">{p.statusLabel}</p>
                    <h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.17] tracking-[-0.027em] group-hover:text-[var(--color-accent-deep)]">{p.title}</h3>
                    <p className="mt-3 text-[0.94rem] leading-[1.65] text-muted">{p.summary}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-rule pt-5 text-[0.78rem] font-semibold text-[var(--color-accent-deep)]">
                      <span>{p.stack.slice(0, 2).join(" · ")}</span>
                      <span aria-hidden="true">↗</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
