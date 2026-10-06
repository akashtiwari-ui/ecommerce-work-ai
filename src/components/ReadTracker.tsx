"use client";

import { useEffect, useState } from "react";
import { useStore } from "./store";

/** Awards XP once the reader scrolls past ~60% of the article; shows a reading progress bar. */
export function ReadTracker({ slug }: { slug: string }) {
  const { readGuide } = useStore();
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let done = false;
    const on = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      setPct(p);
      if (!done && p > 0.6) {
        done = true;
        readGuide(slug);
      }
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-1">
      <div className="xp-bar h-full transition-[width] duration-150" style={{ width: `${pct * 100}%` }} />
    </div>
  );
}
