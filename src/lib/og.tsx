import { ImageResponse } from "next/og";
import { wallpaperDataUri } from "./art";
import type { Product } from "./catalog";

export const OG_SIZE = { width: 1200, height: 630 };

/** Shared OG card: wallpaper art on the right, editorial type on the left. */
export function ogCard({ art, eyebrow, title, sub, badge }: { art: Pick<Product, "slug" | "pattern" | "palette">; eyebrow: string; title: string; sub?: string; badge?: string }) {
  const uri = wallpaperDataUri(art, { width: 560, height: 630, scale: 1.3, idSuffix: "-og" });
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f7f2ea", fontFamily: "serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640, padding: "56px 56px 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", width: 44, height: 44, borderRadius: 12, background: "#1d1a17", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ width: 30, height: 15, borderRadius: "30px 30px 0 0", background: "#c8553d", marginBottom: 9 }} />
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, color: "#1d1a17" }}>Wallora</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 20, letterSpacing: 4, textTransform: "uppercase", color: "#c8553d", fontFamily: "sans-serif", fontWeight: 700 }}>{eyebrow}</div>
            <div style={{ fontSize: title.length > 40 ? 54 : 72, lineHeight: 1.02, color: "#1d1a17", marginTop: 16 }}>{title}</div>
            {sub && <div style={{ fontSize: 26, color: "#6b625a", marginTop: 20, lineHeight: 1.35, fontFamily: "sans-serif" }}>{sub}</div>}
          </div>
          <div style={{ display: "flex", gap: 12, fontFamily: "sans-serif", fontSize: 20, color: "#1d1a17" }}>
            {badge && <div style={{ display: "flex", background: "#1d1a17", color: "#d9a441", padding: "10px 18px", borderRadius: 999, fontWeight: 700 }}>{badge}</div>}
            <div style={{ display: "flex", border: "2px solid #e6dccd", padding: "8px 18px", borderRadius: 999 }}>wallora.com</div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={uri} width={560} height={630} alt="" style={{ objectFit: "cover" }} />
      </div>
    ),
    OG_SIZE,
  );
}
