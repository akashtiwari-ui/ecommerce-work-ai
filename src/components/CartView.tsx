"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, SITE } from "@/lib/site";
import { useStore } from "./store";
import { WallpaperArt } from "./WallpaperArt";

export function Totals({ compact }: { compact?: boolean }) {
  const { subtotal, levelDiscount, promoDiscount, shipping, total, level, state } = useStore();
  const toFree = SITE.freeShippingThreshold - (subtotal - levelDiscount - promoDiscount);
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
      {levelDiscount > 0 && <div className="flex justify-between text-moss"><span>Level {level.current.level} perk ({level.current.discount}%)</span><span>−{formatPrice(levelDiscount)}</span></div>}
      {promoDiscount > 0 && <div className="flex justify-between text-moss"><span>Code {state.appliedCode}</span><span>−{formatPrice(promoDiscount)}</span></div>}
      <div className="flex justify-between"><span className="text-muted">Shipping</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div>
      {!compact && shipping > 0 && toFree > 0 && (
        <div>
          <p className="text-xs text-muted">Add {formatPrice(toFree)} more for free shipping</p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line"><div className="xp-bar h-full rounded-full" style={{ width: `${Math.min(100, (1 - toFree / SITE.freeShippingThreshold) * 100)}%` }} /></div>
        </div>
      )}
      <div className="flex justify-between border-t border-line pt-3 text-base font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
    </div>
  );
}

export function CartView() {
  const { lines, setQty, hydrated, state, applyCode, total } = useStore();
  const [code, setCode] = useState("");
  if (!hydrated) return <div className="card h-64 animate-pulse" />;
  if (!lines.length)
    return (
      <div className="card p-16 text-center">
        <p className="font-display text-4xl">Your cart is a blank wall.</p>
        <p className="mt-3 text-muted">Let&apos;s fix that — every design you add earns XP.</p>
        <Link href="/wallpapers" className="btn-primary mt-8">Shop wallpaper</Link>
      </div>
    );
  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <ul className="divide-y divide-line rounded-3xl border border-line bg-cream">
        {lines.map((l) => (
          <li key={l.slug + l.variant} className="flex gap-4 p-4 sm:p-6">
            <Link href={`/wallpapers/${l.slug}`} className="shrink-0"><WallpaperArt product={l.product} scale={0.6} decorative className="h-28 w-24 overflow-hidden rounded-2xl" /></Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex justify-between gap-3">
                <div>
                  <Link href={`/wallpapers/${l.slug}`} className="font-display text-xl hover:text-clay">{l.product.name}</Link>
                  <p className="text-sm text-muted">{l.v.label} · {formatPrice(l.v.price)}/{l.v.unit}</p>
                </div>
                <p className="font-semibold">{formatPrice(l.lineTotal)}</p>
              </div>
              <div className="mt-auto flex items-center gap-3 pt-3">
                <div className="flex items-center rounded-full border border-line">
                  <button className="h-9 w-9" onClick={() => setQty(l.slug, l.variant, l.qty - 1)} aria-label="Decrease">−</button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums">{l.qty}</span>
                  <button className="h-9 w-9" onClick={() => setQty(l.slug, l.variant, l.qty + 1)} aria-label="Increase">+</button>
                </div>
                <button onClick={() => setQty(l.slug, l.variant, 0)} className="text-xs text-muted underline-offset-2 hover:text-clay hover:underline">Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside className="card h-fit p-6 lg:sticky lg:top-28">
        <h2 className="font-display text-2xl">Order summary</h2>
        <form className="mt-5 flex gap-2" onSubmit={(e) => { e.preventDefault(); applyCode(code); }}>
          <label htmlFor="promo" className="sr-only">Promo code</label>
          <input id="promo" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code" className="input py-2.5 uppercase" />
          <button className="btn-ghost py-2.5">Apply</button>
        </form>
        {state.codes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {state.codes.map((c) => <button key={c} onClick={() => applyCode(state.appliedCode === c ? null : c)} className={`rounded-full border border-dashed px-3 py-1 font-mono text-xs ${state.appliedCode === c ? "border-moss bg-moss text-cream" : "border-clay/50 text-clay"}`}>{c}</button>)}
          </div>
        )}
        <div className="mt-6"><Totals /></div>
        <Link href="/checkout" className="btn-primary mt-6 w-full py-4 text-base">Checkout · {formatPrice(total)}</Link>
        <p className="mt-3 text-center text-xs text-muted">Earn ≈ {Math.round(total)}+ XP with this order</p>
      </aside>
    </div>
  );
}
