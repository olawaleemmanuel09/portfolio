import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="studio-hero" aria-labelledby="studio-hero-title">
      <div className="studio-container">
        <div className="studio-topline">
          <span>OO / SELECTED WORK, 2026</span>
          <span className="studio-topline-side">ENGINEERING &amp; OPERATIONS — NIGERIA / REMOTE</span>
        </div>
        <div className="studio-hero-layout">
          <div className="studio-hero-copy">
            <p className="studio-overline">AI Engineer — Growth &amp; Automation Systems</p>
            <h1 id="studio-hero-title" className="hero-statement studio-headline">
              Business problems.
              <em>Working systems.</em>
            </h1>
            <p className="studio-hero-intro">
              I build what businesses need when enquiries are being lost,
              orders are hard to manage, or teams can&apos;t see what&apos;s happening.
              The work spans AI, applications, data and the less glamorous parts of keeping things running.
            </p>
            <div className="studio-hero-actions">
              <Link href="#work" className="hero-primary-cta studio-button-primary">
                Explore selected work
                <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/contact" className="studio-text-link">
                Talk about a problem <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="studio-hero-footnote">
              <span className="studio-footnote-index">01 / THE APPROACH</span>
              <span>Understand the constraint. Build the useful part. Prove what works.</span>
            </div>
          </div>
          <figure className="studio-hero-proof">
            <div className="studio-proof-top">
              <span>FROM THE WORK ARCHIVE</span>
              <span>FIG. 01</span>
            </div>
            <div className="studio-proof-media">
              <div className="studio-proof-image">
                <Image
                  src="/evidence/job-intelligence-workflow.png"
                  alt="Archived n8n workflow with multiple job-listing branches, scoring and Telegram alert nodes"
                  width={1366}
                  height={720}
                  sizes="(max-width: 1023px) 100vw, 47vw"
                  priority
                  className="studio-proof-img"
                />
              </div>
              <span className="studio-proof-margin" aria-hidden="true">ARCHIVE / 001</span>
            </div>
            <figcaption className="studio-proof-caption">
              <span>
                <strong>Job intelligence, not a mockup.</strong>
                <small>Historical n8n editor capture. Current live runs require separate verification.</small>
              </span>
              <Link href="/work/ai-job-scraper" aria-label="Read the job intelligence case study">View case ↗</Link>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
