# Engineering portfolio release candidate

**Decision requested:** independent review of the candidate and its evidence boundaries. The tested application revision is `712c2a5` on `olawaleemmanuel09/portfolio:feature/portfolio-production-engineering-reposition`. Base main was `8ec936e`. The handover follows in a documentation-only commit on the same branch.

[Portfolio comparison](https://github.com/olawaleemmanuel09/portfolio/compare/main...feature/portfolio-production-engineering-reposition) · [Implementation diff and exact file inventory](https://github.com/olawaleemmanuel09/portfolio/commit/712c2a5) · [README branches and commits](GITHUB_README_AUDIT.md)

## Changes since the last review

- Replaced the mobile navigation overlay in components/layout/Header.tsx with a native modal dialog. Keyboard users can enter the menu, cycle through it, dismiss it and return to the opener. The menu closes when the desktop layout activates.
- Removed 38 unused images and videos from public/work on the review branch. Leaving them unlinked still allowed direct downloads. The candidate retains the author headshot. Removed the unused ProofVideo component. The prior files are recoverable from ae848bf.
- Expanded tests/browser_smoke.py to cover five widths, the CV route, reduced motion, keyboard interaction and a JavaScript-disabled pass. Captured the homepage and two case studies at mobile, tablet and desktop sizes.
- Completed the job-alert README verification requirements at 667469b. The other five verified README commits carry forward. Medolic and Voice Booking remain drafts.
- This review directory contains the handover, README audit, evidence matrix, release checklist and screenshot index. The [claim register](../PORTFOLIO_CLAIMS_REGISTER.md) holds the underlying source revisions.

## How to review

Start with [the screenshot index](README.md), [the content evidence matrix](CONTENT_EVIDENCE_MATRIX.md) and [the measured QA results](RELEASE_READINESS_CHECKLIST.md). Inspect CEFA first, then compare the operating commerce system with the separately staged Ride rebuild. In the lab, check that a reader can distinguish the two historical job-alert artifacts from the private seven-source system.

For a local interactive review, run npm ci, npm run build and npm start in the portfolio checkout. The contact route has an email fallback. The automated HTTP tests clear provider credentials and do not send email.

## External review gates

GitHub accepted feature-branch pushes. The PR API denied access, so there are no verified draft PR URLs for these changes. Restoring PR-capable access is required to check for existing PRs and open the remaining drafts. No Vercel account/project binding or authenticated preview deployment was available in this checkout. The local preview relay was unavailable. No hosted preview URL has been verified.

After the draft PRs exist, confirm the Vercel preview belongs to the candidate SHA, opens successfully and exercises the work, CV and contact paths. Review the intended canonical domain and preview indexing settings. Confirm client media permissions before restoring any asset. Quantified impact, current private workflow execution, testimonials and an updated CV need owner evidence before addition. Independent acceptance and explicit owner approval are required before production promotion.

## Rollback

Main and production were untouched. To decline the release, leave the feature branches unmerged. To revert just the application changes from this milestone, revert 712c2a5 on the portfolio feature branch and rerun checks; that revert also restores the retired public files, so review media clearance before proposing it. The six documentation branches can be reviewed or declined independently.
