import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { ShopExplorer } from "@/components/ShopExplorer";
import { PRODUCTS } from "@/lib/catalog";
import { itemListLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Shop All Wallpaper — Peel & Stick and Non-Woven",
  description: `Browse ${PRODUCTS.length} original designer wallpapers: botanical, retro geometric, coastal, art deco, terrazzo and kids' patterns. Peel & stick from $45/roll, non-woven, and $5 samples.`,
  alternates: { canonical: "/wallpapers" },
  openGraph: { url: "/wallpapers" },
};

export default function ShopPage() {
  return (
    <div className="wrap pt-8 pb-12">
      <JsonLd data={itemListLd("All Wallora wallpaper", "/wallpapers", PRODUCTS)} />
      <Breadcrumbs items={[{ name: "Shop wallpaper", path: "/wallpapers" }]} />
      <header className="mt-6 mb-10 max-w-3xl">
        <h1 className="text-5xl font-medium leading-[1.02] sm:text-6xl">All wallpaper</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {PRODUCTS.length} original designs, each available as removable peel &amp; stick (from $45 a roll), durable non-woven paste-the-wall wallpaper, or a $5 sample. Filter by collection, room, style or rarity.
        </p>
      </header>
      <Suspense
        fallback={
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {PRODUCTS.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        }
      >
        <ShopExplorer />
      </Suspense>
    </div>
  );
}
