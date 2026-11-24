# Motion milestone 3 — cinematic editorial engineering portfolio

**Reference studied:** Aitezaz Sikandar's publicly available Next.js portfolio source (Aitezaz `HomeBanner`, `HomeScrollOrchestrator`, `Projects`, `ScrollWordReveal`, `SmoothScrollProvider`). The reference employs staggered GSAP type entrances, scroll-driven hero composition, interactive project media, section layering and reduced-motion guards. These are general motion-design principles; no reference code, copyrighted media, proprietary animation assets or branding were copied into this repository.

**Branch:** `feature/portfolio-cinematic-motion-20261124`
**Base:** `feature/portfolio-studio-editorial-20261124` / draft PR #5.
**Review only:** no main merge, public launch, client data changes or permission escalation.

## What was implemented

1. **New hero composition:** an original three-line "Business problems. Working systems." statement with large kinetic typography and authentic archival n8n image. The opening viewport uses a sticky desktop studio that gives the project record room to move into focus as the visitor scrolls. Its real screenshot is captioned with a historical-evidence qualifier.
2. **GSAP timeline entrance:** staggered masked headline lines with a short 3D tilt, kicker, copy and two usable CTAs, image curtain and navigation cue. No blocking page loader, font download or asset autoplay.
3. **Scroll narrative:** controlled exit of the hero copy, media advancement, image depth and a long dark manifesto with sequential word emphasis. Motion extends to the case-study entrance, editorial headings, proof and lab sections. Nothing important is only discoverable through animation.
4. **Pointer response:** a restrained perspective rotation of the archived workflow on hover-capable desktops. Disabled for touch and reduced-motion preferences.
5. **Mobile:** no pinned hero or cursor effects below 1024px. The headline, copy, calls to action and workflow image stay in normal document flow. No-JS and reduced-motion visitors receive fully readable static content.
6. **Current stack:** uses already-installed GSAP and ScrollTrigger, and existing Lenis integration; no Three.js, Framer Motion, paid plugins, new icon or font packages.

## Tests and release criteria

- `npm ci`, lint, build, node tests, synthetic privacy scan and all existing browser scenarios.
- Normal-motion Playwright at 390px and 1440px. Assert hero timeline initialized, headline and image rendered, no browser exceptions or horizontal scrolling, and that desktop wheel-scrolling changes the media's transform.
- Reduced-motion/no-JS 320/375/768/1024/1440 static QA remains.
- Capture `motion-hero-390.png`, `motion-hero-1440.png`, `motion-hero-scroll-1440.png` and existing gallery screenshots. Examine visual composition at 1366 × 635 as well before final review.
- Check CWV, smooth-scroll lifecycle, GSAP cleanup and no synchronous animation-heavy startup on low-end phones.
- Keep dated CEFA numbers, archived workflow evidence, client anonymity and unverified provider claims unchanged.

## Codex release blocker: desktop static workflow caption

Codex review identified a real P2 problem: the first hero composition placed the real archive-image citation and case link underneath a clipped sticky viewport on reduced-motion, no-JS or Save-Data desktops. It is not acceptable to make documentation depend on animation. Fixed by using a smaller, properly framed card within the **initial viewport**, positioning its bottom at +1.25svh rather than a negative viewport offset. The serif line is reduced slightly so the actual screenshot no longer visually collides with the purple title. Added explicit reduced/no-JS viewport QA at 1366×635 and 1440×900 that asserts the caption's bounding rectangle fits onscreen. The same static baseline is used by normal motion, which enhances rather than rescues critical content.
