import type { MetadataRoute } from "next";
import { absoluteUrl, SITE } from "@/lib/site";

/** Search engines AND AI answer engines are explicitly welcome — that's the point of GEO. */
const AI_AGENTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "GoogleOther", "Applebot", "Applebot-Extended",
  "Bingbot", "DuckAssistBot", "Amazonbot", "meta-externalagent", "MistralAI-User", "cohere-ai", "YouBot", "CCBot",
];
const PRIVATE = ["/cart", "/checkout", "/wishlist"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_AGENTS, allow: ["/", "/llms.txt", "/llms-full.txt", "/api/catalog"], disallow: PRIVATE },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}
