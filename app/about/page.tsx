import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import MaskLines from "@/components/motion/MaskLines";

export const metadata: Metadata = {
  title: "About",
  description:
    "Automation engineer in Lagos. I build systems that run production operations for restaurants, event companies and foundations.",
};

const process = [
  { n: "01", t: "Discover", b: "Sit with the actual work. What gets typed twice, what gets forgotten, where money leaks out." },
  { n: "02", t: "Design", b: "Decide what the system owns and what stays human. Most failed automation automates the wrong half." },
  { n: "03", t: "Build", b: "Ship the smallest version that runs end to end, then extend. Nothing goes live half-wired." },
  { n: "04", t: "Connect", b: "Wire it into what the business already uses. Adoption dies the moment people are asked to open something new." },
  { n: "05", t: "Deploy", b: "Move it to production properly. Credentials rotated, backups on, failures alerting somewhere a human reads." },
  { n: "06", t: "Optimise", b: "Watch what actually happens, then fix what actually breaks. The interesting bugs only appear under real traffic." },
];

export default function About() {
  return (
    <div className="mx-auto max-w-[1180px] px-6 pb-24 pt-40 md:px-8 md:pt-52">
      <h1 className="t-display max-w-[18ch]" data-hero="0">
        <MaskLines lines={["Systems that keep", "running after I leave."]} />
      </h1>

      <div className="mt-20 grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-20">
        <div data-hero="1">
          <p className="t-body prose-justify">
            I am Olawale Emmanuel Olaonipekun. I build the systems behind
            everyday business operations: orders and payments, lead follow-up,
            sales pipelines, and internal workflows that keep teams moving.
          </p>
          <p className="t-body prose-justify mt-5 text-muted">
            Six systems I have built are currently in production across a
            multi-branch restaurant group, an events company and a foundation.
          </p>
          <p className="t-body prose-justify mt-5 text-muted">
            My focus is the unglamorous part: idempotency, error paths,
            credential handling, and making sure the system still knows what to
            do at 2am when an API breaks.
          </p>
          <p className="t-body prose-justify mt-5 text-muted">
            I came to this from agriculture, a degree in pasture and range
            management, which is less of a detour than it sounds. Both are
            systems work: inputs, cycles, constraints you do not control, and
            outcomes that only show up over time. I also teach it. I run a
            cohort-based automation programme and built the platform it runs on.
          </p>
        </div>

        <Reveal>
          <Parallax className="wipe border border-rule" amount={8}>
            <Image
              src="/work/headshot.jpg"
              alt="Olawale Emmanuel Olaonipekun"
              width={860}
              height={1075}
              className="w-full"
              priority
            />
          </Parallax>
        </Reveal>
      </div>

      <section className="-mx-6 mt-24 border-y border-rule px-6 py-20 md:-mx-8 md:mt-32 md:px-10 md:py-28">
        <Reveal>
          <div className="mb-14">
            <span className="mask block">
              <span className="t-h2">How I work</span>
            </span>
            <span className="rule-draw mt-6 block h-px w-full bg-rule" />
          </div>
        </Reveal>

        <ol className="grid gap-x-16 gap-y-0 md:grid-cols-2">
          {process.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 60} variant="soft">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-6 border-b border-rule py-8">
                <span className="t-index text-[var(--color-accent)]">{p.n}</span>
                <span>
                  <span className="t-h2 block">{p.t}</span>
                  <span className="t-body prose-justify mt-2 block text-muted">{p.b}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>
    </div>
  );
}
