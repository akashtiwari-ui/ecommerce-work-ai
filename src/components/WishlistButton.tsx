"use client";

import { useStore } from "./store";

export function WishlistButton({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const { state, toggleWishlist, hydrated } = useStore();
  const on = hydrated && state.wishlist.includes(slug);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(slug);
      }}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={`grid h-10 w-10 place-items-center rounded-full bg-cream/90 shadow-soft backdrop-blur transition hover:scale-110 active:scale-95 ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={on ? "#c8553d" : "none"} stroke={on ? "#c8553d" : "currentColor"} strokeWidth="1.8">
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
