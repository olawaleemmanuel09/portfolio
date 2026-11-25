import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function startDesktopMotion(root: HTMLElement, hero: HTMLElement, stage: HTMLElement, plane: HTMLElement, screen: HTMLElement, story: HTMLElement, setCameraProgress: (progress: number) => void) {
  gsap.registerPlugin(ScrollTrigger);
  hero.dataset.motion = "ready";
  story.dataset.motion = "ready";
        // The camera plane is an original photograph, not a floating CSS monitor.
        // Screen bounds are relative to the photograph; all coordinates below are
        // untransformed layout measurements, so resize/refresh can recompute them.
        const xStart = () => (stage.clientWidth - plane.offsetWidth) / 2;
        const yStart = () => stage.clientHeight - plane.offsetHeight;
        const centerX = () => screen.offsetLeft + screen.offsetWidth / 2;
        const centerY = () => screen.offsetTop + screen.offsetHeight / 2;
        const zoom = () => 1.10 * Math.max(stage.clientWidth / screen.offsetWidth, stage.clientHeight / screen.offsetHeight);
        const xMonitor = () => stage.clientWidth / 2 - centerX();
        const yMonitor = () => stage.clientHeight / 2 - centerY();
        const xZoom = () => stage.clientWidth / 2 - zoom() * centerX();
        const yZoom = () => stage.clientHeight / 2 - zoom() * centerY();

        const context = gsap.context(() => {
          const camera = gsap.timeline({
            scrollTrigger: {
              trigger: hero, start: "top top", end: "bottom bottom",
              scrub: 0.55, invalidateOnRefresh: true,
            },
          });
          camera
            .fromTo(plane, { x: xStart, y: yStart, scale: 1 }, {
              x: xMonitor, y: yMonitor, scale: 1, ease: "power1.inOut", duration: 0.58,
            }, 0)
            .to(".v2-hero-copy", { opacity: 0, y: -16, ease: "none", duration: 0.16 }, 0.29)
            .to(".v2-proof-preview, .v2-hero-foot", { opacity: 0, ease: "none", duration: 0.13 }, 0.26)
            .set(".v2-hero-copy, .v2-proof-preview", { pointerEvents: "none" }, 0.45)
            .to(".v2-hero-shade", { opacity: 0, duration: 0.18, ease: "none" }, 0.39)
            .to(plane, { scale: zoom, x: xZoom, y: yZoom, ease: "power2.inOut", duration: 0.32 }, 0.58)
            .to(".v2-handoff", { opacity: 1, duration: 0.10, ease: "none" }, 0.90);

          camera.eventCallback("onUpdate", () => setCameraProgress(camera.progress()));

          const narrative = gsap.timeline({
            scrollTrigger: {
              trigger: story, start: "top top", end: "bottom bottom",
              scrub: 0.55, invalidateOnRefresh: true,
            },
          });
          narrative
            .fromTo(".v2-story-first .v2-word", { yPercent: 110 }, {
              yPercent: 0, duration: 0.12, stagger: { amount: 0.19 }, ease: "power2.out",
            }, 0.02)
            .fromTo(".v2-fragment", { opacity: 0, scale: 0.8, y: 30 }, {
              opacity: 1, scale: 1, y: 0, duration: 0.17, stagger: { amount: 0.13 },
            }, 0.10)
            .to(".v2-story-first", { opacity: 0, y: -20, duration: 0.15, ease: "none" }, 0.49)
            .to(".v2-fragment", { opacity: 0, scale: 0.38, duration: 0.18, ease: "power2.in" }, 0.51)
            .fromTo(".v2-story-resolution", { opacity: 0 }, { opacity: 1, duration: 0.10 }, 0.68)
            .fromTo(".v2-story-resolution .v2-word", { yPercent: 110 }, {
              yPercent: 0, duration: 0.12, stagger: { amount: 0.17 }, ease: "power2.out",
            }, 0.69)
            .to({}, { duration: 0.02 }, 0.98);
          root.querySelectorAll<HTMLElement>("[data-v2-reveal]").forEach(element => {
            gsap.fromTo(element, { y: 22 }, { y: 0, ease: "none",
              scrollTrigger: { trigger: element, start: "top 95%", end: "top 65%", scrub: 0.35, invalidateOnRefresh: true }
            });
          });
          const showcases = Array.from(root.querySelectorAll<HTMLDetailsElement>(".v2-project"));
          const onToggle = (event: Event) => {
            const panel = event.currentTarget as HTMLDetailsElement;
            if (!panel.open) return;
            const capture = panel.querySelector(".v2-product-capture");
            if (capture) context.add(() => gsap.fromTo(capture, { y: 14, opacity: 0.65 }, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", overwrite: true }));
            ScrollTrigger.refresh();
          };
          showcases.forEach(panel => panel.addEventListener("toggle", onToggle));
          return () => { showcases.forEach(panel => panel.removeEventListener("toggle", onToggle)); };
        }, root);


  ScrollTrigger.refresh();
  return () => {
    context.revert();
    hero.dataset.motion = "static";
    story.dataset.motion = "static";
    setCameraProgress(0);
  };
}
