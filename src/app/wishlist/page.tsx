import type { Metadata } from "next";
import { WishlistView } from "@/components/WishlistView";

export const metadata: Metadata = { title: "Your Wishlist", robots: { index: false, follow: true } };

export default function WishlistPage() {
  return (
    <div className="wrap pt-10">
      <h1 className="mb-8 text-5xl font-medium">Wishlist</h1>
      <WishlistView />
    </div>
  );
}
