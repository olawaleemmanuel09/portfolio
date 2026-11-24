"use client";

import { useEffect, useState } from "react";

type Chapter = { id: string; label: string };

export default function CaseChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const sections = chapters.map(({ id }) => document.getElementById(id)).filter((item): item is HTMLElement => !!item);
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (!visible.length) return;
      visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      setActive(visible[0].target.id);
    }, { rootMargin: "-19% 0px -62% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav aria-label="Case-study chapters" className="case-chapter-nav">
      <div className="case-chapter-nav-inner">
        <span className="case-chapter-nav-label">READ THE CASE <span aria-hidden="true">/</span></span>
        <ol className="case-chapter-nav-list">
          {chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                className="case-chapter-nav-link"
                aria-current={active === chapter.id ? "location" : undefined}
                onClick={() => setActive(chapter.id)}
              >
                <span className="case-chapter-nav-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{chapter.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
