export type GuideSection = { h: string; p: string[]; list?: string[]; table?: { head: string[]; rows: string[][] } };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: "Planning" | "Installation" | "Inspiration" | "Care";
  published: string;
  updated: string;
  minutes: number;
  tldr: string[];
  sections: GuideSection[];
  howTo?: { name: string; totalTime: string; tools: string[]; steps: { name: string; text: string }[] };
  faqs: { q: string; a: string }[];
  relatedProducts: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "how-much-wallpaper-do-i-need",
    title: "How Much Wallpaper Do I Need? The Simple Roll Calculation",
    description:
      "Calculate exactly how many rolls of wallpaper you need: measure wall area, divide by roll coverage, and add 10–15% for pattern repeat. Includes worked examples and a table.",
    category: "Planning",
    published: "2025-02-10",
    updated: "2026-09-28",
    minutes: 6,
    tldr: [
      "Rolls needed = (wall width × wall height ÷ roll coverage) × 1.1–1.15, rounded up.",
      "A standard Wallora peel & stick roll covers 28 sq ft; a non-woven roll covers 56 sq ft.",
      "Don't subtract small windows or doors — the offcuts are absorbed by pattern matching.",
      "Add 15% for half-drop and large-repeat patterns, 5% for random-match patterns.",
      "Always order all rolls in one batch so the print colour matches.",
    ],
    sections: [
      {
        h: "The wallpaper formula",
        p: [
          "To work out how much wallpaper you need, multiply the width of each wall by its height to get the area in square feet (or square metres). Add the walls together, divide by the coverage of one roll, then add a wastage allowance for pattern matching and trimming. Always round up to the next whole roll.",
          "Rolls = ⌈ (total wall area ÷ coverage per roll) × (1 + waste %) ⌉",
        ],
      },
      {
        h: "How much does one roll of wallpaper cover?",
        p: [
          "Coverage depends on roll size. Wallora's two formats are sized to the most common standards in North America and Europe.",
        ],
        table: {
          head: ["Format", "Roll size", "Coverage per roll"],
          rows: [
            ["Peel & Stick", '24" × 9 ft (61 cm × 2.74 m)', "28 sq ft (2.6 m²)"],
            ["Non-Woven", '20.5" × 33 ft (52 cm × 10 m)', "56 sq ft (5.2 m²)"],
            ["A4 Sample", "8.3\" × 11.7\"", "Swatch only"],
          ],
        },
      },
      {
        h: "How much extra wallpaper should I add for the pattern repeat?",
        p: [
          "The pattern repeat is the vertical distance before the design repeats. The larger the repeat, the more paper is trimmed away when aligning strips. Use this rule of thumb:",
        ],
        list: [
          "Random match (stripes, terrazzo, dots): add 5%.",
          "Straight match with repeat under 21\": add 10%.",
          "Half-drop match or repeat over 21\": add 15%.",
          "Murals: order the exact panel set for your wall width — no wastage needed.",
        ],
      },
      {
        h: "Worked example: a feature wall",
        p: [
          "A 12 ft wide × 8 ft high wall is 96 sq ft. In Peel & Stick: 96 ÷ 28 = 3.43 rolls. Add 10% for a straight match → 3.77 → order 4 rolls. In Non-Woven: 96 ÷ 56 = 1.71 → ×1.1 = 1.89 → order 2 rolls.",
        ],
      },
      {
        h: "Worked example: a whole bedroom",
        p: [
          "A 12 × 14 ft bedroom with 8 ft ceilings has a perimeter of 52 ft, so the wall area is 52 × 8 = 416 sq ft. For a half-drop pattern in Non-Woven: 416 ÷ 56 = 7.43 → ×1.15 = 8.54 → order 9 rolls.",
        ],
      },
      {
        h: "Should I subtract doors and windows?",
        p: [
          "For a single door or window, no. The offcuts above and below openings are usually too short to reuse because of pattern matching. For rooms with large openings such as patio doors or picture windows, subtract half of the opening area.",
        ],
      },
    ],
    faqs: [
      { q: "How many rolls of wallpaper for a 10×10 room?", a: "A 10 × 10 ft room with 8 ft ceilings has about 320 sq ft of wall. That is 12–13 peel & stick rolls (28 sq ft) or 6–7 non-woven rolls (56 sq ft), including 10% for pattern matching." },
      { q: "How many rolls of wallpaper for one accent wall?", a: "Most accent walls are 80–120 sq ft, which needs 3–5 peel & stick rolls or 2–3 non-woven rolls." },
      { q: "Is it better to order extra wallpaper?", a: "Yes. Order one extra roll for repairs. Rolls from a later print batch can differ slightly in colour, so buying everything at once guarantees a match." },
    ],
    relatedProducts: ["cabana-stripe", "milano-terrazzo", "monstera-hush"],
  },
  {
    slug: "peel-and-stick-vs-traditional-wallpaper",
    title: "Peel and Stick vs Traditional Wallpaper: Which Should You Choose?",
    description:
      "Peel and stick wallpaper is removable, renter-friendly and fast to hang; traditional non-woven wallpaper is more durable, covers more per roll and suits whole rooms. Full comparison table inside.",
    category: "Planning",
    published: "2025-03-04",
    updated: "2026-09-20",
    minutes: 7,
    tldr: [
      "Choose peel & stick for renting, feature walls, kids' rooms and frequent updates.",
      "Choose non-woven (paste-the-wall) for whole rooms, bathrooms, textured walls and longevity (10–15+ years).",
      "Peel & stick lasts 3–5 years and removes cleanly from smooth, cured paint.",
      "Non-woven costs less per square foot and is easier to hang than old-style paper-backed wallpaper.",
    ],
    sections: [
      {
        h: "Quick comparison",
        p: ["Here is how the two formats compare across the factors that matter most:"],
        table: {
          head: ["", "Peel & Stick", "Non-Woven (traditional)"],
          rows: [
            ["Installation", "Peel backing, smooth on", "Paste the wall, hang dry paper"],
            ["Removal", "Peels off, no residue", "Strips off dry in full lengths"],
            ["Typical lifespan", "3–5 years", "10–15+ years"],
            ["Best for", "Renters, feature walls, kids", "Whole rooms, bathrooms, forever homes"],
            ["Textured walls", "Not recommended", "Works well"],
            ["Humidity", "Good in ventilated rooms", "Excellent (scrubbable)"],
            ["Wallora cost per sq ft", "≈ $1.60–3.20", "≈ $1.00–2.00"],
          ],
        },
      },
      {
        h: "When is peel and stick wallpaper the right choice?",
        p: [
          "Peel and stick wallpaper (also called self-adhesive or removable wallpaper) has a low-tack adhesive backing. You can reposition strips while hanging and remove them later without damaging paint. That makes it ideal for rented homes, children's rooms that will be redecorated, and accent walls you might change in a few years.",
        ],
      },
      {
        h: "When is traditional non-woven wallpaper better?",
        p: [
          "Non-woven wallpaper is made from a blend of natural and synthetic fibres. You paste the wall rather than the paper, so there is no soaking or 'booking' time. It is breathable, dimensionally stable (it doesn't shrink when drying), and strips off dry when you redecorate. It is the better value for whole rooms and the most durable option in bathrooms and hallways.",
        ],
      },
      {
        h: "Will peel and stick wallpaper damage my walls?",
        p: [
          "Not on smooth, properly cured painted walls. Wait at least four weeks after painting, avoid freshly skimmed plaster, and test with a sample first. On matte or chalky paints, or on textured walls, adhesion can be poor or the paint can lift on removal.",
        ],
      },
    ],
    faqs: [
      { q: "Does peel and stick wallpaper look cheap?", a: "Quality varies by brand. Matte, thicker films with accurate colour printing look like traditional wallpaper. Ordering a sample is the best way to judge before buying." },
      { q: "Can you use peel and stick wallpaper in a bathroom?", a: "Yes, in a well-ventilated bathroom away from direct water spray. For bathrooms with showers, non-woven scrubbable wallpaper is more durable." },
      { q: "Is non-woven wallpaper easy for beginners?", a: "Yes. Paste-the-wall non-woven wallpaper is the easiest traditional wallpaper to hang, because the dry paper can be slid into position and doesn't expand." },
    ],
    relatedProducts: ["olive-grove", "tidal-ribbon", "dreamland-hills"],
  },
  {
    slug: "how-to-install-peel-and-stick-wallpaper",
    title: "How to Install Peel and Stick Wallpaper (Step-by-Step)",
    description:
      "Step-by-step instructions to hang peel and stick wallpaper perfectly: prep the wall, mark a plumb line, peel 12 inches at a time, smooth, match the pattern and trim. Tools list and pro tips included.",
    category: "Installation",
    published: "2025-04-15",
    updated: "2026-09-12",
    minutes: 8,
    tldr: [
      "Clean the wall and wait 4 weeks after painting before applying.",
      "Draw a vertical plumb line — never trust the corner of a room to be straight.",
      "Peel only 12\" (30 cm) of backing at a time and smooth from the centre outward.",
      "Overlap or butt seams per the instructions and trim with a fresh blade.",
      "A feature wall takes 1–2 hours for one person.",
    ],
    sections: [
      {
        h: "Before you start",
        p: [
          "Peel and stick wallpaper sticks best to smooth, clean, satin or eggshell painted walls. Wipe the wall with a damp cloth and mild soap, let it dry, and remove outlet covers. Leave the rolls in the room for 24 hours so they acclimatise.",
        ],
      },
    ],
    howTo: {
      name: "How to install peel and stick wallpaper",
      totalTime: "PT2H",
      tools: ["Spirit level or laser level", "Pencil", "Smoothing tool or squeegee", "Sharp utility knife with spare blades", "Metal straight edge", "Step ladder", "Tape measure"],
      steps: [
        { name: "Prepare the wall", text: "Clean the wall with mild soapy water, let it dry fully, and remove switch plates and outlet covers. Fill any holes and sand them smooth." },
        { name: "Mark a plumb line", text: "Measure the roll width minus 1 inch from your starting corner and draw a vertical line with a level. Your first strip will follow this line, not the corner." },
        { name: "Peel the top 12 inches", text: "Peel back about 12 inches (30 cm) of the backing. Align the strip's edge with the plumb line, leaving 2 inches of excess at the ceiling." },
        { name: "Smooth as you go", text: "Smooth from the centre outward with the squeegee, pulling down the backing a little at a time to avoid bubbles. Lift and reposition if needed." },
        { name: "Match the next strip", text: "Line up the pattern of the next strip with the first and butt (or slightly overlap, per the label) the seam. Smooth the seam carefully." },
        { name: "Trim the excess", text: "Use a straight edge and a fresh blade to trim excess at the ceiling, skirting board and around outlets. Change blades often for clean cuts." },
        { name: "Final smoothing", text: "Go over the whole wall again with the smoothing tool, pushing out any small bubbles toward the edges. Replace outlet covers." },
      ],
    },
    faqs: [
      { q: "Do you overlap peel and stick wallpaper?", a: "Most peel and stick wallpaper is butted edge-to-edge. Some brands recommend a slight overlap of 1/8 inch. Wallora's peel & stick is designed to be butted with a 1/16\" overlap zone printed to hide gaps." },
      { q: "Why is my peel and stick wallpaper bubbling?", a: "Bubbles happen when air is trapped. Smooth from the centre outward as you peel the backing. For stubborn bubbles, prick with a pin and smooth flat." },
      { q: "Can I apply peel and stick wallpaper on textured walls?", a: "It is not recommended. The adhesive only contacts the high points of the texture, so it can peel off. Use non-woven paste-the-wall wallpaper instead." },
    ],
    relatedProducts: ["cabana-stripe", "confetti-dot", "dreamland-hills"],
  },
  {
    slug: "wallpaper-in-bathrooms",
    title: "Can You Put Wallpaper in a Bathroom? A Practical Guide",
    description:
      "Yes — wallpaper works in bathrooms if you choose a scrubbable non-woven or vinyl finish, ventilate well and keep it away from direct water spray. Here is what to know.",
    category: "Care",
    published: "2025-05-20",
    updated: "2026-08-30",
    minutes: 5,
    tldr: [
      "Wallpaper is safe in bathrooms with good ventilation and a scrubbable, mould-resistant finish.",
      "Powder rooms (no bath or shower) are the easiest and most impactful place for bold wallpaper.",
      "Never wallpaper inside a shower or directly behind taps and sinks — use tile or a glass splashback.",
      "Run an extractor fan for 15–20 minutes after showering.",
    ],
    sections: [
      {
        h: "Which wallpaper is best for bathrooms?",
        p: [
          "Non-woven wallpaper with a scrubbable surface is the best choice for bathrooms. It's breathable, which helps moisture escape instead of getting trapped behind the paper, and it resists mould when used with a mould-inhibiting paste.",
        ],
      },
      {
        h: "Where can wallpaper go in a bathroom?",
        p: ["Safe zones are walls that don't get splashed: behind the toilet, above wainscoting or tile, and the walls of powder rooms. Avoid inside shower enclosures and directly behind basins without a splashback."],
        list: ["Powder room walls — ideal", "Above tile or panelling — ideal", "Behind the toilet — good", "Next to a bath — only with good ventilation", "Inside the shower — never"],
      },
    ],
    faqs: [
      { q: "Will wallpaper peel in a bathroom?", a: "Wallpaper can peel if the room has poor ventilation or the wrong paste is used. Use a mould-resistant paste, seal the seams and run a fan after bathing." },
      { q: "Is peel and stick wallpaper waterproof?", a: "Peel and stick vinyl is water-resistant and wipeable, but not waterproof. Steam and constant splashing can weaken the adhesive over time." },
    ],
    relatedProducts: ["tidal-ribbon", "gatsby-fan", "shell-scallop"],
  },
  {
    slug: "wallpaper-trends-2026",
    title: "Wallpaper Trends 2026: 7 Looks Defining Interiors This Year",
    description:
      "The biggest wallpaper trends of 2026: retro arches, moody botanicals, painterly gingham, terrazzo textures, ceiling wallpaper, dark luxe art deco and calming murals for kids.",
    category: "Inspiration",
    published: "2026-01-08",
    updated: "2026-09-15",
    minutes: 6,
    tldr: [
      "Retro 1970s arches and sunbursts remain the defining geometric trend of 2026.",
      "Moody botanicals in forest green replace bright tropicals.",
      "'The fifth wall' — wallpapered ceilings — is the fastest-growing application.",
      "Painterly, hand-drawn textures beat crisp digital prints.",
    ],
    sections: [
      { h: "1. Retro arches and rainbows", p: ["Curved, 1970s-inspired motifs in mustard, rust and teal continue to dominate. They bring warmth and a sense of nostalgia, and they work in nurseries as well as living rooms."] },
      { h: "2. Moody, enveloping botanicals", p: ["Deep forest grounds with layered ferns and gingko leaves create cocooning rooms, especially in studies and dining rooms."] },
      { h: "3. Painterly gingham and checks", p: ["Soft-edged, watercolour checks bring a relaxed, cottage feel to kitchens — a softer take on 2024's crisp checkerboards."] },
      { h: "4. Terrazzo and stone textures", p: ["Speckled terrazzo, travertine rings and pebble shapes add tactility to minimalist and Japandi spaces."] },
      { h: "5. The fifth wall: ceilings", p: ["Wallpapering ceilings — especially in bedrooms and powder rooms — is a high-impact, low-area way to add pattern."] },
      { h: "6. Dark luxe art deco", p: ["Gold-on-midnight fans and lattices turn small rooms into jewel boxes. Expect metallic inks and oxblood palettes."] },
      { h: "7. Calming murals for kids", p: ["Low-contrast landscape murals designed for better sleep are replacing busy cartoon prints in nurseries."] },
    ],
    faqs: [
      { q: "Is wallpaper still in style in 2026?", a: "Yes. Wallpaper is more popular than at any time since the 1970s, driven by peel and stick formats, statement feature walls and ceiling wallpaper." },
      { q: "What wallpaper colours are trending in 2026?", a: "Forest green, terracotta, mustard, oxblood, sea-glass blue and warm neutrals like travertine and oat." },
    ],
    relatedProducts: ["arcade-arches", "fern-cathedral", "harbour-gingham", "gatsby-fan"],
  },
  {
    slug: "how-to-remove-wallpaper",
    title: "How to Remove Wallpaper Without Damaging Walls",
    description:
      "How to remove peel and stick, non-woven and old paper wallpaper safely: peel at a low angle, strip dry, or score and steam stubborn paper. Step-by-step with tools.",
    category: "Care",
    published: "2025-06-11",
    updated: "2026-07-25",
    minutes: 5,
    tldr: [
      "Peel and stick: lift a corner and peel slowly at a low angle, close to the wall.",
      "Non-woven: lift a bottom corner and strip each length off dry.",
      "Old paper-backed wallpaper: score, soak with warm water and fabric softener, or steam, then scrape.",
      "Wash off paste residue with warm soapy water before repainting.",
    ],
    sections: [
      { h: "Removing peel and stick wallpaper", p: ["Start at a top corner and peel slowly, keeping the strip close to the wall at a low angle rather than pulling outward. If the adhesive resists, warm it with a hairdryer for 20 seconds."] },
      { h: "Removing non-woven wallpaper", p: ["Non-woven wallpaper is designed to strip dry. Lift a corner at the skirting board with a scraper and pull the length upward in one piece. Wash the wall afterwards to remove paste."] },
      { h: "Removing old, stubborn wallpaper", p: ["Score the surface with a scoring tool, soak with a mix of warm water and a little fabric softener, wait 15 minutes, then scrape. A steamer speeds up removal for multiple layers."] },
    ],
    howTo: {
      name: "How to remove wallpaper",
      totalTime: "PT3H",
      tools: ["Putty knife or scraper", "Scoring tool", "Spray bottle", "Wallpaper steamer (optional)", "Sponge and bucket", "Drop cloths"],
      steps: [
        { name: "Protect the room", text: "Lay drop cloths, switch off power to outlets and remove covers." },
        { name: "Test a corner", text: "Lift a corner with a putty knife. If it peels off dry, simply strip it slowly by hand." },
        { name: "Score and soak", text: "For stubborn paper, score the surface and spray with warm water mixed with fabric softener. Wait 15 minutes." },
        { name: "Scrape", text: "Scrape the softened paper off at a low angle, taking care not to gouge the plaster." },
        { name: "Wash the wall", text: "Wash off remaining paste with warm soapy water, let dry and fill any dents before repainting or re-papering." },
      ],
    },
    faqs: [
      { q: "Does peel and stick wallpaper come off easily?", a: "Yes, from smooth, cured painted walls it peels off in one piece without residue." },
      { q: "Can you wallpaper over wallpaper?", a: "It's not recommended. Removing the old layer gives better adhesion and a smoother finish." },
    ],
    relatedProducts: ["olive-grove", "pebble-play"],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);

export const GLOSSARY: { term: string; slug: string; def: string }[] = [
  { term: "Pattern repeat", slug: "pattern-repeat", def: "The vertical distance between one point on a wallpaper design and the identical point where the design repeats. Larger repeats require more paper to match." },
  { term: "Straight match", slug: "straight-match", def: "A match type where the pattern lines up horizontally at the same height across every adjoining strip." },
  { term: "Half-drop match", slug: "half-drop-match", def: "A match type where every second strip is shifted down by half the pattern repeat, creating a diagonal flow. Needs about 15% extra paper." },
  { term: "Random match", slug: "random-match", def: "A design (such as stripes or terrazzo) that does not need aligning between strips, producing minimal waste." },
  { term: "Non-woven wallpaper", slug: "non-woven", def: "Wallpaper made from a fibre blend that is hung by pasting the wall. It doesn't expand when wet and strips off dry." },
  { term: "Peel and stick wallpaper", slug: "peel-and-stick", def: "Self-adhesive, removable wallpaper with a backing that is peeled off during application. Also called removable or renter-friendly wallpaper." },
  { term: "Paste-the-wall", slug: "paste-the-wall", def: "An installation method in which adhesive is applied to the wall instead of the back of the paper, used with non-woven wallpaper." },
  { term: "Booking", slug: "booking", def: "Folding pasted traditional paper-backed wallpaper onto itself to let the paste soak in before hanging. Not required for non-woven." },
  { term: "Plumb line", slug: "plumb-line", def: "A perfectly vertical reference line drawn on the wall to align the first strip, because room corners are rarely straight." },
  { term: "Feature wall", slug: "feature-wall", def: "A single wall decorated differently from the others in a room to create a focal point. Also called an accent wall." },
  { term: "Mural wallpaper", slug: "mural", def: "A large, non-repeating image printed across a set of panels that together cover one wall." },
  { term: "Batch number", slug: "batch-number", def: "The print-run identifier on a roll label. Rolls from the same batch are guaranteed to match in colour." },
  { term: "Scrubbable", slug: "scrubbable", def: "A durability rating meaning the wallpaper surface can be cleaned with a soft brush and mild detergent." },
  { term: "Fifth wall", slug: "fifth-wall", def: "Interior design term for the ceiling, increasingly decorated with wallpaper." },
];
