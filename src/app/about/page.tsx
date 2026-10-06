import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { WallpaperArt } from "@/components/WallpaperArt";
import { getProduct, PRODUCTS } from "@/lib/catalog";
import { absoluteUrl, mailtoUrl, SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Wallora — An Independent Wallpaper Design Studio",
  description: "Wallora is an independent studio designing original wallpaper, printed to order with water-based inks on FSC-certified paper, and the first wallpaper store with a built-in rewards game.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", url: absoluteUrl("/about"), name: "About Wallora", about: { "@id": absoluteUrl("/#organization") } }} />
      <div className="wrap"><Breadcrumbs items={[{ name: "About", path: "/about" }]} /></div>
      <section className="wrap mt-8 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Our story</p>
          <h1 className="mt-3 text-5xl font-medium leading-[1.02] sm:text-6xl">We think decorating should feel like play.</h1>
          <div className="prose-wl mt-8">
            <p>{SITE.name} began in {SITE.founded} with a sketchbook and a frustration: buying wallpaper felt like a chore — endless near-identical patterns, confusing roll maths and nervous guesswork.</p>
            <p>So we built the store we wanted. Every one of our {PRODUCTS.length} designs is drawn in-house, printed to order with water-based, low-VOC inks on FSC®-certified non-woven paper or PVC-free peel &amp; stick film, and shipped within two business days.</p>
            <p>And because discovering the perfect pattern should be fun, we made the whole experience a game: explore, collect rare designs, earn XP and level up for permanent discounts. No points that expire, no fine print.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {["fern-cathedral", "arcade-arches", "tidal-ribbon", "gatsby-fan"].map((s, i) => (
            <WallpaperArt key={s} product={getProduct(s)!} decorative className={`aspect-[4/5] overflow-hidden rounded-3xl shadow-soft ${i % 2 ? "mt-10" : ""}`} />
          ))}
        </div>
      </section>
      <section className="wrap mt-24 grid gap-5 sm:grid-cols-3">
        {[
          ["Designed in-house", "Original patterns by our studio — never stock art."],
          ["Printed to order", "Less waste, fresher colour, one batch per order."],
          ["Kind to homes", "Water-based, low-VOC inks; PVC-free film; FSC® paper."],
        ].map(([t, d]) => <div key={t} className="card p-8"><h2 className="font-display text-2xl">{t}</h2><p className="mt-2 text-muted">{d}</p></div>)}
      </section>
      <p className="wrap mt-12 text-muted">Questions? <a className="text-clay underline" href={whatsappUrl(`Hi ${SITE.name}!`)} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.phoneDisplay}</a>, email <a className="text-clay underline" href={mailtoUrl()}>{SITE.email}</a> or read our <Link href="/faq" className="text-clay underline">FAQ</Link>.</p>
    </div>
  );
}
