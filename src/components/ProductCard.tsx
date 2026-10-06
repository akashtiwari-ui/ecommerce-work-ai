import Link from "next/link";
import { getCollection, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/site";
import { RarityBadge, Stars } from "./Bits";
import { WallpaperArt } from "./WallpaperArt";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product: p, priority }: { product: Product; priority?: boolean }) {
  const c = getCollection(p.collection);
  return (
    <article className="group relative" data-priority={priority ? "" : undefined}>
      <Link href={`/wallpapers/${p.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-line shadow-soft transition duration-500 group-hover:shadow-lift">
          <WallpaperArt product={p} scale={0.9} className="absolute inset-0 transition duration-700 ease-out group-hover:scale-[1.06]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <RarityBadge rarity={p.rarity} className="bg-cream/90! backdrop-blur" />
            {p.isNew && <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cream">New</span>}
            {p.bestseller && <span className="rounded-full bg-clay px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cream">Bestseller</span>}
          </div>
          <span className="absolute bottom-3 left-3 translate-y-2 rounded-full bg-cream/95 px-3 py-1.5 text-xs font-semibold opacity-0 shadow-soft transition group-hover:translate-y-0 group-hover:opacity-100">
            View design →
          </span>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3 px-1">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">{c?.name}</p>
            <h3 className="mt-1 truncate font-display text-xl font-medium">{p.name}</h3>
            <div className="mt-1.5"><Stars rating={p.rating} count={p.reviewCount} /></div>
          </div>
          <p className="shrink-0 pt-5 text-sm font-semibold">
            <span className="text-muted font-normal">from </span>{formatPrice(p.basePrice)}
          </p>
        </div>
      </Link>
      <WishlistButton slug={p.slug} name={p.name} className="absolute right-3 top-3" />
    </article>
  );
}
