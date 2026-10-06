import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { WallpaperArt } from "@/components/WallpaperArt";
import { COLLECTIONS, getProduct, productsInCollection } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wallpaper Collections — Botanical, Retro, Coastal, Art Deco & Kids",
  description: "Explore Wallora's six wallpaper collections: Terra Botanica, Mid-Century Arcade, Coastal Drift, Noir Atelier, Kinder Kingdom and Stone & Terrazzo.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <div className="wrap pt-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Wallora wallpaper collections",
          url: absoluteUrl("/collections"),
          hasPart: COLLECTIONS.map((c) => ({ "@type": "CollectionPage", name: c.name, url: absoluteUrl(`/collections/${c.slug}`), description: c.description })),
        }}
      />
      <Breadcrumbs items={[{ name: "Collections", path: "/collections" }]} />
      <header className="mt-6 max-w-3xl">
        <h1 className="text-5xl font-medium sm:text-6xl">Wallpaper collections</h1>
        <p className="mt-4 text-lg text-muted">Six worlds of original pattern. Discover designs from three different collections to unlock the <strong className="text-ink">Pattern Explorer</strong> badge.</p>
      </header>
      <div className="mt-12 grid gap-8">
        {COLLECTIONS.map((c, i) => {
          const items = productsInCollection(c.slug);
          return (
            <Link key={c.slug} href={`/collections/${c.slug}`} className={`group card grid overflow-hidden md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative min-h-72 overflow-hidden">
                <WallpaperArt product={getProduct(c.hero)!} scale={1.1} decorative className="absolute inset-0 transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="eyebrow">{c.kicker}</p>
                <h2 className="mt-3 text-4xl font-medium group-hover:text-clay">{c.name}</h2>
                <p className="mt-4 leading-relaxed text-muted">{c.description}</p>
                <div className="mt-6 flex items-center gap-2">
                  {items.map((p) => (
                    <WallpaperArt key={p.slug} product={p} scale={0.5} decorative className="h-10 w-10 overflow-hidden rounded-full border-2 border-cream shadow-soft" />
                  ))}
                  <span className="ml-2 text-sm font-medium">{items.length} designs →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
