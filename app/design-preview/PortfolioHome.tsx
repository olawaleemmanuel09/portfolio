import Image from "next/image";
import Link from "next/link";
import { featured } from "@/lib/data/projects";
import PreviewMotion from "./PreviewMotion";
import ProjectScene from "./ProjectScene";
import VisiblePlayback from "./VisiblePlayback";
import MobileProjects from "./MobileProjects";
import { BusinessChallenges, EngineeringLab, WorkingMethod } from "./NarrativeSections";
import "./preview.css";

const tools = ["n8n", "OpenAI", "Claude", "Supabase", "Gemini", "Python"];
const fragments = [
  ["01", "Customer enquiry", "message"], ["02", "Payment confirmation", "file"],
  ["03", "Spreadsheet update", "sheet"], ["04", "Sales follow-up", "message"],
  ["05", "Team notification", "bell"], ["06", "Service request", "file"],
];

function Words({ text, accent = false }: { text: string; accent?: boolean }) {
  return <span className={accent ? "v2-accent-words" : undefined}>
    {text.split(" ").map((word, index) => <span className="v2-word-mask" key={index}><span className="v2-word">{word}</span>{" "}</span>)}
  </span>;
}

export default function PortfolioHome({ preview = false }: { preview?: boolean }) {
  const cases = featured.slice(0, 6);
  const adoption = featured.find(p => p.slug === "cefa");
  return (
    <div className="portfolio-v2" data-v2-root>
      <PreviewMotion />
      <VisiblePlayback />
      <header className="v2-header">
        <div className="v2-container v2-header-inner">
          <Link prefetch={false} href={preview ? "/design-preview" : "/"} className="v2-brand">Olawale Olaonipekun</Link>
          <nav aria-label="Main navigation" className="v2-desktop-nav">
            <a href="#v2-work">Projects</a>
            <a href="#v2-principle">Approach</a>
            <Link prefetch={false} href="/about">About</Link>
          </nav>
          <div className="v2-header-actions">
            <Link prefetch={false} href="/resume" className="v2-button v2-secondary">View CV</Link>
            <Link prefetch={false} href="/contact" className="v2-button v2-header-cta">Get in touch</Link>
          </div>
          <details className="v2-menu">
            <summary>Menu <span aria-hidden="true">+</span></summary>
            <nav aria-label="Mobile navigation">
              <a href="#v2-work">Projects</a>
              <a href="#v2-principle">Approach</a>
              <Link prefetch={false} href="/about">About</Link>
              <Link prefetch={false} href="/resume">View CV</Link>
              <Link prefetch={false} href="/contact">Get in touch</Link>
            </nav>
          </details>
        </div>
      </header>

      <section className="v2-hero" aria-labelledby="v2-title" data-motion="static">
        <div className="v2-stage">
          <div className="v2-desk-world" aria-hidden="true">
            <div className="v2-camera-plane">
              <picture className="v2-scene-picture">
                <source media="(min-width: 1024px) and (pointer: fine)" srcSet="/design/workstation-full.webp" type="image/webp" />
                <Image className="v2-scene-photo" src="/design/workstation-preview.webp" alt="" width={512} height={768} loading="eager" fetchPriority="high" unoptimized />
              </picture>
              <div className="v2-monitor-screen">
                <div className="v2-screen-nav"><b>Olawale Olaonipekun</b><span>Portfolio / 2026</span></div>
                <div className="v2-screen-layout">
                  <aside><b>Projects</b><span>Overview</span><span>Engineering</span><span>Case studies</span></aside>
                  <div className="v2-screen-body">
                    <strong>My projects</strong>
                    <div className="v2-screen-table">
                      <div className="v2-screen-row v2-screen-labels"><span>Project</span><span>Technology</span><span>Status</span></div>
                      {cases.map(project => <div className="v2-screen-row" key={project.slug}>
                        <b>{project.title}</b><span>{project.stack.slice(0, 2).join(" / ")}</span><span>{project.statusLabel}</span>
                      </div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="v2-hero-shade" aria-hidden="true" />
          <div className="v2-container v2-hero-inner">
            <div className="v2-hero-copy">
              <p className="v2-role">AI Engineer — Growth &amp; Automation Systems</p>
              <h1 id="v2-title">Business problems.<br />Working systems.</h1>
              <p>I connect AI, APIs and business workflows to solve operational problems, with the records and controls teams need.</p>
              <div className="v2-actions">
                <a className="v2-button" href="#v2-work">Explore selected work</a>
                <Link prefetch={false} href="/contact" className="v2-button v2-secondary">Discuss a problem</Link>
              </div>
            </div>
            <Link prefetch={false} className="v2-proof-preview" href="/work/cefa">
              <span>Inside a live system <span aria-hidden="true">↗</span></span>
              <Image src="/evidence/approved/learning-portal-demo-poster.jpg" alt="CEFA student portal, from the approved mobile walkthrough" width={400} height={260} sizes="210px" loading="lazy" />
            </Link>
          </div>
          <div className="v2-hero-foot">
            <div className="v2-container v2-tools">
              <span className="v2-tools-label">Built with</span>
              <div className="v2-tools-marquee" data-v2-playback><div className="v2-tools-track"><ul>{tools.map(tool => <li key={tool}>{tool}</li>)}</ul><ul aria-hidden="true" className="v2-tools-duplicate">{tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div></div>
            </div>
          </div>
          <div className="v2-handoff" aria-hidden="true" />
        </div>
      </section>

      <section id="v2-principle" className="v2-principle" data-motion="static" aria-label="My engineering approach">
        <div className="v2-story-stage">
          <div className="v2-story-fragments" aria-hidden="true">
            {fragments.map(([n, label, kind]) => <div className="v2-fragment" key={n} data-kind={kind}><span className="v2-fragment-number">{n}</span><span className="v2-fragment-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{kind === "message" ? <><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></> : kind === "sheet" ? <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M10 9v12M15 9v12"/></> : kind === "bell" ? <><path d="M18 8a6 6 0 0 0-12 0v5l-2 3h16l-2-3zM10 20h4"/></> : <><path d="M6 3h8l4 4v14H6zM14 3v5h5M9 13h6M9 17h6"/></>}</svg></span><span className="v2-fragment-label">{label}</span></div>)}
          </div>
          <div className="v2-story-first">
            <h2><Words text="A useful system doesn’t just reply." /></h2>
            <p><Words text="The technology is only useful when the business can act on it." /></p>
          </div>
          <div className="v2-story-resolution">
            <h2><Words text="It preserves context, gives people control and" />{" "}<Words accent text="keeps work moving." /></h2>
            
          </div>
        </div>
      </section>

      {adoption?.metrics?.length ? <section className="v2-adoption" aria-labelledby="v2-adoption-heading">
        <div className="v2-container v2-adoption-grid">
          <div><p className="v2-eyebrow">ONE VERIFIED SNAPSHOT</p><h2 id="v2-adoption-heading">Real records. <span>No inflated reach.</span></h2><p>CEFA learning programme · database snapshot, 24 November 2026. These are counts, not claims of revenue or concurrent users.</p><Link prefetch={false} href="/work/cefa" className="v2-project-link">See the programme case ↗</Link></div>
          <dl>{adoption.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>
        </div>
      </section> : null}
      <section id="v2-work" className="v2-work v2-container" aria-labelledby="v2-work-title">
        <div className="v2-section-intro v2-product-intro" data-v2-reveal>
          <p className="v2-eyebrow">SELECTED WORK</p>
          <h2 id="v2-work-title">A different problem. <span>Every time.</span></h2>
          <p className="v2-section-description">These are the systems behind actual operational constraints. Each story distinguishes the work delivered from the next release gate.</p>
          <Link prefetch={false} href="/work" className="v2-button v2-accent-button">See the complete project archive</Link>
        </div>
        <div className="v2-showcase">
          {cases.map((project, index) => <details className="v2-project" name="portfolio-v2-projects" open={index === 0} key={project.slug} id={"v2-" + project.slug}>
            <summary><span>{project.title}</span><span className="v2-project-toggle" aria-hidden="true" /></summary>
            <div className="v2-project-copy">
              <p className="v2-project-status">{project.statusLabel}</p>
              <p className="v2-project-constraint">THE BUSINESS CONSTRAINT</p>
              <p>{project.problem[0]}</p>
              {project.metrics?.length ? <p className="v2-project-metric">{project.metrics[0].value} {project.metrics[0].label.toLowerCase()} · {project.metricsAsOf}</p> : null}
              <p className="v2-project-stack">{project.stack.slice(0, 3).join(" · ")}</p>
              <Link prefetch={false} className="v2-project-link" href={"/work/" + project.slug}>Explore case study <span aria-hidden="true">↗</span></Link>
            </div>
            <ProjectScene project={project} />
          </details>)}
          <p className="v2-project-fallback">Select a project above to inspect its visual record, or <Link prefetch={false} href="/work" className="v2-project-link">browse every case study</Link>.</p>
        </div>
        <MobileProjects projects={cases} />
        <p className="v2-archive-note">Six featured systems / seventeen projects in the archive.</p>
      </section>
      <BusinessChallenges />
      <EngineeringLab />
      <WorkingMethod />
      <section className="v2-contact">
        <div className="v2-container">
          <p className="v2-eyebrow">06 / COLLABORATION</p>
          <h2>What&apos;s slowing <span>your business down?</span></h2>
          <p>Open to AI engineering roles and projects with a real operational problem to solve.</p>
          <div className="v2-actions">
            <Link prefetch={false} href="/contact" className="v2-button v2-accent-button">Discuss a project ↗</Link>
            <Link prefetch={false} href="/resume" className="v2-project-link">Request my engineering CV ↗</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
