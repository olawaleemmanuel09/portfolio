import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "cefa",
    title: "CEFA cohort platform",
    client: "FOC programme operations",
    status: "production",
    statusLabel: "Production programme",
    period: "Reviewed November 2026",
    summary: "A learning operations platform connecting student access, group-scoped conversations, assignment submission, staff review and announcements. The central challenge is protecting group boundaries while maintaining reliable sessions during backend interruptions.",
    stack: [
      "Supabase Auth",
      "PostgreSQL",
      "Realtime",
      "JavaScript"
    ],
    featured: true,
    order: 1,
    problem: [
      "A single programme needs shared announcements and private group conversations. A student joining one group must only see the discussions and assignments intended for that group."
    ],
    approach: [
      {
        title: "From enrolment to review",
        body: "An enrolment links a student identity to a group. Database access policies use that membership when the student reads messages or submits an assignment. Staff review submissions with separate permissions."
      },
      {
        title: "Recovering from interrupted sessions",
        body: "A temporary role lookup failure could send a signed-in user back to login. The reliability changes distinguish an unavailable database from an invalid session, coalesce overlapping requests and pause unnecessary background refreshes."
      }
    ],
    outcome: [
      "The November onboarding record documents student activation. Nine transactional chat checks covered group access and rolled back their writes. Those tests measure permissions. Peak concurrent capacity and deployment of each recovery change need separate verification."
    ],
    decision: {
      title: "A failed lookup is not a revoked session",
      body: "After a November availability incident, source-level fixes distinguished temporary infrastructure failure from loss of authorization and reduced overlapping refreshes. Their successful deployment and live-load behavior require separate verification."
    },
    media: [{
      src: "/architecture/cefa-learning-operations.svg",
      alt: "Architecture system map derived from documented implementation boundaries.",
      caption: "Architecture summary; not a live dashboard screenshot.",
      type: "image",
      aspect: "wide"
    }],
    preview: "/architecture/cefa-learning-operations.svg"
  },
  {
    slug: "whatsapp-ordering-system",
    title: "AI-Assisted Restaurant Ordering on WhatsApp",
    client: "Three-branch restaurant (anonymized)",
    status: "production",
    statusLabel: "Production ordering",
    period: "Reviewed November 2026",
    summary: "A historical operating channel translating customer messages into branch-specific orders, checking authoritative menu prices and passing staff-verified transfers to the kitchen.",
    stack: [
      "n8n",
      "Twilio",
      "Google Sheets",
      "Telegram"
    ],
    featured: false,
    order: 2,
    problem: [
      "Staff need an order total they can verify against the branch menu, even when a customer types a request informally."
    ],
    approach: [
      {
        title: "Interpret the request",
        body: "A model extracts items from the message. The ordering workflow tracks the conversation and checks prices against the branch menu."
      },
      {
        title: "Confirm the payment",
        body: "A staff member confirms receipt of the transfer. The order record carries the reference across the payment and kitchen handoff."
      }
    ],
    outcome: [
      "The operating handover documents manual transfer confirmation. Order volumes and payment totals are private."
    ],
    decision: {
      title: "The model never sets the final bill",
      body: "AI interprets a message, while branch menus, order totals and staff payment confirmation remain authoritative. Idempotency and branch checks matter more than conversational fluency."
    },
    media: [{
      src: "/architecture/restaurant-conversation.svg",
      alt: "Architecture system map derived from documented implementation boundaries.",
      caption: "Architecture summary; not a live dashboard screenshot.",
      type: "image",
      aspect: "wide"
    }],
    preview: "/architecture/restaurant-conversation.svg"
  },
  {
    slug: "web-ordering-and-payments",
    title: "Three-Branch Restaurant Operations Platform",
    client: "Three-branch restaurant (anonymized)",
    status: "staging",
    statusLabel: "Dashboard and payment release candidate",
    period: "Reviewed November 2026",
    summary: "Web ordering with a management oversight layer, branch-manager operations, kitchen preparation and an accountant-led reconciliation scope. New payment and dashboard certification are not established by the historically live ordering workflow.",
    stack: [
      "n8n",
      "Supabase",
      "Monnify"
    ],
    featured: true,
    order: 3,
    problem: [
      "A web customer may never have opened a WhatsApp conversation. The order must carry enough information for payment on its own."
    ],
    approach: [
      {
        title: "Keep the instructions with the order",
        body: "The original web flow displays branch details, amount and reference on the payment page. Staff confirm transfers in Telegram."
      },
      {
        title: "Scope the rebuild",
        body: "The Ride candidate separates menu, order and reconciliation records. Management kept dispatch manual for the launch scope."
      }
    ],
    outcome: [
      "The earlier system took real orders. Live-money gateway activation and owner acceptance for Ride remain outstanding."
    ],
    decision: {
      title: "Keep financial decisions and delivery responsibilities explicit",
      body: "Management oversees branches, managers operate within a branch, kitchen acts on authorized orders, and accountants reconcile payment exceptions. Manual dispatch remains approved; no rider or dispatcher dashboard or automatic delivery fee belongs to this release."
    },
    media: [{
      src: "/architecture/restaurant-operations.svg",
      alt: "Architecture system map derived from documented implementation boundaries.",
      caption: "Architecture summary; not a live dashboard screenshot.",
      type: "image",
      aspect: "wide"
    }],
    preview: "/architecture/restaurant-operations.svg"
  },
  {
    slug: "elion-sales-command-centre",
    title: "Elion Sales Command Centre",
    client: "Real estate operations",
    status: "staging",
    statusLabel: "Hosted acceptance pending",
    period: "Reviewed November 2026",
    summary: "A tenant-isolated sales operations foundation using API boundaries, restricted data access, auditability and transaction-aware property and campaign updates; hosted release and AI messaging integrations remain unverified.",
    stack: [
      "TypeScript",
      "Next.js",
      "NestJS",
      "PostgreSQL"
    ],
    featured: true,
    order: 4,
    problem: [
      "Sales staff need to update shared records without crossing organisation boundaries or overwriting another person’s changes."
    ],
    approach: [
      {
        title: "Protect the organisation boundary",
        body: "The application checks organisation membership, uses restricted database roles and applies row-level access policies."
      },
      {
        title: "Make edits traceable",
        body: "Property and campaign endpoints use audit events, concurrency checks and idempotency to keep updates traceable."
      }
    ],
    outcome: [
      "The local contracts are documented. Hosted runtime login and user acceptance remain open. WhatsApp integration and AI qualification are future work."
    ],
    decision: {
      title: "Permissions cannot live only in the interface",
      body: "Membership checks, restricted database roles and auditable writes provide stronger organizational separation than a client-side list filter. Current hosted acceptance is distinct from local contract tests."
    },
    media: [{
      src: "/architecture/crm-tenant-foundation.svg",
      alt: "Architecture system map derived from documented implementation boundaries.",
      caption: "Architecture summary; not a live dashboard screenshot.",
      type: "image",
      aspect: "wide"
    }],
    preview: "/architecture/crm-tenant-foundation.svg"
  },
  {
    slug: "security-workforce-operations",
    title: "Security Workforce & Operations Management Platform",
    client: "Security company (anonymized)",
    status: "staging",
    statusLabel: "Staged demo",
    period: "Reviewed November 2026",
    summary: "A staged guard, supervisor, operations and HQ platform using geospatial attendance checks and permission-based records. Indoor GPS uncertainty and real-device field acceptance remain open.",
    stack: [
      "TypeScript",
      "Supabase",
      "PostGIS"
    ],
    featured: true,
    order: 5,
    problem: [
      "Indoor GPS readings can be noisy. A phone reporting a coordinate is only one input to an attendance decision."
    ],
    approach: [
      {
        title: "Evaluate the location on the server",
        body: "The service checks the reported location against the configured site boundary. Role-specific views separate guard, supervisor and headquarters tasks."
      },
      {
        title: "Keep an audit trail",
        body: "Durable event records let downstream automation follow the decision and preserve its context."
      }
    ],
    outcome: [
      "The delivery manifest marks deployment pending. Real-device GPS and connected hosted acceptance remain review gates."
    ],
    decision: {
      title: "A coordinate is not proof of attendance",
      body: "A phone's reported position has uncertainty; site boundaries, GPS accuracy, shift context and server-side authorization must be considered. Synthetic-location success does not certify real field conditions."
    },
    media: [{
      src: "/architecture/security-operations.svg",
      alt: "Architecture system map derived from documented implementation boundaries.",
      caption: "Architecture summary; not a live dashboard screenshot.",
      type: "image",
      aspect: "wide"
    }],
    preview: "/architecture/security-operations.svg"
  },
  {
    slug: "b2b-revenue-engine",
    title: "Prospect Intelligence for a Restaurant Group",
    client: "Three-branch restaurant (anonymized)",
    status: "prototype",
    statusLabel: "Certification pending",
    period: "Reviewed November 2026",
    summary: "A sourced business-research and marketer follow-up design intended to prioritize candidates and record call outcomes. Hosted certification and attributable conversion remain unverified.",
    stack: [
      "PostgreSQL",
      "n8n",
      "Telegram"
    ],
    featured: false,
    order: 6,
    problem: [
      "A long list of candidate businesses leaves a marketer to repeat the same research before every call."
    ],
    approach: [
      {
        title: "Rank the research",
        body: "The design records candidate sources, removes duplicates and separates qualification signals from the final ranking."
      },
      {
        title: "Feed outcomes back",
        body: "Call outcomes and follow-up tasks inform the next research brief."
      }
    ],
    outcome: [
      "The earlier portfolio documents the sales brief. Current hosted operation and revenue attributable to this work await verification."
    ],
    decision: {
      title: "Research is not a customer acquisition result",
      body: "Candidate sources, prioritization signals and recorded conversations are distinct records. Do not conflate collected prospects with verified contact permission or won sales."
    },
    media: []
  },
  {
    slug: "elion-homes",
    title: "Elion Homes — Responsive Property Website",
    client: "Property discovery",
    status: "staging",
    statusLabel: "Release candidate",
    period: "Reviewed November 2026",
    summary: "A mobile-first property website release candidate combining editorial content, responsive navigation, optimized video, static media fallbacks and direct contact paths. Public launch awaits the documented approvals.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    featured: true,
    order: 7,
    problem: [
      "Prospective buyers may browse on a phone with a slow connection. Property information and contact details need to work before video finishes loading."
    ],
    approach: [
      {
        title: "Start with the page",
        body: "Semantic HTML carries the content and contact options. JavaScript progressively enhances navigation and motion."
      },
      {
        title: "Keep media optional",
        body: "Responsive images and a video fallback accommodate reduced-motion and data-saving preferences."
      }
    ],
    outcome: [
      "The source records design approval and production SEO changes. The readiness documents retain hosting and domain gates. Public launch status needs confirmation."
    ],
    decision: {
      title: "The page must work without video",
      body: "Network, Save-Data, reduced-motion and low-memory fallbacks keep content and contact actions usable. Video polish does not substitute for verified domain, SEO and lead-intake readiness."
    },
    media: [{
      src: "/architecture/property-website.svg",
      alt: "Architecture system map derived from documented implementation boundaries.",
      caption: "Architecture summary; not a live dashboard screenshot.",
      type: "image",
      aspect: "wide"
    }],
    preview: "/architecture/property-website.svg"
  },
  {
    slug: "leadreach",
    title: "LeadReach",
    client: "Independent product",
    status: "prototype",
    statusLabel: "Owner pilot",
    period: "Reviewed November 2026",
    summary: "A source-aware research and outreach workspace with human-reviewed message drafts and an owner-local pilot. The repository does not establish public SaaS adoption.",
    stack: [
      "Python",
      "FastAPI",
      "SQLite"
    ],
    featured: false,
    order: 8,
    problem: [
      "A researcher needs to distinguish a sourced contact, a draft and an actual conversation."
    ],
    approach: [
      {
        title: "Capture provenance",
        body: "Campaign records retain research sources and support suppression and opt-outs."
      },
      {
        title: "Keep the operator in control",
        body: "Drafts are editable and the operator confirms activity before it counts as sent."
      }
    ],
    outcome: [
      "The first-user milestone describes a local package. The repository documents a pilot. Customer adoption has yet to be measured."
    ],
    decision: {
      title: "A draft is not a sent message",
      body: "Provenance, editing, suppression and actual delivery need separate state; synthetic tests are not proof of customer outreach volume."
    },
    media: []
  },
  {
    slug: "foc-inc-operations",
    title: "FOC Command Centre",
    client: "Event operations",
    status: "production",
    statusLabel: "Operations platform",
    period: "Reviewed November 2026",
    summary: "An event and team operations workspace connecting assignments, briefs, notifications and shared organizational work; it supplies context for the separate learning programme.",
    stack: [
      "PostgreSQL",
      "Supabase",
      "n8n"
    ],
    featured: false,
    order: 9,
    problem: [
      "An event brief in chat is hard to find when several projects share the same date."
    ],
    approach: [
      {
        title: "Link the work",
        body: "A shared event record ties project assignments to briefs and files."
      },
      {
        title: "Queue reminders",
        body: "The application records a notification for later delivery so a provider failure can be handled separately from the staff action."
      }
    ],
    outcome: [
      "The command centre provides the operating context for CEFA. Outcomes are described at the workflow level."
    ],
    decision: {
      title: "Keep the operating record durable",
      body: "An internal task or event cannot depend on whether an email or push message reaches the recipient; delivery failures should remain recoverable and observable."
    },
    media: [{
      src: "/architecture/foc-operations.svg",
      alt: "Architecture system map derived from documented implementation boundaries.",
      caption: "Architecture summary; not a live dashboard screenshot.",
      type: "image",
      aspect: "wide"
    }],
    preview: "/architecture/foc-operations.svg"
  },
  {
    slug: "ai-job-scraper",
    title: "AI Job Intelligence & Alerts",
    client: "Personal operational system",
    status: "personal",
    statusLabel: "Private system · public teaching export",
    period: "Reviewed November 2026",
    summary: "A private seven-source job discovery operation reported by the owner, with Telegram notifications. The public evidence verifies an older Adzuna/Gemini export; the current private sources and executions await independent verification.",
    stack: [
      "n8n",
      "Adzuna",
      "Gemini",
      "Telegram"
    ],
    featured: false,
    order: 10,
    problem: [
      "Reviewing several job boards by hand means reading duplicate listings and repeatedly deciding whether a role fits."
    ],
    approach: [
      {
        title: "Inspect the public path",
        body: "In the 10-node export, a scheduled request collects Adzuna results. Subsequent nodes filter roles, remove seen jobs, request a Gemini score and send strong matches to Telegram."
      },
      {
        title: "A second teaching example",
        body: "A separate seven-node classroom exercise reads one We Work Remotely RSS feed. Its archived graph shows filtering, duplicate removal, Gemini and Telegram. The archive contains the structure only."
      },
      {
        title: "Verify the editions separately",
        body: "The public JSON is saved inactive. Independent verification of the private edition requires a redacted current graph and dated run record."
      }
    ],
    outcome: [
      "Seven-source operation is owner-reported. The public artifact verifies the earlier graph and does not establish private source availability or scoring accuracy."
    ],
    decision: {
      title: "Filter before calling the model",
      body: "The teaching workflow filters and deduplicates job listings before structured Gemini scoring, reducing unnecessary model calls. It does not independently establish seven live source integrations."
    },
    media: [{
      src: "/architecture/job-intelligence.svg",
      alt: "Architecture system map derived from documented implementation boundaries.",
      caption: "Architecture summary; not a live dashboard screenshot.",
      type: "image",
      aspect: "wide"
    }],
    preview: "/architecture/job-intelligence.svg",
    repo: "https://github.com/olawaleemmanuel09/ai-job-alert-system"
  },
  {
    slug: "lead-capture-crm-sync",
    title: "Lead Capture & CRM Sync",
    client: "Integration demo",
    status: "delivered",
    statusLabel: "Public workflow",
    period: "Reviewed November 2026",
    summary: "A Tally enquiry becomes a HubSpot contact with an acknowledgement, a team notification and a reporting row.",
    stack: [
      "n8n",
      "HubSpot",
      "Tally"
    ],
    featured: false,
    order: 11,
    problem: [
      "A sales handoff spans several destinations that can succeed or fail independently."
    ],
    approach: [
      {
        title: "Inspect the eight nodes",
        body: "The graph parses form fields, validates email and upserts the contact. Gmail, Slack and Sheets handle the downstream handoff."
      }
    ],
    outcome: [
      "The export establishes the integration design. Delivery latency and conversion impact require monitored runs."
    ],
    decision: {
      title: "A CRM write and a notification are different outcomes",
      body: "The form payload is normalized before the HubSpot upsert, but Gmail, Slack and Sheets can fail independently. A reliable production extension would track a persistent handoff, retries and reconciliation rather than promise zero missed leads from an export."
    },
    media: [],
    repo: "https://github.com/olawaleemmanuel09/lead-capture-crm-sync"
  },
  {
    slug: "smartbook-ai",
    title: "SmartBook AI",
    client: "Axia Africa capstone",
    status: "capstone",
    statusLabel: "Open-source capstone",
    period: "Reviewed November 2026",
    summary: "An appointment workflow coordinates booking intake, reminders, cancellation and feedback.",
    stack: [
      "n8n",
      "Supabase",
      "Twilio"
    ],
    featured: false,
    order: 12,
    problem: [
      "A reminder must follow the current booking state even after the customer changes plans."
    ],
    approach: [
      {
        title: "Trace the lifecycle",
        body: "The 24-node export validates bookings, persists records, checks reminder windows and records which reminders were sent."
      }
    ],
    outcome: [
      "The export contains a high-risk branch. Reproducing the proposed model inference requires a separate service."
    ],
    decision: {
      title: "A reminder flag is not an exactly-once guarantee",
      body: "The 24-node workflow represents booking, cancellation, reminder and feedback lifecycles. Concurrent executions and downstream provider failures still require idempotent claiming and delivery logs. A trained no-show predictor is not contained in the public export."
    },
    media: [],
    repo: "https://github.com/olawaleemmanuel09/smartbook-ai-automation"
  },
  {
    slug: "lead-intelligence-pipeline",
    title: "Lead Intelligence Pipeline",
    client: "Research demo",
    status: "delivered",
    statusLabel: "Open-source workflow",
    period: "Reviewed November 2026",
    summary: "Claude identifies business signals and JavaScript computes a repeatable ranking from those signals.",
    stack: [
      "n8n",
      "Claude",
      "Apify"
    ],
    featured: false,
    order: 13,
    problem: [
      "A researcher needs reasons to investigate a candidate before making contact."
    ],
    approach: [
      {
        title: "Separate assessment from ranking",
        body: "The 19-node export collects Maps candidates, checks existing records and inspects website signals. A code step weights the model assessment before high-value alerts go to Telegram."
      }
    ],
    outcome: [
      "The output is a research shortlist. Contact and conversion require separate evidence."
    ],
    decision: {
      title: "AI identifies signals; code computes the ranking",
      body: "Keeping the weighted final score in deterministic JavaScript makes the model's extracted business signals inspectable and ranking criteria repeatable. Prospect research remains distinct from consent, outreach and conversion."
    },
    media: [],
    repo: "https://github.com/olawaleemmanuel09/lead-intelligence-pipeline"
  },
  {
    slug: "voice-booking-agent",
    title: "Voice Booking Agent",
    client: "Voice interaction lab",
    status: "prototype",
    statusLabel: "Prototype",
    period: "Reviewed November 2026",
    summary: "A voice booking exercise explores when an assistant can safely confirm a reservation.",
    stack: [
      "ElevenLabs",
      "n8n"
    ],
    featured: false,
    order: 14,
    problem: [
      "A caller can hear a successful reply even if persistence fails."
    ],
    approach: [
      {
        title: "Separate the response paths",
        body: "The prototype design reads the booking back and branches on the result of the record write."
      }
    ],
    outcome: [
      "A sanitized export and repeatable call test are pending."
    ],
    decision: {
      title: "A spoken confirmation must follow the committed record",
      body: "An assistant can sound confident while a booking write has failed. The prototype should verify storage success before reading back a confirmed reservation. Reproducible public call/export evidence is still pending."
    },
    media: []
  },
  {
    slug: "christ-heart-foundation",
    title: "Christ Heart Empowerment Foundation — Digital Platform",
    client: "Christ Heart Empowerment Foundation",
    status: "delivered",
    statusLabel: "Delivered website",
    period: "Reviewed November 2026",
    summary: "A privacy-sensitive nonprofit application combining public programmes, an admin gallery, validated forms and restricted database access. Its public repository documents 61 tests focused on security and content correctness.",
    stack: [
      "TypeScript",
      "Next.js"
    ],
    featured: true,
    order: 15,
    problem: [
      "Visitors need to find the correct form for the programme they want."
    ],
    approach: [
      {
        title: "Route the enquiry",
        body: "Purpose-specific forms help visitors provide relevant information and staff identify the enquiry type."
      }
    ],
    outcome: [
      "Public client assets and current deployment details are withheld pending clearance."
    ],
    decision: {
      title: "Never promise assistance that has not been approved",
      body: "Assistance enquiries are sensitive. Backend validation, restricted submission access and truthful acknowledgement wording matter more than form completion visuals; gallery permissions are enforced at the database boundary."
    },
    media: [{
      src: "/architecture/foundation-platform.svg",
      alt: "Architecture system map derived from documented implementation boundaries.",
      caption: "Architecture summary; not a live dashboard screenshot.",
      type: "image",
      aspect: "wide"
    }],
    preview: "/architecture/foundation-platform.svg",
    repo: "https://github.com/olawaleemmanuel09/Christ-Heart-Empowerment-Foundation"
  },
  {
    slug: "academy-platform",
    title: "Academy platform",
    client: "Teaching practice",
    status: "delivered",
    statusLabel: "Teaching platform",
    period: "Reviewed November 2026",
    summary: "A cohort workspace supports assignment submission and grading for practical automation courses.",
    stack: [
      "Supabase",
      "n8n"
    ],
    featured: false,
    order: 16,
    problem: [
      "Students and instructors need a common record of assignments and feedback."
    ],
    approach: [
      {
        title: "Connect the handoff",
        body: "The platform links enrolment, weekly tasks, submissions and review."
      }
    ],
    outcome: [
      "Teaching work is presented separately from commercial case studies."
    ],
    decision: {
      title: "Student submissions need a trustworthy review state",
      body: "A cohort learning workflow must distinguish an uploaded or submitted assignment from a teacher's review and recorded feedback. Implementation details beyond the existing source and screenshots require further verification."
    },
    media: []
  }
];

export const featured = projects.filter((project) => project.featured);
export const others = projects.filter((project) => !project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
