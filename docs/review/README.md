# Portfolio preview for independent review

Browser captures from the local Next.js production build. Open a capture to inspect the layout at its original size.

| Page | Desktop, 1440 px | Mobile, 320 px |
| --- | --- | --- |
| Homepage | [Desktop](home-1440.png) | [Mobile](home-320.png) |
| CEFA | [Desktop](work-cefa-1440.png) | [Mobile](work-cefa-320.png) |
| AI Job Intelligence & Alerts | [Desktop](work-ai-job-scraper-1440.png) | [Mobile](work-ai-job-scraper-320.png) |

Review the [claim register](../PORTFOLIO_CLAIMS_REGISTER.md) alongside the [project catalog](../../lib/data/projects.ts). Inspect CEFA delivery status, public versus private job-alert evidence and the distinction between legacy ordering and the Ride rebuild.

To reproduce the preview from this branch, run `npm ci`, `npm run build` and `npm start`. The server serves the homepage, filterable work index and all case studies. The CV path uses an email request until a current approved PDF is available.

For verification run `npm run lint` and `npm test` after the build. The HTTP tests spawn a separate server with email credentials cleared. Browser smoke checks and their setup are in the [review workflow](../../.github/workflows/review.yml).

Rollback before merge consists of closing any review PR and leaving the default branch at its existing revision. A production rollback is unnecessary for these branch-only changes.
