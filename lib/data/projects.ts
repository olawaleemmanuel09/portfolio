import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "cefa",
    title: "CEFA cohort platform",
    client: "FOC programme operations",
    status: "production",
    statusLabel: "Production programme",
    period: "Reviewed November 2026",
    summary: "Students activate an account, enter their assigned group and submit work. Staff review assignments and publish programme updates without mixing announcements into student chat.",
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
    media: []
  },
  {
    slug: "whatsapp-ordering-system",
    title: "Restaurant ordering on WhatsApp",
    client: "Multi-branch restaurant",
    status: "production",
    statusLabel: "Production ordering",
    period: "Reviewed November 2026",
    summary: "Customers order in chat and staff confirm the bank transfer before the kitchen fulfils the order. The October handover records real trading on this platform.",
    stack: [
      "n8n",
      "Twilio",
      "Google Sheets",
      "Telegram"
    ],
    featured: true,
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
    media: []
  },
  {
    slug: "web-ordering-and-payments",
    title: "Web ordering and Amala Ride",
    client: "Restaurant operations",
    status: "build",
    statusLabel: "Live predecessor · rebuild in staging",
    period: "Reviewed November 2026",
    summary: "Web customers can read their total and payment instructions in the browser. Amala Ride extends the design into separate cashier and kitchen workflows.",
    stack: [
      "n8n",
      "Supabase",
      "Monnify"
    ],
    featured: false,
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
    media: []
  },
  {
    slug: "elion-sales-command-centre",
    title: "Elion Sales Command Centre",
    client: "Real estate operations",
    status: "build",
    statusLabel: "Hosted acceptance pending",
    period: "Reviewed November 2026",
    summary: "The foundation of a shared sales workspace gives each organisation control over its property and campaign records.",
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
    media: []
  },
  {
    slug: "securepoint",
    title: "SecurePoint field operations",
    client: "Security operations",
    status: "build",
    statusLabel: "Staged demo",
    period: "Reviewed November 2026",
    summary: "Supervisors need a defensible record of where a guard checked in and which events still need review.",
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
    media: []
  },
  {
    slug: "b2b-revenue-engine",
    title: "Amala Sky Prospect Intelligence",
    client: "Commercial prospect research",
    status: "build",
    statusLabel: "Certification pending",
    period: "Reviewed November 2026",
    summary: "A field marketer needs a short list of accounts worth investigating and a record of what happened on the last call.",
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
    media: []
  },
  {
    slug: "elion-homes",
    title: "Elion Homes website",
    client: "Property discovery",
    status: "build",
    statusLabel: "Release candidate",
    period: "Reviewed November 2026",
    summary: "A lightweight property website gives buyers a direct path from an estate overview to a call, text or email enquiry.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    featured: false,
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
    media: []
  },
  {
    slug: "leadreach",
    title: "LeadReach",
    client: "Independent product",
    status: "build",
    statusLabel: "Owner pilot",
    period: "Reviewed November 2026",
    summary: "A local research workspace helps one operator trace a buyer record to its source, prepare a draft and log a follow-up.",
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
      "The first-user milestone describes a local package. The repository documents a pilot; no public customer adoption is claimed."
    ],
    media: []
  },
  {
    slug: "foc-inc-operations",
    title: "FOC Command Centre",
    client: "Event operations",
    status: "production",
    statusLabel: "Operations platform",
    period: "Reviewed November 2026",
    summary: "Staff coordinate event dates, brand projects, tasks and briefs across Lagos and Abuja. CEFA shares the broader organisational context.",
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
    media: []
  },
  {
    slug: "ai-job-scraper",
    title: "AI Job Intelligence & Alerts",
    client: "Personal operational system",
    status: "build",
    statusLabel: "Private system · public teaching export",
    period: "Reviewed November 2026",
    summary: "I run a seven-source job discovery system privately. The public teaching edition shows how a single Adzuna feed becomes a ranked Telegram shortlist.",
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
        title: "Verify the editions separately",
        body: "The public JSON is saved inactive. Independent verification of the private edition requires a redacted current graph and dated run record."
      }
    ],
    outcome: [
      "Seven-source operation is owner-reported. The public artifact verifies the earlier graph and does not establish private source availability or scoring accuracy."
    ],
    media: [],
    repo: "https://github.com/olawaleemmanuel09/ai-job-alert-system"
  },
  {
    slug: "lead-capture-crm-sync",
    title: "Lead Capture & CRM Sync",
    client: "Integration demo",
    status: "build",
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
    media: [],
    repo: "https://github.com/olawaleemmanuel09/smartbook-ai-automation"
  },
  {
    slug: "lead-intelligence-pipeline",
    title: "Lead Intelligence Pipeline",
    client: "Research demo",
    status: "build",
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
    media: [],
    repo: "https://github.com/olawaleemmanuel09/lead-intelligence-pipeline"
  },
  {
    slug: "voice-booking-agent",
    title: "Voice Booking Agent",
    client: "Voice interaction lab",
    status: "build",
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
    media: []
  },
  {
    slug: "christ-heart-foundation",
    title: "Foundation website",
    client: "Foundation communications",
    status: "build",
    statusLabel: "Delivered website",
    period: "Reviewed November 2026",
    summary: "A foundation website brings programme information and enquiry forms together.",
    stack: [
      "TypeScript",
      "Next.js"
    ],
    featured: false,
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
    media: []
  },
  {
    slug: "academy-platform",
    title: "Academy platform",
    client: "Teaching practice",
    status: "build",
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
    media: []
  }
];

export const featured = projects.filter((project) => project.featured);
export const others = projects.filter((project) => !project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
