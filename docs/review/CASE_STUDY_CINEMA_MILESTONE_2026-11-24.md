# Milestone 4 — cinematic case-study storytelling
Date: 24 November 2026
Branch: `feature/portfolio-case-study-cinema-20261124`
Parent: `feature/portfolio-cinematic-motion-20261124` (draft PR #6)

## User need

Carry the original editorial and scroll-responsive design from the homepage into the sixteen project narratives. Prior generic two-column case layouts obscured the real operational problem, engineering decisions and verifiable outcome.

## Implemented

- A case-by-case editorial cover with split-word title choreography, archival/architectural preview, project context, delivery status, technology boundaries and optional **dated verified metrics**.
- A sticky chapter rail with native deep links, current-section indication and no-JavaScript navigation.
- Five sequential chapters, conditionally rendered when the project has supporting evidence: **Visual record**, **Challenge**, **Engineering**, **The decision**, **Outcome**.
- A strong problem/solution section using numbered engineering responses taken directly from the existing per-project `approach` data.
- A contrasting dark **engineering and verification** section preserving the original `engineeringEvidence` facts, qualification states, explicit blockers and publication notes without rewriting or inventing them.
- A decision chapter and close-out linking to the next project.
- GSAP motion as progressive enhancement: header title words rise in sequence, verified gallery cards and section content shift with scroll, and the archival hero gently advances on larger screens. No text, navigation, release qualification or metric depends on JS.
- The motion component is keyed by slug and cleans up GSAP contexts when navigating between different case studies.
- Existing media assets, alt text, labels and full-resolution opening links are preserved.

## Strict evidence boundaries

- CEFA 127 onboarded student accounts, 10 groups, 113 non-deleted chat messages are a *November 24, 2026 snapshot*, not live concurrent totals.
- The historic multi-source job workflow screenshot is not today's authenticated execution record; separate historical one-source public export.
- The company managing 1,000+ guards is client scale, not application adoption.
- Private restaurant operations, real-estate messaging integration and headquarters GPS acceptance retain their recorded release gates.
- The prospect qualified-for-call aggregate is withheld until the live database can be queried.
- The previously approved anonymization of the restaurant and security clients remains mandatory. Do not add private names, client screenshots, phone records, beneficiary details or sales promises.

## Verification

1. Install, lint, production build, node tests, synthetic privacy smoke.
2. Existing browser checks at 320, 375, 768, 1024, 1440 and 320px no JS with reduced motion; verify no document overflow and all sixteen case routes.
3. Test native case chapter anchors and case heading at representative pages, verified CEFA figures and accessible gallery images.
4. Run normal-motion Playwright at 390 and 1440 on a case with multiple archival images, validating title words, motion hydration, no page exceptions and scroll chapter navigation.
5. Capture case hero screenshots at 390 and 1440 plus the first challenge section for visual QA.
6. Independent Codex critical review with severity-ranked findings, especially GSAP cleanup/route transitions, hierarchy, keyboard nav, sticky rail and mobile layout.
7. External private-identifiers scan still requires the release owner's private terms file; CI's synthetic scan does not certify that step.

## Explicitly not in this milestone

No merge to `main`. No production deployment. No external client API, credentials, Supabase or other application write. No fabricated product screenshots, fictional customer quotes, revenue or growth figures. No new third-party motion dependency.
