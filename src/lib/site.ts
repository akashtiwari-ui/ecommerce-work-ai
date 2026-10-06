export const SITE = {
  name: "Wallora",
  legalName: "Wallora Studio",
  tagline: "Designer wallpaper you collect, level up, and love.",
  description:
    "Wallora is a gamified designer wallpaper store. Shop peel-and-stick and non-woven wallpaper in original patterns — botanical, geometric, coastal, art deco and kids' designs — earn XP, unlock badges and level up for member discounts.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://wallora.com").replace(/\/$/, ""),
  locale: "en_US",
  currency: "USD",
  email: "hello@wallora.com",
  twitter: "@wallora",
  founded: "2024",
  sameAs: [
    "https://www.instagram.com/wallora",
    "https://www.pinterest.com/wallora",
    "https://www.tiktok.com/@wallora",
  ],
  freeShippingThreshold: 120,
  returnDays: 30,
} as const;

export const absoluteUrl = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: SITE.currency }).format(n);

/** Date content was last reviewed — surfaced to search & answer engines as a freshness signal. */
export const CONTENT_UPDATED = "2026-10-01";
