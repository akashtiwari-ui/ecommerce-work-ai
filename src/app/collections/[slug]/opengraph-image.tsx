import { COLLECTIONS, getCollection, getProduct } from "@/lib/catalog";
import { ogCard, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Wallora wallpaper collection";
export const generateStaticParams = () => COLLECTIONS.map((c) => ({ slug: c.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCollection((await params).slug)!;
  return ogCard({ art: getProduct(c.hero)!, eyebrow: c.kicker, title: c.name, sub: c.mood, badge: "Collection" });
}
