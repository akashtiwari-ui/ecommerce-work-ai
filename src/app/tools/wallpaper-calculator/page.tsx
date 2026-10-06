import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calculator } from "@/components/Calculator";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wallpaper Calculator — How Many Rolls Do I Need?",
  description: "Free wallpaper roll calculator. Enter your wall sizes in feet or metres and get the exact number of peel & stick or non-woven rolls, including pattern repeat waste.",
  alternates: { canonical: "/tools/wallpaper-calculator" },
};

const faqs = [
  { q: "How do I calculate how many rolls of wallpaper I need?", a: "Multiply each wall's width by its height and add them together. Divide the total by the coverage of one roll (28 sq ft for Wallora peel & stick, 56 sq ft for non-woven), multiply by 1.05–1.15 for pattern-matching waste, and round up." },
  { q: "How much does a roll of wallpaper cover?", a: "A Wallora peel & stick roll (24\" × 9 ft) covers 28 sq ft (2.6 m²). A non-woven roll (20.5\" × 33 ft) covers 56 sq ft (5.2 m²). Standard European rolls (53 cm × 10 m) cover about 5.3 m²." },
  { q: "Should I subtract windows and doors?", a: "Not for a single standard door or window — the offcuts usually can't be reused because of pattern matching. For large openings like patio doors, subtract about half of their area." },
];

export default function CalculatorPage() {
  return (
    <div className="wrap pt-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Wallora Wallpaper Roll Calculator",
          url: absoluteUrl("/tools/wallpaper-calculator"),
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any (web browser)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: "Calculates how many rolls of peel and stick or non-woven wallpaper are needed for one or more walls, including pattern-repeat waste.",
        }}
      />
      <Breadcrumbs items={[{ name: "Tools", path: "/tools/wallpaper-calculator" }, { name: "Wallpaper calculator", path: "/tools/wallpaper-calculator" }]} />
      <header className="mt-6 max-w-3xl">
        <p className="eyebrow">Free tool · +20 XP · unlocks “Measure Twice” 📐</p>
        <h1 className="mt-3 text-5xl font-medium sm:text-6xl">Wallpaper calculator</h1>
        <p data-speakable className="mt-4 text-lg text-muted">
          <strong className="text-ink">Formula:</strong> rolls = (wall width × wall height ÷ roll coverage) × (1 + waste), rounded up. Wallora peel &amp; stick covers 28 sq ft per roll; non-woven covers 56 sq ft. Add 5% for random-match, 10% for straight-match and 15% for half-drop patterns.
        </p>
      </header>
      <div className="mt-10"><Calculator /></div>
      <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <h2 className="text-4xl font-medium">Calculator FAQs</h2>
        <Faq items={faqs} />
      </section>
    </div>
  );
}
