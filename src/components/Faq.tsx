import { JsonLd } from "./JsonLd";
import { faqLd } from "@/lib/schema";

/** Accessible accordion; answers are in the DOM (not hidden from crawlers) and mirrored as FAQPage JSON-LD. */
export function Faq({ items, schema = true }: { items: { q: string; a: string }[]; schema?: boolean }) {
  return (
    <>
      {schema && <JsonLd data={faqLd(items)} />}
      <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-cream">
        {items.map((f, i) => (
          <details key={f.q} className="group" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left font-display text-lg font-medium marker:hidden hover:text-clay [&::-webkit-details-marker]:hidden">
              <h3 className="text-[1.1rem] leading-snug">{f.q}</h3>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition group-open:rotate-45 group-open:bg-ink group-open:text-cream">+</span>
            </summary>
            <p className="px-6 pb-6 -mt-1 max-w-3xl leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
