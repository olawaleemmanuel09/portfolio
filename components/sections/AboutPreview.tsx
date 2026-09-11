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
                Building systems that stay up.
              </span>
            </span>
          </Reveal>

          <Reveal delay={80} variant="soft">
            <p className="t-body prose-justify mt-7">
              I am Olawale Emmanuel Olaonipekun. I build the automation that
              businesses depend on between nine and nine: ordering pipelines
              that take money, lead engines that fill a sales calendar,
              operations platforms that tell a team what is happening before
              anyone has to ask.
            </p>
            <p className="t-body prose-justify mt-4 text-muted">
              Six systems of mine are in production right now for a
              multi-branch restaurant group, an events company and a
              foundation. I care most about the unglamorous half: idempotency,
              error paths, credential handling, and what happens at 2am when a
              third-party API returns something nobody planned for.
            </p>

            <Link href="/about" className="link-underline t-small mt-8 inline-block" style={{ fontVariationSettings: '"wdth" 100, "wght" 560' }}>
              More about how I work
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
