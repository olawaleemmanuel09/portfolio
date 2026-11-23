import Link from "next/link";
import { getProject } from "@/lib/data/projects";

export default function MoreWork() {
  const jobs = getProject("ai-job-scraper")!;
  return (
    <section id="engineering-lab" className="mx-auto max-w-[1180px] px-6 py-20 md:px-8">
      <h2 className="t-small text-muted">Engineering lab</h2>
      <h3 className="t-display-sm mt-4">{jobs.title}</h3>
      <p className="t-body mt-5 max-w-[60ch]">{jobs.summary}</p>
      <div className="mt-7 flex flex-wrap gap-6">
        <Link className="link-underline" href={`/work/${jobs.slug}`}>Compare the two editions</Link>
        <Link className="link-underline" href="/work#lab">Explore the lab</Link>
      </div>
    </section>
  );
}
