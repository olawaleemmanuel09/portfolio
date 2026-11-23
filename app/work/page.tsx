import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Systems and engineering lab",
  description: "Explore cohort operations, commerce, CRM foundations and public AI workflow exports with their delivery status.",
  alternates: { canonical: "/work" },
};

const labSlugs = new Set(["ai-job-scraper", "smartbook-ai", "lead-capture-crm-sync", "lead-intelligence-pipeline", "voice-booking-agent", "academy-platform"]);

export default function Work() {
  return (
    <div className="mx-auto max-w-[1180px] px-6 pb-24 pt-36 md:px-8">
      <h1 className="t-display">Engineering work</h1>
      <nav aria-label="Project collections" className="my-8 flex gap-6">
        <a href="#systems" className="link-underline">Business systems</a>
        <a href="#lab" className="link-underline">Engineering lab</a>
      </nav>
      {["systems", "lab"].map((group) => (
        <section id={group} key={group} className="scroll-mt-24 py-10">
          <h2 className="t-display-sm">{group === "systems" ? "Business systems" : "Engineering lab"}</h2>
          <ul className="mt-8 grid gap-x-12 md:grid-cols-2">
            {projects.filter((p) => labSlugs.has(p.slug) === (group === "lab")).map((p) => (
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
