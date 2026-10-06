"use client";

import Link from "next/link";
import { BADGES, LEVELS, PROMO_CODES, QUESTS, todayKey, type BadgeId } from "@/lib/game";
import { SpinWheel } from "./SpinWheel";
import { useStore } from "./store";

export function RewardsDashboard() {
  const { state, level, checkIn, hydrated } = useStore();
  const checked = hydrated && state.streak.last === todayKey();
  const done = (id: BadgeId) => hydrated && state.badges.includes(id);
  const completed = QUESTS.filter((q) => done(q.id)).length;

  return (
    <div className="space-y-8">
      {/* Level card */}
      <section className="grain relative overflow-hidden rounded-[2rem] bg-ink p-8 text-cream sm:p-12">
        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Level {level.current.level} of {LEVELS.length}</p>
            <p className="mt-2 font-display text-5xl sm:text-6xl">{level.current.name}</p>
            <p className="mt-3 text-cream/70">{level.current.perk}</p>
            <div className="mt-8">
              <div className="flex justify-between text-xs text-cream/60">
                <span className="tabular-nums">{state.xp} XP</span>
                <span>{level.next ? `${level.next.minXp - state.xp} XP to ${level.next.name}` : "Max level reached ✦"}</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-cream/10"><div className="xp-bar h-full rounded-full transition-[width] duration-700" style={{ width: `${Math.max(3, level.progress * 100)}%` }} /></div>
            </div>
          </div>
          <div className="rounded-3xl bg-cream/5 p-6 ring-1 ring-cream/10">
            <p className="text-sm text-cream/70">Daily check-in</p>
            <p className="mt-1 font-display text-4xl">🔥 {hydrated ? state.streak.count : 0}-day streak</p>
            <p className="mt-1 text-xs text-cream/50">+15 XP, +5 more for every consecutive day (max +45)</p>
            <button onClick={checkIn} disabled={checked} className="btn mt-5 w-full bg-gold text-ink hover:bg-cream">{checked ? "Checked in today ✓" : "Check in now"}</button>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <section id="spin" className="card scroll-mt-28 p-8">
          <h2 className="text-center font-display text-3xl">Daily Swatch Wheel</h2>
          <p className="mb-6 mt-1 text-center text-sm text-muted">Win XP or discount codes — once every day.</p>
          <SpinWheel />
        </section>

        <section className="card p-8">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-3xl">Quests</h2>
            <span className="text-sm font-semibold tabular-nums">{completed}/{QUESTS.length}</span>
          </div>
          <ul className="mt-6 divide-y divide-line">
            {QUESTS.map((q) => {
              const b = BADGES[q.id];
              const ok = done(q.id);
              return (
                <li key={q.id} className="flex items-center gap-4 py-3.5">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg ${ok ? "bg-gold" : "bg-paper grayscale"}`}>{b.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold ${ok ? "text-muted line-through" : ""}`}>{q.title}</p>
                    <p className="text-xs text-muted">{q.hint}{b.xp ? ` · +${b.xp} XP bonus` : ""}</p>
                  </div>
                  {ok ? <span className="text-xs font-bold text-moss">Done ✓</span> : <Link href={q.href} className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:border-ink">Go →</Link>}
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <section className="card p-8">
          <h2 className="font-display text-3xl">Badge cabinet</h2>
          <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {(Object.keys(BADGES) as BadgeId[]).map((id) => {
              const b = BADGES[id];
              const ok = done(id);
              return (
                <li key={id} title={b.desc} className={`flex flex-col items-center rounded-2xl border p-3 text-center transition ${ok ? "border-gold bg-gold/10" : "border-line opacity-50"}`}>
                  <span className={`text-3xl ${ok ? "" : "grayscale"}`}>{ok ? b.emoji : "🔒"}</span>
                  <span className="mt-2 text-[11px] font-semibold leading-tight">{b.name}</span>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="card p-8">
          <h2 className="font-display text-3xl">Wallet</h2>
          {hydrated && state.codes.length ? (
            <ul className="mt-5 space-y-2">
              {state.codes.map((c) => (
                <li key={c} className="flex items-center justify-between rounded-2xl border border-dashed border-clay/50 bg-clay/5 px-4 py-3">
                  <span><span className="font-mono text-sm font-bold">{c}</span><span className="block text-xs text-muted">{PROMO_CODES[c]?.label}</span></span>
                  <Link href="/cart" className="text-xs font-semibold text-clay">Use →</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted">No codes yet. Spin the wheel or join the newsletter to win one.</p>
          )}
          <h3 className="mt-8 text-sm font-semibold">Recent XP</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            {hydrated && state.log.length ? state.log.slice(0, 6).map((l, i) => (
              <li key={i} className="flex justify-between gap-3"><span className="truncate text-muted">{l.reason}</span><span className="font-semibold text-clay">+{l.amount}</span></li>
            )) : <li className="text-muted">Your XP history will appear here.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
