import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import MaskLines from "@/components/motion/MaskLines";

export default function ContactBand() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-6 py-24 md:flex-row md:items-end md:justify-between md:px-8 md:py-32">
        <Reveal>
          <h2 className="t-display max-w-[14ch]">
            <MaskLines lines={["Something in your", "business runs on", "manual work."]} />
          </h2>
        </Reveal>

        <Reveal delay={120} variant="soft">
          <div className="md:text-right">
            <p className="t-body measure-read text-muted md:ml-auto">
              Open to automation engineer roles and contract work.
            </p>
            <Link
              href="/contact"
              className="group relative mt-6 inline-block overflow-hidden border border-ink px-8 py-3.5"
            >
              <span className="t-small relative z-10 transition-colors duration-[420ms] group-hover:text-paper">
                Start a conversation
              </span>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--color-accent)] transition-transform duration-[420ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-y-100" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
