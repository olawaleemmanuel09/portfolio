"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Media } from "@/lib/data/types";

export default function ScenePlayback({ media }: { media: Media }) {
  const host = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const parent = host.current?.closest<HTMLElement>("[data-v2-playback]");
    if (!parent) return;
    const check = () => { if (parent.dataset.playing === "true") setMounted(true); };
    const observer = new MutationObserver(check);
    observer.observe(parent, { attributes: true, attributeFilter: ["data-playing"] });
    check();
    return () => observer.disconnect();
  }, []);
  return <div ref={host} className="v2-extra-capture" data-ready={ready ? "true" : "false"}>
    {mounted && <figure>
      <Image src={media.src} width={media.aspect === "tall" ? 720 : 1280} height={media.aspect === "tall" ? 1500 : 760} alt={media.alt} sizes="(max-width: 900px) 1px, 24vw" loading="lazy" onLoad={() => setReady(true)} />
      <figcaption>{media.src.startsWith("/architecture/") ? "Conceptual architecture" : "Additional documented capture"} · {media.caption ?? media.alt}</figcaption>
    </figure>}
  </div>;
}
