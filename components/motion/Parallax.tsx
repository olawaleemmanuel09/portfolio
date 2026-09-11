"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-linked movement. The image sits inside an overflow-hidden frame and
 * is oversized, so it can travel without exposing an edge. Tied to scroll
 * position rather than a timeline, so it tracks the wheel exactly.
 */
export default function Parallax({
  children,
  amount = 12,
  className = "",
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!frame.current || !inner.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: frame.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, frame);

    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={frame} className={`overflow-hidden ${className}`}>
      <div ref={inner} className="will-change-transform" style={{ scale: 1.12 }}>
        {children}
      </div>
    </div>
  );
}
