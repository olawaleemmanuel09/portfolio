"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/data/types";
import { useActive } from "@/lib/animations/useActive";

export default function WorkRow({ project: p }: { project: Project }) {
  const { ref, active } = useActive<HTMLLIElement>();
  const img = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!img.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img.current,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: img.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, img);

    return () => ctx.revert();
  }, []);

  return (
    <li ref={ref} data-active={active} className="work-row group relative">
      <span
        aria-hidden
        className="node absolute left-0 top-[3.6rem] hidden h-[11px] w-[11px] rounded-full border border-rule bg-paper md:block"
        style={{ transitionDelay: `${p.order * 110}ms` }}
      >
        {p.status === "production" && (
          <span className="dot absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-live" />
        )}
      </span>

      <span aria-hidden className="row-line absolute inset-x-0 bottom-0 h-px bg-[var(--color-accent)]" />

      <Link
        href={`/work/${p.slug}`}
        className="grid items-start gap-x-10 gap-y-7 border-b border-rule py-10 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,330px)] md:py-14 md:pl-10"
      >
        <span className="row-index t-index text-muted md:pt-2">
          {String(p.order).padStart(2, "0")}
        </span>

        <span className="order-2 md:order-none">
          <span className="row-title t-display-sm block">{p.title}</span>
          <span className="t-small mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
            {p.status === "production" && <span className="live-dot" aria-hidden />}
            {p.statusLabel}
            <span className="text-rule">/</span>
            {p.period}
          </span>
          <span className="t-body prose-justify mt-5 block max-w-[52ch] text-muted">
            {p.summary}
          </span>
          <span className="t-small mt-5 block text-muted">{p.stack.join(", ")}</span>
        </span>

        {p.preview && (
          <span className="row-media order-1 block overflow-hidden border border-rule md:order-none">
            <span ref={img} className="row-media-inner block">
              <Image
                src={p.preview}
                alt=""
                width={680}
                height={520}
                sizes="(max-width: 768px) 100vw, 330px"
                className="h-[210px] w-full object-cover object-top md:h-[230px]"
              />
            </span>
          </span>
        )}
      </Link>
    </li>
  );
}
