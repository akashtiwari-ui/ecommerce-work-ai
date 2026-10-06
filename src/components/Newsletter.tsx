"use client";

import { useState } from "react";
import { useStore } from "./store";

export function Newsletter({ dark }: { dark?: boolean }) {
  const { newsletter } = useStore();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) return;
        newsletter();
        setDone(true);
      }}
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <input
        id="nl-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className={`input ${dark ? "border-cream/15 bg-cream/5 text-cream placeholder:text-cream/40" : ""}`}
      />
      <button className={dark ? "btn bg-gold text-ink hover:bg-cream" : "btn-clay"} disabled={done}>
        {done ? "You're in ✓" : "Join · +40 XP"}
      </button>
    </form>
  );
}
