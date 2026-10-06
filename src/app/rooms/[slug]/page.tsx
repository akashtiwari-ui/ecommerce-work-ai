import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/Bits";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { getRoom, productsForRoom, ROOMS } from "@/lib/catalog";
import { itemListLd } from "@/lib/schema";

type Params = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => ROOMS.map((r) => ({ slug: r.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const r = getRoom((await params).slug);
  if (!r) return {};
  return {
    title: `${r.headline} — ${productsForRoom(r.slug).length} Designer Ideas`,
    description: `${r.intro.split(". ")[0]}. Shop ${productsForRoom(r.slug).length} ${r.name.toLowerCase()} wallpaper designs with expert placement tips.`,
    alternates: { canonical: `/rooms/${r.slug}` },
  };
}

export default async function RoomPage({ params }: Params) {
  const r = getRoom((await params).slug);
  if (!r) notFound();
  const items = productsForRoom(r.slug);
  const faqs = [
    { q: `What is the best wallpaper for a ${r.name.toLowerCase()}?`, a: `For a ${r.name.toLowerCase()}, we recommend ${r.recommendedFinish.toLowerCase()} wallpaper. ${r.tips[0]} Popular Wallora designs for this room include ${items.slice(0, 3).map((p) => p.name).join(", ")}.` },
    { q: `Which wall should I wallpaper in a ${r.name.toLowerCase()}?`, a: r.tips.join(" ") },
  ];
  return (
    <div className="wrap pt-8">
      <JsonLd data={itemListLd(r.headline, `/rooms/${r.slug}`, items)} />
      <Breadcrumbs items={[{ name: "Rooms", path: "/rooms" }, { name: r.name, path: `/rooms/${r.slug}` }]} />
      <header className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h1 className="text-5xl font-medium sm:text-6xl">{r.headline}</h1>
          <p data-speakable className="mt-5 text-lg leading-relaxed text-muted">{r.intro}</p>
        </div>
        <aside className="card p-6">
          <p className="eyebrow">Designer tips</p>
          <ul className="mt-4 space-y-3 text-sm">
            {r.tips.map((t) => <li key={t} className="flex gap-3"><span className="text-clay">✦</span>{t}</li>)}
          </ul>
          <p className="mt-5 border-t border-line pt-4 text-sm"><strong>Recommended finish:</strong> {r.recommendedFinish}</p>
        </aside>
      </header>
      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {items.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
      <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="Questions" title={`${r.name} wallpaper FAQs`} />
        <Faq items={faqs} />
      </section>
    </div>
  );
}
