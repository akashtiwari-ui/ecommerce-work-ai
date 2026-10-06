import { getCollection, getProduct, PRODUCTS, RARITY_META } from "@/lib/catalog";
import { ogCard, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Wallora wallpaper design";
export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug)!;
  return ogCard({ art: p, eyebrow: `${getCollection(p.collection)!.name} · ${p.rarity}`, title: `${p.name} Wallpaper`, sub: `${p.tagline} From $${p.basePrice}/roll · Rated ${p.rating}/5`, badge: `+${RARITY_META[p.rarity].xp} XP` });
}
