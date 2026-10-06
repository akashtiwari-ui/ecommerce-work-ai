import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { WallpaperArt } from "@/components/WallpaperArt";
import { getProduct } from "@/lib/catalog";
import { GUIDES } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wallpaper Guides — Measuring, Installing, Removing & Trends",
  description: "Clear, expert wallpaper guides: how much wallpaper you need, peel and stick vs traditional, step-by-step installation, bathrooms, removal and 2026 trends.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <div className="wrap pt-8">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Blog", name: "The Wallora Journal", url: absoluteUrl("/guides"), blogPost: GUIDES.map((g) => ({ "@type": "BlogPosting", headline: g.title, url: absoluteUrl(`/guides/${g.slug}`), datePublished: g.published, dateModified: g.updated })) }} />
      <Breadcrumbs items={[{ name: "Guides", path: "/guides" }]} />
      <header className="mt-6 max-w-3xl">
        <h1 className="text-5xl font-medium sm:text-6xl">The Wallora Journal</h1>
        <p className="mt-4 text-lg text-muted">Practical wallpaper know-how, written by our studio and installers. Each guide you finish earns <strong className="text-ink">+10 XP</strong> — read three to unlock the Bookworm badge 📚.</p>
      </header>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((g, i) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="group card flex flex-col overflow-hidden">
            <WallpaperArt product={getProduct(g.relatedProducts[0])!} scale={0.9} decorative className="h-48 transition duration-700 group-hover:scale-105" />
            <div className="flex flex-1 flex-col p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-clay">{g.category} · {g.minutes} min read</p>
              <h2 className="mt-2 font-display text-2xl leading-snug group-hover:text-clay">{g.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{g.description}</p>
              <p className="mt-4 text-xs text-muted">Updated <time dateTime={g.updated}>{g.updated}</time></p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
