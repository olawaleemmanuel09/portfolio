import Image from "next/image";
import Link from "next/link";

export default function MoreWork() {
  return (
    <section id="engineering-lab" className="studio-lab">
      <div className="studio-container studio-lab-layout">
        <div className="studio-lab-copy">
          <p className="studio-overline">04 / OPEN WORK</p>
          <h2>Show the <em>actual build.</em></h2>
          <p>A capstone is useful when the logic is inspectable. SmartBook shows booking intake, validation, reminders and cancellation paths—not a fabricated predictive model.</p>
          <p className="studio-lab-note">The archived n8n image shows an earlier booking workflow. It does not prove exactly-once reminders, live provider delivery or a trained no-show model.</p>
          <Link href="/work/smartbook-ai" className="studio-text-link">Examine SmartBook AI <span aria-hidden="true">↗</span></Link>
          <Link href="/work#lab" className="studio-text-link">Browse the engineering lab <span aria-hidden="true">↗</span></Link>
        </div>
        <figure className="studio-lab-figure">
          <div className="studio-lab-title">
            <span>BOOKING FLOW / N8N</span>
            <span>ARCHIVE 01</span>
          </div>
          <Image src="/evidence/smartbook-overview.png" alt="Archived SmartBook n8n workflow showing booking, reminders and cancellation branches"
            width={1366} height={720} sizes="(max-width: 1023px) 100vw, 53vw" className="w-full h-auto" />
          <figcaption>Archived booking-capstone graph. No invented model or delivery metrics.</figcaption>
        </figure>
      </div>
    </section>
  );
}
