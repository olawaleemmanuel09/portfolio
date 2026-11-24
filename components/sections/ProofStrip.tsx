import Link from "next/link";

const results = [
  { value: "127", name: "Students onboarded" },
  { value: "10", name: "Learning groups" },
  { value: "113", name: "Group-chat messages" },
];

export default function ProofStrip() {
  return (
    <section className="studio-proof-strip" aria-labelledby="studio-proof-title">
      <div className="studio-container studio-proof-layout">
        <div className="studio-proof-lead">
          <p className="studio-overline">ONE VERIFIED SNAPSHOT</p>
          <h2 id="studio-proof-title">Real records. <em>No inflated reach.</em></h2>
          <p>CEFA learning programme · database snapshot, 24 November 2026. These are counts, not claims of revenue or concurrent users.</p>
          <Link href="/work/cefa" className="studio-text-link">See the programme case <span aria-hidden="true">↗</span></Link>
        </div>
        <dl className="studio-proof-numbers">
          {results.map((item) => (
            <div key={item.name} className="studio-proof-stat">
              <dt>{item.name}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
