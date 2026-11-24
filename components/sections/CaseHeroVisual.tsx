import Image from "next/image";
import type { Project } from "@/lib/data/types";

export default function CaseHeroVisual({ project }: { project: Project }) {
  if (!project.preview) return null;
  const approved = project.preview.startsWith("/evidence/approved/");
  const archived = project.preview.startsWith("/evidence/");
  const alt = project.media[0]?.alt || "System architecture visual relevant to the case study";
  return (
    <figure data-case-hero className="case-hero-panel min-w-0 overflow-hidden rounded-[1.1rem] border border-[#ded8e9] bg-[#f6f4fa]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e1dcea] px-4 py-3 sm:px-5">
        <span className="text-[0.64rem] font-bold uppercase tracking-[0.15em] text-[#50416f]">
          {approved ? "Sanitized project evidence" : archived ? "Archived project capture" : "Conceptual architecture"}
        </span>
        <span className="text-[0.66rem] text-[#6d6580]">Project visual / 01</span>
      </div>
      <a href="#case-visual-evidence" className="group block p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-5px] focus-visible:outline-[var(--color-accent)] sm:p-6" aria-label={`Explore supporting visual evidence for ${project.title}`}>
        <div className="overflow-hidden rounded-lg border border-[#dcd8e4] bg-white shadow-[0_22px_40px_-32px_rgba(35,21,75,0.7)]">
          <Image
            src={project.preview}
            alt={alt}
            width={1366}
            height={720}
            sizes="(max-width: 1023px) 100vw, 48vw"
            className="block h-auto w-full object-contain"
            priority
          />
        </div>
      </a>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 px-4 pb-5 text-[0.76rem] leading-[1.45] text-[#615972] sm:px-6">
        <span>{approved ? "Staged or historical capture; verification below" : archived ? "Earlier implementation; current verification below" : "Illustrative system model; not a live dashboard"}</span>
        <a className="link-underline font-semibold text-[var(--color-accent-deep)]" href="#case-visual-evidence">Explore evidence ↓</a>
      </figcaption>
    </figure>
  );
}
