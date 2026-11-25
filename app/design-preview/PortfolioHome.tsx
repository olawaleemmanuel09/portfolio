import Image from "next/image";
import Link from "next/link";
import { featured } from "@/lib/data/projects";
import PreviewMotion from "./PreviewMotion";
import "./preview.css";

const tools = ["n8n", "OpenAI", "Claude", "Supabase", "Gemini", "Python"];
const fragments = [
  ["01", "Customer enquiry"], ["02", "Payment confirmation"],
  ["03", "Spreadsheet update"], ["04", "Sales follow-up"],
  ["05", "Team notification"], ["06", "Service request"],
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
      <header className="v2-header">
        <div className="v2-container v2-header-inner">
          <Link prefetch={false} href={preview ? "/design-preview" : "/"} className="v2-brand">Olawale.</Link>
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
              <Image className="v2-scene-photo" src="/design/workstation-preview.webp" alt="" width={512} height={768} priority unoptimized />
              <div className="v2-monitor-screen">
                <div className="v2-screen-nav"><b>Olawale.</b><span>Portfolio / 2026</span></div>
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
              <p className="v2-role">AI Automation Engineer</p>
              <h1 id="v2-title">AI systems for<br className="v2-desktop-break" /> business operations.</h1>
              <p>I build AI workflows, integrations and software that help teams get work done.</p>
              <div className="v2-actions">
                <a className="v2-button" href="#v2-work">Explore my work</a>
                <Link prefetch={false} href="/contact" className="v2-button v2-secondary">Discuss a project</Link>
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
              <ul>{tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
            </div>
          </div>
          <div className="v2-handoff" aria-hidden="true" />
        </div>
      </section>

      <section id="v2-principle" className="v2-principle" data-motion="static" aria-label="My engineering approach">
        <div className="v2-story-stage">
          <div className="v2-story-fragments" aria-hidden="true">
            {fragments.map(([n, label]) => <div className="v2-fragment" key={n}><span>{n}</span>{label}</div>)}
          </div>
          <div className="v2-story-first">
            <h2><Words text="Customer enquiries, payments and team updates often live in separate tools." /></h2>
            <p><Words text="The work falls between them." /></p>
          </div>
          <div className="v2-story-resolution">
            <h2><Words text="I connect the systems behind the work." />{" "}<Words accent text="One connected workflow." /></h2>
            <p><Words text="Clear records. People in control." /></p>
          </div>
        </div>
      </section>

      <section id="v2-work" className="v2-work v2-container" aria-labelledby="v2-work-title">
        <div className="v2-section-intro">
          <p className="v2-eyebrow">Selected work</p>
          <h2 id="v2-work-title">Systems that solve<br className="v2-desktop-break" /> <span>real business problems.</span></h2>
          <Link prefetch={false} href="/work" className="v2-button v2-accent-button">View all projects</Link>
        </div>
        <div className="v2-showcase">
          {cases.map((project, index) => <details className="v2-project" name="portfolio-v2-projects" open={index === 0} key={project.slug} id={"v2-" + project.slug}>
            <summary><span>{project.title}</span><span className="v2-project-toggle" aria-hidden="true" /></summary>
            <div className="v2-project-copy">
              <p className="v2-project-status">{project.statusLabel}</p>
              <p>{project.summary}</p>
              <p className="v2-project-stack">{project.stack.slice(0, 3).join(" · ")}</p>
              <Link prefetch={false} className="v2-project-link" href={"/work/" + project.slug}>Explore case study <span aria-hidden="true">↗</span></Link>
            </div>
            {project.preview && <figure className="v2-product-scene">
              <div className="v2-product-window">
                <Image src={project.preview} width={1280} height={760} alt={project.media?.find(m => m.src === project.preview)?.alt ?? project.title + " project evidence"} sizes="(max-width: 900px) 90vw, 60vw" loading="lazy" />
              </div>
              <figcaption>{project.media?.find(m => m.src === project.preview)?.caption ?? "Project visual — see the case study for source and verification context."}</figcaption>
            </figure>}
          </details>)}
        </div>
      </section>
      {adoption?.metrics?.length ? <section className="v2-adoption" aria-labelledby="v2-adoption-heading">
        <div className="v2-container v2-adoption-grid">
          <div><p className="v2-eyebrow">Verified operating snapshot</p><h2 id="v2-adoption-heading">Built for actual users.</h2><p>CEFA programme records · {adoption.metricsAsOf}. A dated snapshot, not a current user count.</p><Link prefetch={false} href="/work/cefa" className="v2-project-link">Read the evidence ↗</Link></div>
          <dl>{adoption.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>
        </div>
      </section> : null}
      <section className="v2-about v2-container">
        <p className="v2-eyebrow">About</p>
        <h2>Olawale Emmanuel Olaonipekun.</h2>
        <p>AI Engineer — Growth &amp; Automation Systems. I design, build and test business applications, API integrations and workflows, with clear records and human control.</p>
        <div className="v2-actions"><Link prefetch={false} href="/about" className="v2-project-link">About my approach ↗</Link><Link prefetch={false} href="/resume" className="v2-project-link">Request my CV ↗</Link><Link prefetch={false} href="/work#lab" className="v2-project-link">Engineering lab ↗</Link></div>
      </section>
      <section className="v2-contact">
        <div className="v2-container">
          <p className="v2-eyebrow">Work together</p>
          <h2>What would you like to automate?</h2>
          <Link prefetch={false} href="/contact" className="v2-button v2-accent-button">Get in touch ↗</Link>
        </div>
      </section>
    </div>
  );
}
