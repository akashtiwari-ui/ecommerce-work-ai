import Link from "next/link";
import { COLLECTIONS, ROOMS } from "@/lib/catalog";
import { GUIDES } from "@/lib/guides";
import { SITE } from "@/lib/site";
import { Logo } from "./Header";
import { Newsletter } from "./Newsletter";

export function Footer() {
  const cols = [
    { title: "Shop", links: [{ href: "/wallpapers", label: "All wallpaper" }, ...COLLECTIONS.map((c) => ({ href: `/collections/${c.slug}`, label: c.name }))] },
    { title: "By room", links: ROOMS.map((r) => ({ href: `/rooms/${r.slug}`, label: `${r.name} wallpaper` })) },
    { title: "Learn", links: [...GUIDES.slice(0, 4).map((g) => ({ href: `/guides/${g.slug}`, label: g.title.split(":")[0].split("?")[0] })), { href: "/glossary", label: "Wallpaper glossary" }, { href: "/tools/wallpaper-calculator", label: "Roll calculator" }] },
    { title: "Wallora", links: [{ href: "/rewards", label: "Rewards & levels" }, { href: "/style-quiz", label: "Style quiz" }, { href: "/about", label: "About us" }, { href: "/faq", label: "FAQ" }, { href: "/shipping-returns", label: "Shipping & returns" }, { href: "/llms.txt", label: "For AI agents (llms.txt)" }] },
  ];
  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo className="text-cream" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">{SITE.description}</p>
          <p className="mt-8 font-display text-2xl">Get the Wallora letter</p>
          <p className="mt-1 mb-4 text-sm text-cream/60">New drops, installation tips &amp; a 10% welcome code.</p>
          <Newsletter dark />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">{c.title}</p>
              <ul className="space-y-2.5 text-sm text-cream/70">
                {c.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="transition hover:text-cream">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.legalName}. Designed in-house, printed to order.</p>
          <p className="flex gap-4">
            {SITE.sameAs.map((s) => (
              <a key={s} href={s} rel="me noopener" target="_blank" className="hover:text-cream">{new URL(s).hostname.replace("www.", "").split(".")[0]}</a>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
