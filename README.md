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

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL to your real domain
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build (~120 static pages)
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
- `sitemap.xml` with priorities, `lastModified` and image entries; `robots.txt`; `manifest.webmanifest`; RSS at `/rss.xml`
- Semantic HTML: one `<h1>` per page, headings phrased as questions, real `<table>`s, `<details>` FAQs with the answers in the DOM, and a skip link
- Performance: fully static, about 103 kB of shared JS, no images to decode, and pattern tiles cached for a week

## GEO (AI search and agents)

- **`/llms.txt`** follows the llmstxt.org convention: a concise site map with key facts. **`/llms-full.txt`** contains every product, guide, policy and FAQ as one markdown file.
- **Markdown twins:** add `.md` to any product or guide URL, e.g. `/wallpapers/arcade-arches.md`. They carry a canonical `Link` header and are set to noindex.
- **`/api/catalog`** is a public JSON catalog with prices, variants, specs, colours (with hex values), rooms, ratings and buy URLs. It is CORS-enabled for shopping agents.
- **`robots.txt` explicitly allows AI crawlers**, including GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended and Applebot-Extended.
- **Quotable "answer-first" content.** Each product has a one-paragraph *At a glance* fact summary, and each guide opens with a TL;DR. Both are marked `data-speakable`.
- **Freshness and authorship signals:** published and updated dates, author, and `dateModified` in the schema.
- **Entity consistency:** a single `@id` for the organization is referenced across all schema.

## Before launch (important)

1. **Replace the sample reviews and ratings** in `src/lib/catalog.ts` with real, verified customer reviews, or remove them. Publishing invented reviews or `AggregateRating` violates Google's structured-data policies and consumer-protection law.
2. Set `NEXT_PUBLIC_SITE_URL`, and update the brand details and social profiles in `src/lib/site.ts`.
3. **Payments:** checkout currently runs in demo mode. Wire it to Stripe Checkout or Shopify, and create orders server-side. Today's discount maths is client-side and must be recomputed on the server.
4. **Accounts:** game progress is saved in `localStorage`. Add auth and a database to sync XP across devices and to stop users editing their own level.
5. Hook up the newsletter form to your email provider.
6. Submit the sitemap to Google Search Console and Bing Webmaster Tools (Bing feeds ChatGPT and Copilot search). Add a Google Merchant Center feed, which can be generated from `/api/catalog`.
7. Replace the procedural art with real product photography or room renders when you have it. Keep the SVG tiles as swatches.
