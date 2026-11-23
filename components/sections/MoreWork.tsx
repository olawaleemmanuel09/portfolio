import Link from "next/link";
import { getProject } from "@/lib/data/projects";

const stages = ["Discover", "Filter", "Evaluate", "Notify"];

export default function MoreWork() {
  const jobs = getProject("ai-job-scraper")!;
  return (
    <section id="engineering-lab" className="border-y border-rule bg-[#f8f7fb]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <p className="text-[0.69rem] font-bold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">02 / Engineering lab</p>
          <h2 className="mt-5 max-w-[16ch] text-[clamp(2.1rem,3.6vw,3.65rem)] font-semibold leading-[1.09] tracking-[-0.035em]">
            Smaller experiments. <span className="text-[var(--color-accent)]">Serious decisions.</span>
          </h2>
          <p className="mt-6 max-w-[51ch] text-[1.02rem] leading-[1.7] text-muted">
            Not every project needs to be a full platform. My engineering lab shows API integration, data filtering, AI-assisted decisions and repeatable automation through smaller, reviewable builds.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4 text-sm font-semibold">
            <Link className="link-underline" href={"/work/" + jobs.slug}>Explore job intelligence</Link>
            <Link className="link-underline" href="/work#lab">Browse the engineering lab</Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.1rem] border border-[#29253b] bg-[#171522] text-white shadow-[0_20px_50px_-36px_rgba(34,19,66,.68)]">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#c8b8f5]">Example / Job intelligence</p>
            <span className="text-[0.65rem] text-[#b8afc9]">Workflow model</span>
          </div>
          <ol className="grid gap-3 px-6 py-7 sm:grid-cols-2 sm:gap-4">
            {stages.map((step, index) => (
              <li key={step} className="flex min-h-28 flex-col justify-between rounded-lg border border-white/10 bg-white/[0.045] p-4">
                <span className="text-[0.64rem] font-bold tracking-[0.14em] text-[#a68de7]">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-4 text-lg font-semibold tracking-[-0.015em]">{step}</span>
              </li>
            ))}
          </ol>
          <p className="border-t border-white/10 px-6 py-4 text-xs leading-[1.5] text-[#c8c0d6]">
            Conceptual stages. Public workflow evidence covers a historical edition; current private multi-source operation still requires independent run evidence.
          </p>
        </div>
      </div>
    </section>
  );
}
