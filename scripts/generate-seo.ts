/**
 * Writes every crawler/AI-facing file to /public as a real, inspectable file:
 *   robots.txt, sitemap.xml, rss.xml, llms.txt, llms-full.txt, catalog.json, merchant-feed.xml,
 *   wallpapers/<slug>.md and guides/<slug>.md (markdown twins of each page).
 *
 * Runs automatically before `next dev` / `next build` (see package.json), so the files
 * always match the catalog. Domain comes from NEXT_PUBLIC_SITE_URL (default: wallers.vercel.app).
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const main = async () => {
  // Import after env is loaded so SITE.url picks up NEXT_PUBLIC_SITE_URL
  const { PRODUCTS } = await import("../src/lib/catalog");
  const { GUIDES } = await import("../src/lib/guides");
  const { guideMarkdown, llmsFullTxt, llmsTxt, productMarkdown } = await import("../src/lib/markdown");
  const { catalogJson, merchantFeedXml, robotsTxt, rssXml, sitemapXml } = await import("../src/lib/seo-files");
  const { SITE } = await import("../src/lib/site");

  const pub = join(process.cwd(), "public");
  const write = (rel: string, body: string) => {
    const file = join(pub, rel);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, body);
  };

  // Clear stale markdown twins (e.g. a product that was removed)
  for (const dir of ["wallpapers", "guides"]) rmSync(join(pub, dir), { recursive: true, force: true });

  write("robots.txt", robotsTxt());
  write("sitemap.xml", sitemapXml());
  write("rss.xml", rssXml());
  write("llms.txt", llmsTxt());
  write("llms-full.txt", llmsFullTxt());
  write("merchant-feed.xml", merchantFeedXml());
  write("catalog.json", JSON.stringify(catalogJson(), null, 2) + "\n");
  for (const p of PRODUCTS) write(`wallpapers/${p.slug}.md`, productMarkdown(p));
  for (const g of GUIDES) write(`guides/${g.slug}.md`, guideMarkdown(g));

  const count = 7 + PRODUCTS.length + GUIDES.length;
  console.log(`✓ SEO/GEO files: ${count} written to /public for ${SITE.url}`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
