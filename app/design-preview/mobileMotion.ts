// Reference mobile storytelling: normal document flow, a reversible scroll
// scrub within the narrative only. No pinned hero or desktop motion runtime.
const clamp = (v: number) => Math.min(1, Math.max(0, v));
export function startMobileMotion(root: HTMLElement, hero: HTMLElement, story: HTMLElement) {
  hero.dataset.motion = "mobile";
  story.dataset.motion = "mobile";
  if (typeof IntersectionObserver === "undefined") return () => {
    hero.dataset.motion = "static"; story.dataset.motion = "static";
  };
  const groups = Array.from(story.querySelectorAll<HTMLElement>(".v2-story-first, .v2-story-resolution"));
  groups.forEach(group => {
    const words = Array.from(group.querySelectorAll<HTMLElement>(".v2-word-mask"));
    words.forEach((word, index) => word.style.setProperty("--v2-word-index", String(index / Math.max(1, words.length - 1))));
  });
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(".v2-mobile-project-copy, [data-v2-reveal]"));
  const reveals = new IntersectionObserver(entries => {
    for (const entry of entries) (entry.target as HTMLElement).dataset.mobileReveal =
      String(entry.isIntersecting && entry.intersectionRatio >= .10);
  }, { threshold: .10 });
  nodes.forEach(el => reveals.observe(el));
  let active = false, frame = 0, disposed = false;
  function render() {
    frame = 0;
    if (disposed) return;
    const h = Math.max(1, window.innerHeight);
    // Read all geometry before writing. Word indices are set once; each frame
    // changes only one custom property per group and one on the story.
    const bounds = groups.map(group => group.getBoundingClientRect());
    const rect = story.getBoundingClientRect();
    groups.forEach((group, index) => {
      const box = bounds[index];
      const p = clamp((h * .94 - box.top) / (h * .53));
      group.style.setProperty("--v2-story-progress", p.toFixed(3));
      group.dataset.mobileReveal = String(box.bottom > 0 && box.top < h);
    });
    const travel = clamp((h - rect.top) / Math.max(1, h + rect.height));
    story.style.setProperty("--v2-fragment-progress", travel.toFixed(3));
  }
  function schedule() { if (!disposed && !frame) frame = requestAnimationFrame(render); }
  function onScroll() { if (active) schedule(); }
  const watcher = new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting;
    // Set the final/initial state even when a quick swipe skips the whole story.
    schedule();
  }, { rootMargin: "120px 0px 120px 0px" });
  watcher.observe(story);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  schedule();
  return () => {
    disposed = true; cancelAnimationFrame(frame);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", schedule);
    reveals.disconnect(); watcher.disconnect();
    nodes.forEach(el => delete el.dataset.mobileReveal);
    groups.forEach(group => {
      delete group.dataset.mobileReveal;
      group.style.removeProperty("--v2-story-progress");
      group.querySelectorAll<HTMLElement>(".v2-word-mask").forEach(el => el.style.removeProperty("--v2-word-index"));
    });
    story.style.removeProperty("--v2-fragment-progress");
    hero.dataset.motion = "static"; story.dataset.motion = "static";
  };
}
