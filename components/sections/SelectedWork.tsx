import Link from "next/link";
import { featured } from "@/lib/data/projects";
import WorkRow from "@/components/sections/WorkRow";

export default function SelectedWork() {
  return (
    <section id="work" aria-labelledby="featured-heading" className="studio-selected">
      <div className="studio-container">
        <div className="studio-section-heading">
          <div>
            <p className="studio-overline">03 / SELECTED WORK</p>
            <h2 id="featured-heading">A different problem. <em>Every time.</em></h2>
          </div>
          <p>These are the systems behind actual operational constraints. Each story distinguishes the work delivered from the next release gate.</p>
        </div>
        <ol className="studio-featured-grid">
          {featured.map((project, index) => (
            <WorkRow key={project.slug} project={project} index={index} total={featured.length} />
          ))}
        </ol>
        <div className="studio-selected-tail">
          <p>Six featured systems / sixteen projects in the archive.</p>
          <Link href="/work" className="studio-text-link">See the complete project archive <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
