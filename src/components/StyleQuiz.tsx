"use client";

import Link from "next/link";
import { useState } from "react";
import { getCollection, getProduct, productsInCollection } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { useStore } from "./store";
import { WallpaperArt } from "./WallpaperArt";

type Opt = { label: string; hint: string; swatch: string; score: Record<string, number> };
const Q: { q: string; opts: Opt[] }[] = [
  {
    q: "Pick a perfect Sunday.",
    opts: [
      { label: "Plant shopping", hint: "and repotting everything", swatch: "monstera-hush", score: { "terra-botanica": 3, "stone-and-terrazzo": 1 } },
      { label: "Vinyl & vintage", hint: "flea markets, record stores", swatch: "sunburst-1972", score: { "mid-century-arcade": 3 } },
      { label: "Sea swim", hint: "then fish & chips", swatch: "tidal-ribbon", score: { "coastal-drift": 3 } },
      { label: "Cocktails at 8", hint: "candles, jazz, velvet", swatch: "gatsby-fan", score: { "noir-atelier": 3 } },
    ],
  },
  {
    q: "Which palette feels like home?",
    opts: [
      { label: "Mustard & rust", hint: "warm and nostalgic", swatch: "arcade-arches", score: { "mid-century-arcade": 2, "kinder-kingdom": 1 } },
      { label: "Ink & gold", hint: "dark and dramatic", swatch: "midnight-gingko", score: { "noir-atelier": 2 } },
      { label: "Oat & stone", hint: "calm and tactile", swatch: "travertine-rings", score: { "stone-and-terrazzo": 3 } },
      { label: "Pastel sherbet", hint: "soft and joyful", swatch: "rainbow-parade", score: { "kinder-kingdom": 3, "coastal-drift": 1 } },
    ],
  },
  {
    q: "Which room are you transforming?",
    opts: [
      { label: "Living room", hint: "statement feature wall", swatch: "disco-rings", score: { "mid-century-arcade": 1, "terra-botanica": 1, "noir-atelier": 1 } },
      { label: "Nursery or kids'", hint: "playful but calm", swatch: "dreamland-hills", score: { "kinder-kingdom": 3 } },
      { label: "Bathroom", hint: "fresh or moody", swatch: "shell-scallop", score: { "coastal-drift": 2, "noir-atelier": 1 } },
      { label: "Kitchen or office", hint: "clean and practical", swatch: "milano-terrazzo", score: { "stone-and-terrazzo": 2, "coastal-drift": 1 } },
    ],
  },
  {
    q: "How bold are you feeling?",
    opts: [
      { label: "Whisper", hint: "texture over pattern", swatch: "quarry-dot", score: { "stone-and-terrazzo": 2 } },
      { label: "Conversation", hint: "noticeable, not loud", swatch: "olive-grove", score: { "terra-botanica": 2, "coastal-drift": 1 } },
      { label: "Statement", hint: "the first thing you see", swatch: "fern-cathedral", score: { "terra-botanica": 1, "noir-atelier": 2 } },
      { label: "Maximal", hint: "more is more", swatch: "boomerang-chevron", score: { "mid-century-arcade": 3 } },
    ],
  },
];

export function StyleQuiz() {
  const { completeQuiz, state, hydrated } = useStore();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string | null>(null);

  const pick = (o: Opt) => {
    const next = { ...scores };
    for (const [k, v] of Object.entries(o.score)) next[k] = (next[k] ?? 0) + v;
    setScores(next);
    if (step + 1 < Q.length) setStep(step + 1);
    else {
      const winner = Object.entries(next).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
      completeQuiz(winner);
    }
  };

  const shown = result;

  if (shown) {
    const c = getCollection(shown)!;
    return (
      <div className="animate-rise">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink text-cream">
          <WallpaperArt product={getProduct(c.hero)!} scale={1.3} decorative className="absolute inset-0 opacity-40" />
          <div className="relative p-8 sm:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Your wall personality</p>
            <h2 className="mt-3 text-5xl font-medium sm:text-6xl">{c.name}</h2>
            <p className="mt-4 max-w-xl text-lg text-cream/85">{c.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/collections/${c.slug}`} className="btn bg-gold text-ink hover:bg-cream">Shop {c.name}</Link>
              <button onClick={() => { setResult(null); setStep(0); setScores({}); }} className="btn border border-cream/30 text-cream hover:bg-cream/10">Retake quiz</button>
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {productsInCollection(c.slug).map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    );
  }

  const cur = Q[step];
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold tabular-nums">{step + 1} / {Q.length}</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-line"><div className="xp-bar h-full rounded-full transition-all duration-500" style={{ width: `${((step + 1) / Q.length) * 100}%` }} /></div>
        {hydrated && state.quizResult && <span className="chip">Last result: {getCollection(state.quizResult)?.name}</span>}
      </div>
      <h2 key={cur.q} className="mt-10 animate-rise text-4xl font-medium sm:text-5xl">{cur.q}</h2>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cur.opts.map((o, i) => (
          <button key={o.label + step} onClick={() => pick(o)} className="group animate-rise overflow-hidden rounded-3xl border border-line bg-cream text-left transition hover:-translate-y-1 hover:shadow-lift" style={{ animationDelay: `${i * 60}ms` }}>
            <WallpaperArt product={getProduct(o.swatch)!} scale={0.8} decorative className="h-32 transition duration-500 group-hover:scale-105 sm:h-40" />
            <span className="block p-4">
              <span className="block font-display text-lg">{o.label}</span>
              <span className="block text-xs text-muted">{o.hint}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
