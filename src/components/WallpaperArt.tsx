import { TILE_SIZE } from "@/lib/art";
import type { Product } from "@/lib/catalog";

type Props = {
  product: Pick<Product, "slug" | "pattern" | "palette" | "name">;
  /** Pattern scale: 1 = tile rendered at its native pixel size. */
  scale?: number;
  className?: string;
  decorative?: boolean;
};

/**
 * Seamless wallpaper swatch: one small cached SVG tile per design (/art/[slug].svg),
 * repeated by the browser. Keeps HTML tiny and paints instantly.
 */
export function WallpaperArt({ product, scale = 1, className = "", decorative }: Props) {
  const [w, h] = TILE_SIZE[product.pattern];
  const mural = product.pattern === "hills";
  return (
    <div
      className={className}
      style={{
        backgroundColor: product.palette[0],
        backgroundImage: `url(/art/${product.slug}.svg)`,
        backgroundSize: mural ? "cover" : `${Math.round(w * scale * 10) / 10}px ${Math.round(h * scale * 10) / 10}px`,
        backgroundPosition: mural ? "center bottom" : "center",
        backgroundRepeat: mural ? "no-repeat" : "repeat",
      }}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": `${product.name} wallpaper pattern swatch` })}
    />
  );
}
