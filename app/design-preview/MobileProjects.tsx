import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data/types";
import MobileSceneDetail from "./MobileSceneDetail";

// Mobile uses an image-first feed, not the desktop accordion. Only real
// catalogued media is used. Captions and delivery status travel with it.
export default function MobileProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="v2-mobile-projects">
      {projects.map(project => {
        const preferred = project.slug === "cefa"
          ? project.media.find(m => m.poster === "/evidence/approved/learning-portal-demo-poster.jpg")
          : project.media.find(m => m.src === project.preview || m.poster === project.preview);
        const record = preferred ?? project.media.find(m => m.type !== "video") ?? project.media[0];
        const src = record?.type === "video" ? record.poster : record?.src;
        const visual = src ?? project.preview;
        const tall = record?.aspect === "tall";
        const secondary = project.media.find(m => m.type !== "video" && m.src !== visual && !m.src.startsWith("/architecture/") && !m.src.includes("sign-in"))
          ?? project.media.find(m => m.type !== "video" && m.src !== visual && !m.src.includes("sign-in"));
        return (
          <article className="v2-mobile-project" key={project.slug}>
            {visual && <figure className="v2-mobile-figure">
              <div className="v2-mobile-scene" data-v2-playback>
                <div className="v2-mobile-visual">
                  <Image src={visual} alt={record?.alt ?? project.title + " project visual"} width={tall ? 720 : 1280} height={tall ? 1500 : 760} sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1023px) 85vw, 1px" loading="lazy" />
                </div>
                {secondary && <MobileSceneDetail media={secondary} />}
              </div>
              <figcaption>{record?.caption ?? (visual.startsWith("/architecture/") ? "Conceptual architecture, not a live screenshot." : "Documented project visual; see the case study for verification context.")}</figcaption>
            </figure>}
            <div className="v2-mobile-project-copy">
              <p className="v2-mobile-status">{project.statusLabel}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <Link prefetch={false} className="v2-project-link" href={"/work/" + project.slug}>Explore case study ↗</Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
