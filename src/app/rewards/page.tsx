import type { Metadata } from "next";
import { SectionHeading } from "@/components/Bits";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { RewardsDashboard } from "@/components/RewardsDashboard";
import { RARITY_META, type Rarity } from "@/lib/catalog";
import { LEVELS, XP } from "@/lib/game";

export const metadata: Metadata = {
  title: "Rewards — Earn XP & Level Up for Up to 15% Off",
  description: "Wallora Rewards is a free gamified loyalty programme. Earn XP for check-ins, quizzes and orders, spin the daily Swatch Wheel, collect badges and level up for permanent discounts up to 15%.",
  alternates: { canonical: "/rewards" },
};

const faqs = [
  { q: "Is Wallora Rewards free?", a: "Yes. Every visitor is automatically enrolled. Your XP, badges and level are saved in your browser — create an account at checkout to sync them across devices." },
  { q: "How do I earn XP?", a: `Daily check-ins (+${XP.dailyCheckIn} XP plus streak bonuses), discovering new designs (+${XP.viewDesign} XP each), saving favourites (+${XP.wishlist}), taking the style quiz (+${XP.quiz}), using the roll calculator (+${XP.calculator}), reading guides (+${XP.readGuide}), joining the newsletter (+${XP.newsletter}), and purchases (+${XP.perDollar} XP per $1 plus a rarity bonus).` },
  { q: "What do levels unlock?", a: LEVELS.map((l) => `Level ${l.level} ${l.name} (${l.minXp} XP): ${l.perk}`).join(". ") + "." },
  { q: "What is the Swatch Wheel?", a: "A free daily spin that awards 10–100 XP or a discount code (5% off, 10% off, or a free sample). Codes are saved to your wallet and can be applied at checkout." },
];

export default function RewardsPage() {
  return (
    <div className="wrap pt-8">
      <Breadcrumbs items={[{ name: "Rewards", path: "/rewards" }]} />
      <header className="mb-10 mt-6 max-w-3xl">
        <h1 className="text-5xl font-medium sm:text-6xl">Wallora Rewards</h1>
        <p className="mt-4 text-lg text-muted">Your decorating journey, levelled up. Earn XP, complete quests, collect badges and unlock permanent member discounts.</p>
      </header>
      <RewardsDashboard />

      <section className="mt-20">
        <SectionHeading eyebrow="The ladder" title="Six levels, six perks" />
        <div className="mt-8 overflow-x-auto rounded-3xl border border-line bg-cream">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-line text-muted"><tr><th className="px-6 py-4 font-medium">Level</th><th className="px-6 py-4 font-medium">Name</th><th className="px-6 py-4 font-medium">XP needed</th><th className="px-6 py-4 font-medium">Perk</th></tr></thead>
            <tbody className="divide-y divide-line">
              {LEVELS.map((l) => <tr key={l.level}><td className="px-6 py-4 font-display text-xl">{l.level}</td><th scope="row" className="px-6 py-4 font-semibold">{l.name}</th><td className="px-6 py-4 tabular-nums">{l.minXp.toLocaleString()}</td><td className="px-6 py-4">{l.perk}</td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          {(Object.keys(RARITY_META) as Rarity[]).map((r) => (
            <div key={r} className="rounded-2xl border border-line bg-cream p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: RARITY_META[r].color }}>{r}</p>
              <p className="mt-1 font-display text-2xl">+{RARITY_META[r].xp} XP</p>
              <p className="text-xs text-muted">{RARITY_META[r].blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="Questions" title="How rewards work" />
        <Faq items={faqs} />
      </section>
    </div>
  );
}
