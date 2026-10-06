import { getProduct, PRODUCTS } from "@/lib/catalog";
import { productMarkdown } from "@/lib/markdown";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) return new Response("Not found", { status: 404 });
  return new Response(productMarkdown(p), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${absoluteUrl(`/wallpapers/${p.slug}`)}>; rel="canonical"`,
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
