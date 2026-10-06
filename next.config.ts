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
    // Markdown twins of pages for LLM agents (llms.txt convention: append .md)
    return [
      { source: "/wallpapers/:slug.md", destination: "/md/wallpapers/:slug" },
      { source: "/guides/:slug.md", destination: "/md/guides/:slug" },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Machine-readable endpoints for AI agents / answer engines
        source: "/:file(llms.txt|llms-full.txt)",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "X-Robots-Tag", value: "noindex, follow" },
        ],
      },
    ];
  },
};

export default nextConfig;
