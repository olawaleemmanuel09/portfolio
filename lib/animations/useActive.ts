"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Marks an element active while it sits in the middle band of the viewport.
 * This is the phone equivalent of hover: on a touch screen the thing you are
 * looking at is the thing in the centre, so that is what should respond.
 */
export function useActive<T extends HTMLElement>(band = 0.42) {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const margin = `${-band * 100}% 0px ${-band * 100}% 0px`;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: margin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [band]);

  return { ref, active };
}
