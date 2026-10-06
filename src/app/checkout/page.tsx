import type { Metadata } from "next";
import { Checkout } from "@/components/Checkout";

export const metadata: Metadata = { title: "Checkout", robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return (
    <div className="wrap pt-10">
      <h1 className="mb-8 text-5xl font-medium">Checkout</h1>
      <Checkout />
    </div>
  );
}
