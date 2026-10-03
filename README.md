# REPN — Real Estate Professionals Network

A complete demo website for a fictional professional association, built in the
**classic institutional `.org` style** (think American Horse Council, ASHPN,
ASTA) — deliberately *not* a minimal SaaS look:

- Two-tier header (utility bar + main navigation) with dismissible announcement strip
- Full-width photographic hero with brand overlay and uppercase condensed headline
- Long-scroll homepage built from stacked full-width bands (white / navy / photo)
- Boxy cards, symmetrical multi-column grids, gold accent rules
- Icon-based stat counters, event date blocks, testimonial, partner logo strip
- Mega footer with sitemap columns, contact block, and social icons
- **Palette:** deep navy `#152642` + association gold `#c19a3d`
- **Type:** Barlow Condensed (headings, uppercase) + Source Sans 3 (body)

## Features

| Area | What's included |
|---|---|
| Public homepage | Hero, mission + 3 pillars, stats band, membership teaser, directory teaser, featured events, testimonial, news grid, partners, join CTA |
| Membership tiers | Basic $195 / Professional $345 / Premium $545, benefit comparison table, FAQ |
| Member login portal | Demo accounts, persistent session (localStorage), gated-route redirect |
| Member dashboard | Overview, event registrations, resource shortcuts, editable profile, billing & receipts |
| Member directory | Search by name/brokerage/city/state, specialty + tier filters, members-only contact details |
| Events & webinars | Upcoming events with registration, past recordings with gated playback dialog |
| Resource library | Categorized reports/guides/templates, lock overlays for guests, working PDF downloads |
| Online dues payment | Demo checkout modal with card formatting + Luhn validation, receipts, dues status |
| News & announcements | Newsroom page with lead story, briefs, and card grid |
| Mobile responsive | Hamburger nav, collapsible dashboard tabs, fluid grids |

## Demo accounts

| Account | Email | Password | Notes |
|---|---|---|---|
| Sarah Mitchell | `sarah@repn.org` | `demo1234` | Professional tier, **dues unpaid** — try *Pay $345 Now* (test card `4242 4242 4242 4242`) |
| James Okafor | `james@repn.org` | `demo5678` | Premium tier, dues paid — view receipts & registrations |

You can also join as a new member (any email + 8-char password) — the account
persists in your browser via localStorage and can log back in.

> All payments are simulated. No real charges, no data leaves the browser.

## Run locally

```bash
bun install        # or npm install
bun run dev        # or npm run dev
```

Open http://localhost:3000 — navigation uses URL hashes (`#/membership`,
`#/directory`, `#/dashboard`, …) so every view is deep-linkable.

## Deploy to Vercel (free)

The project is 100% Vercel-ready — no database, no environment variables, no
server configuration.

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and **Import** the repo.
3. Vercel auto-detects Next.js. Leave all defaults and click **Deploy**.
4. Done — you get a free `*.vercel.app` URL.

Or with the CLI:

```bash
npm i -g vercel
vercel          # from this folder → follow prompts
vercel --prod   # production deploy
```

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4** with a custom navy/gold design token system
- **shadcn/ui** components (Radix primitives) + Lucide icons
- Client-side demo auth via `useSyncExternalStore` + localStorage
- Hash-based routing (`src/lib/router.tsx`) — zero-config hosting
- AI-generated photography in `public/images`, branded demo PDFs in `public/docs`

## Project structure

```
src/
  app/
    layout.tsx          # fonts, metadata, toaster
    page.tsx            # providers + hash-route view switch
    globals.css         # design tokens (.org theme)
  lib/
    data.ts             # all demo content (members, events, news, tiers…)
    auth.tsx            # demo auth store (login/join/dues/registrations)
    router.tsx          # tiny hash router
  components/
    site-header.tsx     # announcement strip + utility bar + nav
    site-footer.tsx     # mega footer
    shared.tsx          # headings, cards, date blocks, gated UI
    payment-modal.tsx   # demo dues checkout
    views/              # home, membership, directory, events,
                        # resources, news, login, join, dashboard
public/
  images/               # photography (hero, headshots, events)
  docs/                 # downloadable member PDFs
```
