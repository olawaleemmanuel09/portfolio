import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a CV",
  alternates: { canonical: "/resume" },
};

export default function Resume() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-36 md:px-8">
      <h1 className="t-display">Request my CV</h1>
      <p className="t-body mt-6 max-w-[54ch]">Hiring for an AI engineering, growth systems or CRM integration role? Send the role description and I’ll share my current CV.</p>
      <a className="link-underline mt-7 inline-block" href="mailto:olawaleemmanuel100@gmail.com?subject=CV%20request">Email Olawale for a CV</a>
    </section>
  );
}
