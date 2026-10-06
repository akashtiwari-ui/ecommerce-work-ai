import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MailIcon, WhatsAppIcon } from "@/components/ContactIcons";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, mailtoUrl, SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — WhatsApp & Email Support",
  description: `Talk to ${SITE.name} about wallpaper designs, roll quantities, orders and installation. WhatsApp ${SITE.phoneDisplay} or email ${SITE.email}.`,
  alternates: { canonical: "/contact" },
};

const faqs = [
  { q: `How do I contact ${SITE.name}?`, a: `Message us on WhatsApp at ${SITE.phoneDisplay} or email ${SITE.email}. We reply as quickly as we can.` },
  { q: "Can you help me choose a wallpaper or work out how many rolls I need?", a: "Yes. Send us a photo of your wall and its width and height on WhatsApp, and we'll suggest designs and an exact roll count." },
  { q: "How do I report a damaged or misprinted roll?", a: `Send a photo of the roll and its label to ${SITE.email} or on WhatsApp and we'll send a free replacement.` },
];

export default function ContactPage() {
  return (
    <div className="wrap max-w-5xl pt-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${SITE.name}`,
          url: absoluteUrl("/contact"),
          about: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <header className="mt-6 max-w-2xl">
        <h1 className="text-5xl font-medium sm:text-6xl">Let&apos;s talk walls.</h1>
        <p className="mt-4 text-lg text-muted">Questions about a design, sizing, an order or installation? Message us and a real person will get back to you.</p>
      </header>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <a href={whatsappUrl(`Hi ${SITE.name}! I'd like some help choosing wallpaper.`)} target="_blank" rel="noopener noreferrer" className="group rounded-3xl bg-[#1f7a4a] p-8 text-cream transition hover:-translate-y-1 hover:shadow-lift">
          <WhatsAppIcon size={36} />
          <h2 className="mt-6 font-display text-3xl">WhatsApp</h2>
          <p className="mt-1 text-lg tabular-nums">{SITE.phoneDisplay}</p>
          <p className="mt-3 text-sm text-cream/75">Fastest for design advice, roll counts and order updates. Send a photo of your wall!</p>
          <span className="mt-6 inline-flex rounded-full bg-cream px-5 py-3 text-sm font-semibold text-ink transition group-hover:bg-gold">Start chat →</span>
        </a>
        <a href={mailtoUrl(`Question for ${SITE.name}`)} className="group card p-8 transition hover:-translate-y-1 hover:shadow-lift">
          <span className="text-clay"><MailIcon size={36} /></span>
          <h2 className="mt-6 font-display text-3xl">Email</h2>
          <p className="mt-1 break-all text-lg">{SITE.email}</p>
          <p className="mt-3 text-sm text-muted">Best for orders, returns, damaged rolls and trade or bulk enquiries.</p>
          <span className="btn-primary mt-6">Send email →</span>
        </a>
      </div>
      <section className="mt-16">
        <h2 className="mb-6 text-3xl font-medium">Contact FAQs</h2>
        <Faq items={faqs} />
      </section>
    </div>
  );
}
