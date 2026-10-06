import Link from "next/link";
import { WallpaperArt } from "@/components/WallpaperArt";
import { getProduct } from "@/lib/catalog";

export default function NotFound() {
  return (
    <div className="wrap grid min-h-[60vh] items-center gap-10 py-16 md:grid-cols-2">
      <div>
        <p className="eyebrow">404 · Hidden room</p>
        <h1 className="mt-3 text-5xl font-medium sm:text-6xl">This wall is still blank.</h1>
        <p className="mt-4 text-lg text-muted">The page you&apos;re looking for has moved or never existed. Let&apos;s get you back to the patterns.</p>
        <div className="mt-8 flex gap-3"><Link href="/wallpapers" className="btn-primary">Shop wallpaper</Link><Link href="/" className="btn-ghost">Home</Link></div>
      </div>
      <WallpaperArt product={getProduct("confetti-dot")!} decorative className="aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lift" />
    </div>
  );
}
