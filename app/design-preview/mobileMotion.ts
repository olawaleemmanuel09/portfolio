// The mobile reference has a normal-flow photographic hero, then an animated
// narrative. Do not pin, fade the entire hero, or simulate a desktop camera.
export function startMobileMotion(root: HTMLElement, hero: HTMLElement, story: HTMLElement) {
  hero.dataset.motion = "mobile";
  story.dataset.motion = "mobile";
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(
    ".v2-story-first, .v2-story-resolution, .v2-fragment, .v2-mobile-project-copy, [data-v2-reveal]"
  ));
  if (typeof IntersectionObserver === "undefined") return () => {
    hero.dataset.motion = "static"; story.dataset.motion = "static";
  };
  // Enter/leave state is symmetric, and content never depends on JS to be
  // visible. The observer is not a scroll listener and never changes layout.
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      el.dataset.mobileReveal = String(entry.isIntersecting && entry.intersectionRatio >= .10);
    }
  }, { threshold: .10 });
  nodes.forEach(el => observer.observe(el));
  return () => {
    observer.disconnect();
    nodes.forEach(el => delete el.dataset.mobileReveal);
    hero.dataset.motion = "static"; story.dataset.motion = "static";
  };
}
