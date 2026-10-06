import type { MetadataRoute } from "next";
import { COLLECTIONS, PRODUCTS, ROOMS } from "@/lib/catalog";
import { GUIDES } from "@/lib/guides";
import { absoluteUrl, CONTENT_UPDATED } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly", lastModified = CONTENT_UPDATED) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "daily"),
    page("/wallpapers", 0.95, "daily"),
    page("/collections", 0.8),
    page("/rooms", 0.8),
    page("/guides", 0.8),
    page("/rewards", 0.6),
    page("/style-quiz", 0.6, "monthly"),
    page("/tools/wallpaper-calculator", 0.8, "monthly"),
    page("/glossary", 0.5, "monthly"),
    page("/faq", 0.6, "monthly"),
    page("/about", 0.4, "yearly"),
    page("/shipping-returns", 0.3, "yearly"),
    ...COLLECTIONS.map((c) => page(`/collections/${c.slug}`, 0.85)),
    ...ROOMS.map((r) => page(`/rooms/${r.slug}`, 0.8)),
    ...PRODUCTS.map((p) => ({ ...page(`/wallpapers/${p.slug}`, 0.9), images: [absoluteUrl(`/wallpapers/${p.slug}/opengraph-image`)] })),
    ...GUIDES.map((g) => page(`/guides/${g.slug}`, 0.7, "monthly", g.updated)),
  ];
}
