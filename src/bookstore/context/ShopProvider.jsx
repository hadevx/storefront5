import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { BOOKS, bookBySlug } from "../data/books";
import { STORE } from "../data/site";
import { useLocalStorage } from "../hooks";
import { useUI } from "./UIProvider";

const ShopContext = createContext(null);

const SHELVES = ["reading", "want", "finished"];

export function ShopProvider({ children }) {
  const ui = useUI();
  const [lines, setLines] = useLocalStorage("verso.bag", []);
  const [wishlist, setWishlist] = useLocalStorage("verso.wishlist", []);
  const [shelves, setShelves] = useLocalStorage("verso.shelves", {});
  const [recent, setRecent] = useLocalStorage("verso.recent", []);
  const [toasts, setToasts] = useState([]);

  const notify = useCallback((toast) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, ...toast }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const addToBag = useCallback(
    (book, { qty = 1, format, origin, silent = false } = {}) => {
      const chosen = format || book.formats[0]?.name || "Hardcover";
      const price = book.formats.find((f) => f.name === chosen)?.price ?? book.price;
      setLines((prev) => {
        const i = prev.findIndex((l) => l.slug === book.slug && l.format === chosen);
        if (i > -1) {
          const next = [...prev];
          next[i] = { ...next[i], qty: Math.min(next[i].qty + qty, 12) };
          return next;
        }
        return [...prev, { slug: book.slug, format: chosen, qty, price }];
      });
      if (origin) ui.flyToBag(origin, book);
      if (!silent) notify({ kind: "bag", book, message: "Added to your bag" });
    },
    [setLines, ui, notify],
  );

  const removeLine = useCallback(
    (slug, format) => setLines((prev) => prev.filter((l) => !(l.slug === slug && l.format === format))),
    [setLines],
  );

  const setQty = useCallback(
    (slug, format, qty) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => !(l.slug === slug && l.format === format))
          : prev.map((l) => (l.slug === slug && l.format === format ? { ...l, qty: Math.min(qty, 12) } : l)),
      ),
    [setLines],
  );

  const clearBag = useCallback(() => setLines([]), [setLines]);

  const toggleWishlist = useCallback(
    (book) => {
      const has = wishlist.includes(book.slug);
      setWishlist((prev) => (has ? prev.filter((s) => s !== book.slug) : [book.slug, ...prev]));
      notify({ kind: "wishlist", book, message: has ? "Removed from list" : "Saved to your list" });
    },
    [wishlist, setWishlist, notify],
  );

  const setShelf = useCallback(
    (book, shelf) => {
      setShelves((prev) => {
        const next = { ...prev };
        if (!shelf || prev[book.slug] === shelf) delete next[book.slug];
        else next[book.slug] = shelf;
        return next;
      });
    },
    [setShelves],
  );

  const markViewed = useCallback(
    (slug) => setRecent((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, 8)),
    [setRecent],
  );

  const bag = useMemo(
    () =>
      lines
        .map((l) => ({ ...l, book: bookBySlug(l.slug) }))
        .filter((l) => l.book)
        .map((l) => ({ ...l, total: l.price * l.qty })),
    [lines],
  );

  const subtotal = useMemo(() => bag.reduce((sum, l) => sum + l.total, 0), [bag]);
  const count = useMemo(() => bag.reduce((sum, l) => sum + l.qty, 0), [bag]);
  const freeShippingGap = Math.max(0, STORE.freeShippingThreshold - subtotal);

  const wishlistBooks = useMemo(() => wishlist.map(bookBySlug).filter(Boolean), [wishlist]);
  const recentBooks = useMemo(() => recent.map(bookBySlug).filter(Boolean), [recent]);
  const shelfBooks = useMemo(
    () =>
      SHELVES.reduce((acc, shelf) => {
        acc[shelf] = Object.entries(shelves)
          .filter(([, s]) => s === shelf)
          .map(([slug]) => bookBySlug(slug))
          .filter(Boolean);
        return acc;
      }, {}),
    [shelves],
  );

  const value = useMemo(
    () => ({
      books: BOOKS,
      bag,
      subtotal,
      count,
      freeShippingGap,
      addToBag,
      removeLine,
      setQty,
      clearBag,
      wishlist,
      wishlistBooks,
      toggleWishlist,
      inWishlist: (slug) => wishlist.includes(slug),
      shelves,
      shelfBooks,
      setShelf,
      recentBooks,
      markViewed,
      toasts,
      notify,
    }),
    [
      bag,
      subtotal,
      count,
      freeShippingGap,
      addToBag,
      removeLine,
      setQty,
      clearBag,
      wishlist,
      wishlistBooks,
      toggleWishlist,
      shelves,
      shelfBooks,
      setShelf,
      recentBooks,
      markViewed,
      toasts,
      notify,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
};

export { SHELVES };
