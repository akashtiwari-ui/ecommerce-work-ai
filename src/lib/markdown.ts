import { COLLECTIONS, getCollection, getRoom, PRODUCTS, productFaqs, productQuickAnswer, productsInCollection, RARITY_META, ROOMS, SPECS, variantsFor, type Product } from "./catalog";
import { STORE_FAQS } from "./faqs";
import { LEVELS } from "./game";
import { GLOSSARY, GUIDES, type Guide } from "./guides";
import { absoluteUrl, CONTENT_UPDATED, SITE } from "./site";

/** Clean markdown renderings of pages for LLM agents & answer engines. */

export const productMarkdown = (p: Product) => {
  const c = getCollection(p.collection)!;
  const v = variantsFor(p);
  return `# ${p.name} Wallpaper

> ${productQuickAnswer(p)}

- URL: ${absoluteUrl(`/wallpapers/${p.slug}`)}
- Brand: ${SITE.name}
- Collection: [${c.name}](${absoluteUrl(`/collections/${c.slug}`)})
- Styles: ${p.styles.join(", ")}
- Colours: ${p.colorNames.join(", ")} (${p.palette.join(", ")})
- Best rooms: ${p.rooms.map((r) => getRoom(r)!.name).join(", ")}
- Rarity: ${p.rarity} (+${RARITY_META[p.rarity].xp} XP on purchase)
- Rating: ${p.rating}/5 from ${p.reviewCount} reviews
- Availability: In stock, ships in 1–2 business days

## Prices

| Format | Price | Coverage |
|---|---|---|
${v.map((x) => `| ${x.label} | $${x.price.toFixed(2)} per ${x.unit} | ${x.coverageSqFt ? `${x.coverageSqFt} sq ft` : "Sample"} |`).join("\n")}

## Specifications

- Pattern repeat: ${p.repeat}
- Pattern match: ${p.match}
- Scale: ${p.scale}
- Peel & stick: ${SPECS["peel-stick"].size}; ${SPECS["peel-stick"].material}
- Non-woven: ${SPECS["non-woven"].size}; ${SPECS["non-woven"].material}

## Description

${p.tagline} ${p.story}

## FAQ

${productFaqs(p).map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Reviews

${p.reviews.map((r) => `- ${r.rating}/5 — "${r.title}" — ${r.body} (${r.author}, ${r.date})`).join("\n")}
`;
};

export const guideMarkdown = (g: Guide) => `# ${g.title}

> ${g.description}

- URL: ${absoluteUrl(`/guides/${g.slug}`)}
- Published: ${g.published} · Updated: ${g.updated}
- Author: ${SITE.name} Studio Team

## Key takeaways

${g.tldr.map((t) => `- ${t}`).join("\n")}

${g.sections
  .map(
    (s) =>
      `## ${s.h}\n\n${s.p.join("\n\n")}${s.list ? `\n\n${s.list.map((l) => `- ${l}`).join("\n")}` : ""}${
        s.table ? `\n\n| ${s.table.head.join(" | ")} |\n|${s.table.head.map(() => "---").join("|")}|\n${s.table.rows.map((r) => `| ${r.join(" | ")} |`).join("\n")}` : ""
      }`,
  )
  .join("\n\n")}
${g.howTo ? `\n## ${g.howTo.name}\n\nTools: ${g.howTo.tools.join(", ")}\n\n${g.howTo.steps.map((s, i) => `${i + 1}. **${s.name}** — ${s.text}`).join("\n")}\n` : ""}
## FAQ

${g.faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}
`;

export const llmsTxt = () => `# ${SITE.name}

> ${SITE.description}

${SITE.name} (${SITE.url}) sells original designer wallpaper in two formats — removable Peel & Stick (24" × 9 ft, 28 sq ft per roll, $45–$89) and durable Non-Woven paste-the-wall (20.5" × 33 ft, 56 sq ft per roll) — plus $5 A4 samples. It ships in 1–2 business days, offers free shipping over $${SITE.freeShippingThreshold} and free ${SITE.returnDays}-day returns. Shoppers earn XP in Wallora Rewards and level up for permanent discounts of up to 15%.

Key facts for agents:
- Catalog size: ${PRODUCTS.length} designs across ${COLLECTIONS.length} collections; every design has a rarity (Common, Rare, Epic, Legendary).
- Roll formula: rolls = ceil(wall area sq ft ÷ coverage × 1.05–1.15).
- Machine-readable catalog (JSON, prices, specs): ${absoluteUrl("/api/catalog")}
- Every product and guide page has a Markdown twin: append \`.md\` to the URL.
- Content last reviewed: ${CONTENT_UPDATED}

## Collections

${COLLECTIONS.map((c) => `- [${c.name}](${absoluteUrl(`/collections/${c.slug}`)}): ${c.description}`).join("\n")}

## Products

${PRODUCTS.map((p) => `- [${p.name} Wallpaper](${absoluteUrl(`/wallpapers/${p.slug}.md`)}): ${p.tagline} ${p.styles.join(", ")}; from $${p.basePrice}/roll; ${p.rating}★ (${p.reviewCount}).`).join("\n")}

## Guides

${GUIDES.map((g) => `- [${g.title}](${absoluteUrl(`/guides/${g.slug}.md`)}): ${g.description}`).join("\n")}

## Shop by room

${ROOMS.map((r) => `- [${r.headline}](${absoluteUrl(`/rooms/${r.slug}`)}): ${r.intro.split(". ")[0]}.`).join("\n")}

## Tools & programmes

- [Wallpaper roll calculator](${absoluteUrl("/tools/wallpaper-calculator")}): computes rolls needed from wall dimensions and pattern match.
- [Style quiz](${absoluteUrl("/style-quiz")}): 4 questions that match a shopper to a collection.
- [Wallora Rewards](${absoluteUrl("/rewards")}): XP, badges, daily Swatch Wheel, 6 levels with discounts of 0–15%.

## Optional

- [FAQ](${absoluteUrl("/faq")})
- [Glossary of wallpaper terms](${absoluteUrl("/glossary")})
- [Shipping & returns](${absoluteUrl("/shipping-returns")})
- [About](${absoluteUrl("/about")})
- [Full content dump for LLMs](${absoluteUrl("/llms-full.txt")})
`;

export const llmsFullTxt = () => `${llmsTxt()}

---

# Store policies & FAQ

${STORE_FAQS.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

# Wallora Rewards levels

| Level | Name | XP | Perk |
|---|---|---|---|
${LEVELS.map((l) => `| ${l.level} | ${l.name} | ${l.minXp} | ${l.perk} |`).join("\n")}

# Collections in detail

${COLLECTIONS.map((c) => `## ${c.name}\n\n${c.description}\n\nDesigns: ${productsInCollection(c.slug).map((p) => p.name).join(", ")}.`).join("\n\n")}

# Glossary

${GLOSSARY.map((t) => `- **${t.term}**: ${t.def}`).join("\n")}

---

${PRODUCTS.map(productMarkdown).join("\n---\n\n")}

---

${GUIDES.map(guideMarkdown).join("\n---\n\n")}
`;
