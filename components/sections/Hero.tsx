import MaskLines from "@/components/motion/MaskLines";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* The loop runs forward then reversed, so the graph builds and unbuilds
          without ever snapping back to an empty frame. */}
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-poster.jpg"
        aria-hidden
      >
        <source src="/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* legibility scrim: solid under the type, clearing to nothing on the right */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-paper via-paper/85 to-paper/25"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-paper to-transparent" />

      <div className="mx-auto grid max-w-[1180px] gap-y-6 px-6 pb-32 pt-44 md:grid-cols-12 md:px-8 md:pb-44 md:pt-56">
        <h1 className="t-display md:col-span-9" data-hero="0">
          <MaskLines lines={["I build automation", "that businesses run on."]} />
        </h1>

        <p className="t-lead measure-read mt-4 text-muted md:col-span-6 md:col-start-1" data-hero="1">
          Ordering pipelines, lead engines and operations platforms. Systems that
          take orders, chase payments and brief staff every morning without anyone
          opening a laptop.
        </p>

        <div className="mt-4 flex items-center gap-7 md:col-span-6 md:col-start-1" data-hero="2">
          <a
            href="#work"
            className="link-underline t-small"
            style={{ fontVariationSettings: '"wdth" 100, "wght" 560' }}
          >
            See the work
          </a>
          <a href="/contact" className="t-small text-muted transition-colors duration-200 hover:text-ink">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
