# V2.4 + V2.5 — site integration and constrained-mobile hardening
Owner approved the visual direction of a71a4fae080353a6d9cc5c08d2aca54438841816. Production release is NOT approved. The approved home is now the branch's root and /design-preview remains a noindex alias for review; main is not touched. Existing case routes, 17 case records, evidence gallery, media provenance, structured data, contact API and sitemap stay intact. Interior navigation, typography, neutral surfaces, and footer align with the approved home. CEFA metrics use the dated catalog snapshot, not a claim of current counts.

## Codex findings addressed
- Header uses actual GSAP timeline progress and a neutral brown intermediate surface, not raw scroll progress. Light state begins before zoom covers header.
- Focused hero links are raised over the white handoff; visible focus and keyboard reachability retained.
## Mobile policy
- No global Lenis or route sweep. Native scroll in both directions.
- GSAP deferred via dynamic import only for desktop fine pointer, adequate viewport, no reduced motion, no Save-Data and no 2G/3G indication. Resize and connection changes tear down enhancement; no-JS static content remains available.
- No animated hero on phones. Fixed-dimension compressed WebP, plain static copy, no autoplay or additional video. Evidence remains click-to-play.
- Native accordion; bounded media size, lazy loading; no speculative Next link prefetch on home, archive and case links. No continuous effects or backdrop blur on coarse pointers.
- CI adds Chromium mobile touch gestures with 4x CPU throttle, 500 kbps downstream/250 kbps upstream/300ms latency and Save-Data. Metrics logged, not claimed passed until CI. No field measurements or physical-device tests in this GitHub-only session.
## Verification
Existing HTTP/SEO/contact/privacy/evidence tests preserved; obsolete homepage layout assertions replaced with approved V2 checks; desktop forward/back, contrast, focus, reduced motion and static case assertions. Actual CI, Codex review, physical low-end Android/iPhone, visual comparison of interior routes, measured performance and final production approval remain gates. No merge or production promotion.
