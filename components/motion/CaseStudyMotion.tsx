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
    const motionPreference = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let mobileObserver: IntersectionObserver | undefined;
    const stopMobile = () => {
      mobileObserver?.disconnect(); mobileObserver = undefined;
      root.querySelectorAll("[data-mobile-case-visible]").forEach(el => el.removeAttribute("data-mobile-case-visible"));
    };
    const reconcile = async () => {
      const ticket = ++generation;
      if (!desktop.matches || connection?.saveData) {
        cleanup?.(); cleanup = undefined;
        if (motionPreference.matches && !connection?.saveData && typeof IntersectionObserver !== "undefined") {
          root.dataset.caseMotion = "mobile";
          if (!mobileObserver) {
            mobileObserver = new IntersectionObserver(entries => {
              for (const entry of entries) (entry.target as HTMLElement).dataset.mobileCaseVisible = String(entry.isIntersecting && entry.intersectionRatio >= .12);
            }, { threshold: .12 });
            root.querySelectorAll("[data-case-reveal]").forEach(el => mobileObserver?.observe(el));
          }
        } else { stopMobile(); root.dataset.caseMotion = "static"; }
        return;
      }
      stopMobile();
      if (cleanup) return;
      try {
        const { startCaseDesktopMotion } = await import("./caseDesktopMotion");
        if (disposed || ticket !== generation || cleanup) return;
        cleanup = startCaseDesktopMotion(root);
      } catch { root.dataset.caseMotion = "static"; }
    };
    void reconcile();
    desktop.addEventListener("change", reconcile);
    motionPreference.addEventListener("change", reconcile);
    connection?.addEventListener?.("change", reconcile);
    return () => {
      disposed = true; generation++;
      cleanup?.();
      stopMobile();
      motionPreference.removeEventListener("change", reconcile);
      desktop.removeEventListener("change", reconcile);
      connection?.removeEventListener?.("change", reconcile);
    };
  }, [slug]);
  return null;
}
