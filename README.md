# Manovruti — Website

Marketing site for **Manovruti**, an integrated industrial construction practice in Silvassa
(UT of Dadra & Nagar Haveli and Daman & Diu) — land liaisoning and feasibility through to
occupancy certification.

Built with Next.js (App Router), TypeScript and Tailwind CSS v4. Every page is statically
prerendered; there is no database and no server runtime beyond Next itself.

---

## Requirements

| | |
|---|---|
| Node.js | `^20.9.0 \|\| >=22.11.0` — the version in `.nvmrc` (24) is the one CI and Docker use |
| Package manager | npm (the repo ships `package-lock.json`) |

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run check` | lint + typecheck + build — run this before every deploy |

---

## Project structure

```
src/
  app/                     Routes (App Router). One folder per URL.
    layout.tsx             <html>, fonts, site-wide metadata
    globals.css            The whole design system — tokens, type scale, components
    not-found.tsx          404
    robots.ts              /robots.txt
    sitemap.ts             /sitemap.xml, derived from the content files
    icon.png               Favicon, Apple touch icon and Open Graph card are
    apple-icon.png           file-based metadata: Next wires them up automatically
    opengraph-image.png
  components/manovruti/    All UI, grouped by the page it belongs to
    home/ about/ portfolio/ services/ insights/ contact/
    shared/                Button, Logo, Media, icons, GSAP setup, scroll and reveal helpers
  lib/
    site.ts                Canonical host — read by metadata, sitemap, robots and JSON-LD
    utils.ts               `cn()` class merge helper
  types/manovruti.ts       Shared content types

public/manovruti/          Images, client logos, certificates and the company profile PDF
scripts/                   One-off asset build scripts (not part of the app build)
```

### Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About, mission and vision, company profile download |
| `/portfolio` | Projects, filterable by sector |
| `/services/[slug]` | One page per service stage (7) |
| `/insights` | Article index |
| `/insights/[slug]` | Article |
| `/contact` | Contact details, enquiry form and FAQ |

---

## Where the content lives

**All copy and image paths sit in `data.ts` files, separate from the components that render
them.** To change wording, add a project or swap a photograph, edit the data — you should not
need to touch a component.

| File | Holds |
|---|---|
| `components/manovruti/home/data.ts` | Contact details, nav and footer menus, the seven service stages, client logos, credentials, and the home page sections |
| `components/manovruti/about/data.ts` | About copy, mission and vision, team disciplines, company profile download |
| `components/manovruti/portfolio/data.ts` | Sectors and projects |
| `components/manovruti/services/data.ts` | The long-form copy for each service page |
| `components/manovruti/insights/data.ts` | Article index page copy |
| `components/manovruti/insights/article.ts` | Article bodies |
| `components/manovruti/contact/data.ts` | Contact page copy and the FAQ |

Two rules worth knowing:

- **An article only exists once it has a body in `article.ts`.** The route, the sitemap entry and
  the links on the cards all derive from that, so adding the body is the only step needed to
  publish one. Commissioned-but-unwritten pieces are listed without a link and return 404 by
  design, rather than shipping an empty page.
- **A service page needs an entry in `SERVICE_COPY`** keyed by its stage slug. A stage without
  one returns 404 rather than rendering an empty shell, so adding a stage means adding its copy.

## Design system

`src/app/globals.css` is the single source of truth. Prefer its tokens over one-off values:

- **Type scale** — `text-display`, `text-h1`…`text-h3`, `text-lead`, `text-body`, `text-label`.
  Sizes are fluid, so they need no per-breakpoint overrides.
- **Spacing rhythm** — `mb-section`, `py-section`, `gap-section` for section gaps; `--spacing-block`
  for the smaller one.
- **Brand accent** — change `--brand`, `--brand-soft` and `--brand-deep` and the whole site
  follows. Nothing hard-codes the accent.
- **Breakpoint** — `lg` is 992px, and the GSAP `matchMedia` gates use the same number so CSS and
  JavaScript agree about where desktop starts.
- **Page gutter** — `.container-page`. Use it rather than per-page padding, so margins stay
  consistent across the site.

Motion is GSAP (ScrollTrigger, ScrollSmoother, SplitText), registered once in
`components/manovruti/shared/gsap.ts`. Scroll-in reveals are declarative: add `data-animate`,
`data-animate-title` or `data-animate-child` to an element and `shared/animate.ts` handles it.
Everything respects `prefers-reduced-motion`.

---

## Deployment

### Environment

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical host used by page metadata, `robots.txt`, `sitemap.xml` and article structured data. Defaults to `https://manovruti.com`. **Set this on preview deployments** so they do not claim to be the production domain. |

### Vercel

Import the repository; the defaults are correct. Set `NEXT_PUBLIC_SITE_URL` per environment.

### Docker

The build is configured for `output: "standalone"`, so the runtime image carries only what it needs.

```bash
docker compose up --build       # http://localhost:3000
```

---

## Before launch

Open items, all of which need the client rather than more code:

1. **The contact form has no backend.** It composes a `mailto:` with the fields filled in, and the
   page says so. Pointing it at a form endpoint or a small API route is a deployment decision.
2. **Two of the three commissioned articles are unwritten.** Statutory procedure in DNH cannot be
   guessed at, so the bodies must come from the practice. Add each to `article.ts` and it publishes
   itself.
3. **`/about` has no team photographs or headcount.** The section names the four disciplines and
   stops. `TEAM_DISCIPLINES` is where it grows.
4. **Client logo permissions.** Nineteen third-party marks are displayed; confirm the practice is
   entitled to show them.
5. **Verify the contact details** in `home/data.ts` — phone, address and the `manovruti@gmail.com`
   address, which is a personal-domain mailbox rather than a company one.
6. **Set `NEXT_PUBLIC_SITE_URL`** to the real domain at deploy time.

The site states no testimonial, project value, statutory timeline or fee that the practice has not
supplied. Keep it that way: anything added to the content files is published as fact.
