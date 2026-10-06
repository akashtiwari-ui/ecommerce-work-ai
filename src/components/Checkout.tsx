"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/site";
import { Totals } from "./CartView";
import { useStore, type Order } from "./store";

export function Checkout() {
  const { lines, total, placeOrder, hydrated, level } = useStore();
  const [placed, setPlaced] = useState<Order | null>(null);
  const [busy, setBusy] = useState(false);

  if (placed)
    return (
      <div className="mx-auto max-w-xl animate-pop rounded-[2rem] bg-ink p-10 text-center text-cream">
        <p className="text-6xl">🏠</p>
        <h2 className="mt-4 font-display text-4xl">Order confirmed!</h2>
        <p className="mt-2 text-cream/70">Order {placed.id} · {formatPrice(placed.total)}</p>
        <p className="mt-6 font-display text-5xl text-gold">+{placed.xp} XP</p>
        <p className="mt-2 text-sm text-cream/60">You&apos;re now a {level.current.name}. Designs added to your collection.</p>
        <div className="mt-8 flex justify-center gap-3">
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
        setBusy(true);
        setTimeout(() => {
          const t = total;
          const next = placeOrder(t);
          setPlaced(next.orders[0]);
          setBusy(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 700);
      }}
    >
      <div className="card space-y-6 p-6 sm:p-8">
        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="mb-3 font-display text-2xl">Contact</legend>
          <input required type="email" autoComplete="email" placeholder="Email" aria-label="Email" className="input sm:col-span-2" />
          <input required autoComplete="given-name" placeholder="First name" aria-label="First name" className="input" />
          <input required autoComplete="family-name" placeholder="Last name" aria-label="Last name" className="input" />
        </fieldset>
        <fieldset className="grid gap-3 sm:grid-cols-6">
          <legend className="mb-3 font-display text-2xl">Shipping address</legend>
          <input required autoComplete="address-line1" placeholder="Address" aria-label="Address" className="input sm:col-span-6" />
          <input required autoComplete="address-level2" placeholder="City" aria-label="City" className="input sm:col-span-3" />
          <input required autoComplete="address-level1" placeholder="State" aria-label="State" className="input sm:col-span-1" />
          <input required autoComplete="postal-code" placeholder="ZIP" aria-label="ZIP code" className="input sm:col-span-2" />
        </fieldset>
        <div className="rounded-2xl border border-dashed border-line p-4 text-sm text-muted">
          <strong className="text-ink">Payment:</strong> this storefront runs in demo mode — no card is charged. Connect Stripe Checkout (see README) to take live payments.
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
