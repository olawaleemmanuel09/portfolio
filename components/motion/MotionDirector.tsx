"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One director for the home page. Reference-led kinetic typography and scroll
 * layers, but no copied loaders, scripts, or media. Content is fully visible
 * before hydration and in reduced-motion / no-JS mode.
 */
export default function MotionDirector() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".cinematic-hero");
    if (!hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reduced || saveData) {
      hero.dataset.motion = "static";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      // A deliberate opening sequence. No visibility hidden in CSS: offline,
      // no-JavaScript and failed-hydration visitors always have readable text.
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      timeline
        .fromTo(".cinematic-meta-row", { autoAlpha: 0, y: -16 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0)
        .fromTo(".cinematic-kicker", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.12)
        .fromTo(".cinematic-line-inner", {
          yPercent: 114, rotateX: -22, autoAlpha: 0, transformPerspective: 900,
          transformOrigin: "50% 100%",
        }, {
          yPercent: 0, rotateX: 0, autoAlpha: 1, duration: 1.18, stagger: 0.16,
          clearProps: "transform,opacity,visibility",
        }, 0.18)
        .fromTo(".cinematic-intro", { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.85 }, 0.56)
        .fromTo(".cinematic-actions > a", { autoAlpha: 0, y: 26 }, {
          autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.11,
        }, 0.7)
        .fromTo(".cinematic-image-frame", {
          autoAlpha: 0, y: 90,
        }, { autoAlpha: 1, y: 0, duration: 1.25, ease: "power3.out" }, 0.42)
        .fromTo(".cinematic-image-window", { clipPath: "inset(0% 0% 100% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", duration: 1.22, ease: "power3.inOut",
          clearProps: "clipPath",
        }, 0.53)
        .fromTo(".cinematic-scroll-cue", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.55 }, 1.15);

      hero.dataset.motion = "ready";

      const manifesto = document.querySelector<HTMLElement>(".cinematic-manifesto");
      const words = gsap.utils.toArray<HTMLElement>(".cinematic-word");
      if (manifesto && words.length) {
        gsap.fromTo(words, { color: "#b2a6bc" }, {
          color: "#ffffff", stagger: 0.08, ease: "none",
          scrollTrigger: {
            trigger: manifesto, start: "top 86%", end: "bottom 35%",
            scrub: 0.45, invalidateOnRefresh: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".studio-featured-grid .featured-case-card").forEach((card, index) => {
        gsap.fromTo(card, { autoAlpha: 0.55, y: 92, rotate: index % 2 ? 1.25 : -1.25 }, {
          autoAlpha: 1, y: 0, rotate: 0, ease: "none",
          scrollTrigger: { trigger: card, start: "top 98%", end: "top 52%", scrub: 0.6 },
        });
      });

      gsap.utils.toArray<HTMLElement>(".studio-section-heading, .studio-proof-lead, .studio-lab-copy, .studio-about-layout > div").forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0.5, y: 42 }, {
          autoAlpha: 1, y: 0, ease: "none",
          scrollTrigger: { trigger: el, start: "top 96%", end: "top 65%", scrub: 0.5 },
        });
      });
      gsap.fromTo(".studio-lab-figure", { scale: 0.94, y: 60 }, {
        scale: 1, y: 0, ease: "none",
        scrollTrigger: { trigger: ".studio-lab", start: "top 95%", end: "top 28%", scrub: 0.65 },
      });

      media.add("(min-width: 1024px)", () => {
        const title = document.querySelector(".cinematic-copy-plane");
        const image = document.querySelector(".cinematic-image-depth");
        if (!title || !image) return;
        const exit = gsap.timeline({
          scrollTrigger: {
            trigger: hero, start: "top top", end: "bottom bottom",
            scrub: 0.9, invalidateOnRefresh: true,
          },
        });
        exit
          .to(title, { y: -160, opacity: 0.12, scale: 0.94, ease: "none" }, 0)
          .to(image, { y: -220, scale: 1.21, rotate: -2, ease: "none" }, 0)
          .to(".cinematic-scroll-cue", { opacity: 0, y: 25, ease: "none" }, 0)
          .to(".cinematic-rule-grid", { opacity: 0.3, y: -45, ease: "none" }, 0);

        // A restrained physical response on fine-pointer desktop devices.
        const proof = document.querySelector<HTMLElement>(".cinematic-image-frame");
        const tilt = proof?.querySelector<HTMLElement>(".cinematic-image-tilt");
        if (!proof || !tilt || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const xTo = gsap.quickTo(tilt, "rotationY", { duration: 0.65, ease: "power3.out" });
        const yTo = gsap.quickTo(tilt, "rotationX", { duration: 0.65, ease: "power3.out" });
        const onMove = (event: PointerEvent) => {
          const rect = proof.getBoundingClientRect();
          xTo(((event.clientX - rect.left) / rect.width - 0.5) * 5);
          yTo(((event.clientY - rect.top) / rect.height - 0.5) * -5);
        };
        const onLeave = () => { xTo(0); yTo(0); };
        proof.addEventListener("pointermove", onMove);
        proof.addEventListener("pointerleave", onLeave);
        return () => {
          proof.removeEventListener("pointermove", onMove);
          proof.removeEventListener("pointerleave", onLeave);
        };
      });

      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh).catch(() => {});
      window.addEventListener("load", refresh, { once: true });
      return () => window.removeEventListener("load", refresh);
    }, document.body);

    return () => {
      media.revert();
      context.revert();
      delete hero.dataset.motion;
    };
  }, []);

  return null;
}
