"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ALL_STYLES, COLLECTIONS, PRODUCTS, RARITY_META, ROOMS, type Rarity } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

const SORTS = { featured: "Featured", "price-asc": "Price: low to high", "price-desc": "Price: high to low", rating: "Top rated", rarity: "Rarest first" } as const;
const RANK: Record<Rarity, number> = { Legendary: 0, Epic: 1, Rare: 2, Common: 3 };

export function ShopExplorer() {
  const sp = useSearchParams();
  const router = useRouter();
  const q = sp.get("q") ?? "";
  const f = { collection: sp.get("collection") ?? "", style: sp.get("style") ?? "", room: sp.get("room") ?? "", rarity: sp.get("rarity") ?? "", sort: (sp.get("sort") ?? "featured") as keyof typeof SORTS };

  const set = (k: string, v: string) => {
    const n = new URLSearchParams(sp.toString());
    if (v) n.set(k, v); else n.delete(k);
    router.replace(`/wallpapers${n.size ? `?${n}` : ""}`, { scroll: false });
  };

  const list = useMemo(() => {
    const needle = q.toLowerCase().trim();
    const r = PRODUCTS.filter((p) =>
      (!f.collection || p.collection === f.collection) &&
      (!f.style || p.styles.includes(f.style)) &&
      (!f.room || p.rooms.includes(f.room as never)) &&
      (!f.rarity || p.rarity === f.rarity) &&
      (!needle || [p.name, p.tagline, ...p.styles, ...p.colorNames, p.collection].join(" ").toLowerCase().includes(needle)),
    );
    const s = [...r];
    if (f.sort === "price-asc") s.sort((a, b) => a.basePrice - b.basePrice);
    if (f.sort === "price-desc") s.sort((a, b) => b.basePrice - a.basePrice);
    if (f.sort === "rating") s.sort((a, b) => b.rating - a.rating);
    if (f.sort === "rarity") s.sort((a, b) => RANK[a.rarity] - RANK[b.rarity]);
    if (f.sort === "featured") s.sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    return s;
  }, [q, f.collection, f.style, f.room, f.rarity, f.sort]);

  const Select = ({ k, label, opts }: { k: keyof typeof f; label: string; opts: [string, string][] }) => (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select value={f[k]} onChange={(e) => set(k, e.target.value)} className={`input cursor-pointer appearance-none py-2.5 pr-9 ${f[k] && k !== "sort" ? "border-ink bg-ink text-cream" : ""}`}>
        {k !== "sort" && <option value="">{label}: all</option>}
        {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs opacity-60">▾</span>
    </label>
  );

  const active = [f.collection, f.style, f.room, f.rarity, q].filter(Boolean).length;

  return (
    <>
      <div className="sticky top-[100px] z-20 -mx-4 mb-10 border-y border-line bg-paper/90 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-3xl sm:border sm:px-3">
        <div className="flex flex-wrap items-center gap-2">
          <label className="relative min-w-[200px] flex-1">
            <span className="sr-only">Search wallpaper</span>
            <input type="search" defaultValue={q} onChange={(e) => set("q", e.target.value)} placeholder="Search patterns, colours, styles…" className="input py-2.5 pl-10" />
            <svg aria-hidden className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </label>
          <Select k="collection" label="Collection" opts={COLLECTIONS.map((c) => [c.slug, c.name])} />
          <Select k="room" label="Room" opts={ROOMS.map((r) => [r.slug, r.name])} />
          <Select k="style" label="Style" opts={ALL_STYLES.map((s) => [s, s])} />
          <Select k="rarity" label="Rarity" opts={(Object.keys(RARITY_META) as Rarity[]).map((r) => [r, r])} />
          <Select k="sort" label="Sort" opts={Object.entries(SORTS)} />
        </div>
      </div>
      <div className="mb-6 flex items-center justify-between text-sm text-muted">
        <p aria-live="polite"><span className="font-semibold text-ink">{list.length}</span> designs</p>
        {active > 0 && <button onClick={() => router.replace("/wallpapers", { scroll: false })} className="font-medium text-clay hover:underline">Clear filters ({active})</button>}
      </div>
      {list.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      ) : (
        <div className="card p-16 text-center">
          <p className="font-display text-3xl">No walls match… yet.</p>
          <p className="mt-2 text-muted">Try fewer filters, or take the style quiz for a personal match.</p>
        </div>
      )}
    </>
  );
}
