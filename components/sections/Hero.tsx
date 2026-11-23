import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1180px] px-6 pb-16 pt-32 md:px-8 md:pb-20 md:pt-44">
        <p className="t-small text-muted">Olawale Emmanuel Olaonipekun · Lagos, Nigeria</p>
        <h1 className="t-display mt-6 max-w-[18ch]">AI Engineer — Growth &amp; Automation Systems</h1>
        <p className="t-small mt-5 text-muted">AI Solutions · CRM Engineering</p>
        <p className="t-lead mt-6 max-w-[52ch]">I build the systems behind customer orders, sales follow-up and team operations. At CEFA, that means giving students a place to submit work and staff a way to review it across groups.</p>
        <div className="mt-8 flex flex-wrap gap-7">
          <Link className="link-underline t-small" href="/work/cefa">Explore CEFA</Link>
          <Link className="link-underline t-small" href="/work">Browse projects</Link>
          <Link className="link-underline t-small" href="/contact">Contact me</Link>
        </div>
      </div>
    </section>
  );
}
