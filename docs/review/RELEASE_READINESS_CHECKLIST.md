# Release readiness · local candidate

| Check | Observed result |
| --- | --- |
| Dependencies | Frozen npm install succeeded with 367 packages. Lockfile diff empty. npm reported deprecated ESLint 9 and an unapproved unrs-resolver install script. Lint and build succeeded with the installed dependency set. |
| Static verification | ESLint, explicit TypeScript no-emit check and Next.js production build passed. Build generated 26 static outputs. |
| Portfolio tests | Four suites of assertions passed across public routes and metadata, identity and workflow evidence, delivery filter, contact input rejection and email fallback. Mail credentials were cleared in the test server. |
| Link coverage | 21 unique sitemap URLs. All 375 rendered internal anchor occurrences resolved to a page and any referenced fragment. All 12 relative README links resolved. |
| Responsive and accessibility checks | 36 page/viewport combinations passed on Chromium. Home, work index, CEFA, job alerts, contact and CV at 320, 375, 768, 1024 and 1440 pixels, plus 320 with JavaScript disabled. One H1, no horizontal overflow, and main images carried alt attributes. |
| Keyboard and motion | Native mobile dialog took focus on Enter, prevented tabbing into main content, closed on Escape and restored trigger focus. Lab navigation passed. Reduced-motion emulation was active; Lenis was absent. This is targeted browser coverage, not screen-reader certification. |
| Privacy | All 38 retired work-media URLs returned 404 on the candidate. Author headshot retained. Earlier Git history and the existing deployment are outside this change. |
| Security review | Contact route validates host/origin and JSON shape, cleans field lengths and passes user content as plain email text. No raw HTML insertion found under app or components. Local responses included CSP, denied framing and referrer policy. |
| Remaining hosting risks | Contact throttling uses process-local state and forwarded IP headers. Confirm trusted proxy behavior, shared rate limits and platform body-size limits. CSP permits inline scripts for Next.js bootstrapping. No live email, hosted infrastructure or provider security certification was tested. |
| Release gates | Draft PR creation and hosted preview access remain blocked. CI execution, preview-domain mapping, actual hosted behavior, independent review and owner approval are outstanding. |

## Mobile performance sample

One cold Chromium context per URL, production server on loopback, 375 × 812, reduced motion, 150 ms simulated latency and 200,000 bytes/s download. No CPU throttle. Browser transfer totals include the main document and completed resource entries sampled 700 ms after load, including framework prefetches.

| Page | First contentful paint | Load event end | Transfer bytes | Video elements |
| --- | ---: | ---: | ---: | ---: |
| Home | 732 ms | 1,893 ms | 325,726 | 0 |
| CEFA | 640 ms | 1,819 ms | 312,948 | 0 |
| AI Job Intelligence | 664 ms | 1,773 ms | 313,067 | 0 |

The three routes painted within 0.74 s in this sample. JavaScript and other resources continue loading after paint. Real-device CPU, Vercel edge latency and production Core Web Vitals remain unmeasured.

## Follow-up implementation branch: evidence and anonymization

The original local QA figures above belong to the previous candidate, not this branch. A separate review branch now adds nine static, source-derived architecture diagrams, expanded technical evidence sections, and public-client anonymization. Its **new build, automated route tests, interactive browser checks, and hosted preview must run again** before merge. Do not transfer the previous candidate's pass counts to this new commit.

Outstanding: confirm that the nine SVGs load, that responsive views stay within width, that all 16 routes render and that restricted client labels are absent from public output. Obtain approval for any future client screenshots; do not restore retired media automatically. Production data, client deployments, password stores and payment providers remain untouched.

- **Private-identifier scan:** committed unit tests assert approved public identities structurally; the actual client-name list must be supplied outside the repository to `PORTFOLIO_PRIVATE_TERMS_FILE` and run with `node scripts/check-private-names.mjs`. This external release gate is not satisfied by standard CI alone.

## Privacy scanner review closure and route QA

Codex follow-up review at `0e32d667` identified two P2 scanner defects: omitted public assets/generated output and unsafe diagnostic filenames. The next commit addresses both with full `public`/`.next` coverage, filename-aware matching and non-disclosing diagnostics. Synthetic regressions are part of `npm test`. Playwright additionally checks every project case-study route and the retired security route's 404 response.

**Important:** automated CI executes the synthetic checks only. Final release requires an approved external restricted-identifiers file, `npm run build`, and `PORTFOLIO_PRIVATE_TERMS_FILE=... npm run privacy:check` on the exact release checkout. Never log the file or its entries.
