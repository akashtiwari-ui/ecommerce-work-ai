"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { productsInCollection, RARITY_META, variantsFor, type Product, type Variant } from "@/lib/catalog";
import { formatPrice, SITE, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./ContactIcons";
import { useStore } from "./store";
import { WishlistButton } from "./WishlistButton";

export function ProductPurchase({ product: p, initialVariant }: { product: Product; initialVariant?: string }) {
  const variants = variantsFor(p);
  const { addToCart, viewProduct, level, state, hydrated } = useStore();
  const [variant, setVariant] = useState<Variant["id"]>((variants.find((v) => v.id === initialVariant)?.id ?? "peel-stick") as Variant["id"]);
  const [qty, setQty] = useState(4);
  const v = variants.find((x) => x.id === variant)!;

  useEffect(() => {
    viewProduct(p.slug, p.collection);
    const sp = new URLSearchParams(window.location.search).get("variant");
    if (sp && variants.some((x) => x.id === sp)) setVariant(sp as Variant["id"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.slug]);

  useEffect(() => setQty(variant === "sample" ? 1 : variant === "non-woven" ? 2 : 4), [variant]);

  const total = v.price * qty;
  const discount = level.current.discount;
  const xp = Math.round(total * (1 - discount / 100)) + (variant === "sample" ? 0 : RARITY_META[p.rarity].xp);
  const siblings = productsInCollection(p.collection);
  const found = hydrated ? siblings.filter((s) => state.viewed.includes(s.slug)).length : 0;

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Choose a format</legend>
        <div className="grid gap-2">
          {variants.map((x) => (
            <label key={x.id} className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 px-4 py-3.5 transition ${variant === x.id ? "border-ink bg-cream" : "border-line hover:border-ink/30"}`}>
              <span className="flex items-center gap-3">
                <input type="radio" name="variant" value={x.id} checked={variant === x.id} onChange={() => setVariant(x.id)} className="h-4 w-4 accent-[#c8553d]" />
                <span>
                  <span className="block text-sm font-semibold">{x.label}</span>
                  <span className="block text-xs text-muted">
                    {x.id === "peel-stick" ? "Removable · renter-friendly · 28 sq ft/roll" : x.id === "non-woven" ? "Most durable · paste-the-wall · 56 sq ft/roll" : "Check colour & texture at home"}
                  </span>
                </span>
              </span>
              <span className="text-sm font-semibold">{formatPrice(x.price)}<span className="font-normal text-muted">/{x.unit}</span></span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-line bg-cream">
          <button className="h-12 w-12 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
          <span className="w-10 text-center font-semibold tabular-nums" aria-live="polite">{qty}</span>
          <button className="h-12 w-12 text-lg" onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity">+</button>
        </div>
        <button onClick={() => addToCart(p.slug, variant, qty)} className="btn-primary h-12 flex-1 text-base">
          Add to cart · {formatPrice(total)}
        </button>
        <WishlistButton slug={p.slug} name={p.name} className="h-12! w-12! border border-line" />
      </div>

      {variant !== "sample" && (
        <p className="text-sm text-muted">
          {qty} {qty === 1 ? "roll covers" : "rolls cover"} ≈ <strong className="text-ink">{qty * v.coverageSqFt} sq ft</strong> ({(qty * v.coverageSqFt * 0.0929).toFixed(1)} m²).{" "}
          <Link href="/tools/wallpaper-calculator" className="font-medium text-clay underline-offset-2 hover:underline">Not sure? Calculate rolls</Link>
        </p>
      )}

      <div className="grid gap-3 rounded-3xl bg-ink p-5 text-cream sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">You&apos;ll earn</p>
          <p className="mt-1 font-display text-3xl">+{xp} XP</p>
          <p className="text-xs text-cream/60">incl. {variant === "sample" ? 0 : RARITY_META[p.rarity].xp} XP {p.rarity} bonus</p>
        </div>
        <div className="sm:border-l sm:border-cream/10 sm:pl-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">Your level perk</p>
          <p className="mt-1 text-sm">{hydrated && discount ? `${discount}% off applied at checkout` : "Reach Level 2 for 3% off"}</p>
          <p className="mt-2 text-xs text-cream/60">Collection progress: {found}/{siblings.length} discovered</p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cream/15"><div className="xp-bar h-full rounded-full" style={{ width: `${(found / siblings.length) * 100}%` }} /></div>
        </div>
      </div>

      <ul className="grid grid-cols-3 gap-2 text-center text-[11px] text-muted">
        <li className="rounded-2xl border border-line p-3">🚚<br />Ships in 1–2 days</li>
        <li className="rounded-2xl border border-line p-3">↩︎<br />30-day free returns</li>
        <li className="rounded-2xl border border-line p-3">🌿<br />Low-VOC inks</li>
      </ul>

      <a
        href={whatsappUrl(`Hi ${SITE.name}! I have a question about ${p.name} wallpaper (${SITE.url}/wallpapers/${p.slug})`)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3 text-sm font-semibold text-[#1f7a4a] transition hover:bg-[#25D366]/20"
      >
        <WhatsAppIcon size={18} /> Questions? Ask us on WhatsApp
      </a>
    </div>
  );
}
