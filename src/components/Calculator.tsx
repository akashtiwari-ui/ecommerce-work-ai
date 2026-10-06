"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "./store";

type Wall = { w: string; h: string };
const WASTE = { random: 0.05, straight: 0.1, halfdrop: 0.15 } as const;

export function Calculator() {
  const { usedCalculator } = useStore();
  const [unit, setUnit] = useState<"ft" | "m">("ft");
  const [walls, setWalls] = useState<Wall[]>([{ w: "12", h: "8" }]);
  const [match, setMatch] = useState<keyof typeof WASTE>("straight");
  const [openings, setOpenings] = useState("0");
  const [touched, setTouched] = useState(false);

  const touch = () => {
    if (!touched) {
      setTouched(true);
      usedCalculator();
    }
  };

  const toSqFt = (n: number) => (unit === "ft" ? n : n * 10.7639);
  const area = Math.max(0, walls.reduce((a, w) => a + (parseFloat(w.w) || 0) * (parseFloat(w.h) || 0), 0) - (parseFloat(openings) || 0) * 0.5);
  const sqft = toSqFt(area);
  const rolls = (cov: number) => (sqft > 0 ? Math.ceil((sqft / cov) * (1 + WASTE[match])) : 0);
  const ps = rolls(28), nw = rolls(56);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="card p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Your walls</h2>
          <div className="flex rounded-full border border-line p-1 text-sm" role="radiogroup" aria-label="Units">
            {(["ft", "m"] as const).map((u) => (
              <button key={u} role="radio" aria-checked={unit === u} onClick={() => { setUnit(u); touch(); }} className={`rounded-full px-4 py-1.5 font-medium ${unit === u ? "bg-ink text-cream" : ""}`}>{u === "ft" ? "Feet" : "Metres"}</button>
            ))}
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {walls.map((w, i) => (
            <div key={i} className="flex items-end gap-3">
              <span className="mb-3 w-14 shrink-0 text-xs font-semibold text-muted">Wall {i + 1}</span>
              {(["w", "h"] as const).map((k) => (
                <label key={k} className="flex-1">
                  <span className="mb-1 block text-xs text-muted">{k === "w" ? "Width" : "Height"} ({unit})</span>
                  <input inputMode="decimal" className="input" value={w[k]} onChange={(e) => { touch(); setWalls((ws) => ws.map((x, j) => (j === i ? { ...x, [k]: e.target.value } : x))); }} />
                </label>
              ))}
              {walls.length > 1 && <button onClick={() => setWalls((ws) => ws.filter((_, j) => j !== i))} className="mb-1.5 grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-ink/5" aria-label={`Remove wall ${i + 1}`}>×</button>}
            </div>
          ))}
        </div>
        <button onClick={() => setWalls((ws) => [...ws, { w: "", h: ws[0]?.h ?? "8" }])} className="mt-4 text-sm font-semibold text-clay hover:underline">+ Add another wall</button>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-1 block text-xs text-muted">Pattern match</span>
            <select className="input" value={match} onChange={(e) => { touch(); setMatch(e.target.value as keyof typeof WASTE); }}>
              <option value="random">Random match (+5%)</option>
              <option value="straight">Straight match (+10%)</option>
              <option value="halfdrop">Half-drop / large repeat (+15%)</option>
            </select>
          </label>
          <label>
            <span className="mb-1 block text-xs text-muted">Large openings to subtract ({unit}²)</span>
            <input inputMode="decimal" className="input" value={openings} onChange={(e) => { touch(); setOpenings(e.target.value); }} />
          </label>
        </div>
      </div>

      <div className="rounded-3xl bg-ink p-6 text-cream sm:p-8" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">You need</p>
        <p className="mt-2 text-sm text-cream/60">Wall area ≈ {sqft.toFixed(0)} sq ft ({(sqft / 10.7639).toFixed(1)} m²)</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-cream/5 p-5">
            <p className="font-display text-6xl">{ps}</p>
            <p className="mt-1 text-sm">Peel &amp; Stick rolls</p>
            <p className="text-xs text-cream/50">28 sq ft each</p>
          </div>
          <div className="rounded-2xl bg-cream/5 p-5">
            <p className="font-display text-6xl">{nw}</p>
            <p className="mt-1 text-sm">Non-Woven rolls</p>
            <p className="text-xs text-cream/50">56 sq ft each</p>
          </div>
        </div>
        <p className="mt-6 text-sm text-cream/70">Includes {Math.round(WASTE[match] * 100)}% for pattern matching and trimming. Tip: order one spare roll from the same batch for future repairs.</p>
        <Link href="/wallpapers" className="btn mt-6 w-full bg-gold text-ink hover:bg-cream">Choose a design →</Link>
      </div>
    </div>
  );
}
