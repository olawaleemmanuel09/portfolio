"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ProjectTransition() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const changed = previous.current !== pathname;
    previous.current = pathname;
    const el = panel.current;
    if (!el || !changed || !pathname.startsWith("/work/") || pathname.split("/").filter(Boolean).length !== 2) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.phase = "cover";
    const clear = window.setTimeout(() => { el.dataset.phase = "clear"; }, 430);
    const idle = window.setTimeout(() => { el.dataset.phase = "idle"; }, 1080);
    return () => { window.clearTimeout(clear); window.clearTimeout(idle); el.dataset.phase = "idle"; };
  }, [pathname]);
  return <div ref={panel} aria-hidden="true" data-phase="idle" className="sweep pointer-events-none fixed inset-0 z-[45] bg-ink" data-project-transition />;
}
