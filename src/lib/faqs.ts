import { SITE } from "./site";

export const HOME_FAQS = [
  { q: "What is Wallora?", a: `Wallora is an online designer wallpaper store with a built-in rewards game. We design original wallpaper patterns in-house — botanical, retro geometric, coastal, art deco, terrazzo and kids' designs — and print them to order as peel & stick or non-woven wallpaper. Shoppers earn XP, unlock badges and level up for permanent discounts of up to 15%.` },
  { q: "Is Wallora peel and stick wallpaper removable?", a: "Yes. Wallora peel & stick wallpaper uses a low-tack, repositionable adhesive and removes cleanly without residue from smooth, properly cured painted walls (wait 4 weeks after painting)." },
  { q: "How does Wallora Rewards work?", a: "Every action earns XP: daily check-ins (+15 XP and growing with your streak), taking the style quiz (+50 XP), saving designs (+5 XP), and purchases (1 XP per $1 plus a rarity bonus of 20–150 XP). XP raises your level from Blank Wall (Level 1) to Wallora Legend (Level 6), unlocking automatic discounts of 3%, 5%, 8%, 10% and 15%." },
  { q: "How many rolls of wallpaper do I need?", a: "Multiply wall width by height to get square feet, divide by 28 for a peel & stick roll or 56 for a non-woven roll, then add 10–15% for pattern matching. A typical 12 × 8 ft accent wall needs 4 peel & stick rolls or 2 non-woven rolls." },
  { q: "Can I order a wallpaper sample?", a: "Yes. Every design is available as an A4 sample swatch for $5 with $2.50 shipping, so you can check colour and texture in your own light before ordering rolls." },
  { q: "How much is shipping and what is the return policy?", a: `Shipping is free on orders over $${SITE.freeShippingThreshold} (and always free for Level 5+ members); otherwise it is $9.50 for rolls and $2.50 for samples. Unused, unopened rolls can be returned free within ${SITE.returnDays} days.` },
];

export const STORE_FAQS = [
  ...HOME_FAQS,
  { q: "Where are Wallora wallpapers printed?", a: "Every roll is printed to order with water-based, low-VOC inks on FSC®-certified non-woven paper or PVC-free vinyl film, then shipped within 1–2 business days." },
  { q: "Is Wallora wallpaper safe for nurseries?", a: "Yes. Our inks are water-based and low-VOC, and our peel & stick film is PVC-free. We recommend letting a newly papered nursery air for 24 hours before use." },
  { q: "Can wallpaper be used on ceilings?", a: "Yes. Ceilings — 'the fifth wall' — are a great place for wallpaper. Non-woven paste-the-wall wallpaper is easiest on ceilings because it is lightweight and doesn't stretch." },
  { q: "What are wallpaper rarities?", a: "Every Wallora design has a rarity: Common (always in stock), Rare (small-batch colourways), Epic (limited runs of 500 rolls) and Legendary (numbered drops). Rarer designs award more XP and unlock collector badges." },
  { q: "Do Wallora discount codes stack with level discounts?", a: "Yes. Your level discount is applied first, then one promo code (such as a Swatch Wheel prize) is applied to the remaining total." },
];
