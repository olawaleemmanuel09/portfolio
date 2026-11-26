"use client";

import { useEffect } from "react";
import { startMobileMotion } from "./mobileMotion";

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
    let stopMobile: (() => void) | undefined;
    const paintHeader = () => {
      // Match rendered scrub progress, not raw scroll position. An opaque
      // neutral surface protects contrast while the monitor enters the frame.
      const light = pastHero || ((hero.dataset.motion === "ready" || hero.dataset.motion === "mobile") && progress >= 0.76);
      const shaded = !light && progress >= 0.40;
      if (root.dataset.light !== String(light)) root.dataset.light = String(light);
      if (root.dataset.shaded !== String(shaded)) root.dataset.shaded = String(shaded);
      const faded = (hero.dataset.motion === "ready" || hero.dataset.motion === "mobile") && progress >= 0.39;
      if (root.dataset.heroFaded !== String(faded)) root.dataset.heroFaded = String(faded);
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
    // A named details group allows zero selected panels. Preserve the active
    // item without blocking native selection of a different project.
    const showcase = root.querySelector<HTMLElement>(".v2-showcase");
    const keepSelected = (event: MouseEvent) => {
      const summary = event.target instanceof Element ? event.target.closest("summary") : null;
      if (summary?.parentElement?.matches(".v2-project[open]")) event.preventDefault();
    };
    showcase?.addEventListener("click", keepSelected);
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const desktop = window.matchMedia("(min-width: 1024px) and (min-height: 480px) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)");
    const mobile = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-height: 480px)");
    const reconcile = async () => {
      const ticket = ++generation;
      // The desktop camera uses one small image, not a streaming video.
      // Estimated network type must not turn off an already loaded sequence.
      const eligible = desktop.matches && !connection?.saveData;
      if (!eligible) {
        stopMotion?.(); stopMotion = undefined;
        if (mobile.matches && !connection?.saveData) {
          if (!stopMobile) stopMobile = startMobileMotion(root, hero, stage, plane, screen, story, setCameraProgress);
          root.dataset.motionMode = "mobile";
        } else {
          stopMobile?.(); stopMobile = undefined;
          hero.dataset.motion = "static"; story.dataset.motion = "static";
          setCameraProgress(0);
          root.dataset.motionMode = connection?.saveData ? "save-data" : "static-device-or-preference";
        }
        return;
      }
      stopMobile?.(); stopMobile = undefined;
      if (stopMotion) return;
      try {
        root.dataset.motionMode = "loading";
        const { startDesktopMotion } = await import("./desktopMotion");
        if (disposed || ticket !== generation || stopMotion) return;
        stopMotion = startDesktopMotion(root, hero, stage, plane, screen, story, setCameraProgress);
        root.dataset.motionLoaded = "true";
        root.dataset.motionMode = "cinematic";
      } catch (error) {
        console.warn("Cinematic enhancement unavailable", error);
        root.dataset.motionMode = "load-error";
        hero.dataset.motion = "static"; story.dataset.motion = "static";
        setCameraProgress(0);
      }
    };
    void reconcile();
    desktop.addEventListener("change", reconcile);
    mobile.addEventListener("change", reconcile);
    connection?.addEventListener?.("change", reconcile);
    return () => {
      disposed = true; generation++;
      stopMotion?.();
      stopMobile?.();
      observer?.disconnect();
      showcase?.removeEventListener("click", keepSelected);
      desktop.removeEventListener("change", reconcile);
      mobile.removeEventListener("change", reconcile);
      connection?.removeEventListener?.("change", reconcile);
      menu?.removeEventListener("click", closeMenu);
      menu?.removeEventListener("keydown", escapeMenu);
      delete root.dataset.enhanced; delete root.dataset.light; delete root.dataset.shaded;
      delete root.dataset.motionLoaded;
      delete root.dataset.motionMode;
      delete root.dataset.heroFaded;
    };
  }, []);
  return null;
}
