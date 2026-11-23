# Independent Codex review request

**Base:** `feature/portfolio-production-engineering-reposition`  
**Head:** `feature/portfolio-evidence-anonymization-20261123`

Review the implementation critically, **do not implement fixes or merge** without approval.

## Highest-priority checks

1. **Privacy:** inspect the diff and built output for restricted client identities, identifiable dashboard captures, private URLs, customer records, location data, incidental SVG metadata and legacy case slugs. Historical Git and deployed previews are separate exposure issues.
2. **Source and architecture accuracy:** scrutinize the management, branch manager, kitchen and accountant narratives; these are approved responsibilities, not validated production modules. Verify no invented gateway, delivery/rider or access claims. Confirm the source of truth for actual workspaces before launch.
3. **Technical credibility:** check the learning programme's RLS and incident recovery description, the security platform's GPS limitations, the real estate CRM's tenant boundaries, the nonprofit's form/privacy claims, and property website launch-gate distinctions.
4. **Frontend correctness:** build Next.js 16, lint, TypeScript check, routes, JSX, image paths, SVG rendering, accessibility, mobile menu, visual overflow, reduced motion, SEO, and layout stability on mobile/tablet.
5. **Security:** contact API proxy IP trust, rate limiting across serverless workers, body limits, JSON error fallback, preview indexing, CSP and unexpected public asset exposure.
6. **Evidence:** check the descriptions and stage badges against current repository/source files; document where this reviewer could not establish a live deployment or reproduce an integration.
7. **Regression:** verify the first candidate's original tests still pass and add edge cases for new content and visuals.

## Output contract

Return **BLOCKER / HIGH / MEDIUM / LOW** findings with file paths, line references, reproducible reasoning, and minimum safe fixes. Distinguish proven defects from unverified claims. State tests actually run. Do not approve a merge solely because the Vercel deployment says READY. Do not silently publish or expose any client system.
