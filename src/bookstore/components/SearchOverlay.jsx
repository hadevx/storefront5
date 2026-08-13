import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { searchBooks } from "../data/books";
import { AUTHORS } from "../data/authors";
import { SUGGESTED_SEARCHES } from "../data/site";
import { useUI } from "../context/UIProvider";
import { useShop } from "../context/ShopProvider";
import { BookCover } from "./BookCover";
import { useFocusTrap, useLockBodyScroll, useOnKey } from "../hooks";
import { EASE } from "../lib/motion";
import { formatPrice } from "../lib/utils";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const { recentBooks } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const navigate = useNavigate();

  useLockBodyScroll(searchOpen);
  useFocusTrap(panelRef, searchOpen);
  useOnKey("Escape", () => setSearchOpen(false), searchOpen);

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      const id = window.setTimeout(() => inputRef.current?.focus(), 240);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [searchOpen]);

  const results = useMemo(() => searchBooks(query).slice(0, 8), [query]);
  const authorHits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return AUTHORS.filter((a) => a.name.toLowerCase().includes(q)).slice(0, 4);
  }, [query]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    navigate(`/books?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE.editorial }}
          className="fixed inset-0 z-[85] overflow-y-auto bg-[var(--paper)]">
          <div className="u-gutter flex min-h-full flex-col pb-20 pt-8">
            <div className="flex items-center justify-between">
              <span className="u-label text-[var(--ink-muted)]">Search</span>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                data-cursor="close"
                aria-label="Close search"
                className="flex h-11 w-11 items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)]">
                <X size={22} strokeWidth={1.3} />
              </button>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7, ease: EASE.editorial }}
              className="t-h1 mt-10 max-w-[16ch] text-balance">
              What are you looking for?
            </motion.h2>

            <form onSubmit={onSubmit} className="mt-10 border-b border-[var(--line-strong)]" role="search">
              <label htmlFor="verso-search" className="sr-only">
                Search books, authors, genres
              </label>
              <div className="flex items-center gap-4">
                <input
                  ref={inputRef}
                  id="verso-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search books, authors, genres…"
                  autoComplete="off"
                  className="u-serif w-full bg-transparent pb-5 text-[clamp(1.5rem,4vw,3rem)] leading-none text-[var(--ink)] placeholder:text-[var(--ink-muted)] placeholder:opacity-50 focus:outline-none"
                />
                <button type="submit" aria-label="Search" className="shrink-0 pb-5 text-[var(--accent)]">
                  <ArrowRight size={28} strokeWidth={1.2} />
                </button>
              </div>
            </form>

            {!query && (
              <div className="mt-10">
                <p className="u-label mb-4 text-[var(--ink-muted)]">Suggested</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_SEARCHES.map((s, i) => (
                    <motion.button
                      key={s}
                      type="button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.24 + i * 0.05, duration: 0.5 }}
                      onClick={() => setQuery(s)}
                      className="u-label rounded-full border border-[var(--line-strong)] px-4 py-2.5 text-[var(--ink-soft)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]">
                      {s}
                    </motion.button>
                  ))}
                </div>

                {recentBooks.length > 0 && (
                  <div className="mt-14">
                    <p className="u-label mb-6 text-[var(--ink-muted)]">Recently viewed</p>
                    <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-6">
                      {recentBooks.slice(0, 6).map((b) => (
                        <Link
                          key={b.slug}
                          to={`/books/${b.slug}`}
                          onClick={() => setSearchOpen(false)}
                          data-cursor="book">
                          <BookCover book={b} />
                          <p className="u-meta mt-2 truncate">{b.title}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {query && (
              <div className="mt-12">
                <p className="u-label mb-6 text-[var(--ink-muted)]">
                  {results.length + authorHits.length === 0
                    ? "Nothing on our shelves matches that"
                    : `${results.length} ${results.length === 1 ? "book" : "books"}${
                        authorHits.length ? ` · ${authorHits.length} authors` : ""
                      }`}
                </p>

                {authorHits.length > 0 && (
                  <div className="mb-10 flex flex-wrap gap-x-8 gap-y-3 border-y border-[var(--line)] py-5">
                    {authorHits.map((a) => (
                      <Link
                        key={a.slug}
                        to={`/authors/${a.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="u-serif text-2xl link-draw"
                        data-cursor="point">
                        {a.name}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                  <AnimatePresence mode="popLayout">
                    {results.map((b, i) => (
                      <motion.div
                        key={b.slug}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.045, duration: 0.5, ease: EASE.editorial }}>
                        <Link to={`/books/${b.slug}`} onClick={() => setSearchOpen(false)} data-cursor="book">
                          <BookCover book={b} />
                          <h3 className="u-serif mt-3 text-lg leading-tight">{b.title}</h3>
                          <p className="text-[12px] text-[var(--ink-muted)]">{b.author}</p>
                          <p className="u-meta mt-1">{formatPrice(b.price)}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {results.length === 0 && authorHits.length === 0 && (
                  <p className="max-w-prose2 text-[15px] leading-relaxed text-[var(--ink-muted)]">
                    Try a genre, an author, or the half-remembered phrase from the cover. If we still cannot find it,
                    ask at the counter — we order most titles within two days.
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
