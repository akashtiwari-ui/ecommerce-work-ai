export type Level = { level: number; name: string; minXp: number; discount: number; perk: string };

export const LEVELS: Level[] = [
  { level: 1, name: "Blank Wall", minXp: 0, discount: 0, perk: "Welcome! Start collecting designs." },
  { level: 2, name: "Swatch Scout", minXp: 100, discount: 3, perk: "3% off every order" },
  { level: 3, name: "Pattern Apprentice", minXp: 300, discount: 5, perk: "5% off + free samples" },
  { level: 4, name: "Wall Stylist", minXp: 700, discount: 8, perk: "8% off + early access to drops" },
  { level: 5, name: "Interior Alchemist", minXp: 1500, discount: 10, perk: "10% off + free shipping always" },
  { level: 6, name: "Wallora Legend", minXp: 3000, discount: 15, perk: "15% off + Legendary drop priority" },
];

export const levelFor = (xp: number) => {
  let current = LEVELS[0];
  for (const l of LEVELS) if (xp >= l.minXp) current = l;
  const next = LEVELS.find((l) => l.minXp > xp) ?? null;
  const progress = next ? (xp - current.minXp) / (next.minXp - current.minXp) : 1;
  return { current, next, progress };
};

export const XP = {
  dailyCheckIn: 15,
  viewDesign: 2,
  wishlist: 5,
  addToCart: 10,
  quiz: 50,
  calculator: 20,
  newsletter: 40,
  readGuide: 10,
  perDollar: 1,
} as const;

export type BadgeId =
  | "first-steps"
  | "explorer"
  | "curator"
  | "stylist-quiz"
  | "math-wiz"
  | "lucky-spin"
  | "streak-3"
  | "first-order"
  | "legend-hunter"
  | "bookworm"
  | "collector";

export const BADGES: Record<BadgeId, { name: string; emoji: string; desc: string; xp: number }> = {
  "first-steps": { name: "First Steps", emoji: "👣", desc: "Checked in for the first time", xp: 10 },
  explorer: { name: "Pattern Explorer", emoji: "🧭", desc: "Viewed designs from 3 different collections", xp: 30 },
  curator: { name: "Curator", emoji: "💛", desc: "Saved 3 designs to your wishlist", xp: 30 },
  "stylist-quiz": { name: "Style Sleuth", emoji: "🔍", desc: "Completed the style quiz", xp: 0 },
  "math-wiz": { name: "Measure Twice", emoji: "📐", desc: "Used the wallpaper calculator", xp: 0 },
  "lucky-spin": { name: "Lucky Swatch", emoji: "🎡", desc: "Spun the daily swatch wheel", xp: 0 },
  "streak-3": { name: "On a Roll", emoji: "🔥", desc: "Checked in 3 days in a row", xp: 50 },
  "first-order": { name: "First Wall", emoji: "🏠", desc: "Placed your first order", xp: 100 },
  "legend-hunter": { name: "Legend Hunter", emoji: "👑", desc: "Collected a Legendary design", xp: 150 },
  bookworm: { name: "Bookworm", emoji: "📚", desc: "Read 3 guides", xp: 30 },
  collector: { name: "Collector", emoji: "🗂️", desc: "Owned designs from 3 collections", xp: 120 },
};

export type Quest = { id: BadgeId; title: string; hint: string; href: string };

export const QUESTS: Quest[] = [
  { id: "first-steps", title: "Check in today", hint: "Tap the daily check-in", href: "/rewards" },
  { id: "lucky-spin", title: "Spin the Swatch Wheel", hint: "Once a day, every day", href: "/rewards#spin" },
  { id: "stylist-quiz", title: "Discover your wall style", hint: "4 quick questions", href: "/style-quiz" },
  { id: "explorer", title: "Explore 3 collections", hint: "Open designs from different collections", href: "/collections" },
  { id: "curator", title: "Save 3 favourites", hint: "Tap the heart on any design", href: "/wallpapers" },
  { id: "math-wiz", title: "Measure your wall", hint: "Use the roll calculator", href: "/tools/wallpaper-calculator" },
  { id: "bookworm", title: "Read 3 guides", hint: "Learn like a pro", href: "/guides" },
  { id: "streak-3", title: "3-day streak", hint: "Check in 3 days running", href: "/rewards" },
  { id: "first-order", title: "Hang your first wall", hint: "Place an order", href: "/wallpapers" },
  { id: "legend-hunter", title: "Hunt a Legendary", hint: "Buy a Legendary-rarity design", href: "/wallpapers?rarity=Legendary" },
  { id: "collector", title: "Collect 3 collections", hint: "Own designs from 3 collections", href: "/collections" },
];

export type Prize = { label: string; kind: "xp" | "code"; value: number; code?: string; color: string };

export const WHEEL: Prize[] = [
  { label: "+10 XP", kind: "xp", value: 10, color: "#e8d9b5" },
  { label: "5% OFF", kind: "code", value: 5, code: "SPIN5", color: "#c8553d" },
  { label: "+25 XP", kind: "xp", value: 25, color: "#8a9a7b" },
  { label: "Free sample", kind: "code", value: 5, code: "FREESWATCH", color: "#d9a441" },
  { label: "+50 XP", kind: "xp", value: 50, color: "#2f6f6a" },
  { label: "10% OFF", kind: "code", value: 10, code: "SPIN10", color: "#7a4a6a" },
  { label: "+15 XP", kind: "xp", value: 15, color: "#e3b7a0" },
  { label: "+100 XP", kind: "xp", value: 100, color: "#1e1b18" },
];

/** Promo codes: percent-off except FREESWATCH (flat $5 = one free sample). */
export const PROMO_CODES: Record<string, { pct?: number; flat?: number; label: string }> = {
  SPIN5: { pct: 5, label: "Wheel prize — 5% off" },
  SPIN10: { pct: 10, label: "Wheel prize — 10% off" },
  FREESWATCH: { flat: 5, label: "Wheel prize — one free sample" },
  WELCOME10: { pct: 10, label: "Welcome — 10% off your first order" },
};

export const todayKey = () => new Date().toISOString().slice(0, 10);
export const yesterdayKey = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);
