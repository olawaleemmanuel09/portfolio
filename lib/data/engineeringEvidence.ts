export type EngineeringEvidence = {
  boundaries: string;
  implementation: { title: string; detail: string }[];
  verification: { area: string; state: "documented" | "requires-verification" | "planned"; detail: string }[];
  publicationNote?: string;
};
export const engineeringEvidence: Record<string, EngineeringEvidence> = {
  "cefa": {
    "boundaries": "An operational learning programme connects student identities, authorized group membership, coursework, updates and staff review. A temporary backend outage cannot be equated with loss of identity.",
    "implementation": [
      {
        "title": "Identity and groups",
        "detail": "Supabase Auth and PostgreSQL membership policies scope group conversations and learning records."
      },
      {
        "title": "Learning lifecycle",
        "detail": "First login, group assignment, assignment submissions, staff review and separate programme announcements share durable state."
      },
      {
        "title": "Incident-driven reliability",
        "detail": "November incident reports identified excessive polling and transient role lookup failures. Recovery work reduces overlapping refreshes and preserves previously loaded data."
      }
    ],
    "verification": [
      {
        "area": "Operational scope",
        "state": "documented",
        "detail": "Cohort onboarding and group-isolation tests are documented in private programme evidence."
      },
      {
        "area": "Recovery deployment",
        "state": "requires-verification",
        "detail": "Source-level tests do not prove each recovery fix was deployed and observed under load."
      },
      {
        "area": "Peak capacity",
        "state": "requires-verification",
        "detail": "Target cohort size is not evidence of simultaneous user capacity."
      }
    ]
  },
  "whatsapp-ordering-system": {
    "boundaries": "A historical ordering workflow connects conversational requests to branch menus and staff-controlled payment states; model text never becomes an authoritative amount.",
    "implementation": [
      {
        "title": "Customer intake",
        "detail": "Interpret messages into order proposals and validate against the live branch menu and prices."
      },
      {
        "title": "Operational handoff",
        "detail": "Manual bank-transfer confirmation and branch checks precede staff-facing kitchen notification in the historical architecture."
      }
    ],
    "verification": [
      {
        "area": "Historical operational channel",
        "state": "documented",
        "detail": "Earlier handover describes real customer ordering and manual payment confirmation."
      },
      {
        "area": "Current node revisions",
        "state": "requires-verification",
        "detail": "Archived workflow exports may predate deployed fixes."
      }
    ],
    "publicationNote": "Client and branch identifiers are withheld. Diagrams do not reproduce customer conversations."
  },
  "web-ordering-and-payments": {
    "boundaries": "The owner-approved four-workspace responsibility model divides business oversight, branch operations, kitchen execution and finance reconciliation. It remains a release candidate; each dashboard's live behavior requires current acceptance evidence.",
    "implementation": [
      {
        "title": "Management dashboard",
        "detail": "Target scope: cross-branch order monitoring, exception awareness and access to branch/payment summaries. Individual reports and controls must be verified against the latest deployed revision."
      },
      {
        "title": "Branch Manager dashboard",
        "detail": "Target scope: authorized branch-specific orders, menu availability, preparation coordination and exception escalation. Cross-branch isolation requires backend evidence, not a UI-only filter."
      },
      {
        "title": "Kitchen dashboard",
        "detail": "Target scope: preparation tickets with validated order details, fulfillment status and cancellation awareness. The exact payment-to-kitchen gate requires current integration tests."
      },
      {
        "title": "Accountant dashboard",
        "detail": "The old cashier concept is replaced by an accounting and reconciliation workspace: matching orders and references, verifying manual transfers, investigating duplicates or late payments, tracking exceptions and supporting an audit trail."
      },
      {
        "title": "Manual dispatch",
        "detail": "Initial release deliberately excludes rider/dispatcher dashboards, automatic assignment and automatic delivery fees. Human delivery coordination remains outside the automated system."
      }
    ],
    "verification": [
      {
        "area": "Earlier ordering",
        "state": "documented",
        "detail": "The predecessor operated real customer ordering with manual bank-transfer confirmation."
      },
      {
        "area": "New dashboards",
        "state": "requires-verification",
        "detail": "Current deployed screens, permission tests and manager acceptance are not established by historical exports."
      },
      {
        "area": "Gateway payments",
        "state": "requires-verification",
        "detail": "Do not infer live-money activation or exact reconciliation behavior from a staging flow."
      },
      {
        "area": "Ambiguous payments",
        "state": "requires-verification",
        "detail": "Unmatched or late transfers must never silently settle a different order."
      }
    ],
    "publicationNote": "Dashboard responsibilities are approved product scope, not independently verified screenshots or proof of release certification."
  },
  "elion-sales-command-centre": {
    "boundaries": "Organization data should remain isolated across browser, server API and database access. The implemented foundation is not the same as a deployed AI sales assistant.",
    "implementation": [
      {
        "title": "Trust boundaries",
        "detail": "Browser and Next.js BFF work through NestJS API services and restricted PostgreSQL records."
      },
      {
        "title": "Auditable edits",
        "detail": "Membership checks, idempotency and concurrency-aware property/campaign updates protect tenant data."
      }
    ],
    "verification": [
      {
        "area": "Foundation contracts",
        "state": "documented",
        "detail": "Source and build-state notes describe tenant isolation, API contracts and local verification."
      },
      {
        "area": "Hosted runtime",
        "state": "requires-verification",
        "detail": "Connected identity, roles and tenant acceptance remain open."
      },
      {
        "area": "AI messaging",
        "state": "planned",
        "detail": "Do not describe lead capture, conversation intelligence or WhatsApp as operational in this baseline."
      }
    ]
  },
  "security-workforce-operations": {
    "boundaries": "The staged security-operations system separates guard field inputs, supervisor and headquarters access, and server-side spatial decision logic. Raw GPS coordinates are uncertain evidence.",
    "implementation": [
      {
        "title": "Geospatial attendance",
        "detail": "PostGIS and role checks support site-based attendance logic; low-accuracy fixes must not be treated as trustworthy check-ins."
      },
      {
        "title": "Workforce operations",
        "detail": "Role-specific guard, supervisor, operations and HQ views are subject to assignment and organizational access rules."
      },
      {
        "title": "Field constraints",
        "detail": "Indoor GPS, stale location updates and simulated coordinates complicate device acceptance."
      }
    ],
    "verification": [
      {
        "area": "Staged source verification",
        "state": "documented",
        "detail": "Role, geospatial and browser test records exist in the private project."
      },
      {
        "area": "Real-device acceptance",
        "state": "requires-verification",
        "detail": "Connected HQ demonstrations and live field GPS behavior remain explicit gates."
      }
    ],
    "publicationNote": "No client identifier, guard identity, site coordinate or deployment hostname is shared."
  },
  "christ-heart-foundation": {
    "boundaries": "Public NGO information must remain separate from sensitive assistance submissions and privileged gallery management. Trust is enforced server-side and in the database.",
    "implementation": [
      {
        "title": "Private submissions",
        "detail": "Multiple form purposes share validation and controlled storage; visitors cannot read assistance records through the browser."
      },
      {
        "title": "Gallery permissions",
        "detail": "An administrator allowlist and PostgreSQL row-level policies constrain media writes. Browser-side image resizing limits mobile bandwidth."
      },
      {
        "title": "Responsible acknowledgements",
        "detail": "Confirmation templates avoid promising aid that has not been approved; privacy-sensitive error monitoring avoids leaking request content."
      }
    ],
    "verification": [
      {
        "area": "Public repository",
        "state": "documented",
        "detail": "The repository documents 61 security/content tests, an admin gallery and four form paths; this review did not rerun those tests."
      },
      {
        "area": "Operational services",
        "state": "requires-verification",
        "detail": "Verify current hosting, legal review and email/storage configuration independently."
      }
    ]
  },
  "elion-homes": {
    "boundaries": "A property website should communicate content and contact routes independently of video playback. The source is a design/release candidate with several external launch gates.",
    "implementation": [
      {
        "title": "Adaptive media",
        "detail": "Optimized hero footage, poster image and reduced-motion or Save-Data fallbacks make media optional."
      },
      {
        "title": "Responsive experience",
        "detail": "Navigation and editorial composition were tested across mobile and desktop; real-device acceptance needs revision-specific evidence."
      },
      {
        "title": "Conversion boundary",
        "detail": "Working phone/email links do not prove a stored and monitored lead-enquiry workflow."
      }
    ],
    "verification": [
      {
        "area": "Source and QA",
        "state": "documented",
        "detail": "November QA documents describe responsive behavior and media fallbacks."
      },
      {
        "area": "Public release",
        "state": "requires-verification",
        "detail": "Owner approval, verified domain, current device checks and enquiry acceptance were open at the dated readiness gate."
      }
    ],
    "publicationNote": "Only a constructed architecture illustration is reproduced; no client media is copied."
  },
  "foc-inc-operations": {
    "boundaries": "Events, staff assignments and briefs need a persistent source of truth that exists separately from notification delivery.",
    "implementation": [
      {
        "title": "Operational records",
        "detail": "Shared event and task contexts coordinate team activities."
      },
      {
        "title": "Communication",
        "detail": "Notifications are an integration responsibility; a provider failure should not erase the original staff action."
      }
    ],
    "verification": [
      {
        "area": "Operational purpose",
        "state": "documented",
        "detail": "Private project records describe coordination workflows."
      },
      {
        "area": "Quantified impact",
        "state": "requires-verification",
        "detail": "No unverified savings or revenue figures are included."
      }
    ]
  },
  "ai-job-scraper": {
    "boundaries": "The public Adzuna/Gemini teaching export and the privately operated multi-source edition are different evidence levels.",
    "implementation": [
      {
        "title": "Public source",
        "detail": "A 10-node workflow filters and deduplicates listings before requesting structured Gemini scoring and Telegram notification."
      },
      {
        "title": "Private edition",
        "detail": "The old portfolio screenshot shows seven named source branches connected in n8n and a historical Telegram alert sample. The current private source graph and dated run proof are still outstanding."
      }
    ],
    "verification": [
      {
        "area": "Public artifact",
        "state": "documented",
        "detail": "A historical Adzuna export and a separate single-RSS classroom example are reviewable."
      },
      {
        "area": "Current operations",
        "state": "requires-verification",
        "detail": "Current source graph, authenticated dated runs, source health and recent delivery receipts remain outstanding."
      }
    ]
  },
  "leadreach": {
    "boundaries": "Researched prospects, editable drafts and actual sent messages must remain separate, attributable states.",
    "implementation": [
      {
        "title": "Human review",
        "detail": "Source provenance and suppression must be preserved across research and outreach choices."
      }
    ],
    "verification": [
      {
        "area": "Owner-local pilot",
        "state": "documented",
        "detail": "The repository reports a local first-user milestone."
      },
      {
        "area": "SaaS adoption",
        "state": "requires-verification",
        "detail": "No verified public multi-tenant customers or live outreach totals."
      }
    ]
  },
  "b2b-revenue-engine": {
    "boundaries": "Candidate research, source-backed qualification and marketer call results are related but distinct records.",
    "implementation": [
      {
        "title": "Source-aware ranking",
        "detail": "Keep evidence and score separate from contacted/converted status."
      }
    ],
    "verification": [
      {
        "area": "Architecture",
        "state": "documented",
        "detail": "The portfolio has historical descriptions of research and follow-up flows."
      },
      {
        "area": "Hosted status",
        "state": "requires-verification",
        "detail": "Production certification and commercial impact need independently reviewed data."
      }
    ]
  }
};
