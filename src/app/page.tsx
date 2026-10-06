import Link from "next/link";
import type { Metadata } from "next";
import { RarityBadge, SectionHeading } from "@/components/Bits";
import { Faq } from "@/components/Faq";
import { ProductCard } from "@/components/ProductCard";
import { WallpaperArt } from "@/components/WallpaperArt";
import { COLLECTIONS, getProduct, PRODUCTS, RARITY_META, ROOMS, type Rarity } from "@/lib/catalog";
import { HOME_FAQS } from "@/lib/faqs";
import { LEVELS } from "@/lib/game";
import { GUIDES } from "@/lib/guides";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — Designer & Peel and Stick Wallpaper` },
  description: "Original designer wallpaper in peel & stick and non-woven. Shop botanical, retro, coastal & art deco designs — earn XP, unlock badges, level up for up to 15% off.",
  alternates: { canonical: "/" },
};

const totalReviews = PRODUCTS.reduce((a, p) => a + p.reviewCount, 0);
const avgRating = (PRODUCTS.reduce((a, p) => a + p.rating * p.reviewCount, 0) / totalReviews).toFixed(1);

export default function Home() {
  const hero = ["arcade-arches", "monstera-hush", "gatsby-fan"].map((s) => getProduct(s)!);
  const best = PRODUCTS.filter((p) => p.bestseller).slice(0, 8);

  return (
    <>
      {/* ——— Hero */}
      <section className="relative overflow-hidden">
        <div className="wrap grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
          <div className="animate-rise">
            <p className="chip mb-6 border-clay/30 bg-clay/5 text-clay">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-clay" /> New drop: Disco Rings &amp; Velvet Lattice
            </p>
            <h1 className="text-[3.1rem] font-medium leading-[0.98] tracking-tight sm:text-7xl lg:text-[5.4rem]">
              Walls worth <em className="font-normal text-clay">collecting.</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              Original designer wallpaper in peel &amp; stick and non-woven — botanical, retro geometric, coastal and art deco. Every design you discover, save and hang earns XP toward permanent member discounts.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/wallpapers" className="btn-primary px-7 py-4 text-base">Shop wallpaper</Link>
              <Link href="/style-quiz" className="btn-ghost px-7 py-4 text-base">Find your style <span className="rounded-full bg-gold/25 px-2 py-0.5 text-xs text-ink">+50 XP</span></Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
              <div><dt className="text-xs text-muted">Avg. rating</dt><dd className="mt-1 font-display text-2xl">{avgRating}★</dd></div>
              <div><dt className="text-xs text-muted">Happy walls</dt><dd className="mt-1 font-display text-2xl">{(totalReviews / 1000).toFixed(1)}k+</dd></div>
              <div><dt className="text-xs text-muted">Free returns</dt><dd className="mt-1 font-display text-2xl">{SITE.returnDays} days</dd></div>
            </dl>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[560px]" aria-hidden>
            <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-gold/25 via-clay/10 to-sage/25 blur-3xl" />
            {hero.map((p, i) => {
              const pos = ["left-[4%] top-[6%] w-[52%] [--r:-6deg]", "right-[2%] top-[18%] w-[46%] [--r:5deg]", "left-[22%] bottom-[2%] w-[48%] [--r:-2deg]"][i];
              return (
                <div key={p.slug} className={`absolute ${pos} animate-float`} style={{ animationDelay: `${i * -2}s` }}>
                  <div className="relative overflow-hidden rounded-[28px] border-[6px] border-cream shadow-lift">
                    <WallpaperArt product={p} scale={1} decorative className="aspect-[5/6]" />
                    <span className="absolute bottom-3 left-3"><RarityBadge rarity={p.rarity} className="bg-cream/95!" /></span>
                  </div>
                </div>
              );
            })}
            <div className="absolute -right-2 bottom-[16%] w-52 animate-float rounded-2xl bg-ink p-4 text-cream shadow-lift [--r:3deg]" style={{ animationDelay: "-3s" }}>
              <p className="text-[10px] uppercase tracking-[0.18em] text-gold">Level up!</p>
              <p className="mt-1 font-display text-lg">Wall Stylist</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cream/15"><div className="xp-bar h-full w-[72%] rounded-full" /></div>
              <p className="mt-2 text-[11px] text-cream/60">8% off unlocked · 512 / 700 XP</p>
            </div>
          </div>
        </div>

        {/* marquee of every design */}
        <div className="relative overflow-hidden border-y border-line bg-cream py-4" aria-hidden>
          <div className="flex w-max animate-drift gap-3">
            {[...PRODUCTS, ...PRODUCTS].map((p, i) => (
              <WallpaperArt key={i} product={p} scale={0.55} decorative className="h-16 w-28 shrink-0 overflow-hidden rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* ——— How it plays */}
      <section className="wrap py-24" aria-labelledby="how">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-end">
          <SectionHeading eyebrow="Shopping, but make it a game" title="Discover. Collect. Level up." sub="Wallora Rewards is free and automatic. Earn XP for exploring, learning and decorating — and watch your member discount grow with every level." />
          <ol className="grid gap-4 sm:grid-cols-3">
            {[
              { n: "01", t: "Explore & earn", d: "+XP for every new design, daily check-in, guide read and quiz.", e: "🧭" },
              { n: "02", t: "Collect rarities", d: "Common to Legendary. Rarer designs award bigger XP and badges.", e: "✦" },
              { n: "03", t: "Level up", d: "Six levels unlock automatic discounts up to 15% for life.", e: "▲" },
            ].map((s) => (
              <li key={s.n} className="card p-6">
                <span className="text-2xl">{s.e}</span>
                <p className="mt-4 text-xs font-semibold text-muted">{s.n}</p>
                <h3 className="mt-1 font-display text-xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-12 overflow-x-auto pb-2">
          <ol className="flex min-w-[720px] items-stretch gap-2">
            {LEVELS.map((l, i) => (
              <li key={l.level} className="relative flex-1 rounded-2xl border border-line bg-cream p-4" style={{ background: `color-mix(in oklab, var(--color-clay) ${i * 9}%, var(--color-cream))`, color: i > 3 ? "var(--color-cream)" : undefined }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-70">Lv {l.level} · {l.minXp} XP</p>
                <p className="mt-1 font-display text-lg leading-tight">{l.name}</p>
                <p className="mt-2 text-xs opacity-80">{l.discount ? `${l.discount}% off` : "Start here"}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— Collections */}
      <section className="bg-cream py-24" aria-labelledby="col">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Six worlds of pattern" title="Shop wallpaper by collection" />
            <Link href="/collections" className="btn-ghost">All collections →</Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COLLECTIONS.map((c, i) => {
              const p = getProduct(c.hero)!;
              return (
                <Link key={c.slug} href={`/collections/${c.slug}`} className={`group relative overflow-hidden rounded-3xl ${i === 0 ? "sm:col-span-2 lg:row-span-2" : ""}`}>
                  <WallpaperArt product={p} scale={1.2} decorative className={`${i === 0 ? "aspect-[3/2] sm:aspect-[2/1] lg:aspect-auto lg:h-full" : "aspect-[3/2]"} transition duration-700 group-hover:scale-105`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-cream/70">{c.kicker}</p>
                    <h3 className="mt-1 font-display text-3xl">{c.name}</h3>
                    <p className="mt-1 text-sm text-cream/75">{c.mood}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Bestsellers */}
      <section className="wrap py-24" aria-labelledby="best">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Most collected" title="Bestselling wallpaper" />
          <Link href="/wallpapers" className="btn-ghost">Shop all {PRODUCTS.length} designs →</Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {best.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 4} />)}
        </div>
      </section>

      {/* ——— Rarity band */}
      <section className="grain relative overflow-hidden bg-ink py-24 text-cream">
        <div className="wrap relative">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold!">Rarity tiers</p>
            <h2 className="mt-3 text-4xl font-medium sm:text-5xl">Some walls are rarer than others.</h2>
            <p className="mt-4 text-lg text-cream/65">Every Wallora design carries a rarity. Legendary drops are numbered and never reprinted in the same colourway.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(RARITY_META) as Rarity[]).map((r) => {
              const sample = getProduct({ Common: "confetti-dot", Rare: "tidal-ribbon", Epic: "velvet-lattice", Legendary: "gatsby-fan" }[r])!;
              return (
                <Link key={r} href={`/wallpapers?rarity=${r}`} className="group overflow-hidden rounded-3xl border border-cream/10 bg-cream/5 transition hover:border-cream/30">
                  <WallpaperArt product={sample} scale={0.8} decorative className="h-32 transition duration-700 group-hover:scale-105" />
                  <div className="p-5">
                    <RarityBadge rarity={r} className="bg-cream!" />
                    <p className="mt-3 text-sm text-cream/70">{RARITY_META[r].blurb}</p>
                    <p className="mt-3 text-xs font-semibold text-gold">+{RARITY_META[r].xp} XP bonus on purchase</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Rooms + tools */}
      <section className="wrap py-24">
        <SectionHeading eyebrow="Shop by room" title="Wallpaper for every room" />
        <div className="mt-8 flex flex-wrap gap-2">
          {ROOMS.map((r) => (
            <Link key={r.slug} href={`/rooms/${r.slug}`} className="rounded-full border border-line bg-cream px-5 py-3 text-sm font-medium transition hover:border-ink hover:bg-ink hover:text-cream">
              {r.headline}
            </Link>
          ))}
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Link href="/style-quiz" className="group relative overflow-hidden rounded-3xl bg-clay p-8 text-cream sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/70">60-second quiz · +50 XP</p>
            <h3 className="mt-3 max-w-sm font-display text-4xl leading-tight">What&apos;s your wall personality?</h3>
            <p className="mt-3 max-w-sm text-cream/80">Answer 4 questions and we&apos;ll match you with your collection.</p>
            <span className="mt-8 inline-flex rounded-full bg-cream px-5 py-3 text-sm font-semibold text-ink transition group-hover:bg-ink group-hover:text-cream">Take the quiz →</span>
            <span aria-hidden className="absolute -bottom-10 -right-10 text-[12rem] leading-none opacity-15 transition group-hover:rotate-12">✦</span>
          </Link>
          <Link href="/tools/wallpaper-calculator" className="group relative overflow-hidden rounded-3xl bg-moss p-8 text-cream sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/70">Free tool · +20 XP</p>
            <h3 className="mt-3 max-w-sm font-display text-4xl leading-tight">How many rolls do I need?</h3>
            <p className="mt-3 max-w-sm text-cream/80">Measure once, order right. Accounts for pattern repeat and waste.</p>
            <span className="mt-8 inline-flex rounded-full bg-cream px-5 py-3 text-sm font-semibold text-ink transition group-hover:bg-gold">Open calculator →</span>
            <span aria-hidden className="absolute -bottom-6 -right-4 text-[10rem] leading-none opacity-15 transition group-hover:-rotate-12">📐</span>
          </Link>
        </div>
      </section>

      {/* ——— Guides */}
      <section className="bg-cream py-24">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="The Wallora journal" title="Wallpaper guides, answered clearly" />
            <Link href="/guides" className="btn-ghost">All guides →</Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {GUIDES.slice(0, 3).map((g, i) => {
              const p = getProduct(g.relatedProducts[0])!;
              return (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="group card overflow-hidden">
                  <WallpaperArt product={p} scale={0.9} decorative className="h-44 transition duration-700 group-hover:scale-105" />
                  <div className="p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-clay">{g.category} · {g.minutes} min</p>
                    <h3 className="mt-2 font-display text-xl leading-snug group-hover:text-clay">{g.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{g.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— FAQ */}
      <section className="wrap grid gap-12 py-24 lg:grid-cols-[1fr_1.6fr]" aria-labelledby="faq">
        <SectionHeading eyebrow="Quick answers" title="Frequently asked questions" sub="Everything you need to know about buying, hanging and earning with Wallora." />
        <Faq items={HOME_FAQS} />
      </section>
    </>
  );
}
