import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  async rewrites() {
    // Back-compat alias for the machine-readable catalog
    return [{ source: "/api/catalog", destination: "/catalog.json" }];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // AI-agent files: readable by every crawler, but kept out of the human SERP
        source: "/:file(llms.txt|llms-full.txt)",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "X-Robots-Tag", value: "noindex, follow" },
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
      {
        // Markdown twins of product & guide pages (llms.txt convention: page URL + .md)
        source: "/:dir(wallpapers|guides)/:file*.md",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
          { key: "X-Robots-Tag", value: "noindex, follow" },
        ],
      },
      {
        source: "/catalog.json",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
      {
        source: "/:file(sitemap.xml|robots.txt|rss.xml|merchant-feed.xml)",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
