import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "whatsapp-ordering-system",
    preview: "/work/whatsapp-poster.jpg",
    title: "WhatsApp Ordering System",
    client: "Confidential restaurant brand, three branches",
    status: "production",
    statusLabel: "Live in production",
    period: "April 2026 to present",
    summary:
      "Customers order by chat. A language model reads what they typed, a state machine runs the ordering flow, and the menu is read live from the sheet the business already edits. Thirteen workflows sit behind it.",
    stack: ["n8n", "Twilio", "Google Sheets", "Telegram", "OpenAI", "Contabo VPS"],
    featured: true,
    order: 1,
    problem: [
      "A restaurant running three branches across Lagos and Abuja took every order by phone call and WhatsApp message. Staff wrote orders into a notebook, quoted prices from memory, and lost track of which ones had been paid for.",
      "The obvious fix is an app nobody downloads. The customers were already in WhatsApp, so the ordering system had to live there.",
    ],
    approach: [
      {
        title: "Hybrid intent handling",
        body: "A language model parses free text like ten jollof rice and goat meat into structured items. A deterministic state machine runs the ordering flow itself. The model interprets, it never decides. Ordering logic that changes its mind between runs is not an ordering system.",
      },
      {
        title: "Stateful sessions",
        body: "Session records are read, created and updated on every message, so a conversation survives across messages, across hours, and across a customer walking away mid-order. A restart command resets cleanly at any point.",
      },
      {
        title: "Live menu, no deploy",
        body: "Menus are fetched per branch at request time behind a JWT-authenticated service account. A price edited in the sheet is live in the next customer reply. An item flagged unavailable shows as unavailable without anyone touching a workflow. The business controls the menu, not the engineer.",
      },
      {
        title: "Two channels, one pipeline",
        body: "The chat bot and the web ordering form write to the same order store and fire the same alerting and payment path. Two front doors, one system behind them.",
      },
      {
        title: "Payment and confirmation",
        body: "Per-branch bank accounts, a unique reference on every order, a forty-five minute expiry on anything unpaid, and staff confirming receipt in a per-branch Telegram group, which closes the order automatically and triggers the customer confirmation.",
      },
    ],
    decision: {
      title: "The staff side",
      body: "Staff needed a view of what was happening, on a phone, in a kitchen, with no install and no training. The answer is a single-page dashboard behind a login: live orders by branch with status and totals, a menu availability toggle that reflects on every ordering surface within seconds, and revenue split between Lagos and Abuja. It holds no business logic and no database of its own. It is a thin client over five API workflows on the same automation layer that runs the ordering pipeline. One source of truth, four surfaces reading from it.",
    },
    outcome: [
      "Thirteen workflows in production. Deployed and operational across all three branches.",
      "Order volume sits with the client and is not mine to publish, so this project is presented on what the system does rather than on numbers I cannot verify.",
    ],
    demonstrates:
      "Conversational commerce design, LLM intent extraction bounded by deterministic control flow, multi-channel convergence on a single pipeline, live configuration from a business-owned source, and production operation of a thirteen-workflow system.",
    media: [
      {
        src: "/work/whatsapp-bot-demo.mp4",
        alt: "A customer places a full order through the WhatsApp bot",
        caption:
          "Recorded before handover to management. The system is now in daily use by customers.",
        type: "video",
        aspect: "tall",
      },
    ],
  },

  {
    slug: "web-ordering-and-payments",
    preview: "/work/web-form-menu.jpg",
    title: "Web Ordering and Payments",
    client: "Confidential restaurant brand, three branches",
    status: "production",
    statusLabel: "Live in production",
    period: "2026",
    summary:
      "A second ordering surface for people who would rather tap than type, feeding the same pipeline. Payment details and live order status render on the page itself, because WhatsApp could not be trusted to deliver them.",
    stack: ["n8n", "Monnify", "Google Sheets", "Telegram", "nginx"],
    featured: true,
    order: 2,
    problem: [
      "Not every customer wants to talk to a bot. Ordering by chat means typing item names, waiting for replies and correcting misunderstandings. A restaurant with a broad menu needs a surface where you see everything, tap what you want, watch the total move, and pay.",
      "It also had to work for customers who had never messaged the business number, which turned out to be the hardest constraint in the entire build.",
    ],
    approach: [
      {
        title: "The ordering surface",
        body: "Category tabs across the top, a grouped scrolling menu underneath, quantity steppers on every item, and a running basket total pinned to the bottom of the screen. Delivery or pickup as a single toggle that changes what the form asks for, plus a free-text notes field for the requests no structured form anticipates.",
      },
      {
        title: "Payment on the page",
        body: "The payment screen carries the exact transfer amount, the bank details for the correct branch, a unique reference, copy buttons on the fields customers get wrong, a live status indicator and a countdown to expiry. Everything critical renders where the customer already is.",
      },
      {
        title: "Parallel fan-out",
        body: "The webhook receives the order, authenticates, processes it, then fans out at once: the order is written to the branch sheet, a confirmation goes to the customer, the branch Telegram group gets an alert with confirm buttons for staff, and management gets its own notification. The webhook responds immediately rather than waiting on any of it.",
      },
    ],
    decision: {
      title: "The constraint that shaped everything",
      body: "A cold-number test proved that freeform WhatsApp messages do not reach customers who have never messaged the business, because of the twenty-four hour session rule. A web customer could order and never receive payment details. The resolution was to stop treating WhatsApp as the delivery mechanism for anything critical. Payment instructions and live status render on the page, with WhatsApp offered as an opt-in extra. The exact transfer amount doubles as the order identifier, so a customer who ignores the reference field is still matched to their order. Unpaid orders expire on a timer, which stops the kitchen cooking against orders that will never be paid for.",
    },
    outcome: [
      "The gateway integration is built and verified end to end in sandbox, with per-branch sub-account routing complete. Production activation is held up by corporate documentation and legal review, both outside my control.",
      "Rather than leave the channel idle, I shipped a manual bank transfer path with staff confirming receipt in Telegram. The gateway code is disabled, not deleted, so activation is a switch rather than a rebuild.",
      "Supporting legal documents, refund policy, privacy notice and terms of service, were drafted against the Nigeria Data Protection Act 2023.",
    ],
    demonstrates:
      "Multi-channel order capture on one pipeline, designing around third-party platform constraints rather than through them, payment integration with a working fallback, and parallel fan-out with fast webhook response.",
    media: [
      { src: "/work/web-form-menu.jpg", alt: "Menu with category tabs and quantity steppers", aspect: "tall" },
      { src: "/work/web-form-details.jpg", alt: "Delivery details form with address, contact and notes", aspect: "tall" },
      { src: "/work/web-form-summary.jpg", alt: "Order summary with line items and total", aspect: "tall" },
      { src: "/work/web-form-payment.jpg", alt: "Payment screen with exact amount, bank details and expiry countdown", aspect: "tall" },
      { src: "/work/web-form-confirmed.jpg", alt: "Payment confirmed screen", aspect: "tall" },
      { src: "/work/web-form-canvas.png", alt: "The web order handler workflow showing parallel fan-out after processing", caption: "WF-05, web order handler.", aspect: "wide" },
    ],
  },

  {
    slug: "b2b-revenue-engine",
    preview: "/work/revenue-daily-brief-telegram.jpg",
    title: "B2B Revenue Engine",
    client: "Confidential restaurant brand, three branches",
    status: "production",
    statusLabel: "Live in production",
    period: "August 2026 to present",
    summary:
      "Finds corporate accounts across a territory, scores them, and hands the sales marketer a ranked list every morning. Call outcomes feed back in and reorder tomorrow's list. Built under a hard zero-cost constraint.",
    stack: ["n8n", "Supabase", "Gemini", "Apify", "Telegram"],
    featured: true,
    order: 3,
    problem: [
      "Consumer orders arrived one plate at a time. Management wanted corporate bulk revenue, office lunch contracts rather than individual covers, and had nothing to pursue it with. No prospect list, no qualification process, no record of who had been called or what was said.",
      "The instruction was to produce bulk sales, with no budget attached and no sales infrastructure to build on.",
    ],
    approach: [
      {
        title: "Territory harvest",
        body: "Discovers corporate accounts inside a defined geographic territory, geocodes them, assigns them to a territory and writes them into the database, deduplicated against everything already there. Two hundred and sixty-five offices found in a single day's run.",
      },
      {
        title: "Enrich and qualify",
        body: "Each new account is enriched and scored for fit by a language model, so the marketer works a ranked list rather than an alphabetical one. Scoring criteria live as data, not embedded in the workflow, so recalibrating does not mean a code change.",
      },
      {
        title: "Daily brief",
        body: "Every morning the top accounts for a territory are pushed to the assigned marketer over Telegram with the context needed to make the call. Alerts are deliberately one-way. The marketer executes independently and does not reply to a bot, which removed an entire class of conversational state handling from the build.",
      },
      {
        title: "Outcome capture",
        body: "After each call the marketer submits the result through a form that writes straight back to the account record, creating contacts, tasks and deals as the outcome requires. That closes the loop: outcomes change scores, scores change tomorrow's brief.",
      },
      {
        title: "Management reporting",
        body: "A separate workflow compiles the pipeline into spreadsheets, prospects, activity log and pipeline, and pushes them to management over Telegram alongside a daily numbers digest. Management sees the funnel without asking anyone for it.",
      },
    ],
    decision: {
      title: "Multi-tenant before there was a second tenant",
      body: "The schema was built to hold multiple brands from the first migration, when there was exactly one. Retrofitting tenancy into a live sales database is the most expensive migration you can take on, and adding a second brand is now a seed row rather than a fork. The same logic drove the rest of the stack: a free-tier model for enrichment, because qualification is bounded classification and does not need a frontier model, and Telegram instead of a custom app, because adoption is what kills field sales tooling and the marketer already lives there.",
    },
    outcome: [
      "Live across three branch territories. Accounts harvested, scored and briefed daily. Marketers onboarded and working the list.",
      "The system is presented on what it does, not on revenue attributed to it. Deal figures sit with the client.",
    ],
    demonstrates:
      "Lead generation pipeline design, LLM-assisted enrichment and scoring, multi-tenant relational schema, closed-loop field sales tooling, and delivering a working revenue system under a hard zero-cost constraint.",
    media: [
      { src: "/work/revenue-wfa-territory-harvest.png", alt: "Territory harvest workflow", caption: "Discovery, geocoding, territory assignment and upsert.", aspect: "wide" },
      { src: "/work/revenue-wfb-enrich-qualify.png", alt: "Enrichment and qualification workflow", caption: "Enrich, score, then queue for calling.", aspect: "wide" },
      { src: "/work/revenue-wfc-daily-brief.png", alt: "Daily sales brief workflow", aspect: "wide" },
      { src: "/work/revenue-wfd-call-outcome.png", alt: "Call outcome capture workflow", caption: "Outcomes create contacts, tasks and deals, then close the call task.", aspect: "wide" },
      { src: "/work/revenue-wfe2-management-report.png", alt: "Management report workflow producing spreadsheet exports", aspect: "wide" },
      { src: "/work/revenue-daily-brief-telegram.jpg", alt: "The daily numbers brief delivered over Telegram", caption: "Morning brief, before the calling day begins.", aspect: "tall" },
    ],
  },

  {
    slug: "foc-inc-operations",
    preview: "/work/foc-command-centre-loading.jpg",
    title: "FOC INC Operations Platform",
    client: "Events and brand portfolio company, Lagos and Abuja",
    status: "production",
    statusLabel: "Live in production",
    period: "2026",
    summary:
      "A year of events and seventeen brand projects lived in a static HTML file and a group chat. Now one database, one dashboard, and a set of scheduled workflows that tell people what is coming before they have to ask.",
    stack: ["Supabase", "PostgreSQL", "n8n", "Vercel", "Web Push"],
    featured: true,
    order: 4,
    problem: [
      "More than eighty events across two cities, tied to seventeen active brand projects, held in a static HTML file. Management tracked dates separately in Google Calendar. Staff found out about events late or by word of mouth. Briefs and flyers sat in chat threads with no link to the event they belonged to.",
      "There was no way to answer who is doing what next week without asking everyone.",
    ],
    approach: [
      {
        title: "The database and the dashboard",
        body: "A PostgreSQL schema covering events, projects, categories, locations, event to project activation links, outcomes, files, staff and admin users. Every event was extracted from the old calendar, cleaned and seeded, along with all seventeen projects and more than ninety-five activation links carrying the role each project plays for each event. On top of it, a command centre with KPIs, a filterable events view, a project explorer, a timeline, and an admin panel where staff add events and upload files without touching code.",
      },
      {
        title: "Reminders that know who you are",
        body: "Every morning at seven, the system queries for events landing in seven, three or one day, pulls the active staff list, joins staff to events and sends each person a reminder carrying the event details, the projects being activated and links to attached files. Deactivating someone removes them from every future reminder with no workflow edit.",
      },
      {
        title: "Meeting management where they already are",
        body: "Management were never going to abandon Google Calendar. Instead of forcing a second data entry process, a workflow reads the next ninety days from their calendar each morning, diffs it against the database and inserts what is missing. They add an event where they always have, and it appears on the dashboard and enters the reminder cycle on its own.",
      },
      {
        title: "Task and brief automation",
        body: "Due and overdue tasks are grouped per person and emailed to whoever owns them. New briefs are detected every ten minutes, fanned out one item per team member, emailed, then marked notified so nobody is told twice.",
      },
      {
        title: "Access and collaboration",
        body: "Per-staff logins enforced by row level security at the database, with the public URL withdrawn once real data was in it. Tenant separation so a sub-brand committee sees only its own workspace. Multi-assignee tasks with per-person completion, per-task comment threads with auto-logged status changes and mentions, and chat channels built on a single generic comments table with realtime updates and unread tracking.",
      },
    ],
    decision: {
      title: "Queue first, deliver second",
      body: "Every notification is written to the database and dispatched by a separate polling workflow rather than fired inline when the event happens. That costs a small delay. In exchange, a failed send is retried rather than lost, a burst of activity cannot flood the mail or push provider, expired push subscriptions are pruned automatically instead of failing silently forever, and the application never needs to know how delivery works. For a team that acts on these alerts, delivery guarantees beat instant arrival.",
    },
    outcome: [
      "One system replaced a static file, a private calendar, scattered file sharing and the group chat that had been standing in for task management.",
      "It runs on infrastructure that costs the company nothing per month, with all data held in their own account, covering what would otherwise be two separate SaaS subscriptions.",
      "Four engineering problems were solved along the way. Free-tier database suspension after seven idle days, resolved with an external heartbeat. Aggressive caching serving stale builds, resolved with explicit no-cache headers. Row level security policies blocking legitimate writes, resolved by rebuilding the policies cleanly rather than layering exceptions. And sequence desync throwing duplicate key errors during bulk seeding, resolved by resetting sequences before every insert.",
    ],
    demonstrates:
      "Relational schema design and data migration, row level security and multi-tenant access control, scheduled automation running directly against a production database, queue-based notification delivery with retry and subscription pruning, progressive web app installation and web push, and phased delivery to non-technical management.",
    media: [
      { src: "/work/foc-command-centre-loading.jpg", alt: "The FOC INC command centre loading screen", aspect: "wide" },
      { src: "/work/foc-wf-event-reminders.png", alt: "Event reminder workflow joining staff to upcoming events", caption: "Daily at seven. Events due in seven, three or one day.", aspect: "wide" },
      { src: "/work/foc-wf-t2-daily-task-reminders.png", alt: "Daily task reminder workflow grouping tasks per staff member", aspect: "wide" },
      { src: "/work/foc-wf-t3-brief-posted-alert.png", alt: "Brief posted alert workflow, one item per team member", aspect: "wide" },
      { src: "/work/foc-wf-p1-task-push.png", alt: "Task push notification workflow with queue and pruning", caption: "Pending pushes are marked sent and dead subscriptions pruned.", aspect: "wide" },
      { src: "/work/foc-wf-ch2-chat-mention-push.png", alt: "Chat mention push workflow", aspect: "wide" },
      { src: "/work/foc-wf-t4-monday-lead-digest.png", alt: "Monday lead digest workflow", aspect: "wide" },
      { src: "/work/foc-push-new-task.jpg", alt: "A task assignment push notification arriving on a phone", aspect: "tall" },
      { src: "/work/foc-push-chat-mention.jpg", alt: "A chat mention push notification arriving on a phone", aspect: "tall" },
    ],
  },

  {
    slug: "christ-heart-foundation",
    preview: "/work/christheart-homepage.png",
    title: "Christ Heart Foundation",
    client: "Faith-based humanitarian organisation",
    status: "production",
    statusLabel: "Live",
    period: "2026",
    summary:
      "A foundation serving communities since 1998, with no website. Four intake routes each with their own automatic reply, a gallery the staff run themselves, and privacy engineering that matches what the policy page promises.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Resend", "Vercel"],
    featured: true,
    order: 5,
    problem: [
      "An organisation that had been serving communities since 1998, reaching more than nine thousand people across twenty named communities, had no website. Volunteers, partners and people needing assistance had no route in except a phone number. Donors had no way to verify the work before giving.",
      "The founder did not want a showcase. He wanted something a person could land on and immediately understand, use and act from.",
    ],
    approach: [
      {
        title: "Restraint as the requirement",
        body: "A story rail was built and deleted. A dark mode toggle was built and dropped. Decorative punctuation was stripped from the entire site. The palette went from navy and cream to white with the red and navy taken directly from the Foundation's own logo, so the site looks like the organisation rather than like a template.",
      },
      {
        title: "Four intake routes",
        body: "Contact, volunteer, partnership and assistance each have their own hardened API route, their own validation and their own automatic reply written for that specific audience. A volunteer offering their time and a family requesting help should not receive the same email. Submissions land in the Foundation's own inbox, where their team already works.",
      },
      {
        title: "A gallery the staff own",
        body: "Foundation staff upload and manage outreach photographs themselves through a protected admin panel. No developer involvement to publish a photo from last weekend's outreach.",
      },
      {
        title: "Donations by transfer",
        body: "Bank transfer with copy-to-clipboard on the account details, no payment gateway. Deliberate. A gateway would take a cut and add compliance overhead the Foundation does not need, and Nigerian donors transfer by bank anyway.",
      },
    ],
    decision: {
      title: "Privacy that matches the policy page",
      body: "Admin rights are enforced by a database table and a security definer function called by every write policy, not by a toggle in a dashboard. Uploads are constrained by type and size at the storage bucket itself, so the limit holds even if the client is bypassed. Every upload, edit, delete and reorder is written to an append-only audit table. Visitor IP addresses are stored as salted hashes and purged on a schedule, which means the published privacy policy describes what the system actually does rather than what the lawyer hoped. For an organisation handling assistance requests from vulnerable people, this mattered more than any feature on the page.",
    },
    outcome: [
      "Live and in use, with the Foundation running its own gallery and receiving intake through four routes with automatic replies.",
      "Two bugs worth naming. The mobile menu was permanently open and blocking every tap, because a Tailwind display utility was overriding the HTML hidden attribute. And action bar labels went invisible on iOS Safari, a compositing failure that did not reproduce anywhere else, fixed by giving the bar a solid background rather than relying on the layer beneath it.",
      "The engagement also covered the organisation's Google Business Profile. The address does not geocode reliably, so Google was routing visitors to the wrong location. Resolved by capturing coordinates and a Plus Code standing at the gate, correcting the pin, verifying the listing, fixing the primary category and rewriting the description to carry both names and the location ahead of Google's mobile truncation point. Getting directions to work was worth more to this organisation than any amount of copywriting.",
    ],
    demonstrates:
      "Production Next.js and TypeScript delivery, database-enforced authorisation rather than client-side gating, privacy engineering, security hardening across headers, storage and audit, cross-browser debugging on real devices, and translating a non-technical brief into decisions including the decision to remove work already built.",
    media: [
      { src: "/work/christheart-homepage.png", alt: "The Christ Heart Foundation homepage", caption: "christheartfoundation.org", aspect: "wide" },
    ],
    live: "https://christheartfoundation.org",
  },

  {
    slug: "academy-platform",
    title: "Academy Platform",
    client: "My own training programme",
    status: "production",
    statusLabel: "In use",
    period: "2026",
    summary:
      "Student portal, instructor panel, and an onboarding chain that creates an account and emails the student their credentials without me touching anything. Around twenty students through it so far.",
    stack: ["Supabase", "n8n", "Vercel", "Google Sheets", "Google Forms"],
    featured: false,
    order: 6,
    problem: [
      "I run a cohort-based AI automation programme. Cohort one was twenty weeks, four nights a week. Cohort two is three months, three nights a week, rebuilt around business problems rather than a compressed technology syllabus, with every graduate leaving holding one capstone they can show a client.",
      "That is the teaching. The problem was everything around it. Class links in a group chat. Slides in a group chat. A student joining in week three scrolling back through hundreds of messages for week one material, half of it expired. Scores in my head. Every new student meant creating an account and typing a welcome message by hand.",
    ],
    approach: [
      {
        title: "What students get",
        body: "One dashboard. This week's sessions across the top, with a join control that appears only on the session that is live. Materials underneath, every deck and recording tagged with its week, so week four's files are one glance away in month three. Curriculum, schedule, scores, resources, certificate and group in the sidebar. A profile card showing cohort, current week, sessions attended and average. Nothing there is clever. A student should simply never have to ask where something is.",
      },
      {
        title: "What I get",
        body: "An instructor panel that records a score against a student, a week and a component, with written feedback attached. The same combination overwrites rather than duplicating, so correcting a mark is not a data problem. There is a student view toggle, because building an interface you never use yourself is how you ship something nobody can navigate.",
      },
      {
        title: "Onboarding without me",
        body: "A student fills in a form. A row lands in a sheet, n8n picks it up, cleans the fields, creates the account, saves their details and emails a welcome with the portal link and credentials. Around twenty students have come through it and I have not created an account by hand since.",
      },
    ],
    decision: {
      title: "The version that failed first",
      body: "The first onboarding build used a set-password link, so the student chooses their own password and nothing sensitive travels by email. It is the correct design and it failed repeatedly. Without a custom domain there was no custom SMTP, and the link flow depended on delivery I did not control. So I generated a temporary password instead, sent it in the welcome email and let the student sign in directly. It is the less elegant answer and it works every time. A student who cannot get into the portal on day one does not care which approach was more correct.",
    },
    outcome: [
      "In use across the current cohort, with onboarding fully automated.",
      "This is my own product rather than a client deployment. What it demonstrates is a full stack held together end to end by one person: schema, auth, two interfaces for two different user types, an automated onboarding pipeline, and the judgement to abandon my own first design when it kept failing.",
    ],
    demonstrates:
      "End-to-end product ownership, authentication and row level security, form-to-database onboarding automation, and designing two distinct interfaces around two distinct users.",
    media: [
      { src: "/work/laoni-student-dashboard-week4.png", alt: "Student dashboard showing the week's sessions and materials", aspect: "wide" },
      { src: "/work/laoni-admin-grading.png", alt: "Instructor panel recording a score and feedback", aspect: "wide" },
      { src: "/work/laoni-wf-student-onboarding.png", alt: "Student onboarding workflow from form submission to welcome email", aspect: "wide" },
    ],
  },

  {
    slug: "smartbook-ai",
    title: "SmartBook AI",
    client: "Capstone project",
    status: "capstone",
    statusLabel: "Capstone, open source",
    period: "February 2026",
    summary:
      "Appointment booking with a no-show risk model attached. High-risk bookings get chased differently from the rest. Five pipelines, and every scheduled one marks what it has already acted on.",
    stack: ["n8n", "FastAPI", "XGBoost", "Supabase", "Claude", "Twilio"],
    featured: false,
    order: 7,
    problem: [
      "Small service businesses run bookings through phone calls, chat and spreadsheets. The cost is double bookings, forgotten appointments and no-shows.",
      "Reminders help, but they treat every booking identically. The interesting question is whether you can tell in advance which bookings are likely to be missed, and spend the extra effort only on those.",
    ],
    approach: [
      {
        title: "Booking and risk",
        body: "A webhook receives the booking. Validation runs first and returns an explicit error rather than writing junk to the database. Valid bookings are saved, then scored for no-show risk by the model service. A score at or above the threshold triggers an immediate re-confirmation message. Everything else gets a confirmation email.",
      },
      {
        title: "Reminder engine",
        body: "An hourly scheduler pulls upcoming confirmed bookings and evaluates two windows independently: twenty-four hours out sends email and SMS, two hours out sends SMS only.",
      },
      {
        title: "Feedback and cancellation",
        body: "Completed appointments receive a one-click star-rating email on a daily schedule, then get marked so nobody is asked twice. A cancellation webhook updates status and notifies the customer.",
      },
      {
        title: "Conversational booking",
        body: "A message goes to a language model with a booking-focused prompt. If the reply contains booking intent, the workflow calls its own booking webhook to create the record. Natural language becomes a structured row without a form.",
      },
    ],
    decision: {
      title: "Idempotency wherever a schedule touches state",
      body: "Every scheduled pipeline marks what it has already acted on. An hourly poller without that marking sends the same reminder every hour until the appointment arrives. This is the difference between a workflow that demos well and one that does not embarrass you overnight. The same reasoning kept inference behind its own service: the model can be retrained or swapped without touching booking logic, and the booking logic stays readable to someone who does not work in machine learning.",
    },
    outcome: [
      "Built as a capstone, not deployed to a live business, so there are no production numbers behind it and none are claimed.",
      "Published as a public repository under MIT, with the full workflow exported as importable JSON where every secret is a named placeholder, an environment example, a security policy and setup documentation. Anyone can run it without receiving a single one of my credentials, which is the standard any workflow published from a production instance should meet.",
    ],
    demonstrates:
      "Webhook and scheduler orchestration with idempotent state handling, machine learning served as an independent inference API, conditional branching driven by a model score, LLM intent extraction writing structured records, and publishing an automation project safely as open source.",
    media: [
      { src: "/work/smartbook-canvas-full.png", alt: "The full SmartBook workflow with five pipelines", aspect: "wide" },
      { src: "/work/smartbook-flow-new-booking.png", alt: "New booking pipeline with validation and risk scoring", caption: "Validate first, then score, then branch on risk.", aspect: "wide" },
      { src: "/work/smartbook-flow-reminders.png", alt: "Reminder engine evaluating two windows independently", aspect: "wide" },
    ],
    repo: "https://github.com/olawaleemmanuel09/smartbook-ai-automation",
  },

  {
    slug: "lead-intelligence-pipeline",
    title: "Lead Intelligence Pipeline",
    client: "Personal build, open source",
    status: "build",
    statusLabel: "Open source",
    period: "2026",
    summary:
      "Nineteen nodes that turn a scrape into a ranked list. The model classifies, the code scores. Ask a language model for a number and it drifts, and a ranking that reorders itself for no reason is worse than none.",
    stack: ["n8n", "Apify", "Claude Haiku", "Google Sheets", "Telegram"],
    featured: false,
    order: 8,
    problem: [
      "A scrape gives you rows. What a sales team needs is an order of operations: who to call first, and why.",
    ],
    approach: [
      {
        title: "Discover, qualify, score, alert",
        body: "Apify pulls business records from Google Maps and Yelp. A language model qualifies each one and returns structured JSON. A deterministic weighted function in code turns that into a number. Google Sheets holds the record and enforces deduplication across runs. Leads clearing the threshold trigger a Telegram alert.",
      },
    ],
    decision: {
      title: "The model classifies, the code scores",
      body: "The language model describes what a business is and whether it fits the brief. It never produces the final number. Scoring is deterministic code, because a model asked to output a score drifts between runs and across versions, and a lead ranking whose order changes for no reason is worse than no ranking at all. Judgement to the model, arithmetic to the code. Haiku rather than a frontier model, because qualification is bounded classification and cost per lead matters when the pipeline runs daily at volume.",
    },
    outcome: ["Published as a sanitised public repository."],
    demonstrates:
      "Scraping orchestration, LLM classification with structured output, deterministic scoring, cross-run deduplication, and cost-aware model selection.",
    media: [],
    repo: "https://github.com/olawaleemmanuel09/lead-intelligence-pipeline",
  },

  {
    slug: "voice-booking-agent",
    title: "Voice Booking Agent",
    client: "Personal build",
    status: "build",
    statusLabel: "Working end to end",
    period: "2026",
    summary:
      "Takes a restaurant reservation over the phone, reads it back before committing, and knows whether the booking actually saved. Success and error paths wired separately, which is the part most voice demos skip.",
    stack: ["ElevenLabs", "n8n", "Google Sheets", "Gmail"],
    featured: false,
    order: 9,
    problem: [
      "Voice agents demo beautifully and fail quietly. The failure mode is always the same: the agent thanks the caller for a reservation that never reached the database.",
    ],
    approach: [
      {
        title: "Collect, confirm, commit",
        body: "The agent collects name, contact, date, time, party size and any special request in natural conversation. Before writing anything it reads the full booking back and waits for confirmation. On confirmation it calls a webhook, which appends the reservation, generates a dated reference and emails a formatted confirmation to the guest.",
      },
    ],
    decision: {
      title: "The agent finds out whether it worked",
      body: "Both the sheet write and the email send have success and error outputs wired separately, feeding two different webhook responses. The agent therefore learns whether the booking persisted, rather than thanking the caller for something that failed. Read-back before commit exists for the same reason: speech recognition on names, numbers and times is where these systems break, so the agent confirms what it parsed out loud instead of trusting the transcription.",
    },
    outcome: ["Working end to end, from spoken request to confirmation email with a dated reference."],
    demonstrates:
      "Voice agent design, tool calling into an automation backend, explicit success and error path handling, and confirmation before state change.",
    media: [
      { src: "/work/voiceagent-transcript.png", alt: "The agent reading a booking back before creating it", caption: "Read-back and confirmation before anything is written.", aspect: "wide" },
      { src: "/work/voiceagent-canvas.png", alt: "The booking workflow with separate success and error responses", aspect: "wide" },
      { src: "/work/voiceagent-confirmation-email.png", alt: "The confirmation email with a dated booking reference", aspect: "wide" },
    ],
  },

  {
    slug: "ai-job-scraper",
    title: "AI Job Scraper",
    client: "Personal build, open source",
    status: "build",
    statusLabel: "Running live",
    period: "2026",
    summary:
      "Seven job boards polled every fifteen minutes, roughly two hundred listings a cycle, normalised and deduplicated in code before a single model call is spent. Only the shortlist reaches my phone.",
    stack: ["n8n", "Gemini", "Adzuna", "Telegram"],
    featured: false,
    order: 10,
    problem: [
      "Two hundred listings arriving every fifteen minutes is not a feed anyone reads. The value is entirely in the filter.",
    ],
    approach: [
      {
        title: "Seven sources, one stream",
        body: "RemoteOK, Remotive, Jobicy, Arbeitnow, Himalayas, Adzuna and We Work Remotely over RSS, merged into a single stream, normalised into a common shape, deduplicated and scored. A language model then rates each survivor for fit against a profile covering CRM and marketing automation, AI automation and the major platforms. Only high scorers become a Telegram alert carrying role, company, location, score, source and apply link.",
      },
    ],
    decision: {
      title: "Filter in code before you spend a model call",
      body: "Normalisation and deduplication happen deterministically first, and model calls are spent only on what survives. Scoring every raw item would cost several times more and produce the same shortlist. Seven sources also return seven different shapes, with titles, locations, salary fields and dates all disagreeing, so the unglamorous normalisation step is what makes deduplication and scoring possible at all.",
    },
    outcome: ["Running live on a fifteen minute cycle, delivering a scored shortlist rather than a feed."],
    demonstrates:
      "Multi-source ingestion, schema normalisation, deterministic deduplication ahead of model spend, and scored filtering.",
    media: [
      { src: "/work/jobscraper-canvas.png", alt: "Seven job sources merged, normalised, scored and filtered", aspect: "wide" },
      { src: "/work/jobscraper-telegram-alerts.jpg", alt: "Scored job alerts delivered to Telegram", aspect: "tall" },
    ],
  },

  {
    slug: "lead-capture-crm-sync",
    title: "Lead Capture and CRM Sync",
    client: "Client deliverable",
    status: "build",
    statusLabel: "Delivered",
    period: "2026",
    summary:
      "Form to CRM to inbox to Slack to sheet, with every failure branch ending somewhere a human will read it. A lead that vanishes between the form and the CRM is invisible by definition.",
    stack: ["n8n", "HubSpot", "Slack", "Gmail", "Google Sheets"],
    featured: false,
    order: 11,
    problem: [
      "Most lead capture workflows fail silently. Nobody goes looking for a lead they never saw.",
    ],
    approach: [
      {
        title: "Capture and fan out",
        body: "A submission arrives by webhook, is parsed and cleaned, and passes an email validity gate before anything downstream runs. Valid leads are upserted into the CRM, so a returning contact updates rather than duplicating. From there: a confirmation to the lead, a notification to the sales channel, and a formatted row appended to a sheet as an independent log.",
      },
      {
        title: "Assignment pipeline",
        body: "A second version extends it: create the contact, assign an owner, update the record, create a follow-up task against that owner, and post to the team channel.",
      },
    ],
    decision: {
      title: "Every failure ends somewhere a human reads",
      body: "Error outputs from every CRM node feed a Slack alert, and a workflow-level error trigger feeds the same channel. Silent failure is the default state of an integration pipeline, and the only fix is making failure louder than success.",
    },
    outcome: [
      "Delivered with a branded setup guide so the client could operate it without me, and published as a portfolio artifact.",
    ],
    demonstrates:
      "Integration pipeline design, upsert semantics, parallel fan-out, and explicit error routing.",
    media: [
      { src: "/work/leadcatcher-hubspot-sync.png", alt: "Lead catcher workflow with owner assignment and error alerting", aspect: "wide" },
      { src: "/work/leadcapture-execution.png", alt: "A successful execution from form submission through to logging", caption: "Successful run, thirty-two seconds end to end.", aspect: "wide" },
    ],
  },
];

export const featured = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

export const others = projects
  .filter((p) => !p.featured)
  .sort((a, b) => a.order - b.order);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
