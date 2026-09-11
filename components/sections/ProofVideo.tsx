import Reveal from "@/components/motion/Reveal";

/**
 * The demo sits on the home page rather than three clicks deep. It is the
 * only asset that proves a system works rather than describing one.
 */
export default function ProofVideo() {
  return (
    <section className="border-y border-rule">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-20 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] md:items-center md:gap-16 md:px-8 md:py-24">
        <Reveal>
          <div>
            <p className="t-small flex items-center gap-2.5 text-muted">
              <span className="live-dot" aria-hidden />
              In daily use by customers
            </p>

            <h2 className="t-display-sm mt-5">
              <span className="mask block">
                <span>A real order, start to finish.</span>
              </span>
            </h2>

            <p className="t-body prose-justify mt-6 text-muted">
              A customer picks a branch, orders in plain language, gets a running
              total, submits a delivery address, and receives bank details with a
              reference tied to their order. Staff confirm the transfer in
              Telegram and the order closes itself.
            </p>
            <p className="t-body prose-justify mt-4 text-muted">
              Recorded before handover to management. The client is confidential,
              so the brand is obscured throughout.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="wipe mx-auto w-full max-w-[300px] border border-rule bg-paper">
            <video
              className="block w-full"
              controls
              playsInline
              preload="metadata"
              poster="/work/whatsapp-poster.jpg"
            >
              <source src="/work/whatsapp-bot-demo.mp4" type="video/mp4" />
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
