"use client";

import { useEffect } from "react";

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };

export default function PreviewMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-v2-root]");
    const hero = root?.querySelector<HTMLElement>(".v2-hero");
    const stage = root?.querySelector<HTMLElement>(".v2-stage");
    const plane = root?.querySelector<HTMLElement>(".v2-camera-plane");
    const screen = root?.querySelector<HTMLElement>(".v2-monitor-screen");
    const story = root?.querySelector<HTMLElement>(".v2-principle");
    if (!root || !hero || !stage || !plane || !screen || !story) return;
    let progress = 0;
    let pastHero = false;
    let disposed = false;
    let generation = 0;
    let stopMotion: (() => void) | undefined;
    const paintHeader = () => {
      // Match rendered scrub progress, not raw scroll position. An opaque
      // neutral surface protects contrast while the monitor enters the frame.
      const light = pastHero || (hero.dataset.motion === "ready" && progress >= 0.76);
      const shaded = !light && progress >= 0.40;
      if (root.dataset.light !== String(light)) root.dataset.light = String(light);
      if (root.dataset.shaded !== String(shaded)) root.dataset.shaded = String(shaded);
    };
    const setCameraProgress = (value: number) => { progress = value; paintHeader(); };
    const observer = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting && entry.boundingClientRect.bottom <= 64;
      paintHeader();
    }, { rootMargin: "-64px 0px 0px 0px" }) : undefined;
    pastHero = hero.getBoundingClientRect().bottom <= 64;
    if (observer) root.dataset.enhanced = "true";
    paintHeader();
    observer?.observe(hero);
    const menu = root.querySelector<HTMLDetailsElement>(".v2-menu");
    const closeMenu = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a")) menu?.removeAttribute("open");
    };
    const escapeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu?.open) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    };
    menu?.addEventListener("click", closeMenu);
    menu?.addEventListener("keydown", escapeMenu);
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const desktop = window.matchMedia("(min-width: 1024px) and (min-height: 600px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const reconcile = async () => {
      const ticket = ++generation;
      const eligible = desktop.matches && !connection?.saveData && !["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
      if (!eligible) {
        stopMotion?.(); stopMotion = undefined;
        hero.dataset.motion = "static"; story.dataset.motion = "static";
        setCameraProgress(0);
        return;
      }
      if (stopMotion) return;
      try {
        const { startDesktopMotion } = await import("./desktopMotion");
        if (disposed || ticket !== generation || stopMotion) return;
        stopMotion = startDesktopMotion(root, hero, stage, plane, screen, story, setCameraProgress);
        root.dataset.motionLoaded = "true";
      } catch {
        hero.dataset.motion = "static"; story.dataset.motion = "static";
        setCameraProgress(0);
      }
    };
    void reconcile();
    desktop.addEventListener("change", reconcile);
    connection?.addEventListener?.("change", reconcile);
    return () => {
      disposed = true; generation++;
      stopMotion?.();
      observer?.disconnect();
      desktop.removeEventListener("change", reconcile);
      connection?.removeEventListener?.("change", reconcile);
      menu?.removeEventListener("click", closeMenu);
      menu?.removeEventListener("keydown", escapeMenu);
      delete root.dataset.enhanced; delete root.dataset.light; delete root.dataset.shaded;
      delete root.dataset.motionLoaded;
    };
  }, []);
  return null;
}
