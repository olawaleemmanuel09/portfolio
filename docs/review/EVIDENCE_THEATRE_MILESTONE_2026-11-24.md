# Milestone 5 — Evidence theatre and launch-oriented media UX
**Branch**: `feature/portfolio-evidence-theatre-20261124`
**Parent**: `feature/portfolio-approved-media-20261124` (draft PR #8)
**Date**: 24 November 2026

## Goal
Make the approved authentic screenshots easy to examine and credible to a recruiter or nontechnical decision-maker. The original business problems, stage qualifications, dated CEFA numbers, sanitized files and verified test status must not change.

## Implemented
- Real project screenshot figures remain in the HTML; an interactive, keyboard-accessible native `<dialog>` opens on an ordinary image-link click.
- Tab/Shift+Tab remain inside the native dialog. Escape closes it and focus returns to the originating screenshot. Left/Right arrows and labeled buttons navigate between available images. All original images can be opened directly in new tabs.
- Without JavaScript, images retain their `href` and display directly as image files; the figure-index rail uses native hash links with responsive scroll-margin. Modified clicks continue using normal browser behavior.
- No AI-generated screenshots, synthetic fake dashboards or re-created graphics; all images come from existing approved redactions.
- Video remains `controls`, `preload="none"`, `poster`, `playsInline` and no autoplay. Video files are not loaded into the screenshot dialog.
- LeadReach's owner-reported **50,000 discovered prospects** has a dedicated source-labelled proof block, separate from the `metrics` array reserved for verified counts. Qualified-for-call, conversion and live database totals are not invented.
- Existing CEFA 127 student / 10 group / 113-message figures remain explicitly dated to 24 November 2026.

## QA gates
- Review actual head GitHub Actions for npm lint, production build, node tests, privacy synthetic smoke, browser smoke and real-motion browser tests.
- Playwright at 320, 375, 768, 1024, 1440 + no-JS at 320. Open CEFA evidence viewer, navigate with ArrowRight, close using Escape and assert focus restoration.
- Check native anchor fallback, figure rail, captions, image alt text, no oversized video fetch on landing.
- Production clients remain isolated. A real private-identifier check using the owner's private terms file must happen before merging.
- Christ Heart beneficiary/faces screenshot is withheld pending independent consent and anonymization. Do not silently insert it.
- Keep stacked PRs as draft; no production release or branch merges.

## Known constraints
This improves viewing of authentic approved imagery. It does **not** certify the staged restaurant financial workflows, secure workforce GPS attendance, Elion real WhatsApp handoff, live prospect totals, or current archived job integration health.
