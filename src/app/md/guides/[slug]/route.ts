import { getGuide, GUIDES } from "@/lib/guides";
import { guideMarkdown } from "@/lib/markdown";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug);
  if (!g) return new Response("Not found", { status: 404 });
  return new Response(guideMarkdown(g), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${absoluteUrl(`/guides/${g.slug}`)}>; rel="canonical"`,
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
