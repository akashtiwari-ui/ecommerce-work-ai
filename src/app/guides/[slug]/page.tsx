import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { ReadTracker } from "@/components/ReadTracker";
import { getProduct } from "@/lib/catalog";
import { getGuide, GUIDES } from "@/lib/guides";
import { articleLd, howToLd } from "@/lib/schema";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));
export const dynamicParams = false;

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}`, types: { "text/markdown": `/guides/${g.slug}.md` } },
    openGraph: { type: "article", url: `/guides/${g.slug}`, publishedTime: g.published, modifiedTime: g.updated, section: g.category, authors: [`${SITE.name} Studio Team`] },
  };
}

export default async function GuidePage({ params }: Params) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const toc = [...g.sections.map((s) => s.h), ...(g.howTo ? [g.howTo.name] : []), "Frequently asked questions"];
  const others = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 3);
  return (
    <article className="pt-8">
      <ReadTracker slug={g.slug} />
      <JsonLd data={[articleLd(g), howToLd(g)]} />
      <div className="wrap max-w-6xl">
        <Breadcrumbs items={[{ name: "Guides", path: "/guides" }, { name: g.title.split(/[:?]/)[0], path: `/guides/${g.slug}` }]} />
      </div>
      <header className="wrap mt-8 max-w-6xl"><div className="max-w-4xl">
        <p className="eyebrow">{g.category} · {g.minutes} min read · +10 XP</p>
        <h1 className="mt-4 text-4xl font-medium leading-[1.06] sm:text-6xl">{g.title}</h1>
        <p className="mt-5 text-xl leading-relaxed text-muted">{g.description}</p>
        <p className="mt-6 text-sm text-muted">
          By <Link href="/about" className="font-medium text-ink hover:text-clay">{SITE.name} Studio Team</Link> · Published <time dateTime={g.published}>{g.published}</time> · Updated <time dateTime={g.updated}>{g.updated}</time>
        </p>
      </div></header>

      <div className="wrap mt-12 grid max-w-6xl gap-12 lg:grid-cols-[1fr_240px]">
        <div className="min-w-0">
          <aside data-speakable aria-label="Key takeaways" className="rounded-3xl border border-clay/25 bg-clay/5 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay">TL;DR — key takeaways</p>
            <ul className="mt-4 space-y-2.5">
              {g.tldr.map((t) => <li key={t} className="flex gap-3 text-[15px] leading-relaxed"><span className="mt-0.5 text-clay">✓</span><span>{t}</span></li>)}
            </ul>
          </aside>

          <div className="prose-wl mt-4">
            {g.sections.map((s) => (
              <section key={s.h} aria-labelledby={anchor(s.h)}>
                <h2 id={anchor(s.h)} className="scroll-mt-28">{s.h}</h2>
                {s.p.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                {s.list && <ul>{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}
                {s.table && (
                  <div className="mb-6 overflow-x-auto rounded-2xl border border-line bg-cream">
                    <table className="w-full min-w-[520px] text-left text-sm">
                      <thead className="bg-ink text-cream"><tr>{s.table.head.map((h) => <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
                      <tbody className="divide-y divide-line">
                        {s.table.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th key={i} scope="row" className="px-4 py-3 font-medium">{c}</th> : <td key={i} className="px-4 py-3">{c}</td>))}</tr>)}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {g.howTo && (
              <section aria-labelledby={anchor(g.howTo.name)}>
                <h2 id={anchor(g.howTo.name)} className="scroll-mt-28">{g.howTo.name}</h2>
                <p><strong>Time needed:</strong> about {g.howTo.totalTime.replace("PT", "").replace("H", " hours").replace("M", " minutes")}. <strong>Tools:</strong> {g.howTo.tools.join(", ")}.</p>
                <ol className="not-prose mb-8 space-y-4">
                  {g.howTo.steps.map((s, i) => (
                    <li key={s.name} id={`step-${i + 1}`} className="flex scroll-mt-28 gap-5 rounded-2xl border border-line bg-cream p-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink font-display text-lg text-gold">{i + 1}</span>
                      <div><h3 className="font-display text-lg">{s.name}</h3><p className="mt-1 mb-0! text-[15px] text-muted">{s.text}</p></div>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <section className="mt-12" aria-labelledby="faqs">
            <h2 id="faqs" className="mb-6 scroll-mt-28 text-3xl font-medium">Frequently asked questions</h2>
            <Faq items={g.faqs} />
          </section>
        </div>

        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">On this page</p>
            <ol className="mt-4 space-y-2.5 border-l border-line text-sm">
              {toc.map((t) => <li key={t}><a href={`#${t === "Frequently asked questions" ? "faqs" : anchor(t)}`} className="-ml-px block border-l border-transparent pl-4 text-muted hover:border-clay hover:text-ink">{t}</a></li>)}
            </ol>
            <Link href="/tools/wallpaper-calculator" className="mt-8 block rounded-2xl bg-moss p-5 text-sm text-cream hover:bg-ink">📐 Roll calculator<br /><span className="text-cream/70">Get an exact roll count · +20 XP</span></Link>
          </div>
        </nav>
      </div>

      <section className="wrap mt-24">
        <h2 className="font-display text-3xl">Designs mentioned in this guide</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {g.relatedProducts.map((s) => <ProductCard key={s} product={getProduct(s)!} />)}
        </div>
      </section>
      <nav className="wrap mt-20" aria-label="More guides">
        <h2 className="font-display text-3xl">Keep reading</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((o) => <li key={o.slug}><Link href={`/guides/${o.slug}`} className="card block p-6 hover:border-ink/30"><span className="text-xs text-clay">{o.category}</span><span className="mt-2 block font-display text-xl leading-snug">{o.title}</span></Link></li>)}
        </ul>
      </nav>
    </article>
  );
}
