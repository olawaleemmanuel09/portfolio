import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data/types";

const tones: Record<string, string> = {
  "cefa": "featured-artboard--lavender",
  "web-ordering-and-payments": "featured-artboard--pearl",
  "elion-sales-command-centre": "featured-artboard--slate",
  "security-workforce-operations": "featured-artboard--mist",
  "elion-homes": "featured-artboard--sand",
  "christ-heart-foundation": "featured-artboard--blush",
};

export default function WorkRow({ project: p, index, total }: { project: Project; index: number; total: number }) {
  return (
    <li className="featured-case-card min-w-0">
      <Link href={"/work/" + p.slug} className="featured-case-link group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.2rem] border border-[#e2e0ea] bg-white" aria-label={"Explore case study: " + p.title}>
        <div className={"featured-artboard relative isolate flex aspect-[16/10] items-center justify-center overflow-hidden px-6 pb-7 pt-12 sm:aspect-[16/9] sm:px-10 " + (tones[p.slug] || "featured-artboard--lavender")}>
          <div className="absolute inset-x-6 top-5 z-10 flex items-center justify-between gap-3 text-[0.63rem] font-bold uppercase tracking-[0.14em] text-[#484354] sm:inset-x-9">
            <span>System / {String(index + 1).padStart(2, "0")}</span>
            <span>Architecture study</span>
          </div>
          <div className="featured-architecture-frame relative z-[1] w-full max-w-[570px] overflow-hidden rounded-lg border border-[#ddd9e6] bg-[#f8fafc] shadow-[0_26px_50px_-34px_rgba(26,19,52,0.65)]">
            {p.preview ? (
              <Image src={p.preview} alt="" width={1280} height={670} sizes="(max-width: 768px) 100vw, 45vw" className="block h-auto w-full" />
            ) : (
              <div className="flex aspect-[16/9] items-center justify-center px-6 text-center text-sm text-[#5c566d]">
                Engineering project — detailed case study
              </div>
            )}
          </div>
          <span className="pointer-events-none absolute bottom-3 right-5 text-[0.6rem] font-medium tracking-[0.07em] text-[#5f5a6a]">
            Conceptual visualization
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-muted">
            <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <span>{p.statusLabel}</span>
          </div>
          <h3 className="featured-case-title mt-5 max-w-[24ch] text-[clamp(1.45rem,2.4vw,2.1rem)] font-semibold leading-[1.14] tracking-[-0.028em] text-ink">{p.title}</h3>
          <p className="mt-4 max-w-[58ch] text-[0.94rem] leading-[1.65] text-muted">{p.summary}</p>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-rule pt-5">
            <span className="text-[0.72rem] leading-[1.55] text-[#625c6b]">{p.stack.slice(0, 3).join(" · ")}</span>
            <span className="featured-case-action inline-flex items-center gap-2 text-[0.8rem] font-semibold text-[var(--color-accent-deep)]">
              Explore project
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
                <path d="M5 16L17 4M8 4H17V13" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
