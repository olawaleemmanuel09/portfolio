import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/lib/data/projects";

// Copy from the deployed site's narrative, independent of its former layout.
const cases = [
  {
    number: "01",
    category: "LEARNING OPERATIONS",
    title: "A growing cohort needed one place to work.",
    problem: "Student records, group conversations and assignments were becoming harder to coordinate across separate tools.",
    response: "A student portal with authenticated access, group-scoped chat, submissions and staff review.",
    evidence: "127 students onboarded and 113 non-deleted group-chat messages at the verified 24 Nov 2026 snapshot.",
    label: "Documented operations",
    image: "/architecture/cefa-learning-operations.svg",
    alt: "Conceptual diagram showing student access, membership rules, coursework, staff review and group chat",
    slug: "cefa",
  },
  {
    number: "02",
    category: "RESTAURANT OPERATIONS",
    title: "Customer messages were becoming an order queue.",
    problem: "A three-branch restaurant needed faster answers and a dependable way to hand customer orders to staff.",
    response: "Conversational intake, branch-aware order validation and operational views for managers, kitchen and reconciliation.",
    evidence: "Earlier WhatsApp ordering was operational. The newer dashboard and payment release still require acceptance.",
    label: "Operating channel / staged rebuild",
    image: "/architecture/restaurant-operations.svg",
    alt: "Conceptual diagram of branch-aware ordering, payment checks and separate management, kitchen and accountant responsibilities",
    slug: "web-ordering-and-payments",
  },
  {
    number: "03",
    category: "SECURITY OPERATIONS",
    title: "Headquarters could not rely on WhatsApp for attendance.",
    problem: "Managing more than 1,000 guards requires shift records and exceptions that cannot disappear into group messages.",
    response: "Role-scoped operational views and geospatial attendance checks for guards, supervisors and headquarters.",
    evidence: "Client guard scale is not platform adoption. Real-device field and headquarters certification remain open.",
    label: "Staged system",
    image: "/architecture/security-operations.svg",
    alt: "Conceptual diagram showing a guard check-in, geofence review, attendance audit and headquarters oversight",
    slug: "security-workforce-operations",
  },
] as const;


const principles = [
  ["01", "Start with the bottleneck", "What gets lost, delayed or repeated? Describe that before proposing a model."],
  ["02", "Make the boundary explicit", "AI interprets; authoritative data, roles and human approvals decide what happens."],
  ["03", "Plan for the bad day", "Retries, audits, permissions and recovery are part of the system, not a future extra."],
];


export function BusinessChallenges() {
  return (
    <section id="systems" className="v2-challenges v2-container" aria-labelledby="v2-challenges-title">
      <div className="v2-feature-heading" data-v2-reveal>
        <div><p className="v2-eyebrow">SYSTEMS STUDIO</p><h2 id="v2-challenges-title">Choose the problem.</h2></div>
        <p>Three different operational constraints. Explore why the systems exist, what was engineered and what the evidence actually supports.</p>
      </div>
      <div className="v2-system-showcase">
        <nav className="v2-system-index" aria-label="Explore operational systems">
          {cases.map(item => <a key={item.slug} href={"#system-" + item.slug}>{item.category}<span aria-hidden="true">↘</span></a>)}
        </nav>
        <div className="v2-system-rows">
          {cases.map(item => {
            const project = getProject(item.slug);
            const src = project?.preview ?? item.image;
            const media = project?.media.find(m => m.src === src);
            return <article id={"system-" + item.slug} className="v2-challenge v2-system-row" key={item.slug}>
              <figure className="v2-system-image" data-v2-reveal>
                <Image src={src} alt={media?.alt ?? (src === item.image ? item.alt : item.title + " project capture")} width={1280} height={760} sizes="(max-width: 900px) 90vw, 39vw" loading="lazy" />
                <figcaption>{media?.caption ?? (src.startsWith("/architecture/") ? "Conceptual system map · Not a live screenshot" : "Documented project capture · Verification in case study")}</figcaption>
              </figure>
              <div className="v2-system-copy" data-v2-reveal>
                <p className="v2-eyebrow">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.problem}</p><p>{item.response}</p>
                <p className="v2-system-boundary">{item.evidence}</p>
                <Link prefetch={false} href={"/work/" + item.slug} className="v2-project-link">Read the complete case study ↗</Link>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}

export function EngineeringLab() {
  return (
    <section id="engineering-lab" className="v2-editorial-band" aria-labelledby="v2-lab-title">
      <div className="v2-container v2-editorial-grid">
        <div className="v2-editorial-copy" data-v2-reveal>
          <p className="v2-eyebrow">04 / OPEN WORK</p>
          <h2 id="v2-lab-title">Show the <span>actual build.</span></h2>
          <p>A capstone is useful when the logic is inspectable. SmartBook shows booking intake, validation, reminders and cancellation paths—not a fabricated predictive model.</p>
          <p className="v2-editorial-note">The archived n8n image shows an earlier booking workflow. It does not prove exactly-once reminders, live provider delivery or a trained no-show model.</p>
          <Link prefetch={false} href="/work/smartbook-ai" className="v2-project-link">Examine SmartBook AI ↗</Link>
          <Link prefetch={false} href="/work#lab" className="v2-project-link">Browse the engineering lab ↗</Link>
        </div>
        <figure className="v2-narrative-media">
          <Image src="/evidence/smartbook-overview.png" alt="Archived SmartBook n8n workflow showing booking, reminders and cancellation branches" width={1366} height={720} sizes="(max-width: 900px) 90vw, 50vw" loading="lazy" />
          <figcaption>Archived booking-capstone graph. No invented model or delivery metrics.</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function WorkingMethod() {
  return (
    <section className="v2-method v2-container" aria-labelledby="v2-method-title">
      <div className="v2-section-intro">
        <p className="v2-eyebrow">05 / METHOD</p>
        <h2 id="v2-method-title">Less theatre. <span>More responsibility.</span></h2>
        <p className="v2-section-description">I work at the point where conversations, business decisions and software meet. The difficult part is rarely the first successful demo; it is making the next hundred decisions trustworthy.</p>
      </div>
      <div className="v2-method-grid" data-v2-reveal>
        <ol className="v2-method-list">
          {principles.map(([number, title, description]) => (
            <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>
          ))}
        </ol>
        <figure className="v2-narrative-media v2-method-portrait">
          <Image src="/work/headshot.jpg" alt="Portrait of the portfolio owner" width={860} height={1075} sizes="(max-width: 900px) 65vw, 340px" loading="lazy" />
          <figcaption>AI engineering / Business systems / 2026</figcaption>
        </figure>
      </div>
      <Link prefetch={false} href="/about" className="v2-project-link">About my approach ↗</Link>
    </section>
  );
}
