"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

export default function ProblemExplorer() {
  const [active, setActive] = useState(0);
  const chosen = cases[active];

  return (
    <section id="systems" aria-labelledby="explorer-heading" className="studio-explorer">
      <div className="studio-container">
        <div className="studio-section-heading">
          <div>
            <p className="studio-overline">02 / THE SYSTEMS STUDIO</p>
            <h2 id="explorer-heading">Choose the <em>problem.</em></h2>
          </div>
          <p>Three different operational constraints. Explore why the systems exist, what was engineered and what the evidence actually supports.</p>
        </div>
        <div className="studio-explorer-shell">
          <div className="studio-explorer-options" aria-label="Choose a business challenge">
            {cases.map((item, index) => (
              <a
                key={item.slug}
                href={`/work/${item.slug}`}
                className="studio-problem-option"
                aria-current={index === active ? "true" : undefined}
                onClick={(event) => {
                  // An ordinary link without JavaScript. Once hydrated, a normal
                  // primary click selects the preview; modified clicks still navigate.
                  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                  event.preventDefault();
                  setActive(index);
                }}
              >
                <span className="studio-problem-number">{item.number}</span>
                <span className="studio-problem-label">
                  <small>{item.category}</small>
                  <strong>{item.title}</strong>
                </span>
                <span className="studio-problem-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
            <p className="studio-explorer-aside">These are project narratives and conceptual diagrams, not simulated live dashboards.</p>
          </div>
          <div className="studio-explorer-stage" aria-live="polite" aria-atomic="true">
            <div className="studio-stage-top">
              <span>OPERATING BRIEF / {chosen.number}</span>
              <span>{chosen.label}</span>
            </div>
            <div className="studio-stage-image">
              <Image loading="lazy" src={chosen.image} alt={chosen.alt} width={1280} height={670}
                sizes="(max-width: 1023px) 100vw, 53vw"
                className="studio-stage-img" />
              <span className="studio-stage-caption">CONCEPTUAL SYSTEM MAP · NOT A LIVE SCREENSHOT</span>
            </div>
            <div className="studio-stage-notes">
              <div>
                <span>THE FRICTION</span>
                <p>{chosen.problem}</p>
              </div>
              <div>
                <span>THE ENGINEERED RESPONSE</span>
                <p>{chosen.response}</p>
              </div>
              <div className="studio-stage-proof">
                <span>THE EVIDENCE BOUNDARY</span>
                <p>{chosen.evidence}</p>
              </div>
            </div>
            <Link prefetch={false} href={`/work/${chosen.slug}`} className="studio-stage-link">
              Read the complete case study <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
