# CosmicComics

**[Live demo](https://cosmiccomics-rosy.vercel.app)** · **[Public repository](https://github.com/nzshumate/cosmiccomics)**

A polished, responsive comic-store demo built with **Nuxt 4, Vue 3, TypeScript, Vite, and SCSS**. Real comic titles and externally hosted official publisher cover art.

## Features

- Editorial homepage with featured first issues, 2026 releases, genres, and publishers
- 14 real comics from DC and Image Comics, each with its own product page
- Search by title, creator, or publisher; combined filters; price, title, and year sorting
- Shareable catalog query parameters and server-rendered pages
- Device-local cart with quantity controls, removal, persistence, and demo checkout
- Responsive navigation, keyboard-accessible native cart dialog, focus restoration, reduced-motion support, cover-loading and error states, empty search/cart states, and a custom 404
- Official source links and artwork credits on the site

## Run locally

Node.js 22 or newer (Node 24 recommended) and npm 10+.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npm run preview
```

## Browser tests

The Playwright suite verifies discovery, combined filters, sorting, direct-link hydration, all cover images, cart persistence, quantities, checkout, mobile navigation, layout overflow, and 404 recovery at desktop and mobile sizes.

```sh
# With Google Chrome installed:
npm run test:e2e
# To test a deployment:
BASE_URL=https://your-site.vercel.app npm run test:e2e
```

## Architecture

- `app/pages/`: homepage, searchable catalog, product detail, and credits
- `app/components/`: shared navigation, cover/card, footer, and cart drawer
- `app/data/comics.ts`: typed, curated catalog and illustrative USD prices
- `app/data/sources.json`: verified official publisher pages and image URLs
- `app/composables/useCart.ts`: shared cart logic with integer-cent totals
- `app/plugins/cart.client.ts`: validated, best-effort local storage persistence
- `app/assets/scss/main.scss`: design system and responsive styles
- `tests/`: end-to-end browser coverage

Nuxt uses Vite by default. Catalog pages are server-rendered, including query filters, to avoid hydration mismatches. No backend account, payment, or inventory service is implied.

## Deploy to Vercel

Import this repository into Vercel and select the Nuxt framework. The included `vercel.json` defines `npm ci` and `npm run build`; Nuxt/Nitro produces the Vercel deployment output automatically. No environment secrets are needed.

## Content and demo boundaries

This is an independent, non-commercial demonstration, not a working retail business. Checkout does not accept payment or place orders. Prices are illustrative, do not represent collectible market valuations, and do not imply stock availability. New releases are a curated 2026 selection, not a real-time feed.

All comic titles, characters, and cover artwork belong to their respective rights holders. Cover images remain externally hosted on official DC and Image Comics domains. Public availability does not make them public domain or grant reuse rights for a commercial shop. See the in-app About page for per-title source links. Google Fonts serves Barlow Condensed and DM Sans under their respective open font licenses. Icons are from Lucide (ISC).

## Verified deployment

The production site passed all eight Playwright checks across desktop and mobile on September 6, 2026. TypeScript checking and the Nuxt production build also passed. External cover availability can change independently of this repository.
