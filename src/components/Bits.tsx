import { RARITY_META, type Rarity } from "@/lib/catalog";

export function RarityBadge({ rarity, className = "" }: { rarity: Rarity; className?: string }) {
  const c = RARITY_META[rarity].color;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${className}`}
      style={{ background: `${c}1f`, color: c, boxShadow: `inset 0 0 0 1px ${c}55` }}
      title={RARITY_META[rarity].blurb}
    >
      <span aria-hidden>{rarity === "Legendary" ? "✦" : rarity === "Epic" ? "◆" : rarity === "Rare" ? "●" : "○"}</span>
      {rarity}
    </span>
  );
}

export function Stars({ rating, count, size = "sm" }: { rating: number; count?: number; size?: "sm" | "md" }) {
  const pct = (rating / 5) * 100;
  return (
    <span className={`inline-flex items-center gap-1.5 ${size === "md" ? "text-base" : "text-xs"}`}>
      <span className="relative inline-block leading-none tracking-[0.1em]" aria-label={`Rated ${rating} out of 5`}>
        <span className="text-line">★★★★★</span>
        <span className="absolute inset-0 overflow-hidden whitespace-nowrap text-gold" style={{ width: `${pct}%` }} aria-hidden>
          ★★★★★
        </span>
      </span>
      <span className="font-medium text-ink">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-muted">({count})</span>}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, sub, center }: { eyebrow?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl font-medium leading-tight text-ink sm:text-4xl md:text-[2.75rem]">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{sub}</p>}
    </div>
  );
}
