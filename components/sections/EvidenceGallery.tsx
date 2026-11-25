"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type MouseEvent, type KeyboardEvent } from "react";
import type { Project } from "@/lib/data/types";

function typeOfEvidence(src: string) {
  if (src.startsWith("/architecture/")) return "Conceptual architecture";
  if (src.endsWith(".mp4")) return "Recorded product walkthrough";
  if (src.startsWith("/evidence/approved/")) return "Sanitized project screenshot";
  return "Archived project screenshot";
}

export default function EvidenceGallery({ project }: { project: Project }) {
  const visualRecords = project.media.map((media, figureIndex) => ({ media, figureIndex })).filter(({ media }) => media.type !== "video");
  const count = project.media.length;
  const documentedCount = project.media.filter((m) => !m.src.startsWith("/architecture/")).length;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLAnchorElement | null>(null);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const selectedRecord = activeImage === null ? null : visualRecords[activeImage];
  const selected = selectedRecord?.media;

  // Open only after React has committed the selected figure and accessible labels.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (activeImage !== null && dialog && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    }
  }, [activeImage]);

  if (!count) return null;

  function openImage(event: MouseEvent<HTMLAnchorElement>, src: string) {
    // A native destination remains usable without JavaScript or on modified clicks.
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    const index = visualRecords.findIndex(({ media }) => media.src === src);
    if (index < 0 || typeof dialogRef.current?.showModal !== "function") return;
    event.preventDefault();
    openerRef.current = event.currentTarget;
    setActiveImage(index);
  }

  function closeImage() {
    dialogRef.current?.close();
  }

  function moveImage(step: number) {
    if (activeImage === null || visualRecords.length < 2) return;
    setActiveImage((current) => current === null ? null : (current + step + visualRecords.length) % visualRecords.length);
  }

  function handleDialogKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") { event.preventDefault(); moveImage(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); moveImage(-1); }
    // Native <dialog> handles Escape and focus containment.
  }

  return (
    <section id="case-visual-evidence" aria-labelledby="case-visual-evidence-title" className="evidence-theatre-section border-b border-rule py-12 md:py-20">
      <div data-case-reveal className="evidence-theatre-intro mb-7 flex flex-wrap items-end justify-between gap-5 md:mb-10">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-[var(--color-accent-deep)]">Visual record / {String(count).padStart(2, "0")} pieces</p>
          <h2 id="case-visual-evidence-title" className="mt-3 text-[clamp(1.75rem,3.1vw,3.1rem)] font-semibold leading-[1.12] tracking-[-0.035em]">Inside the system.</h2>
        </div>
        <p className="max-w-[43ch] text-[0.82rem] leading-[1.6] text-muted">
          {documentedCount > 0
            ? "Sanitized screenshots and recordings from historical or staged builds. Inspect the evidence, but read the release limitations below."
            : "Conceptual architecture, not a live application screenshot."}
        </p>
      </div>

      <nav className="evidence-theatre-index" aria-label="Browse visual evidence figures">
        {project.media.map((m, i) => (
          <a href={`#case-evidence-figure-${i+1}`} key={m.src} className="evidence-theatre-index-link">
            <span>FIG {String(i+1).padStart(2,"0")}</span>
            <strong>{typeOfEvidence(m.src)}</strong>
            <span aria-hidden="true">↘</span>
          </a>
        ))}
      </nav>

      <div className="v2-case-evidence-scenes">
        {project.media.map((m, i) => {
          const architecture = m.src.startsWith("/architecture/");
          const prominent = i === 0;
          const visualLabel = typeOfEvidence(m.src);
          return (
            <figure key={m.src} id={`case-evidence-figure-${i+1}`} data-case-reveal className="evidence-panel evidence-theatre-figure v2-case-evidence-scene">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eae7ee] bg-[#faf9fd] px-4 py-3 sm:px-6">
                <span className="text-[0.64rem] font-bold uppercase tracking-[0.12em] text-[#574578]">{visualLabel}</span>
                <span className="text-[0.64rem] font-medium tabular-nums text-[#70697d]">{String(i + 1).padStart(2,"0")} / {String(count).padStart(2,"0")}</span>
              </div>
              {m.type === "video" ? (
                <div className="flex justify-center border-b border-[#e4dfed] bg-[#201b27] p-4 sm:p-6">
                  <video
                    aria-label={m.alt}
                    className="block w-auto max-w-full bg-[#14101b]"
                    style={{ maxHeight: "72vh" }}
                    controls playsInline preload="none" poster={m.poster} muted
                  >
                    <source src={m.src} type="video/mp4"/>
                    Your browser does not support video playback.
                  </video>
                </div>
              ) : (
                <div className={`evidence-image-region overflow-hidden p-3 sm:p-5 ${architecture ? "bg-[#f7f7fc]" : "bg-[#f4f2f8]"}`}>
                  <a
                    href={m.src} target="_blank" rel="noopener noreferrer"
                    onClick={(event) => openImage(event,m.src)}
                    className="evidence-image-link group relative block overflow-hidden border border-[#e4e0e9] bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                    aria-label={`Inspect full-size ${visualLabel.toLowerCase()} for ${project.title}`}
                  >
                    <Image
                      src={m.src} alt={m.alt}
                      width={m.aspect==="tall" ? 720 : 1366}
                      height={m.aspect==="tall" ? 1500 : 720}
                      sizes={prominent ? "(max-width: 768px) 100vw, 1180px" : "(max-width: 768px) 100vw, 570px"}
                      className={`block h-auto w-full object-contain ${m.aspect==="tall" ? "mx-auto max-w-[390px]" : ""}`}
                      loading="lazy"
                    />
                    <span className="evidence-open-label pointer-events-none absolute bottom-3 right-3 bg-[#1d1827]/90 px-3 py-2 text-[0.7rem] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      Inspect at full resolution ↗
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
        Historical and staged evidence is not certification of live sales, WhatsApp operation, production guard attendance or current business outcomes. The case-specific verification boundaries follow below.
      </p>

      <dialog
        ref={dialogRef}
        aria-labelledby="evidence-dialog-heading"
        aria-describedby="evidence-dialog-description"
        className="evidence-theatre-dialog"
        onClose={() => {
          setActiveImage(null);
          openerRef.current?.focus();
          openerRef.current = null;
        }}
        onKeyDown={handleDialogKey}
      >
        {selected && selectedRecord && (
          <div className="evidence-theatre-dialog-inner">
            <div className="evidence-theatre-dialog-top">
              <div>
                <p id="evidence-dialog-heading" className="evidence-theatre-dialog-kicker">{typeOfEvidence(selected.src)}</p>
                <p className="evidence-theatre-dialog-count" aria-live="polite">
                  FIG {String(selectedRecord.figureIndex + 1).padStart(2,"0")} / {String(count).padStart(2,"0")}
                </p>
              </div>
              <button ref={closeRef} type="button" onClick={closeImage} className="evidence-theatre-dialog-close" aria-label="Close image viewer">Close <span aria-hidden="true">×</span></button>
            </div>
            <div className="evidence-theatre-dialog-image">
              <Image src={selected.src} alt={selected.alt} width={selected.aspect==="tall"?850:1600} height={selected.aspect==="tall"?1750:980}
                sizes="(max-width: 768px) 95vw, 90vw" className="evidence-theatre-image"/>
            </div>
            <div className="evidence-theatre-dialog-bottom">
              <p id="evidence-dialog-description">{selected.caption || selected.alt}</p>
              <div className="evidence-theatre-dialog-controls">
                {visualRecords.length>1 && <>
                  <button type="button" onClick={()=>moveImage(-1)} aria-label="Previous evidence image">← Previous</button>
                  <button type="button" onClick={()=>moveImage(1)} aria-label="Next evidence image">Next →</button>
                </>}
                <a href={selected.src} target="_blank" rel="noopener noreferrer" aria-label="Open original evidence image in a new tab">Open original ↗</a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
