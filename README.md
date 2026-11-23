# Portfolio — Olawale Emmanuel Olaonipekun

Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, GSAP, Lenis.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

## Security notes

- `.env.local` holds the Resend key and is covered by `.gitignore` (`.env*`).
  It must never be committed.
- The contact endpoint checks the request origin, requires a JSON content type,
  applies a best-effort per-instance limit of three messages per IP per ten minutes, strips control characters
  from every field, and never returns the provider's error text to the browser.
- Security headers, including a content security policy, are set in
  `next.config.ts` and apply to every route.
- `poweredByHeader` is off, so the stack is not advertised in responses.

On serverless hosting the in-memory limit resets on cold starts and is independent per instance. Configure a shared platform rate limit before relying on a global quota.

## Make the contact form send

Three steps, about five minutes. Until they are done the form tells visitors to
email you directly rather than failing silently.

1. Sign up at resend.com with the address you want enquiries to arrive at.
   Free tier sends 100 emails a day, which is far more than a portfolio needs.
2. Create an API key: Resend dashboard, API Keys, Create.
3. Add two environment variables.

   Locally, create `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   CONTACT_TO=olawaleemmanuel100@gmail.com
   ```

   On Vercel: Project, Settings, Environment Variables. Add the same two, then
   redeploy. Environment variables are only read at build and request time, so
   an existing deployment will not pick them up until it is redeployed.

### The one gotcha

Without your own domain, Resend only lets you send **to the address you
registered with**. That is fine here, since every message goes to you. When you
buy a domain, verify it in Resend and set `CONTACT_FROM` to an address on it.

### Checking it works

Submit the form on your own site. The message arrives from
`onboarding@resend.dev` with the sender's address set as reply-to, so hitting
reply goes straight back to them. If nothing arrives, check the Vercel function
logs: every failure path logs a line beginning `[contact]`.

## Where things are

- `app/globals.css` — tokens, type scale, motion. Type classes carry no
  layout: measure is set at the point of use with `measure-read` and
  `measure-wide`.
- `app/fonts/Archivo-var.woff2` — variable font, weight 100–900, width 62–125
- `lib/data/projects.ts` — every project. Add or edit projects here, never in
  components.
- `components/sections/` — page sections
- `components/motion/` — SmoothScroll (Lenis + GSAP), Reveal, MaskLines,
  Parallax, PageTransition
- `lib/animations/` — `useReveal` (enter once) and `useActive` (active while in
  the middle band of the viewport, which is what drives the work list on mobile)

## Search and sharing

Set `SITE_URL` to the public production origin before building to generate canonical URLs, the sitemap and social image links for that domain. It defaults to https://olawaleolaonipekun.vercel.app.

## Deploying

Push to GitHub, import the repo on Vercel, add the two environment variables,
deploy. To keep the existing GitHub Pages URL working, serve the same repo from
both: Pages builds from the branch, Vercel builds from the same commits.
