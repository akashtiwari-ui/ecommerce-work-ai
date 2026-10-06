import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { StoreProvider } from "@/components/store";
import { Toaster } from "@/components/Toaster";
import { organizationLd, websiteLd } from "@/lib/schema";
import { SITE } from "@/lib/site";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", axes: ["opsz", "SOFT"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Designer & Peel and Stick Wallpaper`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["wallpaper", "peel and stick wallpaper", "designer wallpaper", "removable wallpaper", "non-woven wallpaper", "botanical wallpaper", "geometric wallpaper", "nursery wallpaper", "wallpaper murals"],
  authors: [{ name: `${SITE.name} Studio`, url: `${SITE.url}/about` }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "Home & Garden",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/rss.xml", title: "Wallora Guides" }] },
  },
  openGraph: { type: "website", siteName: SITE.name, locale: SITE.locale, url: "/" },
  twitter: { card: "summary_large_image", ...(SITE.twitter ? { site: SITE.twitter, creator: SITE.twitter } : {}) },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { telephone: false },
  // Search Console / Bing Webmaster ownership tags (the only verification method for *.vercel.app)
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } } : {}),
  },
  other: { "llms-txt": `${SITE.url}/llms.txt` },
};

export const viewport: Viewport = {
  themeColor: "#f7f2ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" title="LLM-readable site summary" href="/llms.txt" />
        <link rel="alternate" type="application/json" title="Product catalog (JSON)" href="/catalog.json" />
      </head>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <StoreProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
