"use client";

import Link from "next/link";
import { getProduct } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { useStore } from "./store";

export function WishlistView() {
  const { state, hydrated } = useStore();
  if (!hydrated) return null;
  const items = state.wishlist.map(getProduct).filter(Boolean);
  if (!items.length)
    return (
      <div className="card p-16 text-center">
        <p className="font-display text-4xl">No favourites yet.</p>
        <p className="mt-3 text-muted">Tap the ♡ on any design. Save 3 to unlock the Curator badge 💛</p>
        <Link href="/wallpapers" className="btn-primary mt-8">Browse designs</Link>
      </div>
    );
  return <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">{items.map((p) => <ProductCard key={p!.slug} product={p!} />)}</div>;
}
