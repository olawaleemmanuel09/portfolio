// Native scroll stays in charge. Only compositor properties are written per
// frame, only during the short hero sequence. No GSAP, video or scroll lock.
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const ease = (p: number) => p * p * (3 - 2 * p);

export function startMobileMotion(root: HTMLElement, hero: HTMLElement, stage: HTMLElement, plane: HTMLElement, screen: HTMLElement, story: HTMLElement, setProgress: (p: number) => void) {
  hero.dataset.motion = "mobile";
  story.dataset.motion = "mobile";
  const copy = root.querySelector<HTMLElement>(".v2-hero-copy")!;
  const shade = root.querySelector<HTMLElement>(".v2-hero-shade")!;
  const foot = root.querySelector<HTMLElement>(".v2-hero-foot")!;
  const handoff = root.querySelector<HTMLElement>(".v2-handoff")!;
  let frame = 0, active = true, last = -1;
  let top = 0, distance = 1, x0 = 0, y0 = 0, x1 = 0, y1 = 0, x2 = 0, y2 = 0, zoom = 1;
  function measure() {
    const w = stage.clientWidth, h = stage.clientHeight;
    top = hero.getBoundingClientRect().top + window.scrollY;
    distance = Math.max(1, hero.offsetHeight - h);
    const cx = screen.offsetLeft + screen.offsetWidth * .42;
    const cy = screen.offsetTop + screen.offsetHeight * .5;
    x0 = (w - plane.offsetWidth) / 2;
    y0 = h - plane.offsetHeight;
    x1 = w / 2 - cx; y1 = h / 2 - cy;
    // Portrait framing keeps the project heading legible instead of forcing
    // the whole landscape monitor to fill a portrait viewport.
    zoom = Math.max(1.18, w / Math.max(1, screen.offsetWidth) * 1.10);
    x2 = w / 2 - zoom * cx; y2 = h / 2 - zoom * cy;
    last = -1;
    schedule();
  }
  function render() {
    frame = 0;
    if (!active) return;
    const p = clamp((window.scrollY - top) / distance);
    if (p === last) return;
    last = p;
    const a = ease(clamp(p / .60)), b = ease(clamp((p - .60) / .28));
    plane.style.transform = `translate3d(${mix(mix(x0,x1,a),x2,b)}px,${mix(mix(y0,y1,a),y2,b)}px,0) scale(${mix(1,zoom,b)})`;
    copy.style.opacity = String(1 - clamp((p - .24) / .25));
    foot.style.opacity = String(1 - clamp((p - .20) / .19));
    shade.style.opacity = String(1 - clamp((p - .40) / .20));
    handoff.style.opacity = String(clamp((p - .84) / .16));
    copy.style.pointerEvents = p >= .49 ? "none" : "";
    setProgress(p);
  }
  function schedule() { if (!frame && active) frame = requestAnimationFrame(render); }
  const observed = Array.from(root.querySelectorAll<HTMLElement>(".v2-story-first, .v2-story-resolution, [data-v2-reveal]"));
  const observer = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      (entry.target as HTMLElement).dataset.mobileReveal = entry.isIntersecting && entry.intersectionRatio >= .12 ? "true" : "false";
    }
  }, { threshold: .12 }) : undefined;
  observed.forEach(el => observer?.observe(el));
  // Passive listeners; no preventDefault, fixed body, or synthetic scrolling.
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", measure, { passive: true });
  const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : undefined;
  resize?.observe(stage);
  measure();
  return () => {
    active = false; cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", measure);
    resize?.disconnect(); observer?.disconnect();
    observed.forEach(el => delete el.dataset.mobileReveal);
    plane.style.removeProperty("transform");
    for (const el of [copy, foot, shade, handoff]) el.style.removeProperty("opacity");
    copy.style.removeProperty("pointer-events");
    hero.dataset.motion = "static"; story.dataset.motion = "static";
    setProgress(0);
  };
}
