"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * A single panel crosses the viewport on every route change: in from the
 * right, out to the left. Driven straight through the DOM rather than React
 * state, because this is a visual effect the framework has no reason to
 * re-render for.
 */
export default function PageTransition() {
  const panel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    const el = panel.current;
    if (!el) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (pathname === "/design-preview" || saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.phase = "idle";
      return;
    }

    el.dataset.phase = "cover";
    const toClear = window.setTimeout(() => {
      el.dataset.phase = "clear";
    }, 430);
    const toIdle = window.setTimeout(() => {
      el.dataset.phase = "idle";
    }, 1080);

    return () => {
      window.clearTimeout(toClear);
      window.clearTimeout(toIdle);
      el.dataset.phase = "idle";
    };
  }, [pathname]);

  return (
    <div
      ref={panel}
      aria-hidden
      data-phase="idle"
      className="sweep pointer-events-none fixed inset-0 z-[45] bg-ink"
    />
  );
}
