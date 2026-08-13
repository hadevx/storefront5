import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import { useUI } from "../context/UIProvider";
import { useShop } from "../context/ShopProvider";
import { BookCover } from "./BookCover";
import Button from "./ui/Button";
import { useFocusTrap, useLockBodyScroll, useOnKey } from "../hooks";
import { cn, formatPrice } from "../lib/utils";
import { EASE } from "../lib/motion";
import { STORE } from "../data/site";
import { STAFF_PICKS } from "../data/books";

export default function CartDrawer() {
  const { bagOpen, setBagOpen } = useUI();
  const { bag, subtotal, count, setQty, removeLine, freeShippingGap, addToBag } = useShop();
  const panelRef = useRef(null);
  useLockBodyScroll(bagOpen);
  useFocusTrap(panelRef, bagOpen);
  useOnKey("Escape", () => setBagOpen(false), bagOpen);

  const progress = Math.min(1, subtotal / STORE.freeShippingThreshold);
  const suggestion = STAFF_PICKS.find((b) => !bag.some((l) => l.slug === b.slug));

  return (
    <AnimatePresence>
      {bagOpen && (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Close bag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setBagOpen(false)}
            className="absolute inset-0 cursor-default bg-[rgba(21,18,14,0.42)] backdrop-blur-[2px]"
          />

          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.62, ease: EASE.drawer }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[27rem] flex-col bg-[var(--paper)] shadow-[-24px_0_60px_-30px_rgba(21,18,14,0.5)]">
            <header className="flex items-center justify-between border-b border-[var(--line)] px-6 py-5">
              <div>
                <p className="u-label text-[var(--ink-muted)]">Your bag</p>
                <p className="u-serif mt-1 text-2xl leading-none">
                  {count} {count === 1 ? "book" : "books"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBagOpen(false)}
                aria-label="Close bag"
                className="flex h-10 w-10 items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)]">
                <X size={20} strokeWidth={1.3} />
              </button>
            </header>

            {/* free shipping meter */}
            <div className="border-b border-[var(--line)] px-6 py-4">
              <div className="flex items-baseline justify-between">
                <p className="u-meta">
                  {freeShippingGap > 0 ? (
                    <>
                      <span className="text-[var(--accent)]">{formatPrice(freeShippingGap)}</span> away from free
                      shipping
                    </>
                  ) : (
                    "Free shipping unlocked"
                  )}
                </p>
                <p className="u-meta tabular-nums">{Math.round(progress * 100)}%</p>
              </div>
              <div className="mt-2 h-[3px] w-full bg-[var(--line)]">
                <motion.div
                  className="h-full bg-[var(--accent)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress }}
                  style={{ transformOrigin: "left" }}
                  transition={{ duration: 0.8, ease: EASE.editorial }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {bag.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 py-16 text-center">
                  <p className="u-serif text-3xl leading-tight text-balance">Nothing here yet.</p>
                  <p className="max-w-[22ch] text-[13px] leading-relaxed text-[var(--ink-muted)]">
                    Every bag starts empty. The good ones do not stay that way for long.
                  </p>
                  <Button to="/books" variant="outline" size="sm" onClick={() => setBagOpen(false)}>
                    Explore books
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-[var(--line)]">
                  <AnimatePresence initial={false}>
                    {bag.map((line) => (
                      <motion.li
                        key={`${line.slug}-${line.format}`}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: EASE.editorial }}
                        className="overflow-hidden">
                        <div className="flex gap-4 py-5">
                          <Link
                            to={`/books/${line.slug}`}
                            onClick={() => setBagOpen(false)}
                            className="w-[68px] shrink-0"
                            data-cursor="book"
                            aria-label={`View ${line.book.title}`}>
                            <BookCover book={line.book} />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="u-serif text-lg leading-tight">{line.book.title}</h3>
                              <span className="font-sans text-[13px] tabular-nums">{formatPrice(line.total)}</span>
                            </div>
                            <p className="mt-0.5 text-[12px] text-[var(--ink-muted)]">{line.book.author}</p>
                            <p className="u-meta mt-2">{line.format}</p>

                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center border border-[var(--line-strong)]">
                                <button
                                  type="button"
                                  aria-label="Decrease quantity"
                                  onClick={() => setQty(line.slug, line.format, line.qty - 1)}
                                  className="flex h-8 w-8 items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)]">
                                  <Minus size={12} />
                                </button>
                                <span className="w-7 text-center text-[13px] tabular-nums">{line.qty}</span>
                                <button
                                  type="button"
                                  aria-label="Increase quantity"
                                  onClick={() => setQty(line.slug, line.format, line.qty + 1)}
                                  className="flex h-8 w-8 items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)]">
                                  <Plus size={12} />
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeLine(line.slug, line.format)}
                                className="u-meta underline underline-offset-4 hover:text-[var(--accent)]">
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}

              {bag.length > 0 && suggestion && (
                <div className="mt-2 border-t border-[var(--line)] py-6">
                  <p className="u-label mb-4 text-[var(--ink-muted)]">One more for the pile</p>
                  <div className="flex items-center gap-4">
                    <Link to={`/books/${suggestion.slug}`} onClick={() => setBagOpen(false)} className="w-14 shrink-0">
                      <BookCover book={suggestion} />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="u-serif text-base leading-tight">{suggestion.title}</p>
                      <p className="text-[12px] text-[var(--ink-muted)]">{formatPrice(suggestion.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToBag(suggestion)}
                      className="u-label border border-[var(--line-strong)] px-3 py-2 hover:border-[var(--ink)]">
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            <footer
              className={cn(
                "border-t border-[var(--line)] px-6 py-5",
                bag.length === 0 && "pointer-events-none opacity-40",
              )}>
              <div className="flex items-baseline justify-between">
                <span className="u-label text-[var(--ink-muted)]">Subtotal</span>
                <span className="u-serif text-2xl tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="u-meta mt-1">Taxes and shipping calculated at checkout.</p>
              <div className="mt-5 flex flex-col gap-2">
                <Button to="/checkout" onClick={() => setBagOpen(false)} className="w-full">
                  Checkout
                </Button>
                <Button to="/cart" variant="ghost" size="sm" onClick={() => setBagOpen(false)} className="w-full">
                  View full bag
                </Button>
              </div>
            </footer>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
