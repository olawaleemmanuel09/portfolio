# Client publication and anonymization review

**Scope:** portfolio review branch only. This is a public-content handling policy, not an edit to any client application.

## Public identities

- Restaurant implementation: **Three-Branch Restaurant Operations Platform**, with a separate historical conversational-ordering case and a prospect-research case.
- Security implementation: **Security Workforce & Operations Management Platform**.
- The nonprofit and real-estate website use their approved public-facing names, without reproducing private staff, assistance, customer or property records.

## Enforcement and review

- Generic public names replace client identifiers in project catalog titles, summaries, slugs, media captions and source-facing evidence descriptions.
- Nine new architectural SVGs use synthetic role and branch terms. They do not show real customer records, dashboard screenshots, account data, guard positions or hidden deployment URLs.
- The old security case slug is no longer a generated public project route. Avoid promoting obsolete client-branded links in navigation, sitemap and share metadata.
- A private restricted-word scan must be applied to the built site and repository public text before release. Do not commit the actual restricted-name list; the static test verifies the approved case and diagram structure instead.
- **Not remediated by this branch:** historical Git commits, old Vercel deployments and previously shared assets. Investigate exposure separately with owner authorization; do not rewrite Git history, purge or remove any production resources from this task.

**Review state:** source substitutions completed on the implementation branch. Automated and hosted rendering checks, historical exposures and client publication permissions remain separate release gates.

## Private-term scan implementation

`scripts/check-private-names.mjs` accepts `PORTFOLIO_PRIVATE_TERMS_FILE`, a newline-separated list of private identifiers stored **outside the repository**. It scans public source/docs and locally built server output without echoing the restricted values. Invoke it after a clean build; failure exits nonzero with file paths only. It intentionally does not run with placeholder names or embed private identities in committed tests. An owner-provided external input is required to certify the full scan. Prior commits on the review branch and historical deployments remain separate exposure concerns.
