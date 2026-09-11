"use client";

import Link from "next/link";
import type { Project } from "@/lib/data/types";
import { useActive } from "@/lib/animations/useActive";

export default function MoreRow({ project: p }: { project: Project }) {
  const { ref, active } = useActive<HTMLLIElement>(0.46);

  return (
    <li ref={ref} data-active={active} className="work-row group relative">
      <span aria-hidden className="row-line absolute inset-x-0 bottom-0 h-px bg-[var(--color-accent)]" />
      <Link
        href={`/work/${p.slug}`}
        className="flex items-baseline justify-between gap-6 border-b border-rule py-6"
      >
        <span>
          <span className="row-title t-h2 block">{p.title}</span>
          <span className="t-small mt-2 block text-muted">{p.stack.join(", ")}</span>
        </span>
        <span className="row-index t-small whitespace-nowrap text-muted">{p.statusLabel}</span>
      </Link>
    </li>
  );
}
