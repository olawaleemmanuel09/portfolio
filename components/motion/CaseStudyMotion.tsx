"use client";
import { useEffect } from "react";

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };

export default function CaseStudyMotion({ slug }: { slug: string }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-case-study]");
    if (!root) return;
    root.dataset.caseMotion = "static";
    const desktop = window.matchMedia("(min-width: 1024px) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    let disposed = false, generation = 0;
    let cleanup: (() => void) | undefined;
    const reconcile = async () => {
      const ticket = ++generation;
      if (!desktop.matches || connection?.saveData) {
        cleanup?.(); cleanup = undefined; root.dataset.caseMotion = "static"; return;
      }
      if (cleanup) return;
      try {
        const { startCaseDesktopMotion } = await import("./caseDesktopMotion");
        if (disposed || ticket !== generation || cleanup) return;
        cleanup = startCaseDesktopMotion(root);
      } catch { root.dataset.caseMotion = "static"; }
    };
    void reconcile();
    desktop.addEventListener("change", reconcile);
    connection?.addEventListener?.("change", reconcile);
    return () => {
      disposed = true; generation++;
      cleanup?.();
      desktop.removeEventListener("change", reconcile);
      connection?.removeEventListener?.("change", reconcile);
    };
  }, [slug]);
  return null;
}
