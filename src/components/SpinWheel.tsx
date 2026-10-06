"use client";

import { useState } from "react";
import { todayKey, WHEEL } from "@/lib/game";
import { useStore } from "./store";

const SEG = 360 / WHEEL.length;

export function SpinWheel() {
  const { spin, state, hydrated } = useStore();
  const [rot, setRot] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState<string | null>(null);
  const used = hydrated && state.spinLast === todayKey();

  const go = () => {
    if (spinning || used) return;
    const { idx, commit } = spin();
    const target = rot - (rot % 360) + 360 * 6 + (360 - (idx * SEG + SEG / 2));
    setSpinning(true);
    setWon(null);
    setRot(target);
    setTimeout(() => {
      setSpinning(false);
      setWon(WHEEL[idx].label);
      commit();
    }, 4200);
  };

  const R = 150;
  const arc = (i: number) => {
    const a1 = ((i * SEG - 90) * Math.PI) / 180, a2 = (((i + 1) * SEG - 90) * Math.PI) / 180;
    return `M0 0 L${R * Math.cos(a1)} ${R * Math.sin(a1)} A${R} ${R} 0 0 1 ${R * Math.cos(a2)} ${R * Math.sin(a2)}Z`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[340px]">
        <svg viewBox="-160 -170 320 330" className="w-full drop-shadow-xl">
          <g style={{ transform: `rotate(${rot}deg)`, transition: spinning ? "transform 4.2s cubic-bezier(.15,.85,.2,1)" : "none", transformOrigin: "0 0" }}>
            <circle r={R + 8} fill="#1d1a17" />
            {WHEEL.map((p, i) => {
              const mid = ((i + 0.5) * SEG - 90) * (Math.PI / 180);
              const dark = ["#c8553d", "#2f6f6a", "#7a4a6a", "#1d1a17", "#8a9a7b"].includes(p.color);
              return (
                <g key={i}>
                  <path d={arc(i)} fill={p.color} stroke="#fcf9f4" strokeWidth="2" />
                  <text x={Math.cos(mid) * R * 0.64} y={Math.sin(mid) * R * 0.64} fill={dark ? "#fcf9f4" : "#1d1a17"} fontSize="13" fontWeight="700" textAnchor="middle" dominantBaseline="middle" transform={`rotate(${(i + 0.5) * SEG} ${Math.cos(mid) * R * 0.64} ${Math.sin(mid) * R * 0.64})`}>
                    {p.label}
                  </text>
                </g>
              );
            })}
            {Array.from({ length: 16 }).map((_, i) => <circle key={i} cx={Math.cos((i / 16) * Math.PI * 2) * (R + 4)} cy={Math.sin((i / 16) * Math.PI * 2) * (R + 4)} r="2.5" fill="#d9a441" />)}
          </g>
          <circle r="26" fill="#fcf9f4" stroke="#1d1a17" strokeWidth="4" />
          <text textAnchor="middle" dominantBaseline="middle" fontSize="18">🎡</text>
          <path d="M-14 -168 L14 -168 L0 -140Z" fill="#c8553d" stroke="#fcf9f4" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      </div>
      <button onClick={go} disabled={spinning || used} className="btn-clay mt-6 px-8 py-4 text-base">
        {spinning ? "Spinning…" : used ? "Come back tomorrow" : "Spin the Swatch Wheel"}
      </button>
      <p className="mt-3 h-5 text-sm font-medium" aria-live="polite">{won ? `🎉 You won ${won}!` : used ? "One free spin every day." : "Free daily spin · XP or discount codes"}</p>
    </div>
  );
}
