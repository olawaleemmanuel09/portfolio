import { others } from "@/lib/data/projects";
import Reveal from "@/components/motion/Reveal";
import MoreRow from "@/components/sections/MoreRow";

export default function MoreWork() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-24 pt-24 md:px-8 md:pb-32 md:pt-28">
      <Reveal>
        <div className="mb-12">
          <span className="mask block"><span className="t-h2">Also built</span></span>
          <span className="rule-draw mt-6 block h-px w-full bg-rule" />
        </div>
      </Reveal>
      <ul className="grid gap-x-12 gap-y-0 md:grid-cols-2">
        {others.map((p) => (
          <MoreRow key={p.slug} project={p} />
        ))}
      </ul>
    </section>
  );
}
