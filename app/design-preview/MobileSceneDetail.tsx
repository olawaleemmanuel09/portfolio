"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Media } from "@/lib/data/types";

export default function MobileSceneDetail({ media }: { media: Media }) {
  const host = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const scene = host.current?.closest<HTMLElement>("[data-v2-playback]");
    if (!scene) return;
    const check = () => {
      if (scene.dataset.playing === "true" && scene.getBoundingClientRect().width > 0) setMounted(true);
    };
    const observer = new MutationObserver(check);
    observer.observe(scene, { attributes: true, attributeFilter: ["data-playing"] });
    check();
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={host} className="v2-mobile-detail" data-ready={String(ready)}>
      {mounted && <figure>
        <Image src={media.src} alt={media.alt} width={media.aspect === "tall" ? 720 : 1280} height={media.aspect === "tall" ? 1500 : 760} sizes="(max-width: 767px) 52vw, (max-width:1023px) 40vw, 1px" loading="lazy" onLoad={() => setReady(true)} />
        <figcaption>{media.src.startsWith("/architecture/") ? "Conceptual system map" : "Additional documented capture"}</figcaption>
      </figure>}
    </div>
  );
}
