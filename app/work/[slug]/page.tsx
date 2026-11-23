import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/data/projects";
import { engineeringEvidence } from "@/lib/data/engineeringEvidence";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
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

  return (
    <article className="mx-auto max-w-[1180px] px-6 pb-24 pt-32 md:px-8 md:pt-40">
      <header className="border-b border-rule pb-12 md:pb-14">
        <Link href="/work" className="link-underline t-small text-muted">
          Back to work
        </Link>

        <h1 className="t-display mt-6 max-w-[20ch]" data-hero="0">
          <span className="mask block">
            <span>{project.title}</span>
          </span>
        </h1>

        <p className="t-lead prose-justify measure-wide mt-6 text-muted" data-hero="1">{project.summary}</p>

        <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" data-hero="2">
          <div>
            <dt className="t-small text-muted">Client</dt>
            <dd className="t-small mt-1.5">{project.client}</dd>
          </div>
          <div>
            <dt className="t-small text-muted">Status</dt>
            <dd className="t-small mt-1.5 flex items-center gap-2">
              {project.status === "production" && <span className="live-dot" aria-hidden />}
              {project.statusLabel}
            </dd>
          </div>
          <div>
            <dt className="t-small text-muted">Period</dt>
            <dd className="t-small mt-1.5">{project.period}</dd>
          </div>
          <div>
            <dt className="t-small text-muted">Built with</dt>
            <dd className="t-small mt-1.5">{project.stack.join(", ")}</dd>
          </div>
        </dl>

        {(project.live || project.repo) && (
          <div className="mt-10 flex gap-8">
            {project.live && (
              <a href={project.live} className="link-underline t-small" target="_blank" rel="noreferrer">
                Visit the site
              </a>
            )}
            {project.repo && (
              <a href={project.repo} className="link-underline t-small" target="_blank" rel="noreferrer">
                View the repository
              </a>
            )}
          </div>
        )}
      </header>

      <div className="grid gap-14 py-14 md:py-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="t-h2">The problem</h2>
          {project.problem.map((p, i) => (
            <p key={i} className="t-body prose-justify mt-5 text-muted">
              {p}
            </p>
          ))}
        </div>

        <div>
          <h2 className="t-h2">What I built</h2>
          <div className="mt-8">
            {project.approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 60} variant="soft">
                <div className="border-t border-rule py-7 first:border-t-0 first:pt-0">
                  <h3 className="t-h2" style={{ fontVariationSettings: '"wdth" 100, "wght" 560' }}>
                    {a.title}
                  </h3>
                  <p className="t-body prose-justify mt-3 text-muted">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {evidence && (
        <section aria-labelledby="system-boundaries" className="border-t border-rule py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
            <div><p className="t-small text-muted">System evidence</p><h2 id="system-boundaries" className="t-h2 mt-3">Boundaries and responsibilities</h2><p className="t-body mt-5 text-muted">{evidence.boundaries}</p></div>
            <div><h3 className="t-h2">Engineering implementation</h3><div className="mt-6 divide-y divide-rule border-t border-rule">
              {evidence.implementation.map((item) => <div key={item.title} className="py-5"><h4 className="t-body font-semibold">{item.title}</h4><p className="t-body mt-2 text-muted">{item.detail}</p></div>)}
            </div></div>
          </div>
          <div className="mt-12"><h3 className="t-h2">Delivery and verification boundaries</h3><div className="mt-6 grid gap-4 md:grid-cols-3">
            {evidence.verification.map((item) => <div key={item.area} className="border border-rule p-5"><p className="t-small text-muted">{item.state === "documented" ? "Documented" : item.state === "planned" ? "Planned" : "Verification pending"}</p><h4 className="t-body mt-2 font-semibold">{item.area}</h4><p className="t-small mt-3 text-muted">{item.detail}</p></div>)}
          </div>{evidence.publicationNote && <p className="t-small mt-5 text-muted">{evidence.publicationNote}</p>}</div>
        </section>
      )}
      {project.decision && (
        <Reveal>
          <section className="-mx-6 border-y border-ink px-6 py-14 md:-mx-8 md:px-10 md:py-20">
            <p className="t-small text-[var(--color-accent)]">The call that mattered</p>
            <h2 className="t-display-sm mt-4 max-w-[22ch]">
              <span className="mask block">
                <span>{project.decision.title}</span>
              </span>
            </h2>
            <p className="t-body prose-justify measure-wide mt-6">{project.decision.body}</p>
          </section>
        </Reveal>
      )}

      {project.media.length > 0 && (
        <section className="py-14 md:py-20">
          <div
            className={
              project.media[0].aspect === "tall" && project.media.length > 1
                ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-14"
            }
          >
            {project.media.map((m, i) => (
              <Reveal key={m.src} delay={i * 60}>
                <figure>
                  {m.type === "video" ? (
                    <video
                      className="mx-auto w-full max-w-[380px] border border-rule"
                      controls
                      playsInline
                      preload="metadata"
                    >
                      <source src={m.src} type="video/mp4" />
                    </video>
                  ) : m.src.startsWith("/architecture/") ? (
                    <div className="max-w-full overflow-x-auto border border-rule" tabIndex={0} role="region" aria-label={`Scrollable architecture diagram for ${project.title}`}>
                      <Image src={m.src} alt={m.alt} width={1280} height={670} sizes="(max-width: 640px) 820px, 100vw" className="w-full min-w-[820px] lg:min-w-0" />
                    </div>
                  ) : (
                    <Parallax className="wipe border border-rule" amount={m.aspect === "tall" ? 6 : 10}>
                      <Image
                        src={m.src}
                        alt={m.alt}
                        width={m.aspect === "tall" ? 700 : 1366}
                        height={m.aspect === "tall" ? 1400 : 640}
                        sizes={m.aspect === "tall" ? "(max-width: 640px) 100vw, 33vw" : "100vw"}
                        className="w-full"
                      />
                    </Parallax>
                  )}
                  {m.src.startsWith("/architecture/") && <p className="t-small mt-2 text-muted sm:hidden">Swipe horizontally to inspect the system diagram. The implementation details are also written above.</p>}
                  <figcaption className="t-small mt-3 text-muted">
                    {m.caption ?? m.alt}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-12 border-t border-rule py-14 md:py-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        <h2 className="t-h2">Delivery and evidence</h2>
        <div>
          {project.outcome.map((o, i) => (
            <p key={i} className="t-body prose-justify mt-5 text-muted first:mt-0">
              {o}
            </p>
          ))}

        </div>
      </section>

      <Link
        href={`/work/${next.slug}`}
        className="group flex items-baseline justify-between border-t border-rule pt-10 transition-colors hover:text-[var(--color-accent)]"
      >
        <span>
          <span className="t-small block text-muted">Next project</span>
          <span className="t-display-sm mt-2 block transition-transform duration-500 md:group-hover:translate-x-2">
            {next.title}
          </span>
        </span>
      </Link>
    </article>
  );
}
