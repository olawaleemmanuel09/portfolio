import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

export default function AboutPreview() {
  return (
    <section className="border-y border-rule">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-6 py-20 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] md:gap-16 md:px-8 md:py-28">
        <div>
          <Reveal>
            <span className="mask block">
              <span className="t-display-sm">
                Making a workflow recoverable
              </span>
            </span>
          </Reveal>

          <Reveal delay={80} variant="soft">
            <p className="t-body prose-justify mt-7">
              A workflow patch can change how a live order moves through the business.
              Before editing it, I want a known state to recover and a way to verify the restore.
            </p>
            <p className="t-body prose-justify mt-4 text-muted">
              My published n8n playbook chapter walks through taking a snapshot before a change.
              It gives the next engineer a concrete starting point for a rollback.
            </p>

            <Link href="https://github.com/olawaleemmanuel09/n8n-production-playbook" className="link-underline t-small mt-8 inline-block" style={{ fontVariationSettings: '"wdth" 100, "wght" 560' }}>
              Read the production playbook on GitHub
            </Link>
          </Reveal>
        </div>

        <Reveal>
          <Parallax className="wipe border border-rule" amount={9}>
            <Image
              src="/work/headshot.jpg"
              alt="Olawale Emmanuel Olaonipekun"
              width={860}
              height={1075}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="w-full"
            />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
