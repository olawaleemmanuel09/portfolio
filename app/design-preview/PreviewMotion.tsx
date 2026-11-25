"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PreviewMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-v2-root]");
    const hero = root?.querySelector<HTMLElement>(".v2-hero");
    const world = root?.querySelector<HTMLElement>(".v2-desk-world");
    const monitor = root?.querySelector<HTMLElement>(".v2-monitor");
    const screen = root?.querySelector<HTMLElement>(".v2-monitor-screen");
    if (!root || !hero || !world || !monitor || !screen) return;
    // Use layout dimensions rather than transformed bounding boxes, including
    // during refresh at a nonzero scroll position. Push slightly past the bezel.
    const cameraScale = () => 1.12 * Math.max(
      world.clientWidth / Math.max(1, screen.clientWidth),
      world.clientHeight / Math.max(1, screen.clientHeight)
    );
    const cameraX = () => {
      const origin = world.clientWidth * 0.7;
      const center = monitor.offsetLeft + screen.offsetLeft + screen.offsetWidth / 2;
      return world.clientWidth / 2 - origin - cameraScale() * (center - origin);
    };
    const cameraY = () => {
      const origin = world.clientHeight * 0.5;
      const center = monitor.offsetTop + screen.offsetTop + screen.offsetHeight / 2;
      return world.clientHeight / 2 - origin - cameraScale() * (center - origin);
    };
    const updateHeader = () => { root.dataset.light = String(hero.getBoundingClientRect().bottom <= 66); };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    const menu = root.querySelector<HTMLDetailsElement>(".v2-menu");
    const closeMenu = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a")) menu?.removeAttribute("open");
    };
    const escapeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu?.open) { menu.open = false; menu.querySelector("summary")?.focus(); }
    };
    menu?.addEventListener("click", closeMenu);
    menu?.addEventListener("keydown", escapeMenu);
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    if (!connection?.saveData && !["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "")) {
      mm.add("(min-width: 1024px) and (min-height: 600px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        hero.dataset.motion = "ready";
        const context = gsap.context(() => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: hero, start: "top top", end: "bottom bottom",
              scrub: 0.65, invalidateOnRefresh: true,
            },
          });
          timeline
            .to(world, { scale: 1.17, x: () => -world.clientWidth * 0.03, y: () => -world.clientHeight * 0.02, ease: "none", duration: 0.32 }, 0)
            .to(".v2-hero-copy", { opacity: 0, y: -30, ease: "none", duration: 0.24 }, 0.30)
            .set(".v2-hero-copy", { pointerEvents: "none" }, 0.54)
            .to(".v2-hero-shade", { opacity: 0, ease: "none", duration: 0.28 }, 0.34)
            .to(screen, { rotation: 0, ease: "none", duration: 0.25 }, 0.38)
            .to(world, { scale: cameraScale, x: cameraX, y: cameraY, ease: "power2.inOut", duration: 0.57 }, 0.43)
            .to(".v2-hero-foot", { opacity: 0, duration: 0.2 }, 0.4);
          gsap.fromTo(".v2-word", { yPercent: 104 }, {
            yPercent: 0, ease: "none", stagger: 0.07,
            scrollTrigger: { trigger: ".v2-principle", start: "top 85%", end: "center 45%", scrub: 0.45 },
          });
        }, root);
        ScrollTrigger.refresh();
        return () => { context.revert(); hero.dataset.motion = "static"; };
      });
    }
    return () => {
      mm.revert();
      hero.dataset.motion = "static";
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
      menu?.removeEventListener("click", closeMenu);
      menu?.removeEventListener("keydown", escapeMenu);
    };
  }, []);
  return null;
}
