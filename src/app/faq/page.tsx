import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { STORE_FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Wallpaper FAQ — Ordering, Installing, Shipping & Rewards",
  description: "Answers to common questions about Wallora wallpaper: peel and stick removal, how many rolls to order, samples, shipping, returns, nursery safety and Wallora Rewards.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="wrap max-w-4xl pt-8">
      <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
      <h1 className="mt-6 mb-10 text-5xl font-medium sm:text-6xl">Frequently asked questions</h1>
      <Faq items={STORE_FAQS} />
    </div>
  );
}
