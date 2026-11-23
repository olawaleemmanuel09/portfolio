import { featured } from "@/lib/data/projects";
import Reveal from "@/components/motion/Reveal";
import WorkRow from "@/components/sections/WorkRow";

export default function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-[1180px] px-6 pb-8 pt-24 md:px-8 md:pt-32">
      <Reveal>
        <div className="mb-14 flex items-baseline justify-between gap-6">
          <h2 className="t-h2">Selected systems</h2>

        </div>
        <span className="rule-draw mb-4 block h-px w-full bg-rule" />
      </Reveal>

      <Reveal as="ol" className="relative">
        <span
          aria-hidden
          className="connector absolute left-[5px] top-4 hidden h-[calc(100%-4rem)] w-px bg-rule md:block"
        />
        {featured.map((p) => (
          <WorkRow key={p.slug} project={p} />
        ))}
      </Reveal>
    </section>
  );
}
