import type { Metadata } from "next";
import type { Project } from "@/lib/data/types";
import { siteUrl } from "@/lib/site";

export const personName = "Olawale Emmanuel Olaonipekun";
export const shortName = "Olawale Olaonipekun";
export const jobTitle = "AI Engineer — Growth & Automation Systems";
export const homeTitle = "Olawale Emmanuel Olaonipekun | AI Automation Engineer";
export const homeDescription = "AI automation engineer building CRM integrations, business platforms and AI workflows. Explore engineering case studies, delivery status and project evidence.";
export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;
export const personId = absoluteUrl("/#person");
export const websiteId = absoluteUrl("/#website");

export const person = {
  "@type": "Person",
  "@id": personId,
  name: personName,
  alternateName: shortName,
  url: absoluteUrl("/about"),
  jobTitle,
  image: absoluteUrl("/work/headshot.jpg"),
  sameAs: [
    "https://github.com/olawaleemmanuel09",
    "https://www.linkedin.com/in/olawale-olaonipekun-0505303b4",
    "https://x.com/LaoniAI",
  ],
};

export const website = {
  "@type": "WebSite",
  "@id": websiteId,
  url: absoluteUrl("/"),
  name: personName,
  publisher: { "@id": personId },
  inLanguage: "en",
};

type SearchCopy = { title: string; description: string };
const caseCopy: Record<string, SearchCopy> = {
  "cefa": { title: "CEFA Learning Platform", description: "Cohort access, private learning groups and staff workflows. Verified November 24, 2026 snapshot: 127 onboarded students, 10 groups and 113 messages." },
  "whatsapp-ordering-system": { title: "AI WhatsApp Restaurant Ordering", description: "Historical three-branch restaurant ordering flow connecting WhatsApp enquiries to menus, validated orders and staff-controlled payment confirmation." },
  "web-ordering-and-payments": { title: "Restaurant Ordering & Payments", description: "Three-branch commerce release candidate with management, kitchen, branch and accounting workflows. Live payment and dashboard acceptance remain pending." },
  "elion-sales-command-centre": { title: "Real Estate CRM & AI Sales", description: "Real estate CRM foundation for lead capture, AI conversations and human handoff. Hosted acceptance and live messaging remain verification gates." },
  "security-workforce-operations": { title: "Security Workforce Operations", description: "Staged workforce platform for role-based attendance, shift records and location-aware verification. Real-device field acceptance remains pending." },
  "b2b-revenue-engine": { title: "B2B Prospect Intelligence", description: "Restaurant prospect research and sales-readiness workflow separating discovered businesses from qualified opportunities. Certification remains pending." },
  "elion-homes": { title: "Elion Homes Property Website", description: "Mobile-first real estate website replacement with optimized media and clear property enquiries. Case study documents release-candidate evidence." },
  "leadreach": { title: "LeadReach Research & Outreach", description: "Owner-pilot research workspace for source-aware prospect records and human-reviewed outreach drafts. Public SaaS adoption is not established." },
  "foc-inc-operations": { title: "FOC Operations Command Centre", description: "Shared operational records, event coordination and notifications for an internal operations team. Explore the architecture and evidence boundaries." },
  "ai-job-scraper": { title: "AI Job Intelligence & Alerts", description: "Archived seven-source n8n design with Gemini scoring and Telegram alerts, distinguished from the public one-source teaching export and unverified live runs." },
  "lead-capture-crm-sync": { title: "Lead Capture & CRM Integration", description: "Public workflow connecting Tally enquiries with HubSpot, acknowledgements, team notifications and reporting. Explore the documented engineering decisions." },
  "smartbook-ai": { title: "SmartBook AI Booking Automation", description: "Open-source appointment workflow for intake, reminders, cancellation and feedback. A capstone study with explicit delivery-guarantee limitations." },
  "lead-intelligence-pipeline": { title: "AI Lead Ranking Pipeline", description: "Open-source workflow using Claude to identify business signals and JavaScript to rank leads consistently. Explore the separation of AI and deterministic code." },
  "voice-booking-agent": { title: "Voice Booking Agent Prototype", description: "Voice booking prototype exploring how an assistant should confirm a reservation only after a committed record. Not certified live voice operation." },
  "christ-heart-foundation": { title: "Christ Heart Foundation Website", description: "Nonprofit digital platform with private enquiry handling, controlled gallery updates and responsible acknowledgements. Current services require verification." },
  "academy-platform": { title: "Automation Academy Platform", description: "Teaching workspace supporting practical automation assignments, submissions and grading. Explore the student workflow and evidence." },
  "leadreach-prospect-intelligence": { title: "LeadReach Prospect Discovery", description: "Owner-reported 50,000 prospects discovered. Live database counts, qualified-for-call totals and conversions are not independently verified." },
};

export function pageMetadata(path: string, title: string, description: string, image?: string, article = false): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: article ? "article" : "website",
      url, title, description, siteName: personName,
      ...(image ? { images: [{ url: absoluteUrl(image), alt: title }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title, description, creator: "@LaoniAI",
      ...(image ? { images: [absoluteUrl(image)] } : {}),
    },
  };
}

export function caseMetadata(project: Project): Metadata {
  const copy = caseCopy[project.slug] ?? { title: project.title, description: project.summary };
  const image = project.preview && /\.(?:jpe?g|png|webp)$/i.test(project.preview) ? project.preview : undefined;
  return pageMetadata("/work/" + project.slug, copy.title + " | " + shortName, copy.description, image, true);
}
