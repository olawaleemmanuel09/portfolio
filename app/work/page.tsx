import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Systems and engineering lab",
  description: "Explore cohort operations, commerce, CRM foundations and public AI workflow exports with their delivery status.",
  alternates: { canonical: "/work" },
};

const labSlugs = new Set(["ai-job-scraper", "smartbook-ai", "lead-capture-crm-sync", "lead-intelligence-pipeline", "voice-booking-agent", "academy-platform"]);

export default async function Work({ searchParams }: {
  searchParams: Promise<{ stage?: string }>;
}) {
  const { stage } = await searchParams;
  const stages = [...new Set(projects.map((p) => p.status))];
  const activeStage = stages.find((value) => value === stage);
  const visible = activeStage ? projects.filter((p) => p.status === activeStage) : projects;
  const collections = [
    { id: "systems", title: "Business systems", items: visible.filter((p) => !labSlugs.has(p.slug)) },
    { id: "lab", title: "Engineering lab", items: visible.filter((p) => labSlugs.has(p.slug)) },
  ].filter((group) => group.items.length > 0);
  return (
    <div className="mx-auto max-w-[1180px] px-6 pb-24 pt-36 md:px-8">
      <h1 className="t-display">Engineering work</h1>
      <nav aria-label="Project collections" className="my-8 flex gap-6">
        {collections.map((group) => (
          <a key={group.id} href={`#${group.id}`} className="link-underline">{group.title}</a>
        ))}
      </nav>
      <form method="get" action="/work" className="flex flex-wrap items-center gap-3">
        <label htmlFor="stage">Delivery stage</label>
        <select className="border border-rule p-2" id="stage" name="stage" defaultValue={activeStage || ""}>
          <option value="">All stages</option>
          {stages.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <button className="link-underline" type="submit">Filter</button>
      </form>
      {collections.map((group) => (
        <section id={group.id} key={group.id} className="scroll-mt-24 py-10">
          <h2 className="t-display-sm">{group.title}</h2>
          <ul className="mt-8 grid gap-x-12 md:grid-cols-2">
            {group.items.map((p) => (
              <li key={p.slug} className="border-t border-rule py-6">
                <p className="t-small text-muted">{p.statusLabel}</p>
                <h3 className="t-h2 mt-2"><Link className="link-underline" href={`/work/${p.slug}`}>{p.title}</Link></h3>
                <p className="t-body mt-3">{p.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
