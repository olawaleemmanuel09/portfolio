"use client";

import { useReveal } from "@/lib/animations/useReveal";

type Props = {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "ol" | "figure";
  className?: string;
  variant?: "mask" | "soft";
};

export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  variant = "mask",
}: Props) {
  const ref = useReveal<HTMLDivElement>(delay);
  return (
    <Tag ref={ref as never} data-reveal={variant} className={className}>
      {children}
    </Tag>
  );
}
