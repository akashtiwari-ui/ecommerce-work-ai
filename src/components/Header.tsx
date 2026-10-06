"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "./store";

const NAV = [
  { href: "/wallpapers", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/rooms", label: "Rooms" },
  { href: "/guides", label: "Guides" },
  { href: "/rewards", label: "Rewards" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <rect width="32" height="32" rx="9" fill="#1d1a17" />
        <path d="M6 22 A10 10 0 0 1 26 22Z" fill="#c8553d" />
        <path d="M11 22 A5 5 0 0 1 21 22Z" fill="#d9a441" />
        <circle cx="16" cy="9" r="2" fill="#fcf9f4" />
      </svg>
      <span className="font-display text-[1.35rem] font-semibold tracking-tight">Wallora</span>
    </span>
  );
}

export function Header() {
  const { level, state, cartCount, hydrated } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all ${scrolled ? "border-b border-line/80 bg-paper/85 backdrop-blur-xl" : "bg-paper"}`}>
      <div className="bg-ink text-center text-[11px] font-medium tracking-wide text-cream/90">
        <p className="wrap py-2">
          Free shipping over $120 · Earn XP on every order · <Link href="/rewards#spin" className="underline decoration-gold underline-offset-2 hover:text-gold">Spin today&apos;s Swatch Wheel 🎡</Link>
        </p>
      </div>
      <div className="wrap flex h-16 items-center gap-4">
        <button className="-ml-2 rounded-full p-2 lg:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
          </svg>
        </button>
        <Link href="/" aria-label="Wallora home"><Logo /></Link>
        <nav aria-label="Main" className="ml-6 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition hover:bg-ink/5 ${path.startsWith(n.href) ? "text-clay" : "text-ink/80"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <Link href="/rewards" className="group hidden items-center gap-2.5 rounded-full border border-line bg-cream py-1.5 pl-1.5 pr-3.5 transition hover:border-ink/30 sm:flex" aria-label={`Level ${level.current.level}, ${state.xp} XP — view rewards`}>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-[11px] font-bold text-gold">{hydrated ? level.current.level : 1}</span>
            <span className="flex flex-col leading-none">
              <span className="text-[11px] font-semibold">{hydrated ? level.current.name : "Blank Wall"}</span>
              <span className="mt-1 block h-1.5 w-24 overflow-hidden rounded-full bg-line">
                <span className="xp-bar block h-full rounded-full transition-[width] duration-700" style={{ width: `${Math.max(4, (hydrated ? level.progress : 0) * 100)}%` }} />
              </span>
            </span>
            <span className="text-[11px] font-semibold tabular-nums text-muted">{hydrated ? state.xp : 0} XP</span>
          </Link>
          <Link href="/wallpapers" className="rounded-full p-2.5 hover:bg-ink/5" aria-label="Search wallpapers">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" /></svg>
          </Link>
          <Link href="/wishlist" className="relative rounded-full p-2.5 hover:bg-ink/5" aria-label="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" strokeLinejoin="round" /></svg>
            {hydrated && state.wishlist.length > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-clay" />}
          </Link>
          <Link href="/cart" className="relative flex items-center gap-2 rounded-full bg-ink py-2.5 pl-3.5 pr-4 text-sm font-semibold text-cream transition hover:bg-clay" aria-label={`Cart, ${cartCount} items`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" strokeLinejoin="round" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
            <span className="tabular-nums">{hydrated ? cartCount : 0}</span>
          </Link>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="wrap animate-rise border-t border-line pb-6 pt-3 lg:hidden">
          <ul className="grid gap-1">
            {[...NAV, { href: "/style-quiz", label: "Style Quiz" }, { href: "/tools/wallpaper-calculator", label: "Roll Calculator" }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="block rounded-2xl px-4 py-3 font-display text-2xl hover:bg-cream">{n.label}</Link>
              </li>
            ))}
          </ul>
          <Link href="/rewards" className="mt-4 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-cream">
            <span className="text-sm">Lv {level.current.level} · {level.current.name}</span>
            <span className="text-sm font-semibold text-gold">{state.xp} XP</span>
          </Link>
        </nav>
      )}
    </header>
  );
}
