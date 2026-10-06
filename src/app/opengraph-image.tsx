import { getProduct } from "@/lib/catalog";
import { ogCard, OG_SIZE } from "@/lib/og";

export const alt = "Wallora — designer wallpaper you collect, level up and love";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ art: getProduct("arcade-arches")!, eyebrow: "Designer wallpaper", title: "Walls worth collecting.", sub: "Peel & stick and non-woven wallpaper. Earn XP, unlock badges, level up.", badge: "Shop · Collect · Level up" });
}
