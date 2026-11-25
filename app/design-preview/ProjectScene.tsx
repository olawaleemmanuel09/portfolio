import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data/types";

export default function ProjectScene({ project }: { project: Project }) {
  if (!project.preview) return null;
  const record = project.media.find(m => m.src === project.preview || m.poster === project.preview);
  const kind = project.preview.startsWith("/architecture/") ? "Conceptual system map" : record?.type === "video" ? "Recorded walkthrough · Still frame" : "Documented project capture";
  return (
    <figure className="v2-product-scene">
      <div className="v2-product-window">
        <div className="v2-scene-record"><span>{kind}</span><span>{project.statusLabel}</span></div>
        <div className={"v2-product-capture" + (record?.aspect === "tall" ? " v2-tall-capture" : "")}>
          <Image src={project.preview} width={record?.aspect === "tall" ? 720 : 1280} height={record?.aspect === "tall" ? 1500 : 760} alt={record?.alt ?? project.title + " project visual"} sizes="(max-width: 900px) 90vw, 58vw" loading="lazy" />
        </div>
        <div className="v2-scene-link"><Link prefetch={false} href={"/work/" + project.slug + "#case-visual-evidence"}>Explore visual record ↗</Link></div>
      </div>
      <figcaption>{record?.caption ?? (project.preview.startsWith("/architecture/") ? "Conceptual architecture, not a live dashboard." : "Project capture; see the case study for delivery and verification context.")}</figcaption>
    </figure>
  );
}
