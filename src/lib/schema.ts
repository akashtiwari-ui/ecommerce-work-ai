import { absoluteUrl, CONTENT_UPDATED, SITE } from "./site";
import { getCollection, type Product, productQuickAnswer, SPECS, variantsFor } from "./catalog";
import type { Guide } from "./guides";

const ORG_ID = absoluteUrl("/#organization");
const SITE_ID = absoluteUrl("/#website");

const returnPolicy = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: ["US", "CA", "GB"],
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: SITE.returnDays,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/FreeReturn",
};

const shipping = (price: number) => ({
  "@type": "OfferShippingDetails",
  shippingRate: { "@type": "MonetaryAmount", value: price, currency: SITE.currency },
  shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
    transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 5, unitCode: "DAY" },
  },
});

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  "@id": ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: absoluteUrl("/icon.svg"),
  image: absoluteUrl("/opengraph-image"),
  description: SITE.description,
  slogan: SITE.tagline,
  foundingDate: SITE.founded,
  email: SITE.email,
  sameAs: SITE.sameAs,
  knowsAbout: ["Wallpaper", "Peel and stick wallpaper", "Non-woven wallpaper", "Interior design", "Wallpaper installation", "Murals"],
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: SITE.email, availableLanguage: ["English"] },
  hasMerchantReturnPolicy: returnPolicy,
  hasMemberProgram: {
    "@type": "MemberProgram",
    name: "Wallora Rewards",
    description: "A free gamified loyalty programme: earn XP, unlock badges and level up for permanent discounts of up to 15%.",
    url: absoluteUrl("/rewards"),
  },
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/wallpapers?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const productLd = (p: Product) => {
  const c = getCollection(p.collection)!;
  const url = absoluteUrl(`/wallpapers/${p.slug}`);
  const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: `${p.name} Wallpaper`,
    alternateName: p.name,
    description: productQuickAnswer(p) + " " + p.story,
    url,
    image: [absoluteUrl(`/wallpapers/${p.slug}/opengraph-image`)],
    sku: `WL-${p.slug.toUpperCase()}`,
    mpn: `WL-${p.slug.toUpperCase()}`,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@id": ORG_ID },
    category: "Home & Garden > Decor > Wallpaper",
    color: p.colorNames.join(", "),
    pattern: p.styles[0],
    material: "Non-woven paper / PVC-free vinyl",
    isPartOf: { "@type": "CollectionPage", name: c.name, url: absoluteUrl(`/collections/${c.slug}`) },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Pattern repeat", value: p.repeat },
      { "@type": "PropertyValue", name: "Pattern match", value: p.match },
      { "@type": "PropertyValue", name: "Scale", value: p.scale },
      { "@type": "PropertyValue", name: "Rarity", value: p.rarity },
      { "@type": "PropertyValue", name: "Peel & stick roll size", value: SPECS["peel-stick"].size },
      { "@type": "PropertyValue", name: "Non-woven roll size", value: SPECS["non-woven"].size },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount, bestRating: 5, worstRating: 1 },
    review: p.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      name: r.title,
      reviewBody: r.body,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    })),
    offers: variantsFor(p).map((v) => ({
      "@type": "Offer",
      name: v.label,
      sku: `WL-${p.slug.toUpperCase()}-${v.id.toUpperCase()}`,
      url: `${url}?variant=${v.id}`,
      price: v.price.toFixed(2),
      priceCurrency: SITE.currency,
      priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": ORG_ID },
      hasMerchantReturnPolicy: returnPolicy,
      shippingDetails: shipping(v.id === "sample" ? 2.5 : 9.5),
    })),
  };
};

export const itemListLd = (name: string, path: string, products: Product[]) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name,
  url: absoluteUrl(path),
  isPartOf: { "@id": SITE_ID },
  dateModified: CONTENT_UPDATED,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/wallpapers/${p.slug}`),
      name: `${p.name} Wallpaper`,
    })),
  },
});

export const articleLd = (g: Guide) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": absoluteUrl(`/guides/${g.slug}#article`),
  headline: g.title,
  description: g.description,
  url: absoluteUrl(`/guides/${g.slug}`),
  image: absoluteUrl(`/guides/${g.slug}/opengraph-image`),
  datePublished: g.published,
  dateModified: g.updated,
  author: { "@type": "Organization", name: `${SITE.name} Studio Team`, url: absoluteUrl("/about") },
  publisher: { "@id": ORG_ID },
  articleSection: g.category,
  timeRequired: `PT${g.minutes}M`,
  inLanguage: "en",
  mainEntityOfPage: absoluteUrl(`/guides/${g.slug}`),
  abstract: g.tldr.join(" "),
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["[data-speakable]"] },
});

export const howToLd = (g: Guide) =>
  g.howTo && {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: g.howTo.name,
    description: g.description,
    totalTime: g.howTo.totalTime,
    tool: g.howTo.tools.map((t) => ({ "@type": "HowToTool", name: t })),
    step: g.howTo.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: absoluteUrl(`/guides/${g.slug}#step-${i + 1}`),
    })),
  };
