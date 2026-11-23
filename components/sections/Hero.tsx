import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1180px] px-6 pb-16 pt-32 md:px-8 md:pb-20 md:pt-44">
        <p className="t-small text-muted">Olawale Emmanuel Olaonipekun · Lagos, Nigeria</p>
        <h1 className="t-display mt-6 max-w-[18ch]">AI Engineer — Growth &amp; Automation Systems</h1>
        <p className="t-small mt-5 text-muted">AI Solutions · CRM Engineering</p>
        <p className="t-lead mt-6 max-w-[52ch]">I engineer AI-powered business systems—from customer ordering and CRM infrastructure to secure databases, operational dashboards and production automation. I build for the decisions, failures and people that matter after launch.</p>
        <div className="mt-8 flex flex-wrap gap-7">
          <Link className="link-underline t-small" href="/work/cefa">Explore CEFA</Link>
          <Link className="link-underline t-small" href="/work">Browse projects</Link>
          <Link className="link-underline t-small" href="/contact">Contact me</Link>
        </div>
      </div>
    </section>
  );
}
