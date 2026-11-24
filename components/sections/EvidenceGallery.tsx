import Image from "next/image";
import type { Project } from "@/lib/data/types";

function typeOfEvidence(src: string) {
  return src.startsWith("/architecture/") ? "Conceptual architecture" : "Archived project screenshot";
}

export default function EvidenceGallery({ project }: { project: Project }) {
  if (!project.media.length) return null;

  const actualImages = project.media.filter((m) => m.type !== "video" && !m.src.startsWith("/architecture/")).length;

  return (
    <section id="case-visual-evidence" aria-labelledby="case-visual-evidence-title" className="border-b border-rule py-12 md:py-20">
      <div data-case-reveal className="mb-7 flex flex-wrap items-end justify-between gap-5 md:mb-10">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-[var(--color-accent-deep)]">Visual record</p>
          <h2 id="case-visual-evidence-title" className="mt-3 text-[clamp(1.75rem,3.1vw,3.1rem)] font-semibold leading-[1.12] tracking-[-0.035em]">Inside the system.</h2>
        </div>
        <p className="max-w-[39ch] text-[0.82rem] leading-[1.6] text-muted">
          {actualImages > 0
            ? "Archived captures show how the earlier implementation looked. They are not live monitoring or current release certification."
            : "This architectural illustration explains verified or clearly labeled planned responsibilities. It is not a live application screenshot."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {project.media.map((m, i) => {
          const architecture = m.src.startsWith("/architecture/");
          const prominent = i === 0;
          const visualLabel = typeOfEvidence(m.src);
          return (
            <figure key={m.src} data-case-reveal className={`evidence-panel min-w-0 overflow-hidden rounded-[1rem] border border-[#e1dce9] bg-white ${prominent ? "md:col-span-2" : ""}`}>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eae7ee] bg-[#faf9fd] px-4 py-3 sm:px-6">
                <span className="text-[0.64rem] font-bold uppercase tracking-[0.12em] text-[#574578]">{visualLabel}</span>
                <span className="text-[0.64rem] font-medium tabular-nums text-[#70697d]">{String(i + 1).padStart(2, "0")} / {String(project.media.length).padStart(2, "0")}</span>
              </div>
              {m.type === "video" ? (
                <video className="block h-auto w-full bg-[#f8f7fb]" controls playsInline preload="metadata">
                  <source src={m.src} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              ) : (
                <div className={`evidence-image-region overflow-hidden p-3 sm:p-5 ${architecture ? "bg-[#f7f7fc]" : "bg-[#f4f2f8]"}`}>
                  <a
                    href={m.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="evidence-image-link group block overflow-hidden rounded-md border border-[#e4e0e9] bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                    aria-label={`Open full-size ${visualLabel.toLowerCase()} for ${project.title} (new tab)`}
                  >
                    <Image
                      src={m.src}
                      alt={m.alt}
                      width={m.aspect === "tall" ? 720 : 1366}
                      height={m.aspect === "tall" ? 1500 : 720}
                      sizes={prominent ? "(max-width: 768px) 100vw, 1180px" : "(max-width: 768px) 100vw, 570px"}
                      className={`block h-auto w-full object-contain ${m.aspect === "tall" ? "mx-auto max-w-[390px]" : ""}`}
                      priority={prominent}
                    />
                    <span className="evidence-open-label pointer-events-none absolute bottom-3 right-3 rounded-md bg-[#1d1827]/90 px-3 py-2 text-[0.7rem] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      Open full size ↗
                    </span>
                  </a>
                </div>
              )}
              <figcaption className="flex flex-wrap items-start justify-between gap-4 px-5 py-5 sm:px-6">
                <p className="max-w-[72ch] text-[0.86rem] leading-[1.65] text-muted">{m.caption || m.alt}</p>
                {m.type !== "video" && (
                  <a href={m.src} target="_blank" rel="noopener noreferrer" className="link-underline text-[0.77rem] font-semibold text-[var(--color-accent-deep)]">
                    Open original ↗
                  </a>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>
      <p className="mt-5 max-w-[80ch] text-[0.77rem] leading-[1.65] text-muted">
        Archive images are documentary illustrations of an earlier project state. Project-specific verification and release limits are described below; do not interpret the images as current analytics or certified client dashboards.
      </p>
    </section>
  );
}
