# Approved case-study media milestone — 24 November 2026

## Goal
Replace illustrative-only project galleries with **real, selectively redacted** screenshots and mobile recordings. Every approved media file is an actual historical or staged capture; none has been synthesized. The underlying project claims remain as qualified in the published case text.

## Published sanitized assets
Under `public/evidence/approved/`:
- CEFA: `learning-portal-sign-in.jpg`, `learning-push-notifications.jpg`, `learning-portal-demo.mp4` plus its poster
- Three-branch restaurant: `restaurant-branch-overview.jpg`, `restaurant-menu-admin.jpg`
- Security workforce: `security-hq-overview.jpg`, `security-guard-shift.jpg`
- Elion Sales Command: `real-estate-conversations.jpg`, `real-estate-sales-overview.jpg`, `real-estate-leads.jpg`, `real-estate-properties.jpg`
- Elion public website: `real-estate-website-mobile.mp4` plus its poster
- Historical personal job-alert demonstration: `job-alert-notifications.mp4` plus its poster

All three MP4s are H.264 and contain no audio. They use native controls, `preload=none`, no autoplay and a still poster for slower networks. Full-length uploaded originals are **not** published. The CEFA video is trimmed before personal browser share/home-screen sequences, with address-bar and device chrome cropped out. The job-alert video shows historical alerts rather than current openings or provider status.

## Specific redactions and exclusions

- Restaurant screenshots: removed client name/logo and staff identifier from publication copies. A prior test **rider/dispatch dashboard** has been deliberately excluded because the agreed newer release uses manually coordinated delivery; showing that historical rider UI as current would be misleading.
- Security screenshots: removed client name/logo and selected staff/site details. Screens depict a **staged test environment**; their guard/site totals do not establish active production adoption.
- Real-estate sales screenshots: masked synthetic contact identifiers; local-development and sample data remain visibly labeled. The illustrated conversation takeover control is not proof of connected live-provider handoff or AI sales deployment.
- CEFA screenshots: browser domain and unrelated notifications/private phone context cropped or obscured. The two notifications are device-level examples, not a measured notification-delivery rate.
- The green CEFA **speaker flyer** was not included as student-platform product evidence; it is a separate future education event.
- The prior Christ Heart website image was located in the old repository at `public/work/christheart-homepage.png`, but its hero visibly depicts identifiable people. Prior online display does not establish consent to republish beneficiary portraits. The public case keeps its conceptual architecture diagram until a privacy-cleared crop or authorized image is available.
- No LeadReach screenshots were supplied yet. Do not fabricate a dashboard.

## LeadReach boundary

A **separate** `leadreach-prospect-intelligence` case records **50,000 prospects discovered** as reported by the portfolio owner in November 2026. It is not a verified database count, a count of call-qualified prospects, outreach completions, meetings or sales. The separate restaurant-prospecting case retains its historical dated figure; these programmes must not be combined.

## QA checklist

1. Run `npm ci`, `npm run lint`, `npm run build`, `npm test`, static and normal-motion Playwright.
2. Inspect JPG/MP4 magic bytes and sizes; verify all `/evidence/approved/` media paths respond with HTTP 200 and the appropriate content type.
3. Confirm iPhone 320/375px and desktop hero/gallery fit, especially portrait videos, original image links and cover labels.
4. Check every hidden identifier and synthetic record visually; do **not** rely on CSS blurring of unredacted originals. Confirm no sensitive original is present under `public/` from this PR.
5. Run the external restricted-name scanner with the private release terms file; CI's synthetic privacy smoke is not final clearance.
6. Verify original published NGO image remains excluded pending rights/privacy confirmation.
7. Ensure Codex's independent review is addressed before any branch merge or production deployment.
