import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function startCaseDesktopMotion(root: HTMLElement) {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Keep the title, hero visual and delivery qualifiers visible on first paint.

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

}
