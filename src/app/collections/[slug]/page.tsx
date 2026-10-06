import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { WallpaperArt } from "@/components/WallpaperArt";
import { COLLECTIONS, getCollection, getProduct, productsInCollection } from "@/lib/catalog";
import { itemListLd } from "@/lib/schema";
import { formatPrice } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => COLLECTIONS.map((c) => ({ slug: c.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getCollection((await params).slug);
  if (!c) return {};
  return {
    title: `${c.name} — ${c.kicker}`,
    description: `${c.description} Peel & stick and non-woven, from ${formatPrice(Math.min(...productsInCollection(c.slug).map((p) => p.basePrice)))} a roll.`,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: { url: `/collections/${c.slug}` },
  };
}

export default async function CollectionPage({ params }: Params) {
  const c = getCollection((await params).slug);
  if (!c) notFound();
  const items = productsInCollection(c.slug);
  const from = Math.min(...items.map((p) => p.basePrice));
  return (
    <>
      <JsonLd data={itemListLd(`${c.name} wallpaper collection`, `/collections/${c.slug}`, items)} />
      <section className="grain relative overflow-hidden">
        <WallpaperArt product={getProduct(c.hero)!} scale={1.4} decorative className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/10" />
        <div className="wrap relative py-20 text-cream sm:py-28">
          <div className="[&_a]:text-cream/70 [&_span]:text-cream/90"><Breadcrumbs items={[{ name: "Collections", path: "/collections" }, { name: c.name, path: `/collections/${c.slug}` }]} /></div>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{c.kicker}</p>
          <h1 className="mt-3 max-w-2xl text-5xl font-medium leading-[1.02] sm:text-7xl">{c.name}</h1>
          <p className="mt-5 max-w-xl text-lg text-cream/80">{c.description}</p>
          <p className="mt-6 text-sm text-cream/70">{items.length} designs · from {formatPrice(from)}/roll · Mood: {c.mood}</p>
        </div>
      </section>
      <div className="wrap py-16">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
        <nav aria-label="Other collections" className="mt-20">
          <h2 className="font-display text-2xl">More collections</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {COLLECTIONS.filter((x) => x.slug !== c.slug).map((x) => <Link key={x.slug} href={`/collections/${x.slug}`} className="chip px-4 py-2 text-sm hover:border-ink hover:text-ink">{x.name}</Link>)}
          </div>
        </nav>
      </div>
    </>
  );
}
