import Image from "next/image";
import Link from "next/link";

export default function MoreWork() {
  return (
    <section id="engineering-lab" className="studio-lab">
      <div className="studio-container studio-lab-layout">
        <div className="studio-lab-copy">
          <p className="studio-overline">04 / OPEN WORK</p>
          <h2>Show the <em>actual build.</em></h2>
          <p>Smaller experiments matter when their decisions are visible. The archived workflow graph is a more useful starting point than a decorative AI illustration.</p>
          <p className="studio-lab-note">The older public job-alert export and the privately reported multi-source version are distinct. Images show an earlier design, not authenticated current uptime.</p>
          <Link href="/work/ai-job-scraper" className="studio-text-link">Examine the workflow <span aria-hidden="true">↗</span></Link>
          <Link href="/work#lab" className="studio-text-link">Browse the engineering lab <span aria-hidden="true">↗</span></Link>
        </div>
        <figure className="studio-lab-figure">
          <div className="studio-lab-title">
            <span>WORKFLOW RECORD / N8N</span>
            <span>ARCHIVE 01</span>
          </div>
          <Image src="/evidence/job-intelligence-workflow.png" alt="Archived n8n job intelligence workflow with multiple source, filtering, Gemini and Telegram nodes"
            width={1366} height={720} sizes="(max-width: 1023px) 100vw, 53vw" className="w-full h-auto" />
          <figcaption>Archived source-graph screenshot. No invented execution statistics.</figcaption>
        </figure>
      </div>
    </section>
  );
}
