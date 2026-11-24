# Visual milestone 1 — implementation and review guide

**Head branch:** `feature/portfolio-visual-editorial-20261123`
**Base:** `feature/portfolio-evidence-anonymization-20261123`
**Release status:** Draft review only. Do not merge into main or deploy to production.

## Changes delivered

1. Replaced the plain homepage heading with a branded AI Engineer hero, direct case-study CTA, contact path and a source-neutral technical systems illustration.
2. Created `SystemCanvas.tsx`: original static, accessible SVG illustration describing intent → reasoning → validation → authorized operations. Clearly labeled conceptual, not a client screenshot or operational metric.
3. Replaced cramped animated horizontal featured rows with six large image-led editorial cards, using existing sanitized, original architecture assets. No fake screenshots.
4. Added an engineered job-intelligence lab teaser with an explicit public-versus-private evidence distinction.
5. Upgraded the full work index into responsive cards while retaining delivery-stage filtering and the separation of business systems from educational demos.
6. Reused the white/black/purple design system. CSS hover and focus treatments are progressive enhancements and reduced-motion-aware. Removed client-side GSAP work-row animation dependencies from featured cards.

## Reviewer checklist

- Test hero heading wrap at 320, 375, 390, 768, 1024 and 1440 pixels; confirm the role remains visible before animations/JavaScript.
- Check desktop two-column and mobile single-column featured layouts; diagrams are illustrative textures and captions must remain truthful.
- Test all six selected cards and sixteen index cards for keyboard navigation and focus visibility.
- Confirm the non-interactive technical SVG does not create false platform or performance claims; all labels must be readable at useful screen sizes.
- Check no-horizontal-overflow, reduced motion, no-JavaScript fallback, image loading, metadata and client-name privacy.
- Check contrast in dark visual panels and small uppercase text, interactive touch targets and the header/mobile navigation.
- Run `npm ci`, `npm run lint`, `npm run build`, `npm test`, and Playwright smoke checks.
- Verify Vercel preview exact SHA, capture and inspect mobile/desktop screenshots. Browser checks do not replace actual phone testing.
- Security and sensitive-identity release gates remain governed by the base draft PR and real external privacy input.

## Deferred

- Approved real dashboard screenshots, recordings and project-specific visual media require client publication authorization.
- Full case-study page layouts remain a later visual milestone; this pass prioritizes homepage and project discovery.
- The underlying source and deployment certification status of client applications has not changed.

## Stop conditions

Do not merge, publish client secrets, invent UI evidence, change client systems, launch the portfolio or publish unapproved media.
