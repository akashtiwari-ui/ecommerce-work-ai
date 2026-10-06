export type PatternKind =
  | "arches"
  | "terrazzo"
  | "botanical"
  | "waves"
  | "gingham"
  | "sunburst"
  | "scallop"
  | "dots"
  | "chevron"
  | "stripes"
  | "deco"
  | "hills"
  | "stars"
  | "rings"
  | "blobs"
  | "lattice";

export type Rarity = "Common" | "Rare" | "Epic" | "Legendary";

export type RoomSlug = "living-room" | "bedroom" | "nursery" | "bathroom" | "kitchen" | "home-office";

export type Variant = {
  id: "peel-stick" | "non-woven" | "sample";
  label: string;
  price: number;
  unit: string;
  /** Coverage in square feet per unit */
  coverageSqFt: number;
};

export type Review = { author: string; rating: number; date: string; title: string; body: string };

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  collection: string; // collection slug
  pattern: PatternKind;
  palette: [string, string, string, string]; // background, primary, secondary, accent
  colorNames: string[];
  styles: string[];
  rooms: RoomSlug[];
  rarity: Rarity;
  basePrice: number; // peel & stick price per roll
  rating: number;
  reviewCount: number;
  repeat: string;
  match: "Straight match" | "Half-drop match" | "Random match";
  scale: "Small" | "Medium" | "Large" | "Mural";
  story: string;
  bestseller?: boolean;
  isNew?: boolean;
  reviews: Review[];
};

export type Collection = {
  slug: string;
  name: string;
  kicker: string;
  description: string;
  mood: string;
  hero: string; // product slug used as visual
};

export type Room = {
  slug: RoomSlug;
  name: string;
  headline: string;
  intro: string;
  tips: string[];
  recommendedFinish: string;
};

export const RARITY_META: Record<Rarity, { color: string; xp: number; blurb: string }> = {
  Common: { color: "#7d8f6e", xp: 20, blurb: "Everyday classics, always in stock." },
  Rare: { color: "#3e6e8e", xp: 40, blurb: "Small-batch colorways." },
  Epic: { color: "#7a4a6a", xp: 75, blurb: "Limited print runs of 500 rolls." },
  Legendary: { color: "#c08a1e", xp: 150, blurb: "Numbered drops — once they're gone, they're gone." },
};

export const variantsFor = (p: Product): Variant[] => [
  { id: "peel-stick", label: "Peel & Stick", price: p.basePrice, unit: "roll", coverageSqFt: 28 },
  { id: "non-woven", label: "Non-Woven (paste-the-wall)", price: Math.round(p.basePrice * 1.25), unit: "roll", coverageSqFt: 56 },
  { id: "sample", label: "A4 Sample Swatch", price: 5, unit: "swatch", coverageSqFt: 0 },
];

export const SPECS = {
  "peel-stick": {
    size: '24" × 9 ft (61 cm × 2.74 m) per roll',
    coverage: "28 sq ft (2.6 m²) per roll",
    material: "PVC-free matte vinyl film with low-tack, repositionable adhesive",
    removal: "Removable without residue on smooth, properly cured painted walls",
    durability: "Water-resistant, wipeable with a damp cloth",
  },
  "non-woven": {
    size: '20.5" × 33 ft (52 cm × 10 m) per roll',
    coverage: "56 sq ft (5.2 m²) per roll",
    material: "FSC®-certified non-woven paper, water-based inks",
    removal: "Strippable dry — peels off in full lengths",
    durability: "Scrubbable, breathable, mould-resistant",
  },
} as const;

export const COLLECTIONS: Collection[] = [
  {
    slug: "terra-botanica",
    name: "Terra Botanica",
    kicker: "Botanical wallpaper",
    description:
      "Hand-drawn leaves, palms and climbing vines in earthy greens and clay. Terra Botanica brings the calm of a conservatory to living rooms, bedrooms and powder rooms.",
    mood: "Grounded, leafy, restorative",
    hero: "monstera-hush",
  },
  {
    slug: "mid-century-arcade",
    name: "Mid-Century Arcade",
    kicker: "Retro geometric wallpaper",
    description:
      "Arches, sunbursts and rainbow curves inspired by 1960s and 70s design. Warm mustard, terracotta and teal geometrics that make a statement wall instantly.",
    mood: "Playful, warm, nostalgic",
    hero: "arcade-arches",
  },
  {
    slug: "coastal-drift",
    name: "Coastal Drift",
    kicker: "Coastal wallpaper",
    description:
      "Rolling waves, scallops and sun-washed stripes in sea glass, sand and indigo. Breezy coastal patterns that suit bathrooms, kitchens and beach houses.",
    mood: "Breezy, airy, light",
    hero: "tidal-ribbon",
  },
  {
    slug: "noir-atelier",
    name: "Noir Atelier",
    kicker: "Dark & luxe wallpaper",
    description:
      "Art deco fans, gilded lattices and inky terrazzo for moody dining rooms, home bars and dramatic powder rooms. Dark wallpaper with a metallic wink.",
    mood: "Moody, glamorous, dramatic",
    hero: "gatsby-fan",
  },
  {
    slug: "kinder-kingdom",
    name: "Kinder Kingdom",
    kicker: "Kids' & nursery wallpaper",
    description:
      "Gentle stars, rolling hills and soft polka dots in nursery-safe, low-VOC inks. Playful kids' wallpaper that grows with them from cot to teenage years.",
    mood: "Gentle, dreamy, playful",
    hero: "dreamland-hills",
  },
  {
    slug: "stone-and-terrazzo",
    name: "Stone & Terrazzo",
    kicker: "Terrazzo & organic wallpaper",
    description:
      "Speckled terrazzo, organic blobs and concentric rings in mineral tones. Modern, texture-rich wallpaper that pairs with oak, linen and plaster finishes.",
    mood: "Minimal, tactile, modern",
    hero: "milano-terrazzo",
  },
];

export const ROOMS: Room[] = [
  {
    slug: "living-room",
    name: "Living Room",
    headline: "Living room wallpaper",
    intro:
      "The living room is the best place for a statement feature wall. Choose a medium-to-large scale pattern for the wall behind your sofa or TV, and pull the accent colour into cushions and throws.",
    tips: [
      "Wallpaper the wall your eye lands on first when entering the room.",
      "Large-scale patterns make big rooms feel cosier; small repeats suit compact spaces.",
      "Peel & stick is ideal for renters; non-woven is best for whole-room coverage.",
    ],
    recommendedFinish: "Peel & Stick or Non-Woven",
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    headline: "Bedroom wallpaper",
    intro:
      "Behind the headboard is the classic bedroom wallpaper spot. Calm botanicals, soft geometrics and muted palettes help a bedroom feel restful.",
    tips: [
      "Run the pattern behind the headboard and up onto the ceiling for a canopy effect.",
      "Choose muted or low-contrast colourways for better sleep-friendly calm.",
      "Matte finishes reduce glare from bedside lamps.",
    ],
    recommendedFinish: "Non-Woven",
  },
  {
    slug: "nursery",
    name: "Nursery & Kids' Room",
    headline: "Nursery & kids' room wallpaper",
    intro:
      "Kids' rooms need wallpaper that is playful, wipeable and safe. All Wallora inks are water-based and low-VOC, and our peel & stick wipes clean of crayon and fingerprints.",
    tips: [
      "Pick patterns that will still feel right in five years — stars, hills and dots age well.",
      "Peel & stick lets you refresh the room as your child grows.",
      "Keep cots and beds a hand's width from the wall so little fingers can't peel corners.",
    ],
    recommendedFinish: "Peel & Stick",
  },
  {
    slug: "bathroom",
    name: "Bathroom",
    headline: "Bathroom wallpaper",
    intro:
      "Wallpaper works beautifully in bathrooms and powder rooms when the room is well ventilated. Use it away from direct water spray and choose a scrubbable, mould-resistant finish.",
    tips: [
      "Powder rooms (no shower) are the safest and most dramatic place for bold wallpaper.",
      "In full bathrooms, run an extractor fan for 20 minutes after showering.",
      "Never apply wallpaper inside a shower enclosure or directly behind a tap.",
    ],
    recommendedFinish: "Non-Woven (scrubbable)",
  },
  {
    slug: "kitchen",
    name: "Kitchen",
    headline: "Kitchen wallpaper",
    intro:
      "A breakfast nook, open shelving wall or the back of a pantry are perfect places for kitchen wallpaper. Choose wipeable finishes and keep paper at least 30 cm away from hobs.",
    tips: [
      "Wallpaper the back of open shelves for a low-commitment pop of pattern.",
      "Avoid the area directly behind the hob — use tile or glass there.",
      "Coastal and gingham patterns are perennial kitchen favourites.",
    ],
    recommendedFinish: "Peel & Stick (wipeable)",
  },
  {
    slug: "home-office",
    name: "Home Office",
    headline: "Home office wallpaper",
    intro:
      "Your video-call background is the most-seen wall in your home. A mid-scale geometric or botanical wallpaper looks crisp on camera without being distracting.",
    tips: [
      "Mid-scale patterns read best on camera — tiny repeats can shimmer (moiré).",
      "Greens and blues are associated with focus and calm.",
      "Wallpaper one wall only to keep the space energising rather than busy.",
    ],
    recommendedFinish: "Peel & Stick",
  },
];

const R = (author: string, rating: number, date: string, title: string, body: string): Review => ({
  author,
  rating,
  date,
  title,
  body,
});

export const PRODUCTS: Product[] = [
  // ——— Terra Botanica
  {
    slug: "monstera-hush",
    name: "Monstera Hush",
    tagline: "Oversized monstera leaves in soft sage on warm linen.",
    collection: "terra-botanica",
    pattern: "botanical",
    palette: ["#efe8da", "#7f9472", "#a9b89a", "#c8553d"],
    colorNames: ["Linen", "Sage", "Pistachio", "Terracotta"],
    styles: ["Botanical", "Tropical", "Boho"],
    rooms: ["living-room", "bedroom", "bathroom"],
    rarity: "Rare",
    basePrice: 59,
    rating: 4.8,
    reviewCount: 214,
    repeat: '24" (61 cm)',
    match: "Half-drop match",
    scale: "Large",
    bestseller: true,
    story:
      "Drawn from a sketchbook kept in a Lisbon greenhouse, Monstera Hush scales the classic tropical leaf up to almost life-size and quietens it with a sage-on-linen palette. A single terracotta stem is hidden in every repeat — find it and you'll never unsee it.",
    reviews: [
      R("Priya S.", 5, "2026-08-14", "Looks like a boutique hotel", "Did the wall behind our bed in an afternoon. The half-drop repeat lined up perfectly."),
      R("Daniel K.", 5, "2026-07-02", "Colour is spot on", "The sage is exactly as pictured — muted, not minty. Sample swatch was worth it."),
      R("Hannah L.", 4, "2026-05-21", "Beautiful, order one extra roll", "Gorgeous paper. I under-ordered by one roll; use the calculator and add 10%."),
    ],
  },
  {
    slug: "fern-cathedral",
    name: "Fern Cathedral",
    tagline: "Layered fern fronds in deep forest and moss.",
    collection: "terra-botanica",
    pattern: "botanical",
    palette: ["#23382c", "#4f7a55", "#8fb07a", "#e8d9b5"],
    colorNames: ["Forest", "Moss", "Fern", "Parchment"],
    styles: ["Botanical", "Moody", "Cottagecore"],
    rooms: ["living-room", "bedroom", "home-office"],
    rarity: "Epic",
    basePrice: 72,
    rating: 4.9,
    reviewCount: 96,
    repeat: '21" (53 cm)',
    match: "Half-drop match",
    scale: "Medium",
    story:
      "A dark, enveloping botanical inspired by Victorian fern-collecting — the 'pteridomania' craze of the 1850s. The deep forest ground makes rooms feel cocooning and pairs beautifully with brass and walnut.",
    reviews: [
      R("Marcus T.", 5, "2026-09-03", "Moody perfection", "Our study now feels like a library in the woods. Video calls get compliments daily."),
      R("Ella W.", 5, "2026-06-18", "Rich, deep green", "Print quality is superb — no banding at all."),
    ],
  },
  {
    slug: "olive-grove",
    name: "Olive Grove",
    tagline: "Delicate olive sprigs on chalk white.",
    collection: "terra-botanica",
    pattern: "botanical",
    palette: ["#f6f3ec", "#8c9a6b", "#b9c19a", "#5b3a4e"],
    colorNames: ["Chalk", "Olive", "Silver leaf", "Damson"],
    styles: ["Botanical", "Mediterranean", "Minimal"],
    rooms: ["kitchen", "bedroom", "nursery"],
    rarity: "Common",
    basePrice: 49,
    rating: 4.7,
    reviewCount: 331,
    repeat: '18" (46 cm)',
    match: "Straight match",
    scale: "Small",
    bestseller: true,
    story:
      "A light, airy Mediterranean botanical that works in almost any room. The small scale and pale ground make Olive Grove the easiest Wallora pattern to live with — and the most forgiving to hang.",
    reviews: [
      R("Sofia R.", 5, "2026-09-10", "Kitchen glow-up", "Made our rental kitchen feel like a Puglian farmhouse. Peels off clean too."),
      R("Tom B.", 4, "2026-04-29", "Lovely and subtle", "Subtle from a distance, detailed up close. Exactly what I wanted."),
    ],
  },
  {
    slug: "palm-siesta",
    name: "Palm Siesta",
    tagline: "Sun-bleached palm fronds in sand and clay.",
    collection: "terra-botanica",
    pattern: "botanical",
    palette: ["#f1dfc6", "#c97b4a", "#e2b48a", "#3f5a4a"],
    colorNames: ["Sand", "Clay", "Apricot", "Palm"],
    styles: ["Botanical", "Boho", "Desert"],
    rooms: ["living-room", "bathroom", "bedroom"],
    rarity: "Rare",
    basePrice: 59,
    rating: 4.6,
    reviewCount: 142,
    repeat: '24" (61 cm)',
    match: "Half-drop match",
    scale: "Large",
    isNew: true,
    story:
      "Palm Siesta captures the hour when desert light turns everything apricot. A warm, boho botanical that pairs with rattan, linen and terracotta pots.",
    reviews: [R("Jade M.", 5, "2026-09-22", "Warm and dreamy", "Our powder room is now the favourite room in the house.")],
  },
  // ——— Mid-Century Arcade
  {
    slug: "arcade-arches",
    name: "Arcade Arches",
    tagline: "Stacked rainbow arches in mustard, rust and teal.",
    collection: "mid-century-arcade",
    pattern: "arches",
    palette: ["#f4e9d8", "#d4932f", "#b8502f", "#2f6f6a"],
    colorNames: ["Cream", "Mustard", "Rust", "Teal"],
    styles: ["Mid-century", "Retro", "Geometric"],
    rooms: ["living-room", "nursery", "home-office"],
    rarity: "Legendary",
    basePrice: 79,
    rating: 4.9,
    reviewCount: 412,
    repeat: '20.5" (52 cm)',
    match: "Straight match",
    scale: "Medium",
    bestseller: true,
    story:
      "Wallora's signature design and our most-saved pattern. Arcade Arches stacks 1970s rainbow curves into a rhythmic, joyful repeat. Each Legendary print run is numbered on the roll label.",
    reviews: [
      R("Olivia P.", 5, "2026-09-01", "Instant happiness", "Every guest asks about it. The colours are warm and not at all garish."),
      R("Ben A.", 5, "2026-08-11", "Collected the Legendary badge!", "Fun that buying it unlocked a badge. Wallpaper itself is thick and premium."),
      R("Chloe N.", 5, "2026-07-30", "Perfect nursery", "Gender-neutral, cheerful and grows with our daughter."),
    ],
  },
  {
    slug: "sunburst-1972",
    name: "Sunburst 1972",
    tagline: "Radiating sunrays in burnt orange and cream.",
    collection: "mid-century-arcade",
    pattern: "sunburst",
    palette: ["#f6ead7", "#d9772b", "#ecb35c", "#6b3a2a"],
    colorNames: ["Cream", "Burnt orange", "Marigold", "Cocoa"],
    styles: ["Mid-century", "Retro", "Maximalist"],
    rooms: ["living-room", "kitchen"],
    rarity: "Epic",
    basePrice: 72,
    rating: 4.7,
    reviewCount: 88,
    repeat: '27" (69 cm)',
    match: "Straight match",
    scale: "Large",
    story:
      "A bold geometric sunburst pulled straight from a 1972 Danish textile archive. Best on a single feature wall where the rays can really radiate.",
    reviews: [R("Leo F.", 5, "2026-06-09", "70s dream", "Paired it with a mustard sofa. Unreal.")],
  },
  {
    slug: "boomerang-chevron",
    name: "Boomerang Chevron",
    tagline: "Zig-zag chevrons in teal, coral and cream.",
    collection: "mid-century-arcade",
    pattern: "chevron",
    palette: ["#f3ede2", "#2f6f6a", "#e07a5f", "#f2cc8f"],
    colorNames: ["Cream", "Teal", "Coral", "Butter"],
    styles: ["Mid-century", "Geometric", "Playful"],
    rooms: ["home-office", "kitchen", "nursery"],
    rarity: "Common",
    basePrice: 49,
    rating: 4.5,
    reviewCount: 176,
    repeat: '12" (30 cm)',
    match: "Straight match",
    scale: "Small",
    story:
      "A cheerful chevron that adds energy to work spaces without overwhelming them. The small, straight-match repeat makes Boomerang Chevron beginner-friendly.",
    reviews: [R("Ava G.", 4, "2026-03-12", "Fun and easy", "My first wallpaper project — the straight match was very forgiving.")],
  },
  {
    slug: "disco-rings",
    name: "Disco Rings",
    tagline: "Concentric circles in tangerine and plum.",
    collection: "mid-century-arcade",
    pattern: "rings",
    palette: ["#f7e4cf", "#e0712c", "#7a4a6a", "#f2c14e"],
    colorNames: ["Peach", "Tangerine", "Plum", "Sunflower"],
    styles: ["Retro", "Maximalist", "Geometric"],
    rooms: ["living-room", "home-office"],
    rarity: "Rare",
    basePrice: 62,
    rating: 4.6,
    reviewCount: 67,
    repeat: '16" (41 cm)',
    match: "Straight match",
    scale: "Medium",
    isNew: true,
    story:
      "Groovy concentric rings that look like a spinning record collection. Disco Rings is a maximalist's playground — try it in a hallway or home bar.",
    reviews: [R("Noah J.", 5, "2026-09-27", "Groovy", "Turned our boring hallway into the best room in the flat.")],
  },
  // ——— Coastal Drift
  {
    slug: "tidal-ribbon",
    name: "Tidal Ribbon",
    tagline: "Undulating waves in sea glass and indigo.",
    collection: "coastal-drift",
    pattern: "waves",
    palette: ["#eef2ee", "#2e5a7a", "#8fb8b0", "#d9c7a6"],
    colorNames: ["Sea mist", "Indigo", "Sea glass", "Driftwood"],
    styles: ["Coastal", "Calm", "Modern"],
    rooms: ["bathroom", "bedroom", "kitchen"],
    rarity: "Rare",
    basePrice: 59,
    rating: 4.8,
    reviewCount: 203,
    repeat: '20.5" (52 cm)',
    match: "Straight match",
    scale: "Medium",
    bestseller: true,
    story:
      "Hand-inked waves that ripple across the wall like a tide line. Tidal Ribbon is our best-selling bathroom wallpaper — calming, fresh and endlessly wipeable in non-woven.",
    reviews: [
      R("Grace H.", 5, "2026-08-02", "Spa bathroom", "Feels like a spa now. Holding up perfectly to steam with the fan on."),
      R("Ryan C.", 5, "2026-05-15", "Calming", "The indigo is deep and sophisticated."),
    ],
  },
  {
    slug: "shell-scallop",
    name: "Shell Scallop",
    tagline: "Fish-scale scallops in pale blush and sand.",
    collection: "coastal-drift",
    pattern: "scallop",
    palette: ["#f8ede6", "#e3b7a0", "#c98f78", "#7d9a9a"],
    colorNames: ["Shell", "Blush", "Coral sand", "Sea foam"],
    styles: ["Coastal", "Romantic", "Classic"],
    rooms: ["bathroom", "nursery", "bedroom"],
    rarity: "Common",
    basePrice: 49,
    rating: 4.7,
    reviewCount: 158,
    repeat: '8" (20 cm)',
    match: "Straight match",
    scale: "Small",
    story:
      "A soft, romantic scallop that reads as texture from across the room. Shell Scallop is a nursery and powder-room favourite.",
    reviews: [R("Isla D.", 5, "2026-07-07", "So pretty", "Soft and sweet without being babyish.")],
  },
  {
    slug: "cabana-stripe",
    name: "Cabana Stripe",
    tagline: "Sun-washed beach-hut stripes in navy and sand.",
    collection: "coastal-drift",
    pattern: "stripes",
    palette: ["#f4ecdc", "#24476b", "#c9b48f", "#e07a5f"],
    colorNames: ["Sand", "Navy", "Dune", "Coral"],
    styles: ["Coastal", "Classic", "Nautical"],
    rooms: ["kitchen", "bathroom", "nursery"],
    rarity: "Common",
    basePrice: 45,
    rating: 4.6,
    reviewCount: 244,
    repeat: "Random match",
    match: "Random match",
    scale: "Medium",
    story:
      "Classic beach-cabana stripes with a slightly irregular, hand-painted edge. Random match means zero pattern-matching waste — the easiest wallpaper we sell to hang.",
    reviews: [R("Ethan V.", 5, "2026-06-30", "Easiest ever", "Random match = no waste. Took two hours for a whole wall.")],
  },
  {
    slug: "harbour-gingham",
    name: "Harbour Gingham",
    tagline: "Painterly gingham check in harbour blue.",
    collection: "coastal-drift",
    pattern: "gingham",
    palette: ["#f5f3ee", "#4a78a3", "#a9c3d9", "#e8b04b"],
    colorNames: ["Chalk", "Harbour blue", "Sky", "Buoy yellow"],
    styles: ["Coastal", "Cottagecore", "Classic"],
    rooms: ["kitchen", "nursery", "bathroom"],
    rarity: "Rare",
    basePrice: 55,
    rating: 4.8,
    reviewCount: 119,
    repeat: '6" (15 cm)',
    match: "Straight match",
    scale: "Small",
    isNew: true,
    story:
      "A painterly gingham with soft, watercolour edges — the cottage kitchen classic, reimagined. Pairs perfectly with butcher-block worktops and open shelving.",
    reviews: [R("Maya E.", 5, "2026-09-18", "Cottage kitchen goals", "Did the back of our open shelves — tiny job, huge impact.")],
  },
  // ——— Noir Atelier
  {
    slug: "gatsby-fan",
    name: "Gatsby Fan",
    tagline: "Art deco fans in gold on midnight.",
    collection: "noir-atelier",
    pattern: "deco",
    palette: ["#16181f", "#c9a24b", "#5d5a4f", "#e8d7a5"],
    colorNames: ["Midnight", "Antique gold", "Smoke", "Champagne"],
    styles: ["Art deco", "Luxe", "Moody"],
    rooms: ["living-room", "bathroom", "bedroom"],
    rarity: "Legendary",
    basePrice: 89,
    rating: 4.9,
    reviewCount: 187,
    repeat: '20.5" (52 cm)',
    match: "Half-drop match",
    scale: "Medium",
    bestseller: true,
    story:
      "Our most glamorous design: tiers of 1920s art deco fans printed with a metallic-effect antique gold ink. Gatsby Fan turns powder rooms and dining rooms into jazz-age lounges.",
    reviews: [
      R("Isabella M.", 5, "2026-08-25", "Jaw-dropping powder room", "The gold catches candlelight beautifully. Worth every penny."),
      R("James O.", 5, "2026-07-12", "Luxe", "Heavy, premium non-woven. Hung like a dream."),
    ],
  },
  {
    slug: "obsidian-terrazzo",
    name: "Obsidian Terrazzo",
    tagline: "Inky terrazzo flecked with brass and bone.",
    collection: "noir-atelier",
    pattern: "terrazzo",
    palette: ["#1d1d1f", "#b38b4d", "#e9e1d3", "#6e6a64"],
    colorNames: ["Obsidian", "Brass", "Bone", "Graphite"],
    styles: ["Luxe", "Modern", "Moody"],
    rooms: ["bathroom", "kitchen", "home-office"],
    rarity: "Epic",
    basePrice: 75,
    rating: 4.7,
    reviewCount: 73,
    repeat: "Random match",
    match: "Random match",
    scale: "Small",
    story:
      "Dark terrazzo with brass and bone chips — the look of a polished stone floor, for walls. Moody, modern and surprisingly versatile.",
    reviews: [R("Zoe P.", 5, "2026-05-08", "Looks like real stone", "Guests literally touch the wall to check.")],
  },
  {
    slug: "velvet-lattice",
    name: "Velvet Lattice",
    tagline: "Trellis lattice in oxblood and blush.",
    collection: "noir-atelier",
    pattern: "lattice",
    palette: ["#3b1820", "#b0646b", "#7a2e3a", "#e6bfa8"],
    colorNames: ["Oxblood", "Rose", "Garnet", "Blush"],
    styles: ["Luxe", "Classic", "Romantic"],
    rooms: ["bedroom", "living-room"],
    rarity: "Epic",
    basePrice: 75,
    rating: 4.8,
    reviewCount: 51,
    repeat: '10" (25 cm)',
    match: "Straight match",
    scale: "Small",
    isNew: true,
    story:
      "An oxblood trellis inspired by Parisian garden pavilions. Velvet Lattice envelops a bedroom in warmth — especially lovely on all four walls.",
    reviews: [R("Amelia C.", 5, "2026-09-29", "Cocooning", "Did all four walls of our bedroom. Feels like a jewel box.")],
  },
  {
    slug: "midnight-gingko",
    name: "Midnight Gingko",
    tagline: "Gingko leaves scattered on deep navy.",
    collection: "noir-atelier",
    pattern: "botanical",
    palette: ["#18233a", "#c9a24b", "#3a4d6e", "#e8d7a5"],
    colorNames: ["Midnight navy", "Gold", "Dusk", "Champagne"],
    styles: ["Luxe", "Botanical", "Japandi"],
    rooms: ["bedroom", "home-office", "bathroom"],
    rarity: "Rare",
    basePrice: 65,
    rating: 4.8,
    reviewCount: 104,
    repeat: '21" (53 cm)',
    match: "Half-drop match",
    scale: "Medium",
    story:
      "Golden gingko leaves drifting across a midnight sky — a nod to Japanese autumn and the oldest tree species on earth.",
    reviews: [R("Lucas H.", 5, "2026-04-14", "Elegant", "Navy and gold is timeless. Very happy.")],
  },
  // ——— Kinder Kingdom
  {
    slug: "dreamland-hills",
    name: "Dreamland Hills",
    tagline: "Rolling pastel hills mural under a sleepy sky.",
    collection: "kinder-kingdom",
    pattern: "hills",
    palette: ["#f6efe6", "#9fb8a0", "#e5b9a3", "#f2d38a"],
    colorNames: ["Oat", "Meadow", "Peach", "Sunshine"],
    styles: ["Kids", "Mural", "Scandi"],
    rooms: ["nursery", "bedroom"],
    rarity: "Epic",
    basePrice: 69,
    rating: 4.9,
    reviewCount: 236,
    repeat: "Mural — 3 panels",
    match: "Straight match",
    scale: "Mural",
    bestseller: true,
    story:
      "A soft, layered landscape mural that turns any nursery wall into a gentle horizon. Designed with a paediatric sleep consultant to use calming, low-contrast tones.",
    reviews: [
      R("Freya B.", 5, "2026-08-19", "Nursery of dreams", "Easiest mural ever. Our son points at the 'mountains' every night."),
      R("Oscar L.", 5, "2026-06-06", "Calming colours", "So soft and soothing. Peel & stick went up in an hour."),
    ],
  },
  {
    slug: "little-constellations",
    name: "Little Constellations",
    tagline: "Hand-drawn stars on dusky blue.",
    collection: "kinder-kingdom",
    pattern: "stars",
    palette: ["#2c3e5c", "#f2d38a", "#8aa3c2", "#f6efe6"],
    colorNames: ["Night sky", "Starlight", "Twilight", "Moon"],
    styles: ["Kids", "Celestial", "Playful"],
    rooms: ["nursery", "bedroom"],
    rarity: "Rare",
    basePrice: 55,
    rating: 4.8,
    reviewCount: 167,
    bestseller: true,
    repeat: '16" (41 cm)',
    match: "Straight match",
    scale: "Small",
    story:
      "A sleepy sky of hand-drawn stars. Little Constellations works for babies and teens alike — and looks magical on a sloped ceiling.",
    reviews: [R("Ivy T.", 5, "2026-07-21", "Magical", "Did the ceiling above the bed. Bedtime is much easier now!")],
  },
  {
    slug: "confetti-dot",
    name: "Confetti Dot",
    tagline: "Joyful scattered dots in sherbet colours.",
    collection: "kinder-kingdom",
    pattern: "dots",
    palette: ["#fbf6ee", "#e58f7a", "#7fb3a6", "#f2c14e"],
    colorNames: ["Milk", "Watermelon", "Mint", "Lemon"],
    styles: ["Kids", "Playful", "Scandi"],
    rooms: ["nursery", "bathroom", "kitchen"],
    rarity: "Common",
    basePrice: 45,
    rating: 4.7,
    reviewCount: 289,
    repeat: "Random match",
    match: "Random match",
    scale: "Small",
    story:
      "A party on the wall: hand-painted confetti dots in sherbet tones. Random match makes Confetti Dot a perfect first DIY project for families.",
    reviews: [R("Ruby K.", 5, "2026-05-30", "So cheerful", "Made our tiny bathroom feel like a party.")],
  },
  {
    slug: "rainbow-parade",
    name: "Rainbow Parade",
    tagline: "Soft rainbows marching in muted pastels.",
    collection: "kinder-kingdom",
    pattern: "arches",
    palette: ["#f8f1e7", "#e5a48c", "#b8c9a8", "#9bb4cf"],
    colorNames: ["Cream", "Peach", "Sage", "Powder blue"],
    styles: ["Kids", "Boho", "Scandi"],
    rooms: ["nursery", "bedroom"],
    rarity: "Common",
    basePrice: 49,
    rating: 4.8,
    reviewCount: 198,
    repeat: '12" (30 cm)',
    match: "Straight match",
    scale: "Small",
    story:
      "Arcade Arches' little sibling: a muted pastel rainbow repeat made for nurseries and playrooms.",
    reviews: [R("Theo S.", 5, "2026-04-02", "Sweet & subtle", "Muted enough for grown-ups to love too.")],
  },
  // ——— Stone & Terrazzo
  {
    slug: "milano-terrazzo",
    name: "Milano Terrazzo",
    tagline: "Speckled terrazzo in chalk, sage and clay.",
    collection: "stone-and-terrazzo",
    pattern: "terrazzo",
    palette: ["#f1ece3", "#c8553d", "#8a9a7b", "#2d2a26"],
    colorNames: ["Chalk", "Clay", "Sage", "Charcoal"],
    styles: ["Modern", "Minimal", "Mediterranean"],
    rooms: ["kitchen", "bathroom", "home-office"],
    rarity: "Rare",
    basePrice: 59,
    rating: 4.8,
    reviewCount: 257,
    repeat: "Random match",
    match: "Random match",
    scale: "Small",
    bestseller: true,
    story:
      "Inspired by Milanese terrazzo floors from the 1950s. A light, speckled texture that hides scuffs and adds quiet interest to kitchens and bathrooms.",
    reviews: [
      R("Nina F.", 5, "2026-09-05", "Love it", "Looks expensive. Random match meant no waste at all."),
      R("Samuel D.", 4, "2026-06-23", "Great texture", "Adds so much depth to a plain kitchen."),
    ],
  },
  {
    slug: "pebble-play",
    name: "Pebble Play",
    tagline: "Organic pebble shapes in mineral tones.",
    collection: "stone-and-terrazzo",
    pattern: "blobs",
    palette: ["#ece6dc", "#b9a58f", "#8a9a7b", "#d6b49b"],
    colorNames: ["Limestone", "Taupe", "Sage", "Sandstone"],
    styles: ["Organic", "Japandi", "Minimal"],
    rooms: ["bedroom", "living-room", "home-office"],
    rarity: "Common",
    basePrice: 49,
    rating: 4.6,
    reviewCount: 134,
    repeat: '18" (46 cm)',
    match: "Straight match",
    scale: "Medium",
    story:
      "Smooth river-pebble shapes in a calm Japandi palette. Pebble Play brings a soft, organic texture to minimalist spaces.",
    reviews: [R("Kai N.", 5, "2026-03-28", "Calm", "Perfect for our Japandi bedroom.")],
  },
  {
    slug: "travertine-rings",
    name: "Travertine Rings",
    tagline: "Tree-ring circles in travertine beige.",
    collection: "stone-and-terrazzo",
    pattern: "rings",
    palette: ["#efe6d8", "#c8b49a", "#a68b6d", "#6e5a47"],
    colorNames: ["Travertine", "Oat", "Walnut", "Umber"],
    styles: ["Organic", "Minimal", "Modern"],
    rooms: ["living-room", "home-office", "bedroom"],
    rarity: "Rare",
    basePrice: 59,
    rating: 4.7,
    reviewCount: 82,
    repeat: '16" (41 cm)',
    match: "Straight match",
    scale: "Medium",
    story:
      "Concentric rings that echo both travertine stone and tree growth rings. Warm, neutral and quietly hypnotic.",
    reviews: [R("Mila V.", 5, "2026-07-16", "Warm neutral", "Finally a neutral wallpaper that isn't boring.")],
  },
  {
    slug: "quarry-dot",
    name: "Quarry Dot",
    tagline: "Stone-flecked micro dots on warm grey.",
    collection: "stone-and-terrazzo",
    pattern: "dots",
    palette: ["#d9d4cc", "#6e6a64", "#a59e93", "#c8553d"],
    colorNames: ["Warm grey", "Slate", "Pumice", "Ember"],
    styles: ["Minimal", "Industrial", "Modern"],
    rooms: ["home-office", "bathroom", "kitchen"],
    rarity: "Common",
    basePrice: 45,
    rating: 4.5,
    reviewCount: 91,
    repeat: "Random match",
    match: "Random match",
    scale: "Small",
    story:
      "A near-plain texture of stone-flecked dots — for people who want the depth of wallpaper with the calm of paint.",
    reviews: [R("Arlo W.", 4, "2026-02-11", "Subtle texture", "Reads almost like plaster. Exactly what I wanted.")],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getCollection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);
export const getRoom = (slug: string) => ROOMS.find((r) => r.slug === slug);
export const productsInCollection = (slug: string) => PRODUCTS.filter((p) => p.collection === slug);
export const productsForRoom = (slug: string) => PRODUCTS.filter((p) => p.rooms.includes(slug as RoomSlug));

export const relatedProducts = (p: Product, n = 4) =>
  PRODUCTS.filter((x) => x.slug !== p.slug)
    .map((x) => ({
      x,
      score:
        (x.collection === p.collection ? 3 : 0) +
        x.styles.filter((s) => p.styles.includes(s)).length +
        x.rooms.filter((r) => p.rooms.includes(r)).length * 0.5,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((r) => r.x);

export const ALL_STYLES = Array.from(new Set(PRODUCTS.flatMap((p) => p.styles))).sort();

/** Concise, quotable answer for answer engines (AI Overviews, ChatGPT, Perplexity). */
export const productQuickAnswer = (p: Product) => {
  const c = getCollection(p.collection)!;
  const v = variantsFor(p);
  return `${p.name} is a ${p.scale.toLowerCase()}-scale ${p.styles[0].toLowerCase()} wallpaper from Wallora's ${c.name} collection, in ${p.colorNames
    .slice(0, 3)
    .join(", ")
    .toLowerCase()}. It costs $${v[0].price} per peel-and-stick roll (28 sq ft) or $${v[1].price} per non-woven roll (56 sq ft), has a ${p.repeat} pattern repeat with a ${p.match.toLowerCase()}, and is rated ${p.rating}/5 from ${p.reviewCount} reviews. Best for: ${p.rooms
    .map((r) => getRoom(r)!.name.toLowerCase())
    .join(", ")}.`;
};

export const productFaqs = (p: Product) => {
  const v = variantsFor(p);
  return [
    {
      q: `How many rolls of ${p.name} do I need?`,
      a: `Measure wall width × height in feet to get square feet, then divide by 28 for peel & stick or 56 for non-woven, and add 10–15% for pattern matching and trimming${
        p.match === "Random match" ? " (random-match patterns like this one need only about 5% extra)" : ""
      }. For example, a 12 ft × 8 ft wall (96 sq ft) needs 4 peel & stick rolls or 2 non-woven rolls. Use our free wallpaper calculator for an exact count.`,
    },
    {
      q: `Is ${p.name} peel and stick or traditional wallpaper?`,
      a: `Both. ${p.name} is available as Peel & Stick ($${v[0].price}/roll, removable and renter-friendly) and as Non-Woven paste-the-wall wallpaper ($${v[1].price}/roll, the most durable, longer-lasting option). A $5 A4 sample is also available.`,
    },
    {
      q: `What is the pattern repeat and match of ${p.name}?`,
      a: `${p.name} has a ${p.repeat} vertical pattern repeat and a ${p.match.toLowerCase()}. ${
        p.match === "Half-drop match"
          ? "With a half-drop match, every second strip is shifted down by half the repeat, so allow extra paper."
          : p.match === "Random match"
            ? "Random match means strips can be hung without aligning the pattern, so there is almost no waste."
            : "With a straight match, the pattern lines up horizontally across adjoining strips."
      }`,
    },
    {
      q: `Can I use ${p.name} in a bathroom?`,
      a: p.rooms.includes("bathroom")
        ? `Yes. ${p.name} is recommended for bathrooms in the non-woven finish, which is scrubbable and mould-resistant. Use it in ventilated rooms away from direct water spray.`
        : `It can be used in a well-ventilated powder room in the non-woven finish, but it is designed primarily for ${p.rooms
            .map((r) => getRoom(r)!.name.toLowerCase())
            .join(" and ")}.`,
    },
    {
      q: `How many XP points do I earn for buying ${p.name}?`,
      a: `${p.name} is a ${p.rarity} design, so purchasing it earns ${RARITY_META[p.rarity].xp} XP in Wallora Rewards plus 1 XP per dollar spent. XP raises your member level, which unlocks permanent discounts of up to 15%.`,
    },
  ];
};
