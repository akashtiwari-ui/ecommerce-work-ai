import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: `Wallora ships in 1–2 business days. Free shipping over $${SITE.freeShippingThreshold}; $9.50 standard, $2.50 for samples. Free returns on unopened rolls within ${SITE.returnDays} days.`,
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingPage() {
  return (
    <div className="wrap max-w-3xl pt-8">
      <Breadcrumbs items={[{ name: "Shipping & returns", path: "/shipping-returns" }]} />
      <h1 className="mt-6 text-5xl font-medium">Shipping &amp; returns</h1>
      <div className="prose-wl mt-10">
        <h2>Shipping</h2>
        <ul>
          <li>Every order is printed to order and ships within 1–2 business days.</li>
          <li>Standard delivery (US): 2–5 business days.</li>
          <li>Free shipping on orders over ${SITE.freeShippingThreshold} after discounts, and always free for Level 5+ Rewards members.</li>
          <li>Otherwise $9.50 per order, or $2.50 for sample-only orders.</li>
        </ul>
        <h2>Returns</h2>
        <ul>
          <li>Free returns on unopened, unused rolls within {SITE.returnDays} days of delivery.</li>
          <li>Samples are non-returnable.</li>
          <li>If a roll arrives damaged or misprinted, we replace it free — just email a photo to {SITE.email}.</li>
        </ul>
      </div>
    </div>
  );
}
