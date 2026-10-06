"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, mailtoUrl, SITE, whatsappUrl } from "@/lib/site";
import { MailIcon, WhatsAppIcon } from "./ContactIcons";
import { Totals } from "./CartView";
import { useStore, type Order } from "./store";

export function Checkout() {
  const { lines, total, placeOrder, hydrated, level } = useStore();
  const [placed, setPlaced] = useState<Order | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  if (placed)
    return (
      <div className="mx-auto max-w-xl animate-pop rounded-[2rem] bg-ink p-10 text-center text-cream">
        <p className="text-6xl">🏠</p>
        <h2 className="mt-4 font-display text-4xl">Order confirmed!</h2>
        <p className="mt-2 text-cream/70">Order {placed.id} · {formatPrice(placed.total)}</p>
        <p className="mt-6 font-display text-5xl text-gold">+{placed.xp} XP</p>
        <p className="mt-2 text-sm text-cream/60">You&apos;re now a {level.current.name}. Designs added to your collection.</p>
        <div className="mt-8 rounded-2xl bg-cream/5 p-5 text-left ring-1 ring-cream/10">
          <p className="text-sm font-semibold">Last step: send us your order</p>
          <p className="mt-1 text-xs text-cream/60">Online payment isn&apos;t live yet. Send these order details and we&apos;ll confirm payment and delivery with you.</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white hover:brightness-95"><WhatsAppIcon size={18} />Send on WhatsApp</a>
            <a href={mailtoUrl(`New order ${placed.id}`, message)} className="btn bg-cream text-ink hover:bg-gold"><MailIcon size={18} />Send by email</a>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/rewards" className="btn bg-gold text-ink hover:bg-cream">See rewards</Link>
          <Link href="/wallpapers" className="btn border border-cream/30 hover:bg-cream/10">Keep shopping</Link>
        </div>
      </div>
    );

  if (!hydrated) return <div className="card h-64 animate-pulse" />;
  if (!lines.length) return <div className="card p-12 text-center"><p className="font-display text-3xl">Nothing to check out yet.</p><Link href="/wallpapers" className="btn-primary mt-6">Shop wallpaper</Link></div>;

  return (
    <form
      className="grid gap-8 lg:grid-cols-[1.4fr_1fr]"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const v = (k: string) => String(f.get(k) ?? "").trim();
        setBusy(true);
        setTimeout(() => {
          const t = total;
          const items = lines.map((l) => `• ${l.qty} × ${l.product.name} — ${l.v.label} (${formatPrice(l.lineTotal)})`).join("\n");
          const next = placeOrder(t);
          const order = next.orders[0];
          setMessage(
            `Hi ${SITE.name}! I'd like to place order ${order.id}.\n\n${items}\n\nTotal: ${formatPrice(t)}\n\n` +
              `Name: ${v("firstName")} ${v("lastName")}\nEmail: ${v("email")}\nPhone: ${v("phone")}\n` +
              `Address: ${v("address")}, ${v("city")}, ${v("state")} ${v("zip")}`,
          );
          setPlaced(order);
          setBusy(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 700);
      }}
    >
      <div className="card space-y-6 p-6 sm:p-8">
        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="mb-3 font-display text-2xl">Contact</legend>
          <input required name="email" type="email" autoComplete="email" placeholder="Email" aria-label="Email" className="input" />
          <input required name="phone" type="tel" autoComplete="tel" placeholder="Phone / WhatsApp" aria-label="Phone or WhatsApp number" className="input" />
          <input required name="firstName" autoComplete="given-name" placeholder="First name" aria-label="First name" className="input" />
          <input required name="lastName" autoComplete="family-name" placeholder="Last name" aria-label="Last name" className="input" />
        </fieldset>
        <fieldset className="grid gap-3 sm:grid-cols-6">
          <legend className="mb-3 font-display text-2xl">Shipping address</legend>
          <input required name="address" autoComplete="address-line1" placeholder="Address" aria-label="Address" className="input sm:col-span-6" />
          <input required name="city" autoComplete="address-level2" placeholder="City" aria-label="City" className="input sm:col-span-3" />
          <input required name="state" autoComplete="address-level1" placeholder="State" aria-label="State" className="input sm:col-span-1" />
          <input required name="zip" autoComplete="postal-code" placeholder="ZIP" aria-label="ZIP code" className="input sm:col-span-2" />
        </fieldset>
        <div className="rounded-2xl border border-dashed border-line p-4 text-sm text-muted">
          <strong className="text-ink">Payment:</strong> no card is charged here. After you place your order, send it to us on WhatsApp or by email and we&apos;ll confirm payment and delivery with you.
        </div>
      </div>
      <aside className="card h-fit p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl">Summary</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {lines.map((l) => <li key={l.slug + l.variant} className="flex justify-between gap-3"><span className="truncate">{l.qty} × {l.product.name} <span className="text-muted">({l.v.label})</span></span><span>{formatPrice(l.lineTotal)}</span></li>)}
        </ul>
        <div className="mt-5 border-t border-line pt-5"><Totals compact /></div>
        <button disabled={busy} className="btn-clay mt-6 w-full py-4 text-base">{busy ? "Placing order…" : `Place order · ${formatPrice(total)}`}</button>
      </aside>
    </form>
  );
}
