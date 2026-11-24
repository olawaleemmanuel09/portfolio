"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/work#lab", label: "Engineering lab" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "CV" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      setScrolled(y > 24);

      // ignore rubber-banding and tiny jitter
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 140);
        lastY.current = y;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) menu.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <header
        data-hidden={hidden}
        className={`fixed inset-x-0 top-0 z-40 transition-[transform,background-color,border-color] duration-500 [transition-timing-function:var(--ease-out-expo)] data-[hidden=true]:-translate-y-full focus-within:translate-y-0 ${
          scrolled ? "border-b border-rule bg-paper/90 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 md:px-8 lg:px-12">
          <Link
            href="/"
            className="studio-header-brand"
          >
            <span className="studio-header-monogram" aria-hidden="true">OO.</span>
            <span>Olawale Olaonipekun</span>
          </Link>

          <nav className="hidden items-center gap-4 md:flex lg:gap-7">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="t-small group relative py-1 studio-nav-link">
                {l.label}
                <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-[var(--color-accent)] transition-transform duration-[400ms] [transition-timing-function:var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <noscript><Link className="md:hidden" href="/work">Work</Link></noscript>
          <button
            onClick={() => { menu.current?.showModal(); setOpen(true); }}
            className="t-small md:hidden studio-mobile-menu"
            aria-expanded={open}
            aria-controls="menu"
          >
            Menu
          </button>
        </div>
      </header>

      <dialog
        ref={menu}
        aria-label="Navigation"
        onClose={() => setOpen(false)}
        id="menu"
        data-open={open}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none flex-col overflow-auto bg-paper px-6 py-5 open:flex"
      >
        <div className="flex items-center justify-between">
          <span className="t-small text-muted">Menu</span>
          <button onClick={() => menu.current?.close()} className="t-small" tabIndex={open ? 0 : -1}>
            Close
          </button>
        </div>

        <nav className="mt-20 flex flex-col gap-5">
          {links.map((l, i) => (
            <span key={l.href} className="mask block">
              <span style={{ transitionDelay: open ? `${160 + i * 70}ms` : "0ms" }}>
                <Link
                  href={l.href}
                  onClick={() => menu.current?.close()}
                  className="t-display-sm"
                  tabIndex={open ? 0 : -1}
                >
                  {l.label}
                </Link>
              </span>
            </span>
          ))}
        </nav>

        <div className="mt-auto flex gap-6">
          <a href="mailto:olawaleemmanuel100@gmail.com" className="t-small text-muted">Email</a>
          <a href="https://github.com/olawaleemmanuel09" className="t-small text-muted">GitHub</a>
          <a href="https://x.com/LaoniAI" className="t-small text-muted">X</a>
        </div>
      </dialog>
    </>
  );
}
