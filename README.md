# Wallora — a gamified designer wallpaper store

An ecommerce storefront for original wallpaper designs. Shoppers earn **XP**, unlock **badges**, spin a daily **Swatch Wheel**, collect designs by **rarity** and **level up** for permanent discounts. It is built for classic SEO and for **GEO** (Generative Engine Optimization), so AI answer engines such as ChatGPT, Claude, Perplexity and Google AI Overviews can find, understand and cite it.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19 + TypeScript** | Every page is statically pre-rendered (SSG), giving crawlers instant, complete HTML |
| Styling | **Tailwind CSS v4** with design tokens in `src/app/globals.css` | Small CSS bundle and a consistent editorial look |
| Fonts | Fraunces (display) + Inter, served by `next/font` | Self-hosted, no layout shift |
| Product art | Procedural, seamless **SVG pattern engine** (`src/lib/art.ts`) | Each design is one cached tile (`/art/<slug>.svg`) repeated by CSS. No image CDN, and pages stay tiny |
| State | React context + `localStorage` (`src/components/store.tsx`) | Cart, wishlist, XP, badges and streaks need no backend |

The project has no database or CMS yet. The catalog lives in typed data files (`src/lib/catalog.ts`, `src/lib/guides.ts`), so swapping in Shopify, Sanity or a database later is straightforward.

Live site: **https://wallers.vercel.app**

```bash
npm install
cp .env.example .env.local   # optional: override NEXT_PUBLIC_SITE_URL / verification tags
npm run dev                  # http://localhost:3000  (regenerates SEO/GEO files first)
npm run build && npm start   # production build (regenerates SEO/GEO files first)
npm run seo                  # regenerate only the SEO/GEO files in /public
npm run lint                 # type-check
```

## Site map

- `/` — home: hero, collections, bestsellers, rarity tiers, rooms, guides, FAQ
- `/wallpapers` — shop with search, filters and sort, all reflected in the URL
- `/wallpapers/[slug]` — product page with room previews, formats, an XP preview, specs, FAQs and reviews
- `/collections`, `/collections/[slug]` — the 6 collections
- `/rooms`, `/rooms/[slug]` — long-tail landing pages such as "bathroom wallpaper"
- `/guides`, `/guides/[slug]` — 6 long-form guides with TL;DRs, HowTo steps and FAQs
- `/tools/wallpaper-calculator` — roll calculator
- `/style-quiz` — 4-question personality quiz
- `/rewards` — levels, quests, badge cabinet, Swatch Wheel, wallet and XP log
- `/glossary`, `/faq`, `/about`, `/shipping-returns`
- `/cart`, `/checkout`, `/wishlist` — set to noindex

## Gamification

- **XP** is earned for:
  - the daily check-in, with a streak bonus
  - discovering designs
  - wishlisting
  - adding to cart
  - the quiz
  - the calculator
  - reading guides
  - signing up for the newsletter
  - orders: 1 XP per $1, plus a rarity bonus
- **6 levels**, from *Blank Wall* to *Wallora Legend*. Each level automatically applies a discount of 0–15% at checkout. Level 5 and above also gets free shipping.
- **11 quests and badges**, with confetti toasts and level-up toasts.
- **Rarity tiers:** Common, Rare, Epic and Legendary. Rarer designs give a bigger XP bonus and unlock collector badges.
- **Swatch Wheel:** one spin per day. Prizes are XP or promo codes (`SPIN5`, `SPIN10`, `FREESWATCH`). The newsletter gives `WELCOME10`.

All game rules live in `src/lib/game.ts`.

## SEO

- Unique `<title>`, meta description, canonical URL and Open Graph/Twitter tags on every route
- **Dynamic OG images** for the site, every product, guide and collection (`opengraph-image.tsx`)
- **JSON-LD**:
  - `OnlineStore` with a return policy and member programme
  - `WebSite` + `SearchAction`
  - `Product` with per-variant `Offer`s, shipping details, `AggregateRating` and `Review`s
  - `BreadcrumbList`, `FAQPage` and `CollectionPage`/`ItemList`
  - `Article` + `HowTo` + `speakable`
  - `DefinedTermSet` (glossary) and `WebApplication` (calculator)
- `sitemap.xml`, `robots.txt`, RSS and a Merchant feed, all as real files (see below), plus `manifest.webmanifest`
- Search Console and Bing verification meta tags, set through env vars
- Semantic HTML: one `<h1>` per page, headings phrased as questions, real `<table>`s, `<details>` FAQs with the answers in the DOM, and a skip link
- Performance: fully static, about 103 kB of shared JS, no images to decode, and pattern tiles cached for a week

## SEO & GEO files (all in `public/`)

These are real files you can open in the repo. `scripts/generate-seo.ts` writes them from the catalog. It runs automatically before every `dev` and `build`, including on Vercel, so they never drift out of date. Don't edit them by hand: change `src/lib/catalog.ts`, `src/lib/guides.ts` or `src/lib/site.ts` instead and run `npm run seo`.

| File | URL | What it's for |
|---|---|---|
| `public/robots.txt` | `/robots.txt` | Lets every search engine in, explicitly welcomes 24 AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended…), blocks cart/checkout/wishlist, and points to the sitemap |
| `public/sitemap.xml` | `/sitemap.xml` | Lists all 54 indexable URLs with priorities and `lastmod`, plus product and collection images |
| `public/llms.txt` | `/llms.txt` | The llmstxt.org file: key facts and a linked map of the site for AI agents |
| `public/llms-full.txt` | `/llms-full.txt` | All products, guides, FAQs, policies and the glossary as one markdown document for LLMs |
| `public/wallpapers/*.md` | `/wallpapers/<slug>.md` | A markdown version of each product page |
| `public/guides/*.md` | `/guides/<slug>.md` | A markdown version of each guide |
| `public/catalog.json` | `/catalog.json` (also `/api/catalog`) | A JSON product catalog for shopping agents, with CORS open |
| `public/merchant-feed.xml` | `/merchant-feed.xml` | A Google Merchant Center / Bing Shopping product feed (48 variant items) |
| `public/rss.xml` | `/rss.xml` | RSS feed of the guides |

All text and markdown AI files are sent with `X-Robots-Tag: noindex, follow`. Crawlers and AI agents can read them, but they won't compete with your real pages in Google results.

Other SEO and GEO work in the code:

- **JSON-LD** in `src/lib/schema.ts`, added per page
- **OG images** in the `opengraph-image.tsx` files
- **Metadata** in each `page.tsx` file
- **Quotable "answer-first" content.** Each product has an *At a glance* paragraph and each guide opens with a TL;DR. Both are marked `data-speakable`.

### Vercel (`wallers.vercel.app`) setup

1. The domain defaults to `https://wallers.vercel.app` (`src/lib/site.ts`). To move to a custom domain later, set `NEXT_PUBLIC_SITE_URL` in Vercel → Settings → Environment Variables and redeploy. Every URL, file and schema updates automatically.
2. **Google Search Console:** add a *URL prefix* property for `https://wallers.vercel.app/`. Choose the *HTML tag* method, copy the `content` value into the `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var, redeploy, click Verify, then submit `sitemap.xml`.
3. **Bing Webmaster Tools** (Bing's index feeds ChatGPT and Copilot search): do the same with `NEXT_PUBLIC_BING_SITE_VERIFICATION`, then submit `sitemap.xml`.
4. **Google Merchant Center:** add `https://wallers.vercel.app/merchant-feed.xml` as a scheduled-fetch feed for free product listings.
5. In Vercel → Firewall, keep "Block AI bots" and Attack Challenge Mode **off**. Keep Deployment Protection **off** for production.

## Before launch (important)

1. **Replace the sample reviews and ratings** in `src/lib/catalog.ts` with real, verified customer reviews, or remove them. Publishing invented reviews or `AggregateRating` violates Google's structured-data policies and consumer-protection law.
2. In `src/lib/site.ts`:
   - Replace the placeholder support email (`hello@wallora.com`) with a real inbox you own. It's published in structured data.
   - Add your real social profiles to `sameAs`, and your X handle to `twitter`. Don't list accounts that don't exist.
3. **Payments:** checkout currently runs in demo mode. Wire it to Stripe Checkout or Shopify, and create orders server-side. Today's discount maths is client-side and must be recomputed on the server.
4. **Accounts:** game progress is saved in `localStorage`. Add auth and a database to sync XP across devices and to stop users editing their own level.
5. Hook up the newsletter form to your email provider.
6. Submit the sitemap to Google Search Console and Bing Webmaster Tools (Bing feeds ChatGPT and Copilot search). Add a Google Merchant Center feed, which can be generated from `/api/catalog`.
7. Replace the procedural art with real product photography or room renders when you have it. Keep the SVG tiles as swatches.
