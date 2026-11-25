"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/work", label: "Projects" },
  { href: "/#v2-principle", label: "Approach" },
  { href: "/about", label: "About" },
  { href: "/work#lab", label: "Engineering lab" },
];
const actions = [{ href: "/resume", label: "View CV" }, { href: "/contact", label: "Get in touch" }];

export default function Header() {
  const pathname = usePathname();
  const home = pathname === "/" || pathname === "/design-preview";
  return <>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">Skip to content</a>
    {!home && <InteriorHeader key={pathname} />}
  </>;
}

// A route change unmounts the menu owner and releases its scroll lock.
function InteriorHeader() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)");
    const close = () => { if (desktop.matches) menu.current?.close(); };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  return <>
      <header className="v2-interior-header">
        <div className="v2-interior-header-inner">
          <Link href="/" prefetch={false} className="v2-interior-brand">Olawale Olaonipekun</Link>
          <nav className="v2-interior-nav" aria-label="Main navigation">
            {links.map(l => <Link prefetch={false} key={l.href} href={l.href}>{l.label}</Link>)}
          </nav>
          <div className="v2-interior-actions">{actions.map(l => <Link prefetch={false} key={l.href} href={l.href}>{l.label}</Link>)}</div>
          <noscript><Link prefetch={false} className="v2-interior-noscript" href="/work">Projects</Link></noscript>
          <button type="button" className="v2-interior-menu" aria-expanded={open} aria-controls="menu" onClick={() => { menu.current?.showModal(); setOpen(true); }}>Menu <span aria-hidden="true">+</span></button>
        </div>
      </header>
      <dialog ref={menu} aria-label="Navigation" id="menu" onClose={() => setOpen(false)} className="v2-interior-dialog">
        <div className="v2-interior-dialog-top"><span>Olawale Olaonipekun</span><button onClick={() => menu.current?.close()} type="button">Close ×</button></div>
        <nav>{[{href:"/",label:"Home"},...links,...actions].map(l => <Link prefetch={false} key={l.href} href={l.href} onClick={() => menu.current?.close()}>{l.label}</Link>)}</nav>
      </dialog>
  </>;
}
