"use client";
import { useEffect } from "react";

export default function VisiblePlayback() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-v2-root]");
    if (!root || typeof IntersectionObserver === "undefined") return;
    const media = window.matchMedia("(min-width: 1024px) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
    const visible = new Set<HTMLElement>();
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-v2-playback]"));
    function sync() {
      const enabled = media.matches && !connection?.saveData && !document.hidden;
      for (const node of nodes) {
        const playing = enabled && visible.has(node) && (node.closest("details")?.open ?? true);
        if (node.dataset.playing !== String(playing)) node.dataset.playing = String(playing);
      }
    }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target as HTMLElement);
        else visible.delete(entry.target as HTMLElement);
      }
      sync();
    }, { threshold: 0.12 });
    nodes.forEach(node => observer.observe(node));
    const panels = Array.from(root.querySelectorAll<HTMLDetailsElement>(".v2-project"));
    panels.forEach(panel => panel.addEventListener("toggle", sync));
    media.addEventListener("change", sync);
    connection?.addEventListener?.("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      panels.forEach(panel => panel.removeEventListener("toggle", sync));
      media.removeEventListener("change", sync);
      connection?.removeEventListener?.("change", sync);
      document.removeEventListener("visibilitychange", sync);
      nodes.forEach(node => delete node.dataset.playing);
    };
  }, []);
  return null;
}
