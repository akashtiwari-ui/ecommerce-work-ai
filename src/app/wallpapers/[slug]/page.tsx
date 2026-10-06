import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RarityBadge, SectionHeading, Stars } from "@/components/Bits";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchase } from "@/components/ProductPurchase";
import { getCollection, getProduct, getRoom, PRODUCTS, productFaqs, productQuickAnswer, relatedProducts, SPECS } from "@/lib/catalog";
import { productLd } from "@/lib/schema";
import { CONTENT_UPDATED } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const c = getCollection(p.collection)!;
  const title = `${p.name} Wallpaper — ${p.styles[0]} ${p.scale === "Mural" ? "Mural" : "Peel & Stick Wallpaper"}`;
  const description = `${p.tagline} ${p.scale}-scale ${p.styles.slice(0, 2).join(" & ").toLowerCase()} wallpaper from the ${c.name} collection. Peel & stick $${p.basePrice}/roll, non-woven, or $5 sample. Rated ${p.rating}/5.`;
  return {
    title,
    description,
    keywords: [`${p.name} wallpaper`, ...p.styles.map((s) => `${s.toLowerCase()} wallpaper`), ...p.colorNames.map((cn) => `${cn.toLowerCase()} wallpaper`), "peel and stick wallpaper"],
    alternates: { canonical: `/wallpapers/${p.slug}`, types: { "text/markdown": `/wallpapers/${p.slug}.md` } },
    openGraph: { type: "website", url: `/wallpapers/${p.slug}`, title: `${p.name} Wallpaper | Wallora`, description },
    other: {
      "product:price:amount": p.basePrice.toFixed(2),
      "product:price:currency": "USD",
      "product:availability": "in stock",
      "product:brand": "Wallora",
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const c = getCollection(p.collection)!;
  const faqs = productFaqs(p);
  const related = relatedProducts(p);

  return (
    <div className="pb-12">
      <JsonLd data={productLd(p)} />
      <div className="wrap pt-8">
        <Breadcrumbs items={[{ name: "Wallpaper", path: "/wallpapers" }, { name: c.name, path: `/collections/${c.slug}` }, { name: p.name, path: `/wallpapers/${p.slug}` }]} />
      </div>

      <section className="wrap mt-6 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <ProductGallery product={p} />
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-wrap items-center gap-2">
            <RarityBadge rarity={p.rarity} />
            {p.bestseller && <span className="chip">Bestseller</span>}
            {p.isNew && <span className="chip">New drop</span>}
          </div>
          <h1 className="mt-4 text-5xl font-medium leading-[1.02] sm:text-6xl">{p.name} <span className="sr-only">wallpaper</span></h1>
          <p className="mt-3 text-lg text-muted">{p.tagline}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a href="#reviews"><Stars rating={p.rating} count={p.reviewCount} size="md" /></a>
            <div className="flex -space-x-1.5" aria-label={`Colours: ${p.colorNames.join(", ")}`}>
              {p.palette.map((col, i) => <span key={col} title={p.colorNames[i]} className="h-6 w-6 rounded-full border-2 border-cream shadow-soft" style={{ background: col }} />)}
            </div>
          </div>
          <div className="mt-8"><ProductPurchase product={p} /></div>
        </div>
      </section>

      {/* GEO: concise, quotable summary */}
      <section className="wrap mt-20 grid gap-10 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <p className="eyebrow">At a glance</p>
          <h2 className="mt-3 text-3xl font-medium sm:text-4xl">About {p.name} wallpaper</h2>
          <p data-speakable className="mt-5 rounded-3xl border border-line bg-cream p-6 text-[15px] leading-relaxed">{productQuickAnswer(p)}</p>
          <p className="mt-6 text-lg leading-relaxed text-ink/85">{p.story}</p>
          <p className="mt-4 text-sm text-muted">
            Part of <Link href={`/collections/${c.slug}`} className="font-medium text-clay hover:underline">{c.name}</Link> — {c.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.rooms.map((r) => <Link key={r} href={`/rooms/${r}`} className="chip hover:border-ink">{getRoom(r)!.headline}</Link>)}
          </div>
        </div>
        <div className="card overflow-hidden">
          <h2 className="border-b border-line px-6 py-4 font-display text-xl">Specifications</h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-line">
              {[
                ["Pattern repeat", p.repeat],
                ["Pattern match", p.match],
                ["Scale", p.scale],
                ["Colours", p.colorNames.join(", ")],
                ["Style", p.styles.join(", ")],
                ["Rarity", p.rarity],
                ["Peel & Stick size", SPECS["peel-stick"].size],
                ["Peel & Stick material", SPECS["peel-stick"].material],
                ["Non-Woven size", SPECS["non-woven"].size],
                ["Non-Woven material", SPECS["non-woven"].material],
                ["Removal", `Peel & stick: ${SPECS["peel-stick"].removal}. Non-woven: ${SPECS["non-woven"].removal}.`],
                ["Care", SPECS["non-woven"].durability],
              ].map(([k, v]) => (
                <tr key={k}>
                  <th scope="row" className="w-2/5 px-6 py-3.5 text-left font-medium text-muted">{k}</th>
                  <td className="px-6 py-3.5">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap mt-20 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="Questions" title={`${p.name}: FAQs`} sub={`Last reviewed ${CONTENT_UPDATED}.`} />
        <Faq items={faqs} />
      </section>

      <section id="reviews" className="wrap mt-20 scroll-mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Reviews" title={`What people say about ${p.name}`} />
          <Stars rating={p.rating} count={p.reviewCount} size="md" />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {p.reviews.map((r) => (
            <figure key={r.author + r.date} className="card p-6">
              <Stars rating={r.rating} />
              <blockquote className="mt-3">
                <p className="font-display text-lg leading-snug">“{r.title}”</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
              </blockquote>
              <figcaption className="mt-4 text-xs text-muted">— {r.author}, verified buyer · <time dateTime={r.date}>{r.date}</time></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="wrap mt-24">
        <SectionHeading eyebrow="Pairs well with" title="You may also like" />
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {related.map((r) => <ProductCard key={r.slug} product={r} />)}
        </div>
      </section>
    </div>
  );
}
