"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { WallpaperArt } from "./WallpaperArt";

const Sofa = () => (
  <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice" aria-hidden>
    <defs>
      <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#b48a62" /><stop offset="1" stopColor="#8a6643" /></linearGradient>
      <linearGradient id="shade" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".18" /></linearGradient>
    </defs>
    <rect x="0" y="0" width="800" height="470" fill="url(#shade)" />
    <rect x="0" y="470" width="800" height="130" fill="url(#floor)" />
    <rect x="0" y="462" width="800" height="10" fill="#f3ece1" />
    <ellipse cx="400" cy="540" rx="300" ry="26" fill="#000" opacity=".16" />
    <rect x="170" y="330" width="460" height="120" rx="34" fill="#efe6d6" />
    <rect x="150" y="380" width="500" height="110" rx="30" fill="#e6dac6" />
    <rect x="132" y="350" width="70" height="140" rx="30" fill="#ddcfb9" />
    <rect x="598" y="350" width="70" height="140" rx="30" fill="#ddcfb9" />
    <rect x="230" y="350" width="110" height="80" rx="20" fill="#c8553d" opacity=".9" transform="rotate(-6 285 390)" />
    <rect x="460" y="352" width="100" height="78" rx="20" fill="#34503f" opacity=".85" transform="rotate(5 510 390)" />
    <rect x="170" y="488" width="10" height="26" fill="#6b4b2e" /><rect x="620" y="488" width="10" height="26" fill="#6b4b2e" />
    <rect x="700" y="420" width="56" height="70" rx="8" fill="#c97b4a" />
    <path d="M728 420 C 700 340 690 300 660 270 M728 420 C 730 330 740 300 760 250 M728 420 C 750 360 780 330 790 300" stroke="#3f5a4a" strokeWidth="6" fill="none" strokeLinecap="round" />
    <ellipse cx="662" cy="268" rx="22" ry="10" fill="#4f7a55" transform="rotate(-40 662 268)" />
    <ellipse cx="760" cy="250" rx="22" ry="10" fill="#4f7a55" transform="rotate(-70 760 250)" />
    <ellipse cx="790" cy="300" rx="20" ry="9" fill="#4f7a55" transform="rotate(-20 790 300)" />
    <line x1="70" y1="470" x2="70" y2="230" stroke="#1d1a17" strokeWidth="4" />
    <path d="M30 230 L110 230 L95 180 L45 180Z" fill="#f7efe2" />
    <rect x="50" y="466" width="40" height="8" rx="3" fill="#1d1a17" />
  </svg>
);

const Bed = () => (
  <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice" aria-hidden>
    <rect x="0" y="0" width="800" height="480" fill="#000" opacity=".06" />
    <rect x="0" y="480" width="800" height="120" fill="#d8c8b3" />
    <rect x="0" y="472" width="800" height="10" fill="#f3ece1" />
    <rect x="210" y="250" width="380" height="200" rx="18" fill="#a68b6d" />
    <rect x="180" y="380" width="440" height="120" rx="16" fill="#f4eee5" />
    <rect x="180" y="420" width="440" height="80" rx="12" fill="#8a9a7b" />
    <rect x="240" y="340" width="140" height="60" rx="24" fill="#fbf8f3" />
    <rect x="420" y="340" width="140" height="60" rx="24" fill="#fbf8f3" />
    <rect x="80" y="390" width="80" height="90" rx="6" fill="#6e5a47" />
    <rect x="640" y="390" width="80" height="90" rx="6" fill="#6e5a47" />
    <circle cx="120" cy="350" r="26" fill="#f2d38a" opacity=".9" /><rect x="116" y="370" width="8" height="22" fill="#1d1a17" />
    <circle cx="680" cy="350" r="26" fill="#f2d38a" opacity=".9" /><rect x="676" y="370" width="8" height="22" fill="#1d1a17" />
    <ellipse cx="400" cy="540" rx="260" ry="20" fill="#000" opacity=".12" />
  </svg>
);

export function ProductGallery({ product }: { product: Product }) {
  const views = [
    { id: "swatch", label: "Swatch" },
    { id: "living", label: "Living room" },
    { id: "bedroom", label: "Bedroom" },
    { id: "detail", label: "Close-up" },
  ] as const;
  const [view, setView] = useState<(typeof views)[number]["id"]>("living");

  const Stage = ({ id, thumb }: { id: (typeof views)[number]["id"]; thumb?: boolean }) => (
    <div className="relative h-full w-full overflow-hidden">
      <WallpaperArt
        product={product}
       
       
        scale={(id === "detail" ? 2.6 : id === "swatch" ? 1.1 : 0.7) * (thumb ? 0.3 : 1)}
       
        decorative={thumb}
        className="absolute inset-0"
      />
      {id === "living" && <Sofa />}
      {id === "bedroom" && <Bed />}
    </div>
  );

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-line shadow-lift">
        <Stage id={view} />
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-medium backdrop-blur">
          {view === "swatch" || view === "detail" ? `${product.repeat} repeat` : "Room preview"}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3" role="tablist" aria-label="Preview views">
        {views.map((v) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={view === v.id}
            onClick={() => setView(v.id)}
            className={`group overflow-hidden rounded-2xl border-2 text-left transition ${view === v.id ? "border-ink" : "border-transparent hover:border-line"}`}
          >
            <div className="aspect-[4/3]"><Stage id={v.id} thumb /></div>
            <span className="block bg-cream px-2 py-1.5 text-[11px] font-medium">{v.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
