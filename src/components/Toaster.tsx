"use client";

import { useStore } from "./store";

const Confetti = () => (
  <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
    {Array.from({ length: 14 }).map((_, i) => {
      const a = (i / 14) * Math.PI * 2;
      return (
        <span
          key={i}
          className="absolute h-2 w-1.5 rounded-sm"
          style={{
            background: ["#c8553d", "#d9a441", "#8a9a7b", "#7a4a6a"][i % 4],
            ["--dx" as string]: `${Math.cos(a) * 90}px`,
            ["--dy" as string]: `${Math.sin(a) * 70 - 20}px`,
            animation: `confetti 1.1s ${i * 0.02}s cubic-bezier(.2,.7,.3,1) forwards`,
          }}
        />
      );
    })}
  </span>
);

export function Toaster() {
  const { toasts, dismissToast } = useStore();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:right-6 sm:left-auto sm:items-end">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismissToast(t.id)}
          className={`pointer-events-auto relative flex w-full max-w-sm animate-pop items-center gap-3 overflow-visible rounded-2xl px-4 py-3 text-left shadow-lift ${
            t.kind === "level" ? "bg-ink text-cream" : t.kind === "badge" ? "bg-gold text-ink" : "border border-line bg-cream text-ink"
          }`}
        >
          {(t.kind === "level" || t.kind === "badge") && <Confetti />}
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${t.kind === "xp" ? "bg-clay text-cream" : t.kind === "level" ? "bg-gold text-ink" : t.kind === "badge" ? "bg-ink text-gold" : "bg-ink/5"}`}>
            {t.kind === "xp" ? "XP" : t.kind === "level" ? "▲" : t.kind === "badge" ? "★" : "✓"}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">{t.title}</span>
            {t.sub && <span className="block truncate text-xs opacity-75">{t.sub}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}
