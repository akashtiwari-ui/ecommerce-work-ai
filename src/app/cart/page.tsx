import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = { title: "Your Cart", robots: { index: false, follow: true }, alternates: { canonical: "/cart" } };

export default function CartPage() {
  return (
    <div className="wrap pt-10">
      <h1 className="mb-8 text-5xl font-medium">Your cart</h1>
      <CartView />
    </div>
  );
}
