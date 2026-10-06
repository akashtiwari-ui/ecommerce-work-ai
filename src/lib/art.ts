import type { PatternKind } from "./catalog";

/**
 * Procedural, seamless wallpaper renderer.
 * Pure string output so the same art works in React, OG images and feeds.
 */

type ArtInput = { slug: string; pattern: PatternKind; palette: readonly string[] };
type Opts = { width?: number; height?: number; scale?: number; idSuffix?: string; title?: string };

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};

const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const f = (n: number) => Math.round(n * 10) / 10;

type Motif = { x: number; y: number; draw: (x: number, y: number) => string };

/** Draws each motif plus its 8 wrap-around neighbours so motifs crossing tile edges stay seamless. */
const wrap = (w: number, h: number, motifs: Motif[], sortByY = false) => {
  const copies: { y: number; svg: string }[] = [];
  for (const m of motifs)
    for (const dy of [-h, 0, h])
      for (const dx of [-w, 0, w]) copies.push({ y: m.y + dy, svg: m.draw(m.x + dx, m.y + dy) });
  if (sortByY) copies.sort((a, b) => a.y - b.y);
  return copies.map((c) => c.svg).join("");
};

const leaf = (x: number, y: number, len: number, rot: number, fill: string, vein: string) =>
  `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})"><path d="M0 0 C ${f(len * 0.25)} ${f(-len * 0.42)} ${f(len * 0.75)} ${f(-len * 0.42)} ${f(len)} 0 C ${f(len * 0.75)} ${f(len * 0.42)} ${f(len * 0.25)} ${f(len * 0.42)} 0 0Z" fill="${fill}"/><path d="M${f(len * 0.06)} 0 L${f(len * 0.92)} 0" stroke="${vein}" stroke-width="${f(len * 0.03)}" stroke-linecap="round" opacity=".55"/></g>`;

const star = (x: number, y: number, r: number, fill: string, rot = 0) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = ((Math.PI * 2) / 10) * i - Math.PI / 2 + rot;
    const rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${f(x + Math.cos(a) * rr)},${f(y + Math.sin(a) * rr)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="${fill}" stroke="${fill}" stroke-width="${f(r * 0.18)}" stroke-linejoin="round"/>`;
};

const blob = (x: number, y: number, r: number, rand: () => number, fill: string) => {
  const n = 7;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (Math.PI * 2 * i) / n;
    const rr = r * (0.72 + rand() * 0.4);
    return [x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.82];
  });
  const mid = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M${f(mid(pts[n - 1], pts[0])[0])} ${f(mid(pts[n - 1], pts[0])[1])}`;
  for (let i = 0; i < n; i++) {
    const m = mid(pts[i], pts[(i + 1) % n]);
    d += ` Q${f(pts[i][0])} ${f(pts[i][1])} ${f(m[0])} ${f(m[1])}`;
  }
  return `<path d="${d}Z" fill="${fill}"/>`;
};

function tile(a: ArtInput): { w: number; h: number; body: string } {
  const [bg, p1, p2, ac] = a.palette;
  const rand = rng(hash(a.slug));
  switch (a.pattern) {
    case "arches": {
      const w = 120, h = 72, cx = 60, cy = 72;
      const radii = [58, 44, 30, 16];
      const cols = [p1, ac, p2, bg];
      const arcs = radii
        .map((r, i) => `<path d="M${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}Z" fill="${cols[i]}"/>`)
        .join("");
      return { w, h, body: arcs };
    }
    case "terrazzo": {
      const w = 220, h = 220;
      const cols = [p1, p2, ac, p1, p2];
      const motifs: Motif[] = Array.from({ length: 46 }, (_, i) => {
        const x = rand() * w, y = rand() * h, r = 3 + rand() * (i % 6 === 0 ? 14 : 7);
        const sides = 3 + Math.floor(rand() * 3), rot = rand() * Math.PI, col = cols[i % cols.length];
        const jitter = Array.from({ length: sides }, () => 0.65 + rand() * 0.45);
        return {
          x, y,
          draw: (X, Y) =>
            `<polygon fill="${col}" points="${jitter
              .map((j, k) => {
                const ang = rot + (Math.PI * 2 * k) / sides;
                return `${f(X + Math.cos(ang) * r * j)},${f(Y + Math.sin(ang) * r * j)}`;
              })
              .join(" ")}"/>`,
        };
      });
      return { w, h, body: wrap(w, h, motifs) };
    }
    case "botanical": {
      const w = 180, h = 180;
      const spots = [
        [20, 30], [110, 20], [70, 95], [160, 110], [30, 150], [120, 160],
      ];
      const motifs: Motif[] = [];
      // Per-design variation: jittered cluster positions, leaf length and leaves per cluster
      const sizeBias = 0.75 + rand() * 0.5;
      spots.forEach(([bx, by], i) => {
        const sx = bx + (rand() - 0.5) * 40, sy = by + (rand() - 0.5) * 40;
        const base = rand() * 360;
        const len = (30 + rand() * 18) * sizeBias;
        const count = 2 + Math.floor(rand() * 4) + (i % 2);
        for (let k = 0; k < count; k++) {
          const rot = base + k * (360 / count) + rand() * 20;
          const col = k % 2 ? p2 : p1;
          motifs.push({ x: sx, y: sy, draw: (X, Y) => leaf(X, Y, len * (k === 0 ? 1.15 : 0.9), rot, col, bg) });
        }
        motifs.push({
          x: sx + 3, y: sy - 3,
          draw: (X, Y) => `<circle cx="${f(X)}" cy="${f(Y)}" r="3.4" fill="${ac}"/>`,
        });
      });
      return { w, h, body: wrap(w, h, motifs) };
    }
    case "waves": {
      const w = 120, h = 44;
      const wave = (y: number, amp: number) => `M0 ${y} Q 30 ${y - amp} 60 ${y} T 120 ${y}`;
      return {
        w, h,
        body: `<path d="${wave(14, 14)}" fill="none" stroke="${p1}" stroke-width="7" stroke-linecap="round"/><path d="${wave(34, 14)}" fill="none" stroke="${p2}" stroke-width="5" stroke-linecap="round"/><circle cx="90" cy="25" r="2.4" fill="${ac}"/>`,
      };
    }
    case "gingham": {
      const w = 44, h = 44;
      return {
        w, h,
        body: `<rect x="0" y="0" width="22" height="44" fill="${p1}" opacity=".42"/><rect x="0" y="0" width="44" height="22" fill="${p1}" opacity=".42"/><rect x="30" y="30" width="6" height="6" fill="${ac}" opacity=".5" transform="rotate(45 33 33)"/>`,
      };
    }
    case "sunburst": {
      const w = 240, h = 240, cx = 120, cy = 120, n = 28, R = 170;
      let rays = "";
      for (let i = 0; i < n; i++) {
        const a1 = (Math.PI * 2 * i) / n, a2 = (Math.PI * 2 * (i + 0.5)) / n;
        rays += `<path d="M${cx} ${cy} L${f(cx + Math.cos(a1) * R)} ${f(cy + Math.sin(a1) * R)} L${f(cx + Math.cos(a2) * R)} ${f(cy + Math.sin(a2) * R)}Z" fill="${i % 2 ? p2 : p1}"/>`;
      }
      return {
        w, h,
        body: `${rays}<circle cx="${cx}" cy="${cy}" r="44" fill="${bg}"/><circle cx="${cx}" cy="${cy}" r="30" fill="${ac}"/><circle cx="${cx}" cy="${cy}" r="12" fill="${bg}"/>`,
      };
    }
    case "scallop": {
      const w = 44, h = 22, r = 22;
      const scale = (x: number, y: number) =>
        `<circle cx="${x}" cy="${y}" r="${r - 1.5}" fill="${p2}" stroke="${p1}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="${r - 10}" fill="none" stroke="${bg}" stroke-width="1.4" opacity=".7"/><circle cx="${x}" cy="${y - 15}" r="1.8" fill="${ac}"/>`;
      return { w, h, body: scale(0, 0) + scale(44, 0) + scale(22, 22) };
    }
    case "dots": {
      const w = 160, h = 160, cols = [p1, p2, ac];
      const motifs: Motif[] = Array.from({ length: 30 }, (_, i) => {
        const x = rand() * w, y = rand() * h, r = 2.5 + rand() * 6.5, col = cols[i % 3];
        return { x, y, draw: (X, Y) => `<circle cx="${f(X)}" cy="${f(Y)}" r="${f(r)}" fill="${col}"/>` };
      });
      return { w, h, body: wrap(w, h, motifs) };
    }
    case "chevron": {
      const w = 36, h = 44;
      void ac;
      const z = (y: number, col: string, sw: number) =>
        `<path d="M-9 ${y + 9} L0 ${y} L18 ${y + 18} L36 ${y} L45 ${y + 9}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linejoin="miter"/>`;
      return { w, h, body: z(4, p1, 7) + z(26, p2, 5) };
    }
    case "stripes": {
      const w = 120, h = 10;
      return {
        w, h,
        body: `<rect x="0" y="0" width="34" height="10" fill="${p1}"/><rect x="52" y="0" width="10" height="10" fill="${p2}"/><rect x="72" y="0" width="3" height="10" fill="${ac}"/><rect x="85" y="0" width="10" height="10" fill="${p2}"/>`,
      };
    }
    case "deco": {
      const w = 80, h = 40, R = 40;
      const fan = (cx: number, cy: number) => {
        let s = `<path d="M${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}Z" fill="${bg}" stroke="${p1}" stroke-width="1.6"/>`;
        for (const r of [31, 22, 13]) s += `<path d="M${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="${r === 13 ? ac : p1}" stroke-width="${r === 13 ? 2.4 : 1.2}"/>`;
        for (let i = 1; i < 8; i++) {
          const a = Math.PI + (Math.PI * i) / 8;
          s += `<line x1="${f(cx + Math.cos(a) * 13)}" y1="${f(cy + Math.sin(a) * 13)}" x2="${f(cx + Math.cos(a) * 31)}" y2="${f(cy + Math.sin(a) * 31)}" stroke="${p2}" stroke-width="1"/>`;
        }
        return s;
      };
      const motifs: Motif[] = [
        { x: 0, y: 20, draw: fan },
        { x: 40, y: 40, draw: fan },
      ];
      return { w, h, body: wrap(w, h, motifs, true) };
    }
    case "stars": {
      const w = 140, h = 140;
      const motifs: Motif[] = Array.from({ length: 16 }, (_, i) => {
        const x = rand() * w, y = rand() * h, big = i % 3 === 0, rot = rand();
        const r = big ? 6 + rand() * 3 : 1.6 + rand() * 1.6;
        const col = big ? p1 : i % 2 ? p2 : ac;
        return {
          x, y,
          draw: (X, Y) => (big ? star(X, Y, r, col, rot) : `<circle cx="${f(X)}" cy="${f(Y)}" r="${f(r)}" fill="${col}"/>`),
        };
      });
      return { w, h, body: wrap(w, h, motifs) };
    }
    case "rings": {
      const w = 84, h = 84;
      const ring = (X: number, Y: number) =>
        [38, 30, 22, 14, 6]
          .map((r, i) => `<circle cx="${X}" cy="${Y}" r="${r}" fill="none" stroke="${[p1, p2, ac, p1, p2][i]}" stroke-width="${i === 2 ? 3.4 : 2.4}"/>`)
          .join("");
      return { w, h, body: ring(42, 42) + `<circle cx="0" cy="0" r="3" fill="${ac}"/><circle cx="84" cy="0" r="3" fill="${ac}"/><circle cx="0" cy="84" r="3" fill="${ac}"/><circle cx="84" cy="84" r="3" fill="${ac}"/>` };
    }
    case "blobs": {
      const w = 180, h = 180, cols = [p1, p2, ac];
      const motifs: Motif[] = Array.from({ length: 9 }, (_, i) => {
        const x = (i % 3) * 60 + 30 + (rand() - 0.5) * 22;
        const y = Math.floor(i / 3) * 60 + 30 + (rand() - 0.5) * 22;
        const r = 14 + rand() * 9, col = cols[i % 3], seed = rand() * 1e9;
        return { x, y, draw: (X, Y) => blob(X, Y, r, rng(seed), col) };
      });
      return { w, h, body: wrap(w, h, motifs) };
    }
    case "lattice": {
      const w = 44, h = 44;
      return {
        w, h,
        body: `<path d="M0 0 L44 44 M44 0 L0 44" stroke="${p1}" stroke-width="3"/><rect x="17" y="17" width="10" height="10" fill="${p2}" transform="rotate(45 22 22)"/><circle cx="0" cy="0" r="4" fill="${ac}"/><circle cx="44" cy="0" r="4" fill="${ac}"/><circle cx="0" cy="44" r="4" fill="${ac}"/><circle cx="44" cy="44" r="4" fill="${ac}"/>`,
      };
    }
    case "hills":
      return { w: 0, h: 0, body: "" };
  }
}

const hillsScene = (a: ArtInput, W: number, H: number) => {
  const [bg, p1, p2, ac] = a.palette;
  const layer = (base: number, amp: number, col: string, phase: number) => {
    let d = `M0 ${H}`;
    for (let x = 0; x <= W; x += W / 40) {
      const y = H * base - Math.sin((x / W) * Math.PI * 2.2 + phase) * H * amp - Math.sin((x / W) * Math.PI * 5 + phase * 2) * H * amp * 0.25;
      d += ` L${f(x)} ${f(y)}`;
    }
    return `<path d="${d} L${W} ${H}Z" fill="${col}"/>`;
  };
  return `<rect width="${W}" height="${H}" fill="${bg}"/><circle cx="${f(W * 0.72)}" cy="${f(H * 0.3)}" r="${f(Math.min(W, H) * 0.12)}" fill="${ac}"/>${layer(0.55, 0.08, p2, 0.6)}${layer(0.68, 0.07, p1, 2.1)}${layer(0.8, 0.06, p2, 4.2)}${layer(0.9, 0.04, p1, 1.3)}`;
};

export function wallpaperSvg(a: ArtInput, o: Opts = {}): string {
  const W = o.width ?? 600, H = o.height ?? 600, s = o.scale ?? 1;
  const title = o.title ? `<title>${o.title.replace(/[<&>]/g, "")}</title>` : "";
  const open = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="img">${title}`;
  if (a.pattern === "hills") return `${open}${hillsScene(a, W, H)}</svg>`;
  const t = tile(a);
  const id = `wp-${a.slug}-${String(s).replace(".", "_")}${o.idSuffix ?? ""}`;
  return `${open}<defs><pattern id="${id}" width="${t.w}" height="${t.h}" patternUnits="userSpaceOnUse" patternTransform="scale(${s})"><rect width="${t.w}" height="${t.h}" fill="${a.palette[0]}"/>${t.body}</pattern></defs><rect width="${W}" height="${H}" fill="url(#${id})"/></svg>`;
}

/** A single seamless tile (or the full mural scene) — served as a cached static file and repeated by CSS. */
export function wallpaperTileSvg(a: ArtInput): string {
  if (a.pattern === "hills") {
    const W = 1200, H = 600;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMax slice">${hillsScene(a, W, H)}</svg>`;
  }
  const t = tile(a);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t.w} ${t.h}" width="${t.w}" height="${t.h}"><rect width="${t.w}" height="${t.h}" fill="${a.palette[0]}"/>${t.body}</svg>`;
}

/** Tile dimensions per pattern kind (kept in sync with tile()). */
export const TILE_SIZE: Record<PatternKind, [number, number]> = {
  arches: [120, 72], terrazzo: [220, 220], botanical: [180, 180], waves: [120, 44], gingham: [44, 44],
  sunburst: [240, 240], scallop: [44, 22], dots: [160, 160], chevron: [36, 44], stripes: [120, 10],
  deco: [80, 40], hills: [0, 0], stars: [140, 140], rings: [84, 84], blobs: [180, 180], lattice: [44, 44],
};

export const wallpaperDataUri = (a: ArtInput, o: Opts = {}) =>
  `data:image/svg+xml;base64,${Buffer.from(wallpaperSvg(a, o)).toString("base64")}`;
