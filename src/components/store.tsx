"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getProduct, RARITY_META, variantsFor, type Variant } from "@/lib/catalog";
import { BADGES, levelFor, PROMO_CODES, todayKey, WHEEL, XP, yesterdayKey, type BadgeId } from "@/lib/game";

export type CartLine = { slug: string; variant: Variant["id"]; qty: number };
export type Order = { id: string; date: string; total: number; xp: number; items: CartLine[] };

type State = {
  xp: number;
  log: { reason: string; amount: number; at: string }[];
  badges: BadgeId[];
  streak: { count: number; last: string | null };
  viewed: string[];
  viewedCollections: string[];
  wishlist: string[];
  cart: CartLine[];
  spinLast: string | null;
  codes: string[];
  appliedCode: string | null;
  quizResult: string | null;
  guidesRead: string[];
  owned: string[];
  orders: Order[];
  once: string[];
};

const EMPTY: State = {
  xp: 0, log: [], badges: [], streak: { count: 0, last: null }, viewed: [], viewedCollections: [],
  wishlist: [], cart: [], spinLast: null, codes: [], appliedCode: null, quizResult: null,
  guidesRead: [], owned: [], orders: [], once: [],
};

export type Toast = { id: number; kind: "xp" | "badge" | "level" | "info"; title: string; sub?: string };

const KEY = "wallora:v1";

type Ctx = ReturnType<typeof useStoreImpl>;
const StoreCtx = createContext<Ctx | null>(null);

function useStoreImpl() {
  const [state, setState] = useState<State>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const ref = useRef<State>(EMPTY);
  const toastId = useRef(0);

  const loaded = useRef(false);

  /** Child effects run before this provider's effects, so any mutation must load persisted state first. */
  const ensureLoaded = useCallback(() => {
    if (loaded.current) return;
    loaded.current = true;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) ref.current = { ...EMPTY, ...JSON.parse(raw) } as State;
    } catch {}
  }, []);

  useEffect(() => {
    ensureLoaded();
    setState(ref.current);
    setHydrated(true);
  }, [ensureLoaded]);

  const pushToasts = useCallback((ts: Omit<Toast, "id">[]) => {
    if (!ts.length) return;
    const withIds = ts.map((t) => ({ ...t, id: ++toastId.current }));
    setToasts((cur) => [...cur, ...withIds].slice(-4));
    withIds.forEach((t) => setTimeout(() => setToasts((cur) => cur.filter((x) => x.id !== t.id)), 3800));
  }, []);

  /** Runs a pure-ish mutation against the latest state, persisting and emitting toasts. */
  const run = useCallback(
    (fn: (s: State, emit: (t: Omit<Toast, "id">) => void) => State) => {
      ensureLoaded();
      const queued: Omit<Toast, "id">[] = [];
      const before = ref.current;
      let next = fn(before, (t) => queued.push(t));
      const lb = levelFor(before.xp).current, la = levelFor(next.xp).current;
      if (la.level > lb.level) queued.push({ kind: "level", title: `Level up! You're a ${la.name}`, sub: la.perk });
      next = { ...next, log: next.log.slice(0, 30) };
      ref.current = next;
      setState(next);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      pushToasts(queued);
      return next;
    },
    [pushToasts, ensureLoaded],
  );

  const grant = (s: State, amount: number, reason: string, emit: (t: Omit<Toast, "id">) => void): State => {
    if (amount <= 0) return s;
    emit({ kind: "xp", title: `+${amount} XP`, sub: reason });
    return { ...s, xp: s.xp + amount, log: [{ reason, amount, at: new Date().toISOString() }, ...s.log] };
  };

  const unlock = (s: State, id: BadgeId, emit: (t: Omit<Toast, "id">) => void): State => {
    if (s.badges.includes(id)) return s;
    const b = BADGES[id];
    emit({ kind: "badge", title: `${b.emoji} Badge unlocked: ${b.name}`, sub: b.desc });
    const withBadge = { ...s, badges: [...s.badges, id] };
    return b.xp ? { ...withBadge, xp: withBadge.xp + b.xp, log: [{ reason: `Badge: ${b.name}`, amount: b.xp, at: new Date().toISOString() }, ...withBadge.log] } : withBadge;
  };

  const once = (s: State, key: string) => s.once.includes(key);
  const mark = (s: State, key: string): State => ({ ...s, once: [...s.once, key] });

  const actions = {
    checkIn: () =>
      run((s, emit) => {
        const today = todayKey();
        if (s.streak.last === today) {
          emit({ kind: "info", title: "Already checked in today", sub: "Come back tomorrow to grow your streak 🔥" });
          return s;
        }
        const count = s.streak.last === yesterdayKey() ? s.streak.count + 1 : 1;
        let n: State = { ...s, streak: { count, last: today } };
        n = grant(n, XP.dailyCheckIn + Math.min(count - 1, 6) * 5, `Daily check-in · ${count}-day streak`, emit);
        n = unlock(n, "first-steps", emit);
        if (count >= 3) n = unlock(n, "streak-3", emit);
        return n;
      }),

    viewProduct: (slug: string, collection: string) =>
      run((s, emit) => {
        if (s.viewed.includes(slug)) return s;
        let n: State = {
          ...s,
          viewed: [...s.viewed, slug],
          viewedCollections: s.viewedCollections.includes(collection) ? s.viewedCollections : [...s.viewedCollections, collection],
        };
        n = grant(n, XP.viewDesign, "Discovered a new design", emit);
        if (n.viewedCollections.length >= 3) n = unlock(n, "explorer", emit);
        return n;
      }),

    toggleWishlist: (slug: string) =>
      run((s, emit) => {
        if (s.wishlist.includes(slug)) return { ...s, wishlist: s.wishlist.filter((x) => x !== slug) };
        let n: State = { ...s, wishlist: [...s.wishlist, slug] };
        if (!once(n, `wish:${slug}`)) n = grant(mark(n, `wish:${slug}`), XP.wishlist, "Saved to wishlist", emit);
        if (n.wishlist.length >= 3) n = unlock(n, "curator", emit);
        return n;
      }),

    addToCart: (slug: string, variant: Variant["id"], qty: number) =>
      run((s, emit) => {
        const existing = s.cart.find((l) => l.slug === slug && l.variant === variant);
        const cart = existing
          ? s.cart.map((l) => (l === existing ? { ...l, qty: Math.min(99, l.qty + qty) } : l))
          : [...s.cart, { slug, variant, qty }];
        let n: State = { ...s, cart };
        emit({ kind: "info", title: "Added to cart", sub: `${getProduct(slug)?.name} × ${qty}` });
        if (!once(n, `cart:${slug}`)) n = grant(mark(n, `cart:${slug}`), XP.addToCart, "First time adding this design", emit);
        return n;
      }),

    setQty: (slug: string, variant: Variant["id"], qty: number) =>
      run((s) => ({
        ...s,
        cart: qty <= 0 ? s.cart.filter((l) => !(l.slug === slug && l.variant === variant)) : s.cart.map((l) => (l.slug === slug && l.variant === variant ? { ...l, qty: Math.min(99, qty) } : l)),
      })),

    spin: () => {
      const idx = Math.floor(Math.random() * WHEEL.length);
      return { idx, commit: () =>
        run((s, emit) => {
          const prize = WHEEL[idx];
          let n: State = { ...s, spinLast: todayKey() };
          if (prize.kind === "xp") n = grant(n, prize.value, "Swatch Wheel prize", emit);
          else {
            n = { ...n, codes: n.codes.includes(prize.code!) ? n.codes : [...n.codes, prize.code!] };
            emit({ kind: "info", title: `You won ${prize.label}!`, sub: `Code ${prize.code} saved to your wallet` });
          }
          return unlock(n, "lucky-spin", emit);
        }) };
    },

    completeQuiz: (result: string) =>
      run((s, emit) => {
        let n: State = { ...s, quizResult: result };
        if (!once(n, "quiz")) n = grant(mark(n, "quiz"), XP.quiz, "Completed the style quiz", emit);
        return unlock(n, "stylist-quiz", emit);
      }),

    usedCalculator: () =>
      run((s, emit) => {
        if (once(s, "calc")) return s;
        return unlock(grant(mark(s, "calc"), XP.calculator, "Measured your wall like a pro", emit), "math-wiz", emit);
      }),

    readGuide: (slug: string) =>
      run((s, emit) => {
        if (s.guidesRead.includes(slug)) return s;
        let n: State = grant({ ...s, guidesRead: [...s.guidesRead, slug] }, XP.readGuide, "Read a guide", emit);
        if (n.guidesRead.length >= 3) n = unlock(n, "bookworm", emit);
        return n;
      }),

    newsletter: () =>
      run((s, emit) => {
        if (once(s, "newsletter")) {
          emit({ kind: "info", title: "You're already subscribed 💌" });
          return s;
        }
        const n = grant(mark(s, "newsletter"), XP.newsletter, "Joined the Wallora letter", emit);
        emit({ kind: "info", title: "Welcome code: WELCOME10", sub: "Saved to your wallet" });
        return { ...n, codes: n.codes.includes("WELCOME10") ? n.codes : [...n.codes, "WELCOME10"] };
      }),

    applyCode: (code: string | null) =>
      run((s, emit) => {
        if (code === null) return { ...s, appliedCode: null };
        const c = code.trim().toUpperCase();
        if (!PROMO_CODES[c]) {
          emit({ kind: "info", title: "That code isn't valid", sub: "Win codes on the Swatch Wheel!" });
          return s;
        }
        emit({ kind: "info", title: `Code ${c} applied`, sub: PROMO_CODES[c].label });
        return { ...s, appliedCode: c };
      }),

    placeOrder: (total: number) =>
      run((s, emit) => {
        const items = s.cart;
        const paid = items.filter((l) => l.variant !== "sample");
        const rarityXp = Array.from(new Set(paid.map((l) => l.slug))).reduce((acc, slug) => acc + RARITY_META[getProduct(slug)!.rarity].xp, 0);
        const earned = Math.round(total * XP.perDollar) + rarityXp;
        const order: Order = { id: `WL-${Date.now().toString(36).toUpperCase()}`, date: new Date().toISOString(), total, xp: earned, items };
        const owned = Array.from(new Set([...s.owned, ...paid.map((l) => l.slug)]));
        let n: State = {
          ...s, cart: [], orders: [order, ...s.orders], owned,
          codes: s.appliedCode ? s.codes.filter((c) => c !== s.appliedCode) : s.codes, appliedCode: null,
        };
        n = grant(n, earned, `Order ${order.id}`, emit);
        n = unlock(n, "first-order", emit);
        if (owned.some((slug) => getProduct(slug)?.rarity === "Legendary")) n = unlock(n, "legend-hunter", emit);
        if (new Set(owned.map((slug) => getProduct(slug)!.collection)).size >= 3) n = unlock(n, "collector", emit);
        return n;
      }),

    reset: () => run(() => EMPTY),
  };

  const derived = useMemo(() => {
    const lines = state.cart
      .map((l) => {
        const p = getProduct(l.slug);
        const v = p && variantsFor(p).find((x) => x.id === l.variant);
        return p && v ? { ...l, product: p, v, lineTotal: v.price * l.qty } : null;
      })
      .filter(Boolean) as (CartLine & { product: NonNullable<ReturnType<typeof getProduct>>; v: Variant; lineTotal: number })[];
    const subtotal = lines.reduce((a, l) => a + l.lineTotal, 0);
    const lvl = levelFor(state.xp);
    const levelDiscount = Math.round(subtotal * lvl.current.discount) / 100;
    const promo = state.appliedCode ? PROMO_CODES[state.appliedCode] : null;
    const promoDiscount = promo ? Math.min(subtotal - levelDiscount, promo.pct ? Math.round((subtotal - levelDiscount) * promo.pct) / 100 : promo.flat ?? 0) : 0;
    const after = Math.max(0, subtotal - levelDiscount - promoDiscount);
    const shipping = subtotal === 0 || after >= 120 || lvl.current.level >= 5 ? 0 : lines.every((l) => l.variant === "sample") ? 2.5 : 9.5;
    const total = Math.round((after + shipping) * 100) / 100;
    return {
      lines, subtotal, levelDiscount, promoDiscount, shipping, total, level: lvl,
      cartCount: state.cart.reduce((a, l) => a + l.qty, 0),
    };
  }, [state]);

  return { state, hydrated, toasts, dismissToast: (id: number) => setToasts((t) => t.filter((x) => x.id !== id)), ...actions, ...derived };
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const value = useStoreImpl();
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
