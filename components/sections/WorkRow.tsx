import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data/types";

export default function WorkRow({ project, index, total }: { project: Project; index: number; total: number }) {
  const feature = index === 0 || index === 3;
  const archived = project.preview?.startsWith("/evidence/") ?? false;
  return (
    <li className={`featured-case-card ${feature ? "studio-featured-wide" : ""}`}>
      <Link href={`/work/${project.slug}`} className="featured-case-link studio-featured-link group" aria-label={`Read case study: ${project.title}`}>
        <div className="studio-featured-visual">
          <div className="studio-featured-rail">
            <span>CASE FILE / {String(index + 1).padStart(2, "0")}</span>
            <span>{archived ? "ARCHIVED EVIDENCE" : "ARCHITECTURE STUDY"}</span>
          </div>
          <div className="studio-featured-image-wrap">
            {project.preview ? (
              <Image src={project.preview} alt="" width={1280} height={670}
                sizes={feature ? "(max-width: 1023px) 100vw, 58vw" : "(max-width: 768px) 100vw, 44vw"}
                className="studio-featured-img" />
            ) : <span className="studio-featured-placeholder">Project documentation / {String(index+1).padStart(2, "0")}</span>}
          </div>
          <span className="studio-featured-caption">{archived ? "Historical source capture" : "Conceptual diagram · Not a live dashboard"}</span>
        </div>
        <div className="studio-featured-copy">
          <div className="studio-featured-meta">
            <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <span>{project.statusLabel}</span>
          </div>
          <h3>{project.title}</h3>
          <div className="studio-featured-problem">
            <span>THE BUSINESS CONSTRAINT</span>
            <p>{project.problem[0]}</p>
          </div>
          {project.metrics?.length ? (
            <div className="studio-featured-metric" aria-label="Verified programme figure">
              <strong>{project.metrics[0].value}</strong>
              <span>{project.metrics[0].label} · {project.metricsAsOf}</span>
            </div>
          ) : null}
          <div className="studio-featured-bottom">
            <span>{project.stack.slice(0, 3).join(" · ")}</span>
            <span className="studio-featured-open">Read the case <span aria-hidden="true">↗</span></span>
          </div>
        </div>
      </Link>
    </li>
  );
}
