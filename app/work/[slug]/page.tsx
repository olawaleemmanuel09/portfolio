import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/data/projects";
import { engineeringEvidence } from "@/lib/data/engineeringEvidence";
import CaseChapterNav from "@/components/sections/CaseChapterNav";
import CaseStudyMotion from "@/components/motion/CaseStudyMotion";
import EvidenceGallery from "@/components/sections/EvidenceGallery";
import CaseHeroVisual from "@/components/sections/CaseHeroVisual";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    alternates: { canonical: `/work/${project.slug}` },
    title: `${project.title} — Case study`,
    description: project.summary,
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      images: project.preview ? [project.preview] : [],
    },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const evidence = engineeringEvidence[project.slug];
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const chapters = [
    ...(project.media.length ? [{ id: "case-visual-evidence", label: "Visual record" }] : []),
    { id: "case-challenge", label: "Challenge" },
    ...(evidence ? [{ id: "case-system", label: "Engineering" }] : []),
    ...(project.decision ? [{ id: "case-decision", label: "The decision" }] : []),
    { id: "case-results", label: "Outcome" },
  ];

  return (
    <article data-case-study className="case-cinema-page">
      <CaseStudyMotion slug={project.slug} />
      <div className="case-cinema-cover">
        <div className="case-cinema-container">
          <header className="case-cinema-header">
            <div className="case-cinema-topline">
              <Link href="/work" className="case-cinema-return">← All projects</Link>
              <span>CASE FILE / {String(index + 1).padStart(2, "0")} OF {String(projects.length).padStart(2, "0")}</span>
              <span>{project.period}</span>
            </div>

            <div className="case-cinema-hero-grid">
              <div className="case-cinema-story">
                <p className="case-cinema-eyebrow">ENGINEERING CASE STUDY <span aria-hidden="true">/</span> {project.statusLabel}</p>
                <h1 className="case-cinema-title" aria-label={project.title}>
                  <span aria-hidden="true">
                    {project.title.split(/\s+/).map((word, i) => (
                      <span className="case-title-word-wrap" key={i}><span className="case-title-word">{word}</span></span>
                    ))}
                  </span>
                </h1>
                <p className="case-cinema-synopsis">{project.summary}</p>
                <p className="case-cinema-context">
                  THE CASE / A BUSINESS PROBLEM, THE RESPONSE AND WHAT THE RECORD ACTUALLY SHOWS.
                </p>
              </div>
              <div className="case-cinema-hero-media">
                {project.preview ? (
                  <CaseHeroVisual project={project} />
                ) : (
                  <div className="case-cinema-no-preview">
                    <span>PROJECT RECORD</span>
                    <strong>{project.title}</strong>
                    <span>Documentation available below</span>
                  </div>
                )}
              </div>
            </div>

            <dl className="case-cinema-facts">
              <div><dt>ORGANISATION</dt><dd>{project.client}</dd></div>
              <div><dt>DELIVERY</dt><dd>{project.status === "production" && <span className="live-dot" aria-hidden="true" />}{project.statusLabel}</dd></div>
              <div><dt>PERIOD</dt><dd>{project.period}</dd></div>
              <div><dt>ENGINEERING STACK</dt><dd>{project.stack.join(" / ")}</dd></div>
            </dl>

            {project.metrics && project.metrics.length > 0 && (
              <section aria-label="Verified project metrics" className="case-cinema-metrics">
                <div className="case-cinema-metrics-top">
                  <p>Verified operating snapshot</p>
                  <p>Database count · {project.metricsAsOf}</p>
                </div>
                <dl className="case-cinema-metrics-list">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt>{metric.label}</dt>
                      <dd>{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {(project.live || project.repo) && (
              <div className="case-cinema-external">
                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Visit published site ↗</a>}
                {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer">Inspect public repository ↗</a>}
              </div>
            )}
          </header>
        </div>
      </div>

      <CaseChapterNav chapters={chapters} />

      <div className="case-cinema-container">
        <EvidenceGallery project={project} />

        <section id="case-challenge" className="case-cinema-chapter" aria-labelledby="case-challenge-heading">
          <div className="case-cinema-chapter-intro" data-case-reveal>
            <p className="case-cinema-index">02 / THE CHALLENGE</p>
            <h2 id="case-challenge-heading">What was getting <em>in the way.</em></h2>
            {project.problem.map((item, i) => <p key={i} className="case-cinema-problem">{item}</p>)}
          </div>
          <div className="case-cinema-response">
            <div className="case-cinema-response-heading" data-case-reveal>
              <p className="case-cinema-index">THE ENGINEERED RESPONSE</p>
              <p>Specific decisions, not a catalogue of technologies.</p>
            </div>
            <ol>
              {project.approach.map((step, i) => (
                <li key={step.title} data-case-reveal>
                  <span className="case-cinema-response-number">{String(i + 1).padStart(2, "0")}</span>
                  <div><h3>{step.title}</h3><p>{step.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {evidence && (
        <section id="case-system" aria-labelledby="case-system-heading" className="case-cinema-proof">
          <div className="case-cinema-container">
            <div className="case-cinema-proof-head" data-case-reveal>
              <div><p className="case-cinema-index">03 / SYSTEM EVIDENCE</p><h2 id="case-system-heading">Show the <em>engineering.</em></h2></div>
              <p>{evidence.boundaries}</p>
            </div>
            <div className="case-cinema-proof-grid">
              <div className="case-cinema-implementation" data-case-reveal>
                <p className="case-cinema-proof-label">IMPLEMENTED RESPONSIBILITIES</p>
                {evidence.implementation.map((item, i) => (
                  <div key={item.title} className="case-cinema-implementation-row">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <div><h3>{item.title}</h3><p>{item.detail}</p></div>
                  </div>
                ))}
              </div>
              <div className="case-cinema-verification" data-case-reveal>
                <p className="case-cinema-proof-label">WHAT THE EVIDENCE ACTUALLY SUPPORTS</p>
                {evidence.verification.map((item, i) => (
                  <div key={item.area} className="case-cinema-verification-row">
                    <span className="case-cinema-verification-index">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <span className="case-cinema-verification-state">{item.state === "documented" ? "DOCUMENTED" : item.state === "planned" ? "PLANNED" : "VERIFICATION PENDING"}</span>
                      <h3>{item.area}</h3><p>{item.detail}</p>
                    </div>
                  </div>
                ))}
                {evidence.publicationNote && <p className="case-cinema-publication">{evidence.publicationNote}</p>}
              </div>
            </div>
          </div>
        </section>
      )}

      {project.decision && (
        <section id="case-decision" className="case-cinema-decision" aria-labelledby="case-decision-heading">
          <div className="case-cinema-container" data-case-reveal>
            <p className="case-cinema-index">04 / THE DECISION THAT MATTERED</p>
            <h2 id="case-decision-heading">{project.decision.title}</h2>
            <p>{project.decision.body}</p>
          </div>
        </section>
      )}

      <section id="case-results" className="case-cinema-results" aria-labelledby="case-results-heading">
        <div className="case-cinema-container">
          <div data-case-reveal>
            <p className="case-cinema-index">05 / DELIVERY AND EVIDENCE</p>
            <h2 id="case-results-heading">What changed. <em>What remains.</em></h2>
          </div>
          <div className="case-cinema-results-copy">
            {project.outcome.map((paragraph, i) => <p key={i} data-case-reveal>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <footer className="case-cinema-next">
        <div className="case-cinema-container">
          <Link href={`/work/${next.slug}`} className="case-cinema-next-link">
            <span>NEXT CASE / {String(((index + 1) % projects.length) + 1).padStart(2, "0")}</span>
            <strong>{next.title}</strong>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </footer>
    </article>
  );
}
