"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Case-study motion is enhancement only. The semantic case study, evidence,
 * source links and all status qualifiers are visible without hydration.
 * Every timeline belongs to this article and cleans up on navigation.
 */
export default function CaseStudyMotion({ slug }: { slug: string }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-case-study]");
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reduced || saveData) {
      root.dataset.caseMotion = "static";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".case-title-word");
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.fromTo(".case-cinema-eyebrow", { autoAlpha: 0, y: 13 }, { autoAlpha: 1, y: 0, duration: .65 }, 0)
        .fromTo(words, { autoAlpha: 0, yPercent: 116, rotateX: -18, transformPerspective: 850 }, {
          autoAlpha: 1, yPercent: 0, rotateX: 0, duration: .95, stagger: .055,
          clearProps: "transform,opacity,visibility",
        }, .1)
        .fromTo(".case-cinema-synopsis", { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .8 }, .42)
        .fromTo("[data-case-hero]", { autoAlpha: 0, y: 75 }, { autoAlpha: 1, y: 0, duration: 1.0 }, .23)
        .fromTo(".case-cinema-facts", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .65 }, .75);

      gsap.utils.toArray<HTMLElement>("[data-case-reveal]").forEach((el) => {
        gsap.fromTo(el, { y: 36, opacity: .65 }, {
          y: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 96%", end: "top 67%", scrub: .55, invalidateOnRefresh: true },
        });
      });

      media.add("(min-width: 1024px)", () => {
        const frame = root.querySelector<HTMLElement>(".case-hero-panel > a > div");
        if (!frame) return;
        gsap.fromTo(frame, { y: 0, rotate: 0 }, {
          y: -28, rotate: -0.65, ease: "none",
          scrollTrigger: {
            trigger: ".case-cinema-cover",
            start: "top top", end: "bottom top",
            scrub: .75, invalidateOnRefresh: true,
          },
        });
      });

      root.dataset.caseMotion = "ready";
    }, root);

    return () => {
      media.revert();
      ctx.revert();
      delete root.dataset.caseMotion;
    };
  }, [slug]);

  return null;
}
