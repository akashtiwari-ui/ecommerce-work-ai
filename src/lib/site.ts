export const SITE = {
  name: "Wallora",
  legalName: "Wallora Studio",
  tagline: "Designer wallpaper you collect, level up, and love.",
  description:
    "Wallora is a gamified designer wallpaper store. Shop peel-and-stick and non-woven wallpaper in original patterns — botanical, geometric, coastal, art deco and kids' designs — earn XP, unlock badges and level up for member discounts.",
  /** Live production origin. Override with NEXT_PUBLIC_SITE_URL when you move to a custom domain. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://wallers.vercel.app").replace(/\/$/, ""),
  locale: "en_US",
  currency: "USD",
  /** Support inbox — published on the site and in Organization structured data. */
  email: "akashtiwariswe@gmail.com",
  /** WhatsApp / phone in E.164 format (India +91). */
  phone: "+919136831459",
  phoneDisplay: "+91 91368 31459",
  /** Set to your real X/Twitter handle (e.g. "@wallers") once the account exists. */
  twitter: "" as string,
  founded: "2024",
  /**
   * Official social profiles — feeds Organization `sameAs`, which search & AI engines use to
   * connect your brand entity. Only list accounts that actually exist.
   */
  sameAs: [] as string[],
  freeShippingThreshold: 120,
  returnDays: 30,
} as const;

export const SITE_HOST = new URL(SITE.url).host;

/** Click-to-chat WhatsApp link, optionally with a prefilled message. */
export const whatsappUrl = (text?: string) =>
  `https://wa.me/${SITE.phone.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mailtoUrl = (subject?: string, body?: string) => {
  const q = new URLSearchParams();
  if (subject) q.set("subject", subject);
  if (body) q.set("body", body);
  const qs = q.toString().replace(/\+/g, "%20");
  return `mailto:${SITE.email}${qs ? `?${qs}` : ""}`;
};

export const absoluteUrl = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: SITE.currency }).format(n);

/** Date content was last reviewed — surfaced to search & answer engines as a freshness signal. */
export const CONTENT_UPDATED = "2026-10-01";
