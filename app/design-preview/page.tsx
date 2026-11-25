import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { featured } from "@/lib/data/projects";
import PreviewMotion from "./PreviewMotion";
import "./preview.css";

export const metadata: Metadata = {
  title: "Portfolio V2 — private design study",
  robots: { index: false, follow: false },
};

const statement = ["Useful", "AI", "doesn't", "stop", "at", "a", "conversation.", "It", "makes", "the", "business", "work", "better."];

export default function DesignPreview() {
  const cases = featured.slice(0, 6);
  return (
    <div className="portfolio-v2" data-v2-root>
      <PreviewMotion />
      <header className="v2-header">
        <div className="v2-container v2-header-inner">
          <Link href="/design-preview" className="v2-brand">Olawale<span>.</span></Link>
          <nav aria-label="Design preview navigation" className="v2-desktop-nav">
            <a href="#v2-work">My work</a>
            <a href="#v2-principle">Approach</a>
            <Link href="/about">About</Link>
            <Link href="/resume">CV</Link>
          </nav>
          <Link href="/contact" className="v2-button v2-header-cta">Let's talk</Link>
          <details className="v2-menu">
            <summary>Menu</summary>
            <nav aria-label="Mobile design preview navigation">
              <a href="#v2-work">My work</a>
              <a href="#v2-principle">Approach</a>
              <Link href="/about">About</Link>
              <Link href="/resume">CV</Link>
              <Link href="/contact">Let's talk</Link>
            </nav>
          </details>
        </div>
      </header>
      <section className="v2-hero" aria-labelledby="v2-title" data-motion="static">
        <div className="v2-stage">
          <div className="v2-desk-world" aria-hidden="true">
            <div className="v2-desk-surface" />
            <div className="v2-paper"><i/><i/><i/><i/></div>
            <div className="v2-keyboard" />
            <div className="v2-monitor">
              <div className="v2-monitor-screen">
                <div className="v2-screen-nav"><b>Olawale.</b><span>WORK / 2026</span></div>
                <div className="v2-screen-body">
                  <small>SELECTED SYSTEMS</small>
                  <strong>My projects<span>.</span></strong>
                  <div className="v2-screen-grid">
                    {cases.slice(0, 3).map(project => (
                      <div key={project.slug}>
                        {project.preview && <Image src={project.preview} alt="" width={640} height={420} sizes="(min-width: 1024px) 15vw, 28vw" />}
                        <b>{project.title}</b>
                        <small>{project.statusLabel}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="v2-monitor-stand" />
            </div>
            <div className="v2-notebook" />
          </div>
          <div className="v2-hero-shade" aria-hidden="true"/>
          <div className="v2-container v2-hero-inner">
            <div className="v2-hero-copy">
              <p className="v2-eyebrow">AI engineering / Automation systems</p>
              <h1 id="v2-title">AI systems built for <span>real business.</span></h1>
              <p>I connect AI, APIs and everyday operations to build systems that help teams sell, serve customers and get work done.</p>
              <div className="v2-actions">
                <a className="v2-button" href="#v2-work">Explore my work <span aria-hidden="true">↗</span></a>
                <Link href="/contact" className="v2-button v2-secondary">Discuss a project</Link>
              </div>
            </div>
          </div>
          <div className="v2-hero-foot v2-container" aria-hidden="true"><span>Independent practice · Nigeria / Remote</span><span>Scroll to explore ↓</span></div>
        </div>
      </section>
      <section id="v2-principle" className="v2-principle">
        <div className="v2-container">
          <p className="v2-eyebrow">The approach</p>
          <h2>{statement.map((word, i) => <span className="v2-word-mask" key={i}><span className="v2-word">{word}</span>{" "}</span>)}</h2>
          <p>From the first customer message to the records, decisions and people behind the workflow.</p>
        </div>
      </section>
      <section id="v2-work" className="v2-work v2-container" aria-labelledby="v2-work-title">
        <div className="v2-section-intro">
          <p className="v2-eyebrow">Selected work</p>
          <h2 id="v2-work-title">See the systems <span>in action.</span></h2>
          <p>Real operational problems, documented implementations and clear release status.</p>
        </div>
        <div className="v2-showcase">
          <nav aria-label="Selected project navigation" className="v2-project-index">
            {cases.map((project, index) => <a key={project.slug} href={"#v2-" + project.slug}><span>{String(index + 1).padStart(2, "0")}</span>{project.title}</a>)}
          </nav>
          <div className="v2-project-panels">
            {cases.map((project, index) => (
              <article key={project.slug} id={"v2-" + project.slug} className="v2-project">
                <div className="v2-project-copy">
                  <p className="v2-eyebrow">{String(index + 1).padStart(2, "0")} / {project.statusLabel}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <Link className="v2-project-link" href={"/work/" + project.slug}>Read case study <span aria-hidden="true">↗</span></Link>
                </div>
                {project.preview && (
                  <figure className="v2-product-scene">
                    <div className="v2-product-window">
                      <div className="v2-window-bar" aria-hidden="true"><i/><i/><i/><span>Project evidence</span></div>
                      <Image src={project.preview} width={1280} height={760} alt={project.media?.find(m => m.src === project.preview)?.alt ?? project.title + " project evidence"} sizes="(max-width: 800px) 90vw, 58vw" />
                    </div>
                    <figcaption>{project.media?.find(m => m.src === project.preview)?.caption ?? "Project evidence — see the case study for context."}</figcaption>
                  </figure>
                )}
              </article>
            ))}
          </div>
        </div>
        <Link href="/work" className="v2-button v2-all-work">View all 17 projects ↗</Link>
      </section>
      <section className="v2-contact">
        <div className="v2-container">
          <p className="v2-eyebrow">Let's build</p>
          <h2>What's the process you want to improve?</h2>
          <Link href="/contact" className="v2-button">Start a conversation ↗</Link>
        </div>
      </section>
    </div>
  );
}
