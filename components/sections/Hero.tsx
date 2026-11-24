import Image from "next/image";
import Link from "next/link";

/** Server-rendered first: the entire headline and both CTAs work before hydration. */
export default function Hero() {
  return (
    <section className="cinematic-hero" aria-labelledby="studio-hero-title">
      <div className="cinematic-hero-sticky">
        <div className="cinematic-rule-grid" aria-hidden="true" />
        <div className="cinematic-stage studio-container">
          <div className="cinematic-meta-row">
            <span>OLAWALE EMMANUEL OLAONIPEKUN / 2026</span>
            <span>AI ENGINEERING · GROWTH SYSTEMS</span>
            <span className="cinematic-meta-right">INDEPENDENT PRACTICE / NIGERIA + REMOTE</span>
          </div>

          <div className="cinematic-copy-plane">
            <p className="cinematic-kicker">AI Engineer — Growth &amp; Automation Systems</p>
            <h1 className="hero-statement cinematic-title" id="studio-hero-title">
              <span className="cinematic-line"><span className="cinematic-line-inner">Business</span></span>
              <span className="cinematic-line"><span className="cinematic-line-inner">problems<span className="cinematic-period">.</span></span></span>
              <span className="cinematic-line cinematic-line-serif"><span className="cinematic-line-inner"><em>Working systems.</em></span></span>
            </h1>

            <div className="cinematic-hero-under">
              <p className="cinematic-intro">
                When customer enquiries are missed, operations become difficult to oversee,
                or teams lose track of work, I build the systems that address it.
                I connect AI, APIs and operational workflows with the records and controls a business needs.
              </p>
              <div className="cinematic-actions">
                <Link href="#work" className="cinematic-action-main">
                  <span>Explore selected work</span><span aria-hidden="true">↗</span>
                </Link>
                <Link href="/contact" className="cinematic-action-text">Discuss a problem <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>

          <figure className="cinematic-image-frame">
            <div className="cinematic-image-depth">
              <div className="cinematic-image-tilt">
                <div className="cinematic-image-heading">
                  <span>FIELD RECORD / 01</span>
                  <span>ORIGINAL WORKFLOW CAPTURE</span>
                </div>
                <div className="cinematic-image-window">
                  <Image
                    src="/evidence/job-intelligence-workflow.png"
                    alt="Archived n8n workflow editor showing multiple job sources, processing and Telegram alerting"
                    width={1366} height={720}
                    sizes="(max-width: 1023px) 100vw, 54vw"
                    priority
                    className="cinematic-actual-image"
                  />
                </div>
                <figcaption className="cinematic-image-caption">
                  <span><strong>01 / Job intelligence</strong><small>Archived n8n design, not current live-run evidence</small></span>
                  <Link href="/work/ai-job-scraper" aria-label="Explore the job intelligence case study">View project ↗</Link>
                </figcaption>
              </div>
            </div>
          </figure>

          <div className="cinematic-scroll-cue" aria-hidden="true">
            <span>SCROLL TO EXPLORE</span>
            <span className="cinematic-scroll-track"><span /></span>
            <span>↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
