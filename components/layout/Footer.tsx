import Link from "next/link";

const channels = [
  { href: "mailto:olawaleemmanuel100@gmail.com", label: "Email" },
  { href: "https://github.com/olawaleemmanuel09", label: "GitHub" },
  { href: "https://x.com/LaoniAI", label: "X" },
];

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="t-small text-muted">
          Olawale Emmanuel Olaonipekun. Lagos, Nigeria. Available for contract work.
        </p>
        <nav className="flex gap-6">
          {channels.map((c) => (
            <Link key={c.label} href={c.href} className="t-small">
              {c.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
