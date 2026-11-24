# M9 — Release gate, not production promotion
Parent b23cb211f0c9c42057d4297ce2893d16e0201d3d (draft PR #12).

## Findings confirmed
- Codex P2: forged forwarding headers plus capacity denial locked out new users; reproduced by reviewer.
- M8 npm lint, build, synthetic privacy smoke, npm test and responsive browser smoke passed. Normal-motion checks failed at the added Save-Data predicate because it used a bare expression incompatible with the site's CSP. Keep CSP intact and use a function predicate, consistent with existing tests.

## Changes
- Trust Vercel ingress address only when running on Vercel, validate IP syntax; standalone Node ignores all supplied forwarding headers. Reference https://vercel.com/docs/headers/request-headers.
- Validated mail attempts only; bounded LRU eviction instead of denial at capacity, Retry-After header. This is instance-local; a durable/global throttle or edge limit remains an infrastructure consideration.
- Add regression tests for spoofing, malformed submissions, new visitor admission at capacity and expiry. No live email sent.
- Fix both Save-Data predicates without relaxing CSP.

## Before promoting
- Verify CI and Codex review for this exact candidate, including security review status.
- Review actual mobile/desktop screenshots and motion, confirm user visual approval.
- Run owner-controlled private-term scan on candidate build and manually inspect media; synthetic smoke does not certify privacy.
- Verify production SITE_URL, contact sender configuration and controlled delivery; measure mobile performance.
- Obtain explicit production approval; review the complete stacked diff against main and retain previous production deployment for rollback. Do not merge intermediate branches into production before certification.
- Once deployed, smoke-test home, work, contact and sitemap/robots/canonical URLs. Confirm absence of production noindex and correct preview noindex. Register/verify Search Console and Bing properties and submit sitemap only after public URL is verified. No rankings guaranteed.

No production deployment, external webmaster registration, actual private-term certification, measured performance or owner visual sign-off performed in this milestone.
