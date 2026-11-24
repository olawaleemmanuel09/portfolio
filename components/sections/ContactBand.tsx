import Link from "next/link";

export default function ContactBand() {
  return (
    <section className="studio-contact" aria-labelledby="studio-contact-heading">
      <div className="studio-container studio-contact-inner">
        <p className="studio-overline">06 / COLLABORATION</p>
        <h2 id="studio-contact-heading">What&apos;s slowing <em>your business down?</em></h2>
        <div className="studio-contact-bottom">
          <p>Open to AI engineering roles and projects with a real operational problem to solve.</p>
          <Link href="/contact" className="studio-contact-link">Start a conversation <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
