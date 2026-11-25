"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One scroll authority. Lenis drives the page, GSAP's ticker drives Lenis,
 * and ScrollTrigger updates off Lenis rather than the native scroll event.
 * Two loops fighting each other is where scroll-linked motion starts to stutter.
 */
export default function SmoothScroll() {
  const preview = usePathname() === "/design-preview";
  useEffect(() => {
    if (preview) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    // Native touch scrolling remains available; avoid a continuous animation loop on phones.
    if (reduced || saveData || !window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      // Route-level motion owns and disposes its own triggers.
    };
  }, [preview]);

  return null;
}
