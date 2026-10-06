import { COLLECTIONS, getCollection, PRODUCTS, productQuickAnswer, RARITY_META, SPECS, variantsFor } from "@/lib/catalog";
import { absoluteUrl, CONTENT_UPDATED, SITE } from "@/lib/site";

export const dynamic = "force-static";

/** Public, machine-readable product catalog for shopping agents and answer engines. */
export function GET() {
  const body = {
    store: SITE.name,
    url: SITE.url,
    currency: SITE.currency,
    updated: CONTENT_UPDATED,
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
  };
  return Response.json(body, { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=3600" } });
}
