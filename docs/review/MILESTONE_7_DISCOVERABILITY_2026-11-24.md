# M7 — Search and AI discoverability
Base: 3bb484dff63b1d49ebe7bf47ea3527c89841effe, draft PR #10. No production promotion.

## Changes
- Unique page and case search titles/descriptions, absolute canonical URLs, Open Graph and Twitter metadata.
- Public person identity, WebSite, about ProfilePage and case Article JSON-LD. No invented ratings, employment history, dates, client metrics or extra public links.
- Add visible author byline and full name; correct misleading résumé CTAs to request a CV (the route is not a downloadable CV).
- Preserve the existing canonical sitemap of 22 URLs. Explicitly allow OAI-SearchBot on public pages, exclude /api/; do not change the existing GPTBot training policy.
- Preview-only noindex metadata and X-Robots-Tag. Canonical domain stays the existing SITE_URL configuration; verify deployment variables before launch.
- No llms.txt or AI-only content: Google's current guidance does not require it.
- Tests assert unique metadata, canonical Open Graph URLs, schema identity and robots policy.

## Release checklist
1. Verify the exact production URL and SITE_URL in Vercel; verify production has no noindex header or meta and previews remain noindex.
2. Run npm lint, npm run build, npm test, browser checks and real private-term release scan. Inspect metadata/JSON-LD with a structured-data validator; verify OG image rendering and preview headers.
3. After explicit production approval, add the exact production property to Google Search Console and Bing Webmaster Tools (URL-prefix verification for the existing Vercel subdomain); submit /sitemap.xml.
4. Inspect home, about, work and flagship cases, request indexing of key canonical URLs; check coverage and search impressions over time. Check public accessibility for OAI-SearchBot and CDN/WAF behavior.
5. Keep metrics dated and qualified. No ranking or AI citation guarantees. No external webmaster account verification or sitemap submission was performed.
References: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; https://developers.google.com/search/docs/appearance/structured-data/profile-page ; https://developers.openai.com/api/docs/bots
