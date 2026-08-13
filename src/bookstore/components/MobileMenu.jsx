import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { NAV, STORE } from "../data/site";
import { GENRES } from "../data/genres";
import { useUI } from "../context/UIProvider";
import { useFocusTrap, useLockBodyScroll, useOnKey } from "../hooks";
import { EASE } from "../lib/motion";

export default function MobileMenu() {
  const { menuOpen, setMenuOpen, setSearchOpen } = useUI();
  const panelRef = useRef(null);
  useLockBodyScroll(menuOpen);
  useFocusTrap(panelRef, menuOpen);
  useOnKey("Escape", () => setMenuOpen(false), menuOpen);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.65, ease: EASE.editorial }}
          className="fixed inset-0 z-[70] flex flex-col bg-[var(--paper)] lg:hidden">
          <div className="u-gutter flex h-[var(--nav-h)] shrink-0 items-center justify-between">
            <span className="u-serif text-2xl">{STORE.name}</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center">
              <X size={22} strokeWidth={1.3} />
            </button>
          </div>

          <div className="u-gutter flex-1 overflow-y-auto pb-16">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              className="u-label mb-8 flex w-full items-center justify-between border-y border-[var(--line)] py-4 text-[var(--ink-muted)]">
              Search books, authors, genres
              <Search size={16} strokeWidth={1.4} />
            </button>

            <nav aria-label="Primary mobile">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.05, duration: 0.5, ease: EASE.editorial }}>
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline justify-between border-b border-[var(--line)] py-4">
                    <span className="u-serif text-[2.4rem] leading-none">{item.label}</span>
                    <span className="u-meta">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <p className="u-label mb-4 mt-10 text-[var(--ink-muted)]">Genres</p>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((g) => (
                <Link
                  key={g.slug}
                  to={`/genres/${g.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="u-label rounded-full border border-[var(--line-strong)] px-3 py-2 text-[var(--ink-soft)]">
                  {g.name}
                </Link>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-[var(--line)] pt-6">
              <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="u-label text-[var(--ink-muted)]">
                Your list
              </Link>
              <Link to="/reading-list" onClick={() => setMenuOpen(false)} className="u-label text-[var(--ink-muted)]">
                Reading list
              </Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="u-label text-[var(--ink-muted)]">
                Bag
              </Link>
            </div>
            <p className="mt-10 max-w-xs text-[13px] italic leading-relaxed text-[var(--ink-muted)]">
              {STORE.tagline}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
