# M8 — Launch candidate hardening
Parent: c365766cb216420c9fc6fe6078cc8b5436272435 (PR #11). No production deployment.

## Verified prior gate
PR #11 Codex code review completed without findings. Vercel preview Ready. GitHub Actions run 45467903097 failed at npm test, after lint, build and synthetic privacy smoke succeeded. The first failing assertion at tests/review.test.mjs:110 compared raw OG URL attribute serialization on the homepage. Browser checks were skipped. M8 compares URL semantics with explicit missing-tag assertion; root-cause hypothesis is serialization or attribute order, and actual rerun must confirm.

## Changes
- Bound contact request body (declared and streamed) to 32 KiB, exact JSON media type, bounded per-instance address map. Per-instance throttle is not a distributed abuse control; Vercel edge rate limits or durable rate limiting remain a release consideration.
- Prevent duplicate in-flight client submissions, bound fields and timeout requests; success announcement.
- Respect Save-Data for smooth scrolling and route transition; desktop fine pointer only for Lenis. Route animation owns its own triggers. Prevent delayed font callback after unmount; keep project brief and contact headings static.
- Add HTTP security/header regression tests, Save-Data browser tests and cold video transfer checks. No new media or metrics. Existing privacy and motion constraints preserved.

## Release gates — NOT yet certified
1. CI run for M8 must pass lint, build, HTTP, privacy smoke and all browser checks. Inspect actual screenshots at phone/tablet/desktop and obtain owner sign-off on hero and motion.
2. Independent Codex code and security review; fix every material finding.
3. Run real private-identifier scan with owner-controlled terms outside the repository; inspect approved screenshots/video frames/posters for personal information and identifiers. Synthetic smoke is not actual privacy certification.
4. Review Vercel preview noindex header, production canonical domain and environment values. Confirm sender verification and a controlled contact delivery test before public form certification. No live mail sent by this milestone.
5. Measure performance using throttled mobile browser/Lighthouse and real devices; compare previous candidate. Browser smoke checks are not measured Core Web Vitals. No numerical performance claim.
6. LeadReach screenshots and withheld beneficiary image remain excluded pending clearance. No launch without owner visual approval and explicit production permission.
