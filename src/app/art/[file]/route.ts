import { wallpaperTileSvg } from "@/lib/art";
import { getProduct, PRODUCTS } from "@/lib/catalog";

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => PRODUCTS.map((p) => ({ file: `${p.slug}.svg` }));

/** Seamless pattern tile for each design, repeated natively by the browser via CSS background. */
export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const p = getProduct((await params).file.replace(/\.svg$/, ""));
  if (!p) return new Response("Not found", { status: 404 });
  return new Response(wallpaperTileSvg(p), {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400" },
  });
}
