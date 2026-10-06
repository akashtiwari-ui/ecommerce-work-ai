import { COLLECTIONS, getCollection, PRODUCTS, productQuickAnswer, RARITY_META, ROOMS, SPECS, variantsFor } from "./catalog";
import { GUIDES } from "./guides";
import { absoluteUrl, CONTENT_UPDATED, SITE } from "./site";

/**
 * Builders for the crawler-facing files written to /public by `npm run seo`
 * (robots.txt, sitemap.xml, rss.xml, catalog.json). llms.txt & markdown live in ./markdown.ts.
 */

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Search engines AND AI answer engines are explicitly welcome — that's the point of GEO. */
export const AI_AGENTS = [
  // OpenAI (ChatGPT search, training, user-initiated browsing)
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  // Anthropic (Claude)
  "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai",
  // Perplexity
  "PerplexityBot", "Perplexity-User",
  // Google (Gemini / AI Overviews use Googlebot + Google-Extended token)
  "Google-Extended", "GoogleOther",
  // Apple, Microsoft, Amazon, Meta, DuckDuckGo, Mistral, Cohere, You.com, Common Crawl
  "Applebot", "Applebot-Extended", "Bingbot", "Amazonbot", "meta-externalagent", "DuckAssistBot",
  "MistralAI-User", "cohere-ai", "YouBot", "CCBot",
];
const PRIVATE = ["/cart", "/checkout", "/wishlist"];

export const robotsTxt = () => `# ${SITE.name} — ${SITE.url}
# All search engines and AI assistants are welcome to crawl, index and cite this site.
# AI-readable summary: ${absoluteUrl("/llms.txt")}

User-agent: *
Allow: /
${PRIVATE.map((p) => `Disallow: ${p}`).join("\n")}

${AI_AGENTS.map((a) => `User-agent: ${a}`).join("\n")}
Allow: /
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /catalog.json
${PRIVATE.map((p) => `Disallow: ${p}`).join("\n")}

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;

type Url = { path: string; priority: number; freq: "daily" | "weekly" | "monthly" | "yearly"; lastmod?: string; images?: { loc: string; title: string }[] };

export const sitemapEntries = (): Url[] => [
  { path: "/", priority: 1, freq: "daily" },
  { path: "/wallpapers", priority: 0.95, freq: "daily" },
  { path: "/collections", priority: 0.8, freq: "weekly" },
  { path: "/rooms", priority: 0.8, freq: "weekly" },
  { path: "/guides", priority: 0.8, freq: "weekly" },
  { path: "/tools/wallpaper-calculator", priority: 0.8, freq: "monthly" },
  { path: "/rewards", priority: 0.6, freq: "weekly" },
  { path: "/style-quiz", priority: 0.6, freq: "monthly" },
  { path: "/faq", priority: 0.6, freq: "monthly" },
  { path: "/glossary", priority: 0.5, freq: "monthly" },
  { path: "/about", priority: 0.4, freq: "yearly" },
  { path: "/contact", priority: 0.5, freq: "yearly" },
  { path: "/shipping-returns", priority: 0.3, freq: "yearly" },
  ...COLLECTIONS.map((c) => ({ path: `/collections/${c.slug}`, priority: 0.85, freq: "weekly" as const, images: [{ loc: absoluteUrl(`/collections/${c.slug}/opengraph-image`), title: `${c.name} wallpaper collection` }] })),
  ...ROOMS.map((r) => ({ path: `/rooms/${r.slug}`, priority: 0.8, freq: "weekly" as const })),
  ...PRODUCTS.map((p) => ({ path: `/wallpapers/${p.slug}`, priority: 0.9, freq: "weekly" as const, images: [{ loc: absoluteUrl(`/wallpapers/${p.slug}/opengraph-image`), title: `${p.name} wallpaper` }] })),
  ...GUIDES.map((g) => ({ path: `/guides/${g.slug}`, priority: 0.7, freq: "monthly" as const, lastmod: g.updated })),
];

export const sitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries()
  .map(
    (u) => `  <url>
    <loc>${esc(absoluteUrl(u.path))}</loc>
    <lastmod>${u.lastmod ?? CONTENT_UPDATED}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority.toFixed(2)}</priority>${(u.images ?? []).map((i) => `
    <image:image><image:loc>${esc(i.loc)}</image:loc><image:title>${esc(i.title)}</image:title></image:image>`).join("")}
  </url>`,
  )
  .join("\n")}
</urlset>
`;

export const rssXml = () => {
  const items = [...GUIDES]
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .map((g) => `    <item>
      <title>${esc(g.title)}</title>
      <link>${absoluteUrl(`/guides/${g.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/guides/${g.slug}`)}</guid>
      <pubDate>${new Date(g.published).toUTCString()}</pubDate>
      <category>${g.category}</category>
      <description>${esc(g.description)}</description>
    </item>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} Journal</title>
    <link>${absoluteUrl("/guides")}</link>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml"/>
    <description>${esc(SITE.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(CONTENT_UPDATED).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
};

/** Public, machine-readable product catalog for shopping agents and answer engines. */
export const catalogJson = () => ({
  store: SITE.name,
  url: SITE.url,
  currency: SITE.currency,
  updated: CONTENT_UPDATED,
  llms: absoluteUrl("/llms.txt"),
  policies: { freeShippingOver: SITE.freeShippingThreshold, standardShipping: 9.5, sampleShipping: 2.5, returnDays: SITE.returnDays, handlingDays: "1-2", transitDays: "2-5" },
  formats: SPECS,
  collections: COLLECTIONS.map((c) => ({ slug: c.slug, name: c.name, description: c.description, url: absoluteUrl(`/collections/${c.slug}`) })),
  products: PRODUCTS.map((p) => ({
    id: `WL-${p.slug.toUpperCase()}`,
    slug: p.slug,
    name: `${p.name} Wallpaper`,
    url: absoluteUrl(`/wallpapers/${p.slug}`),
    markdown: absoluteUrl(`/wallpapers/${p.slug}.md`),
    image: absoluteUrl(`/wallpapers/${p.slug}/opengraph-image`),
    summary: productQuickAnswer(p),
    collection: getCollection(p.collection)!.name,
    styles: p.styles,
    colors: p.colorNames.map((name, i) => ({ name, hex: p.palette[i] })),
    rooms: p.rooms,
    rarity: p.rarity,
    rarityXp: RARITY_META[p.rarity].xp,
    repeat: p.repeat,
    match: p.match,
    scale: p.scale,
    rating: p.rating,
    reviewCount: p.reviewCount,
    availability: "InStock",
    variants: variantsFor(p).map((v) => ({ id: v.id, label: v.label, price: v.price, unit: v.unit, coverageSqFt: v.coverageSqFt, buyUrl: `${absoluteUrl(`/wallpapers/${p.slug}`)}?variant=${v.id}` })),
  })),
});

/**
 * Google Merchant Center / Bing Merchant product feed (RSS 2.0 + g: namespace).
 * Submit https://<domain>/merchant-feed.xml in Merchant Center → Products → Feeds → Scheduled fetch.
 */
export const merchantFeedXml = () => {
  const items = PRODUCTS.flatMap((p) =>
    variantsFor(p)
      .filter((v) => v.id !== "sample")
      .map((v) => `    <item>
      <g:id>WL-${p.slug.toUpperCase()}-${v.id.toUpperCase()}</g:id>
      <g:item_group_id>WL-${p.slug.toUpperCase()}</g:item_group_id>
      <g:title>${esc(`${p.name} Wallpaper — ${v.label}`)}</g:title>
      <g:description>${esc(`${p.tagline} ${p.story}`)}</g:description>
      <g:link>${esc(`${absoluteUrl(`/wallpapers/${p.slug}`)}?variant=${v.id}`)}</g:link>
      <g:image_link>${absoluteUrl(`/wallpapers/${p.slug}/opengraph-image`)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${v.price.toFixed(2)} ${SITE.currency}</g:price>
      <g:brand>${esc(SITE.name)}</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>Home &amp; Garden &gt; Decor &gt; Wallpaper</g:google_product_category>
      <g:product_type>${esc(`Wallpaper > ${getCollection(p.collection)!.name}`)}</g:product_type>
      <g:color>${esc(p.colorNames.slice(0, 3).join("/"))}</g:color>
      <g:pattern>${esc(p.styles[0])}</g:pattern>
      <g:material>${v.id === "peel-stick" ? "PVC-free vinyl" : "Non-woven paper"}</g:material>
      <g:custom_label_0>${p.rarity}</g:custom_label_0>
      <g:shipping><g:country>US</g:country><g:price>9.50 ${SITE.currency}</g:price></g:shipping>
    </item>`),
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${esc(SITE.name)} product feed</title>
    <link>${SITE.url}</link>
    <description>${esc(SITE.description)}</description>
${items}
  </channel>
</rss>
`;
};
