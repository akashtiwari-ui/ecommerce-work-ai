"use client";

import { usePathname } from "next/navigation";
import { getProduct } from "@/lib/catalog";
import { SITE, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./ContactIcons";

/** Floating click-to-chat button; prefills the design name on product pages. */
export function WhatsAppFab() {
  const path = usePathname();
  const slug = path.startsWith("/wallpapers/") ? path.split("/")[2] : null;
  const p = slug ? getProduct(slug) : null;
  const text = p ? `Hi ${SITE.name}! I have a question about ${p.name} wallpaper (${SITE.url}/wallpapers/${p.slug})` : `Hi ${SITE.name}! I have a question about your wallpapers.`;
  if (path === "/checkout") return null;
  return (
    <a
      href={whatsappUrl(text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lift transition hover:scale-105 sm:bottom-6 sm:left-6"
    >
      <WhatsAppIcon size={26} />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40 group-hover:pr-1 sm:inline">Chat with us</span>
    </a>
  );
}
