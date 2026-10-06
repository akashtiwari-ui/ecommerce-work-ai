import { getProduct } from "@/lib/catalog";
import { getGuide, GUIDES } from "@/lib/guides";
import { ogCard, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Wallora wallpaper guide";
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug)!;
  return ogCard({ art: getProduct(g.relatedProducts[0])!, eyebrow: `Guide · ${g.minutes} min read`, title: g.title, badge: g.category });
}
