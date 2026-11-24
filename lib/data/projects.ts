import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "cefa",
    title: "CEFA cohort platform",
    client: "FOC programme operations",
    status: "production",
    statusLabel: "Production programme",
    period: "Reviewed November 2026",
    summary: "A learning programme that replaces scattered spreadsheets and group updates with one reliable student experience. On November 24, 2026, the live database recorded 127 onboarded students, 10 learning groups and 113 non-deleted group-chat messages.",
    stack: [
      "Supabase Auth",
      "PostgreSQL",
      "Realtime",
      "JavaScript"
    ],
    featured: true,
    order: 1,
    problem: [
      "Running a training programme is more than sending course links. Staff need to enrol students, place them into the correct groups, collect assignments and answer questions without losing track of who is participating.",
      "When each class uses separate chats, spreadsheets and files, participants get confused and instructors spend time tracing messages instead of teaching. The platform needed to give every student one clear place to learn, talk to their group and submit work."
    ],
    approach: [
      {
        title: "Give every student one starting point",
        body: "After account activation, students can access the programme, their assigned group, learning resources and work submission. Staff manage assignments and review submitted work from their own permitted views."
      },
      {
        title: "Keep conversations organized and private",
        body: "Group membership is checked by the database, not only by a hidden menu. Students see the conversations intended for their group while programme-wide updates remain separate."
      },
      {
        title: "Keep learning usable when services are busy",
        body: "After an availability incident, recovery work focused on avoiding repeated requests and distinguishing a temporarily unavailable service from a truly invalid account session. Deployment under sustained load still requires separate acceptance."
      }
    ],
    outcome: [
      "Verified database snapshot, November 24, 2026: 127 active students with linked accounts and claimed invitations; 10 groups; 113 non-deleted group-chat messages. These are participation records, not performance or revenue estimates.",
      "Programme workflows cover enrolment, group communication and staff review. Permission tests exist; peak concurrent capacity and end-to-end recovery performance remain separate verification gates."
    ],
    decision: {
      title: "Reliable access matters more than extra features",
      body: "Students should not be locked out simply because the database is temporarily busy. Identity, group access and assignment records stay separate from notification delivery; the team can recover the experience without exposing another group's records."
    },
    metricsAsOf: "2026-11-24",
    metrics: [
      { value: "127", label: "Students onboarded" },
      { value: "10", label: "Learning groups" },
      { value: "113", label: "Group-chat messages" }
    ],
    media: [
      {
        "src": "/evidence/approved/learning-portal-sign-in.jpg",
        "alt": "Mobile FOC/CEFA sign-in interface with browser address and toolbars removed.",
        "caption": "Approved mobile sign-in capture, cropped to exclude the web address; no individual student's credentials or records are shown.",
        "type": "image",
        "aspect": "tall"
      },
      {
        "src": "/evidence/approved/learning-push-notifications.jpg",
        "alt": "Two CEFA push notifications visible on a phone lock screen.",
        "caption": "Approved historical push notification capture. Delivery to this device is demonstrated; this is not a platform-wide delivery rate.",
        "type": "image",
        "aspect": "wide"
      },
      {
        "src": "/evidence/approved/learning-portal-demo.mp4",
        "poster": "/evidence/approved/learning-portal-demo-poster.jpg",
        "alt": "CEFA student mobile screen recording navigating assignments, chats and updates.",
        "caption": "Sanitized 44-second portal walkthrough. The browser domain and later personal phone-share screens were removed; this does not establish concurrent users.",
        "type": "video",
        "aspect": "tall"
      },
      {
        "src": "/architecture/cefa-learning-operations.svg",
        "alt": "Conceptual architecture of onboarding, group membership, group chat and staff review.",
        "caption": "Conceptual architecture diagram. Not an application screenshot or deployment certification.",
        "type": "image",
        "aspect": "wide"
      }
    ],
    preview: "/evidence/approved/learning-portal-sign-in.jpg"
  },
  {
    slug: "whatsapp-ordering-system",
    title: "AI-Assisted Restaurant Ordering on WhatsApp",
    client: "Three-branch restaurant (anonymized)",
    status: "production",
    statusLabel: "Production ordering",
    period: "Reviewed November 2026",
    summary: "A three-branch restaurant was receiving more customer messages than staff could answer promptly. I built an AI-assisted WhatsApp order-taking flow to respond quickly, capture customer requests and connect each order to the correct branch and menu.",
    stack: [
      "n8n",
      "Twilio",
      "Google Sheets",
      "Telegram"
    ],
    featured: false,
    order: 2,
    problem: [
      "The restaurant was already selling through WhatsApp. Customers wanted fast answers about meals, prices, availability and delivery, but staff were busy handling multiple conversations and preparing orders.",
      "A slow or missed response meant someone could abandon an enquiry before placing an order. Management wanted technology to handle the repetitive first conversation without forcing customers to install another app."
    ],
    approach: [
      {
        title: "Respond where customers already are",
        body: "The ordering assistant receives incoming WhatsApp enquiries and guides customers through branch, meal choice, quantities and relevant order details, even when they type informally."
      },
      {
        title: "Turn messages into usable order records",
        body: "AI helps interpret what a customer wrote; a rules-based workflow checks the actual branch menu and price. It captures the customer context and passes structured order details for human review and fulfilment."
      },
      {
        title: "Hand over decisions that require people",
        body: "Staff remain responsible for transfer confirmation and resolving exceptions. Keeping the customer order, payment reference and kitchen handoff linked avoids treating the chatbot's wording as a source of financial truth."
      }
    ],
    outcome: [
      "The earlier operating handover documents a working order channel with staff-confirmed bank transfers. Current order volume, response-time improvement and sales impact have not been independently measured for publication."
    ],
    decision: {
      title: "Fast replies are useful only when the order is correct",
      body: "The AI handles conversation, but it does not invent prices, approve a payment or choose the branch on its own. The menu and recorded transaction state remain authoritative."
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
    summary: "As a three-branch restaurant expanded ordering beyond WhatsApp, management needed a clearer view of what each branch was receiving, preparing and reconciling. The rebuild connects a simple customer form to dedicated management, branch, kitchen and accountant responsibilities.",
    stack: [
      "n8n",
      "Supabase",
      "Monnify"
    ],
    featured: true,
    order: 3,
    problem: [
      "Taking a customer order is only the beginning. With three branches, an order can be missed between the customer, manager, kitchen and whoever checks the transfer. Management cannot solve those mistakes if everything lives in separate messages.",
      "The team also wanted customers to place orders without waiting for a WhatsApp conversation, while keeping delivery coordination manual during the first release."
    ],
    approach: [
      {
        title: "Make customer ordering straightforward",
        body: "A lightweight order form collects the branch, items and order details without repeating the website's food gallery. The customer receives clear next steps rather than a complicated checkout."
      },
      {
        title: "Give each team the right view",
        body: "Management needs cross-branch oversight. Branch managers need a branch-specific order queue. Kitchen staff need authorized preparation tickets. Accountants need references, transfer checks and an exception trail for reconciliation."
      },
      {
        title: "Keep the first release focused",
        body: "The agreed launch model leaves rider assignment and delivery charges to staff instead of building unnecessary dispatcher dashboards. Gateway and dashboard behavior require acceptance against the current release candidate."
      }
    ],
    outcome: [
      "The predecessor handled real customer ordering. The four-workspace dashboard model and manual delivery boundary are approved scope, but independent certification of the newer dashboard screens and live-money payment flow is still outstanding."
    ],
    decision: {
      title: "An order is not finished until the business can fulfil and account for it",
      body: "The system must preserve the same record as it moves from customer to kitchen to financial reconciliation. Separate role permissions prevent branch staff from relying on a shared, uncontrolled spreadsheet."
    },
    media: [
      {
        "src": "/evidence/approved/restaurant-branch-overview.jpg",
        "alt": "Anonymized historical branch dashboard with sales, order, kitchen and menu areas.",
        "caption": "Earlier staged branch dashboard with all sensitive branding removed; zero sales shown are test-period UI state, not an outcome metric.",
        "type": "image",
        "aspect": "wide"
      },
      {
        "src": "/evidence/approved/restaurant-menu-admin.jpg",
        "alt": "Anonymized menu administration table showing availability controls and food pricing.",
        "caption": "Historical staff menu-control screen, with client branding and an administrator identifier removed. Pricing is a screenshot example, not current live inventory.",
        "type": "image",
        "aspect": "wide"
      },
      {
        "src": "/architecture/restaurant-operations.svg",
        "alt": "Conceptual division between branch operations, kitchen and accountant reconciliation.",
        "caption": "Conceptual architecture diagram. Not an application screenshot or deployment certification.",
        "type": "image",
        "aspect": "wide"
      }
    ],
    preview: "/evidence/approved/restaurant-branch-overview.jpg"
  },
  {
    slug: "elion-sales-command-centre",
    title: "Elion Sales Command Centre",
    client: "Real estate operations",
    status: "staging",
    statusLabel: "Hosted acceptance pending",
    period: "Reviewed November 2026",
    summary: "A real-estate team needed to stop losing enquiries through slow WhatsApp replies and inconsistent follow-up. The Sales Command Centre is designed to capture leads, preserve customer/AI conversation history and let staff take over the same conversation using the business's existing number.",
    stack: [
      "TypeScript",
      "Next.js",
      "NestJS",
      "PostgreSQL"
    ],
    featured: true,
    order: 4,
    problem: [
      "Someone who asks about a property is often comparing several options. If the real-estate team replies hours later, forgets to follow up or loses the message in an agent's personal chat, a valuable enquiry can disappear.",
      "The CEO wanted the business to see customer conversations in one place, respond consistently even when agents are busy, and let a person step in when a buyer needs a human conversation—without asking the buyer to switch numbers."
    ],
    approach: [
      {
        title: "Give enquiries a reliable first response",
        body: "The planned AI WhatsApp assistant should answer approved property questions, capture the prospect's details and buying interests, and make the next follow-up visible to staff. It must not invent property facts or promise availability."
      },
      {
        title: "Put the whole conversation in the sales workspace",
        body: "The intended dashboard shows an authorized team the customer's messages, AI replies, interest and handoff status. Staff should be able to take ownership of the same WhatsApp thread and reply using the same business sender, preserving the complete history."
      },
      {
        title: "Build the dependable sales foundation first",
        body: "The checked-in product already has organization-scoped property/campaign data, controlled writes and audit boundaries. A live connected WhatsApp channel, complete AI-to-human takeover and hosted end-to-end acceptance remain product launch gates—not features I can certify from the repository alone."
      }
    ],
    outcome: [
      "The sales challenge and target workflow are clear: faster acknowledgement, recorded lead context and easier human follow-up. The property/campaign foundation is implemented, but repository sign-off still withholds production approval for connected AI messaging.",
      "Go-live prerequisites include business/provider documents, a compliant business WhatsApp sender, connection credentials, live conversation tests and final owner sign-off. I do not present staging records or planned takeover as proven production use."
    ],
    decision: {
      title: "The AI and the human must share one customer history",
      body: "A chatbot without a handoff is another silo. The design keeps the incoming message, automated response, lead record and human takeover tied to one authorized conversation. Staff—not the model—must control any sale, offer or sensitive customer decision."
    },
    media: [
      {
        "src": "/evidence/approved/real-estate-conversations.jpg",
        "alt": "Elion local-development conversation viewer showing test chat, AI response and takeover control.",
        "caption": "Development test conversation, synthetic phone masked. The 'Take over conversation' button demonstrates a UI affordance, not authenticated live WhatsApp production handoff.",
        "type": "image",
        "aspect": "wide"
      },
      {
        "src": "/evidence/approved/real-estate-sales-overview.jpg",
        "alt": "Elion Sales Command local-development operations overview with test lead and inspection queue.",
        "caption": "Staged overview showing synthetic test records. These do not represent real customer volumes or confirmed inspection bookings.",
        "type": "image",
        "aspect": "wide"
      },
      {
        "src": "/evidence/approved/real-estate-leads.jpg",
        "alt": "Elion local-development leads table with synthetic lead fields.",
        "caption": "Sample lead record and ranking interface; test phone masked. A displayed lead score is not proven sales conversion.",
        "type": "image",
        "aspect": "wide"
      },
      {
        "src": "/evidence/approved/real-estate-properties.jpg",
        "alt": "Elion local-development inventory table of sample properties.",
        "caption": "Sample real-estate inventory in local development, not verified public listings, prices or current availability.",
        "type": "image",
        "aspect": "wide"
      },
      {
        "src": "/architecture/crm-tenant-foundation.svg",
        "alt": "Conceptual scoped CRM data, conversation and human review architecture.",
        "caption": "Conceptual architecture diagram. Not an application screenshot or deployment certification.",
        "type": "image",
        "aspect": "wide"
      }
    ],
    preview: "/evidence/approved/real-estate-conversations.jpg"
  },
  {
    slug: "security-workforce-operations",
    title: "Security Workforce & Operations Management Platform",
    client: "Security company (anonymized)",
    status: "staging",
    statusLabel: "Staged demo",
    period: "Reviewed November 2026",
    summary: "A security-company CEO overseeing more than 1,000 guards needed a dependable view of attendance and activity across locations. I designed a guard-to-headquarters command centre to replace scattered WhatsApp check-ins with structured records, role-based views and location-aware verification.",
    stack: [
      "TypeScript",
      "Supabase",
      "PostGIS"
    ],
    featured: true,
    order: 5,
    problem: [
      "The client described the difficulty of supervising more than 1,000 guards across different posts. Headquarters could not practically call everyone to ask who had arrived, who had left, which supervisor was on duty or whether an incident needed attention.",
      "Attendance and operational updates sent through WhatsApp threads are difficult to reconcile. Messages get buried, a missed post can go unnoticed and management struggles to see one trustworthy picture across sites."
    ],
    approach: [
      {
        title: "Make each shift traceable",
        body: "A guard-facing interface is designed to record shift starts, clock-outs, site activity and incidents against the correct assignment, replacing informal WhatsApp attendance updates with structured operational events."
      },
      {
        title: "Give headquarters one command view",
        body: "Guards, supervisors, operations staff and headquarters have different responsibilities. Authorized dashboards are designed to show who is assigned where, which posts need attention and which events require escalation."
      },
      {
        title: "Check the location without trusting it blindly",
        body: "Server-side geofencing considers site boundaries, shift context and reported GPS accuracy. Indoor positioning and simulated coordinates can be unreliable, so real-device field testing remains necessary before attendance data is treated as fully certified."
      }
    ],
    outcome: [
      "The source contains staged roles, geospatial attendance controls and recorded security tests. The 1,000-plus guard figure describes the client's management challenge, not the number of guards currently onboarded to this platform.",
      "Connected headquarters demonstrations, mobile GPS acceptance and production operations certification remain launch gates."
    ],
    decision: {
      title: "A WhatsApp message is not an attendance record",
      body: "Headquarters needs a durable, permission-controlled timeline—not screenshots of a chat. The system must link each clock-in, clock-out and exception to the correct guard, shift and site before management relies on it."
    },
    media: [
      {
        "src": "/evidence/approved/security-hq-overview.jpg",
        "alt": "Anonymized security headquarters operations overview with incident, attendance and staffing panels.",
        "caption": "Staged operations dashboard with client branding obscured. Displayed sample guard and site totals are test records, not verified production adoption.",
        "type": "image",
        "aspect": "wide"
      },
      {
        "src": "/evidence/approved/security-guard-shift.jpg",
        "alt": "Anonymized guard field shift screen with scheduled clock-in button.",
        "caption": "Staged guard check-in interface; site and staff identifiers removed. A visible button does not establish accepted real-world GPS attendance.",
        "type": "image",
        "aspect": "wide"
      },
      {
        "src": "/architecture/security-operations.svg",
        "alt": "Conceptual headquarters-to-guard event and attendance architecture.",
        "caption": "Conceptual architecture diagram. Not an application screenshot or deployment certification.",
        "type": "image",
        "aspect": "wide"
      }
    ],
    preview: "/evidence/approved/security-hq-overview.jpg"
  },
  {
    slug: "b2b-revenue-engine",
    title: "Prospect Intelligence for a Restaurant Group",
    client: "Three-branch restaurant (anonymized)",
    status: "prototype",
    statusLabel: "Certification pending",
    period: "Reviewed November 2026",
    summary: "A restaurant group needed more repeat business from nearby offices and organizations, but its sales team lacked a consistent list of businesses worth contacting. The prospect-intelligence workflow finds candidates, assesses their fit and prepares call-ready research for marketers.",
    stack: [
      "PostgreSQL",
      "n8n",
      "Telegram"
    ],
    featured: false,
    order: 6,
    problem: [
      "Business customers such as offices and institutions can place repeat meal orders, but marketers cannot reach them efficiently if they first have to search online, guess which organizations are relevant and collect the same contact details again.",
      "Management wanted a repeatable prospecting process that could move beyond random cold calls: identify suitable organizations near each branch, explain why a lead may fit, assign outreach and record what happened after a call."
    ],
    approach: [
      {
        title: "Find and consolidate potential customers",
        body: "Automated research collects candidate organizations across relevant territories, stores traceable sources and removes repeated listings so each business can be assessed once."
      },
      {
        title: "Separate a discovered lead from a call-ready one",
        body: "The qualification flow checks the available business signals, scores the opportunity and prioritizes a marketer's list. A discovered business is not automatically a confirmed buyer or permission to contact someone."
      },
      {
        title: "Close the loop with sales outcomes",
        body: "Marketers record call dispositions, next steps and follow-ups. Management can distinguish raw prospects, qualified call candidates, outreach activity and actual opportunities without confusing the stages."
      }
    ],
    outcome: [
      "A historical report dated October 9, 2026 records 314 prospects discovered. That is a dated project result, not a verified current database total.",
      "The current live total and the number qualified for calls could not be authenticated from the connected databases. Both figures are withheld from the public metrics until a single authoritative snapshot is available."
    ],
    decision: {
      title: "A long lead list is not the same as a sales pipeline",
      body: "Qualification and call outcomes make research actionable. Keep prospect discovery, call readiness and won business as different stages so management can decide where to invest sales effort."
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
    summary: "After the real-estate company's previous website was disabled following a reported malware attack, its marketing materials were still directing prospects to a site they could not use. I developed a fast, mobile-first replacement so campaigns could point people back to clear property information and contact options.",
    stack: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    featured: true,
    order: 7,
    problem: [
      "The CEO faced an immediate business problem: the old company website had been taken offline after a malware incident, but existing campaign materials and customer links still directed people there.",
      "Every failed visit risked losing a customer who had already shown interest. The replacement needed to feel credible, show the properties and company clearly, load well on mobile connections and give visitors an obvious way to make contact."
    ],
    approach: [
      {
        title: "Restore a trustworthy digital destination",
        body: "I prioritized the essential public pages, property presentation, navigation and contact links. This was a business-continuity response, not an open-ended visual redesign."
      },
      {
        title: "Make the website usable on real phones",
        body: "Responsive layouts, optimized media, static image fallbacks and reduced-motion support keep the content readable even when a visitor's network cannot load a hero video."
      },
      {
        title: "Separate development from the public go-live",
        body: "The later release candidate includes additional enquiry-form and launch-security preparation. Domain connection, management-approved documents/privacy copy, backend intake and owner sign-off are still independent publication gates."
      }
    ],
    outcome: [
      "The replacement website and responsive QA have been developed as a release candidate. The source does not establish that every old campaign link was successfully restored or that the new website was publicly launched.",
      "The incident-driven objective was to give management a credible site ready for approval, not to claim recovered sales without analytics."
    ],
    decision: {
      title: "When campaign links lead nowhere, speed and clarity beat decoration",
      body: "A recovery website should load, explain the business and show customers how to contact the team before any animation runs. Security, verified domains and enquiry handling remain part of the launch decision."
    },
    media: [
      {
        "src": "/evidence/approved/real-estate-website-mobile.mp4",
        "poster": "/evidence/approved/real-estate-website-mobile-poster.jpg",
        "alt": "Short mobile screen recording of the Elion Homes website hero and About section.",
        "caption": "Sanitized historical mobile website demonstration. The video is click-to-play; it does not certify search rankings, uptime or recovered campaign traffic.",
        "type": "video",
        "aspect": "tall"
      },
      {
        "src": "/architecture/property-website.svg",
        "alt": "Conceptual website delivery and discovery architecture.",
        "caption": "Conceptual architecture diagram. Not an application screenshot or deployment certification.",
        "type": "image",
        "aspect": "wide"
      }
    ],
    preview: "/evidence/approved/real-estate-website-mobile-poster.jpg"
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
    summary: "An operations team needed one place to coordinate events, responsibilities and timely updates instead of relying on scattered chats and documents. The Command Centre connects staff work, shared briefs and notifications.",
    stack: [
      "PostgreSQL",
      "Supabase",
      "n8n"
    ],
    featured: false,
    order: 9,
    problem: [
      "When several people own parts of an event, instructions spread across messages, files and verbal updates. Staff lose time searching for the latest brief and managers cannot easily see who is responsible for the next task."
    ],
    approach: [
      {
        title: "Give work a shared record",
        body: "Event records, projects and assignments create a consistent reference for responsibilities, deadlines and associated documents."
      },
      {
        title: "Keep reminders separate from business records",
        body: "Notifications tell people that something needs attention, but the underlying event or task remains recorded even if an email or push notification is delayed."
      }
    ],
    outcome: [
      "The platform provides an operating home for team coordination and programme administration. Time saved and operating-cost improvements require measured before-and-after evidence."
    ],
    decision: {
      title: "A missed notification should not erase the work",
      body: "The record of an event, assigned task or submitted brief must exist independently of a message delivery service."
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
    summary: "An archived n8n screenshot shows seven job-source branches feeding deduplication, Gemini scoring and Telegram alerts. The public repository contains an older one-source teaching export; current private operations require separate verification.",
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
      "Archived screenshots document seven editor source branches and example Telegram alerts. They do not verify the current deployed graph, authenticated recent executions or scoring accuracy."
    ],
    decision: {
      title: "Filter before calling the model",
      body: "The teaching workflow filters and deduplicates job listings before structured Gemini scoring, reducing unnecessary model calls. It does not independently establish seven live source integrations."
    },
    media: [
      {
        src: "/evidence/job-intelligence-workflow.png",
        alt: "Archived screenshot of the multi-source n8n job alert workflow.",
        caption: "Archived n8n editor capture showing seven named intake branches, including RSS, before normalization, Gemini scoring and Telegram. Not proof of current connectivity.",
        type: "image",
        aspect: "wide"
      },
      {
        src: "/evidence/job-intelligence-telegram.jpg",
        alt: "Archived Telegram bot alert examples with job source and match ratings.",
        caption: "Archived example of notifications. Listings and scores reflect the captured run, not current opportunities.",
        type: "image",
        aspect: "tall"
      },
      {
        src: "/evidence/approved/job-alert-notifications.mp4",
        poster: "/evidence/approved/job-alert-notifications-poster.jpg",
        alt: "Historical Telegram notifications from the job-intelligence automation.",
        caption: "Sanitized earlier Telegram alert recording; source labels and scores are historical and do not establish current running integrations.",
        type: "video",
        aspect: "tall"
      },
      {
        src: "/architecture/job-intelligence.svg",
        alt: "Conceptual job discovery architecture diagram.",
        caption: "Conceptual map, not live execution evidence.",
        type: "image",
        aspect: "wide"
      }
    ],
    preview: "/evidence/job-intelligence-workflow.png",
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
    media: [
      {
        src: "/evidence/crm-capture-execution.png",
        alt: "Archived n8n successful execution showing Tally, HubSpot, Gmail, Slack and Google Sheets.",
        caption: "Historical successful demonstration. Delivery-service guarantees and customer adoption are not established.",
        type: "image",
        aspect: "wide"
      }
    ],
    preview: "/evidence/crm-capture-execution.png",
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
    media: [
      {
        src: "/evidence/smartbook-overview.png",
        alt: "Archived SmartBook n8n booking, cancellation and reminder workflow.",
        caption: "Capstone export overview; no standalone machine-learning inference service is bundled.",
        type: "image",
        aspect: "wide"
      },
      {
        src: "/evidence/smartbook-booking-path.png",
        alt: "SmartBook booking validation and confirmation branch.",
        caption: "Archived booking intake subflow; includes its error response path.",
        type: "image",
        aspect: "wide"
      },
      {
        src: "/evidence/smartbook-reminder-path.png",
        alt: "SmartBook scheduled email and SMS reminder flow.",
        caption: "Archived 24-hour and 2-hour reminder branches. Not proof of exactly-once delivery.",
        type: "image",
        aspect: "wide"
      }
    ],
    preview: "/evidence/smartbook-overview.png",
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
    media: [
      {
        src: "/evidence/voice-booking-handoff.png",
        alt: "Archived voice-booking webhook handoff to Google Sheets, Gmail and error paths.",
        caption: "Prototype workflow screenshot; a verified live voice-call test remains outstanding.",
        type: "image",
        aspect: "wide"
      }
    ],
    preview: "/evidence/voice-booking-handoff.png"
  },
  {
    slug: "christ-heart-foundation",
    title: "Christ Heart Empowerment Foundation — Digital Platform",
    client: "Christ Heart Empowerment Foundation",
    status: "delivered",
    statusLabel: "Delivered website",
    period: "Reviewed November 2026",
    summary: "A nonprofit needed a professional place to explain its programmes, receive the right kinds of enquiries and manage public updates without exposing sensitive requests for assistance.",
    stack: [
      "TypeScript",
      "Next.js"
    ],
    featured: true,
    order: 15,
    problem: [
      "People approach a foundation for different reasons: they may want to understand its work, request help, volunteer or support a programme. A single informal inbox makes it harder for staff to route each enquiry appropriately.",
      "Information about someone requesting assistance may be sensitive. The website needed to build trust without publishing private form responses or implying aid had been approved before a staff review."
    ],
    approach: [
      {
        title: "Make the mission and next steps easy to understand",
        body: "Public pages explain programmes and provide purpose-specific calls to action so visitors know where to go and what information to share."
      },
      {
        title: "Capture and protect each enquiry",
        body: "Validated forms and protected storage keep request details away from public browsing, while acknowledgements confirm receipt without making unapproved promises."
      },
      {
        title: "Give staff a controlled way to maintain the site",
        body: "An administrator-managed gallery allows approved updates, with write permissions enforced by database policies and small images designed to load well on mobile."
      }
    ],
    outcome: [
      "The public repository documents a delivered nonprofit platform and 61 security/content tests. Those documented tests do not prove donation totals or beneficiary outcomes, and private request content is not shown in this portfolio."
    ],
    decision: {
      title: "A responsible form should protect the person behind it",
      body: "Treat assistance requests as confidential service enquiries, not promotional material. Staff approval, safe database access and honest acknowledgement copy matter as much as visual design."
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
    media: [
      {
        src: "/evidence/academy-student-view.png",
        alt: "Archived student dashboard showing Academy sessions, materials and calendar.",
        caption: "Earlier Academy interface with the owner's personal test profile; not a CEFA production student screenshot.",
        type: "image",
        aspect: "wide"
      },
      {
        src: "/evidence/academy-onboarding-flow.png",
        alt: "Archived Academy onboarding n8n pipeline for student records and welcome email.",
        caption: "Archived student-onboarding automation, distinct from the separate CEFA programme.",
        type: "image",
        aspect: "wide"
      }
    ],
    preview: "/evidence/academy-student-view.png"
  },
  {
    slug: "leadreach-prospect-intelligence",
    title: "LeadReach — Prospect Discovery and Sales Readiness",
    client: "Independent lead-intelligence product",
    status: "prototype",
    statusLabel: "Private research pipeline · evidence review",
    period: "Owner progress report, November 2026",
    summary: "LeadReach is an independent prospect-discovery effort. The owner reports 50,000 prospects discovered; the current live database and number qualified for calls are not yet independently verified.",
    stack: ["n8n", "API integrations", "Data qualification"],
    featured: false,
    order: 17,
    problem: [
      "Teams can spend more time searching for potential customers than evaluating their fit or starting useful conversations.",
      "A long list alone does not tell a marketer who is ready to call, what information is missing, or which lead was already contacted."
    ],
    approach: [
      { title: "Separate discovery from qualification", body: "Research and intake assemble potential prospects. Qualification checks fit signals and marks leads needing additional review; a discovered record is not automatically call-ready." },
      { title: "Make outreach follow-through measurable", body: "The intended workflow tracks the review state, call outcomes and follow-up ownership without confusing a discovered prospect with a paying customer." }
    ],
    outcome: [
      "50,000 prospects discovered is the owner's reported progress figure as of November 2026, not an independently authenticated database count.",
      "The qualification and sales-readiness workflows remain in progress. Current qualified-for-call totals, completed outreach and conversion counts are not supplied or asserted."
    ],
    decision: {
      title: "Discovery is not the same as sales readiness",
      body: "Keep unverified discoveries, qualified call candidates and recorded outreach outcomes separate so leadership sees useful pipeline stages rather than an inflated conversion claim."
    },
    media: []
  },
];

export const featured = projects.filter((project) => project.featured);
export const others = projects.filter((project) => !project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
