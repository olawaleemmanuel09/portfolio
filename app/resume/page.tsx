import type { Metadata } from "next";
import { pageMetadata, shortName } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/resume", "Request a CV | " + shortName, "Request the current CV of Olawale Olaonipekun for AI engineering, automation, growth systems and CRM integration roles.", "/work/headshot.jpg");

export default function Resume() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-36 md:px-8">
      <h1 className="t-display">Request my CV</h1>
      <p className="t-body mt-6 max-w-[54ch]">Hiring for an AI engineering, growth systems or CRM integration role? Send the role description and I’ll share my current CV.</p>
      <a className="link-underline mt-7 inline-block" href="mailto:olawaleemmanuel100@gmail.com?subject=CV%20request">Email Olawale for a CV</a>
    </section>
  );
}
