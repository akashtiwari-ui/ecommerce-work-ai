import { GUIDES } from "@/lib/guides";
import { absoluteUrl, SITE } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = [...GUIDES]
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .map((g) => `<item><title>${esc(g.title)}</title><link>${absoluteUrl(`/guides/${g.slug}`)}</link><guid>${absoluteUrl(`/guides/${g.slug}`)}</guid><pubDate>${new Date(g.published).toUTCString()}</pubDate><category>${g.category}</category><description>${esc(g.description)}</description></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${SITE.name} Journal</title><link>${SITE.url}/guides</link><atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml"/><description>${esc(SITE.description)}</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
