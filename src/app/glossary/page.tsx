import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { GLOSSARY } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wallpaper Glossary: Repeat, Match & Material Terms",
  description: "Plain-English definitions of wallpaper terms: pattern repeat, straight match, half-drop match, random match, non-woven, paste-the-wall, peel and stick and more.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  const terms = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <div className="wrap max-w-4xl pt-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          "@id": absoluteUrl("/glossary"),
          name: "Wallora wallpaper glossary",
          hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, description: t.def, url: absoluteUrl(`/glossary#${t.slug}`), inDefinedTermSet: absoluteUrl("/glossary") })),
        }}
      />
      <Breadcrumbs items={[{ name: "Glossary", path: "/glossary" }]} />
      <h1 className="mt-6 text-5xl font-medium sm:text-6xl">Wallpaper glossary</h1>
      <p className="mt-4 text-lg text-muted">The language of wallpaper, explained in one or two sentences each.</p>
      <dl className="mt-12 divide-y divide-line rounded-3xl border border-line bg-cream">
        {terms.map((t) => (
          <div key={t.slug} id={t.slug} className="grid scroll-mt-28 gap-2 p-6 sm:grid-cols-[220px_1fr]">
            <dt className="font-display text-xl">{t.term}</dt>
            <dd className="leading-relaxed text-muted">{t.def}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
