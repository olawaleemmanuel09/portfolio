import Image from "next/image";
import Link from "next/link";

const principles = [
  ["01", "Start with the bottleneck", "What gets lost, delayed or repeated? Describe that before proposing a model."],
  ["02", "Make the boundary explicit", "AI interprets; authoritative data, roles and human approvals decide what happens."],
  ["03", "Plan for the bad day", "Retries, audits, permissions and recovery are part of the system, not a future extra."],
];

export default function AboutPreview() {
  return (
    <section aria-labelledby="studio-about-title" className="studio-about">
      <div className="studio-container studio-about-layout">
        <div>
          <p className="studio-overline">05 / METHOD</p>
          <h2 id="studio-about-title">Less theatre. <em>More responsibility.</em></h2>
          <p className="studio-about-intro">I work at the point where conversations, business decisions and software meet. The difficult part is rarely the first successful demo; it is making the next hundred decisions trustworthy.</p>
          <ol className="studio-method-list">
            {principles.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
          <Link prefetch={false} href="/about" className="studio-text-link">About my approach <span aria-hidden="true">↗</span></Link>
        </div>
        <figure className="studio-about-portrait">
          <Image loading="lazy" src="/work/headshot.jpg" alt="Portrait of the portfolio owner" width={860} height={1075}
            sizes="(max-width: 1023px) 100vw, 40vw" className="w-full h-auto" />
          <figcaption>AI ENGINEERING / BUSINESS SYSTEMS / 2026</figcaption>
        </figure>
      </div>
    </section>
  );
}
