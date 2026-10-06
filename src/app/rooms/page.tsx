import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WallpaperArt } from "@/components/WallpaperArt";
import { productsForRoom, ROOMS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop Wallpaper by Room — Living Room, Bedroom, Nursery, Bathroom & More",
  description: "Find the right wallpaper for every room, with expert tips on scale, finish and placement for living rooms, bedrooms, nurseries, bathrooms, kitchens and home offices.",
  alternates: { canonical: "/rooms" },
};

export default function RoomsPage() {
  return (
    <div className="wrap pt-8">
      <Breadcrumbs items={[{ name: "Rooms", path: "/rooms" }]} />
      <h1 className="mt-6 text-5xl font-medium sm:text-6xl">Wallpaper by room</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">Every room has different needs — humidity, light, wear and mood. Start with the room and we&apos;ll show the designs and finishes that suit it.</p>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ROOMS.map((r) => {
          const p = productsForRoom(r.slug)[0];
          return (
            <Link key={r.slug} href={`/rooms/${r.slug}`} className="group card overflow-hidden">
              <WallpaperArt product={p} scale={0.9} decorative className="h-48 transition duration-700 group-hover:scale-105" />
              <div className="p-6">
                <h2 className="font-display text-2xl group-hover:text-clay">{r.headline}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{r.intro}</p>
                <p className="mt-4 text-xs font-semibold">{productsForRoom(r.slug).length} designs · Best finish: {r.recommendedFinish}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
