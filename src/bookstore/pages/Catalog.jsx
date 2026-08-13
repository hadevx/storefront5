import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import PageHeader from "../components/PageHeader";
import BookCard from "../components/BookCard";
import {
  FilterForm,
  FilterSheet,
  applyFilters,
  countActive,
  emptyFilters,
  PRICE_BANDS,
  RATING_BANDS,
} from "../components/FiltersPanel";
import { BOOKS, searchBooks } from "../data/books";
import { GENRES } from "../data/genres";
import { useUI } from "../context/UIProvider";
import { EASE } from "../lib/motion";
import { cn } from "../lib/utils";

const SORTS = [
  { id: "curated", label: "Curated" },
  { id: "new", label: "Newest" },
  { id: "rating", label: "Best rated" },
  { id: "price-asc", label: "Price ↑" },
  { id: "price-desc", label: "Price ↓" },
  { id: "title", label: "A–Z" },
];

const sortBooks = (books, sort) => {
  const list = [...books];
  switch (sort) {
    case "new":
      return list.sort((a, b) => new Date(b.published) - new Date(a.published));
    case "rating":
      return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "title":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return list.sort(
        (a, b) =>
          (b.featured ? 4 : 0) + (b.staffPick ? 2 : 0) + (b.bestseller ? 1 : 0) - ((a.featured ? 4 : 0) + (a.staffPick ? 2 : 0) + (a.bestseller ? 1 : 0)) ||
          b.rating - a.rating,
      );
  }
};

/**
 * The catalogue. Also serves /new and /bestsellers through `preset`, so the
 * browsing model stays identical wherever you enter it.
 */
export default function Catalog({
  preset,
  header = {
    kicker: "The catalogue",
    lines: ["Every book", "on our shelves."],
    intro:
      "Every title here was read by a bookseller before it earned its place. Filter by what you are in the mood for — or ignore the filters entirely and browse the way you would in the shop.",
  },
}) {
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState(() => ({
    ...emptyFilters,
    genres: params.get("genre") ? [params.get("genre")] : [],
  }));
  const [sort, setSort] = useState(preset?.sort || "curated");
  const query = params.get("q") || "";
  const { filtersOpen, setFiltersOpen } = useUI();

  useEffect(() => {
    const genre = params.get("genre");
    setFilters((f) => (genre && !f.genres.includes(genre) ? { ...f, genres: [genre] } : f));
  }, [params]);

  const base = useMemo(() => {
    if (query) return searchBooks(query);
    if (preset?.filter) return BOOKS.filter(preset.filter);
    return BOOKS;
  }, [query, preset]);

  const results = useMemo(() => sortBooks(applyFilters(base, filters), sort), [base, filters, sort]);
  const active = countActive(filters);

  const clearQuery = () => {
    params.delete("q");
    setParams(params, { replace: true });
  };

  return (
    <>
      <PageHeader
        kicker={header.kicker}
        index={`${String(results.length).padStart(3, "0")} titles`}
        lines={header.lines}
        intro={header.intro}
        meta={query ? `Results for “${query}”` : undefined}
      />

      <div className="u-gutter mt-12 grid grid-cols-1 gap-12 pb-28 lg:grid-cols-12 lg:gap-14">
        {/* --------- filter rail --------- */}
        <aside className="hidden lg:col-span-3 lg:block" aria-label="Filters">
          <div className="sticky top-28">
            <div className="flex items-baseline justify-between">
              <h2 className="u-serif text-2xl">Refine</h2>
              <span className="u-meta tabular-nums">{active ? `${active} active` : "—"}</span>
            </div>
            <div className="mt-6 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
              <FilterForm filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </aside>

        {/* --------- results --------- */}
        <div className="lg:col-span-9">
          {/* toolbar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="u-label flex items-center gap-2 border border-[var(--line-strong)] px-4 py-2.5 lg:hidden">
                <SlidersHorizontal size={13} /> Filter{active ? ` (${active})` : ""}
              </button>

              {query && (
                <button
                  type="button"
                  onClick={clearQuery}
                  className="u-label flex items-center gap-2 border border-[var(--accent)] px-3 py-2.5 text-[var(--accent)]">
                  “{query}” <X size={12} />
                </button>
              )}

              {/* active filter chips */}
              {filters.genres.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setFilters((f) => ({ ...f, genres: f.genres.filter((x) => x !== g) }))}
                  className="u-label hidden items-center gap-2 border border-[var(--line-strong)] px-3 py-2.5 sm:flex">
                  {GENRES.find((x) => x.slug === g)?.name} <X size={12} />
                </button>
              ))}
              {filters.price.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFilters((f) => ({ ...f, price: f.price.filter((x) => x !== p) }))}
                  className="u-label hidden items-center gap-2 border border-[var(--line-strong)] px-3 py-2.5 sm:flex">
                  {PRICE_BANDS.find((x) => x.id === p)?.label} <X size={12} />
                </button>
              ))}
              {filters.rating && (
                <button
                  type="button"
                  onClick={() => setFilters((f) => ({ ...f, rating: null }))}
                  className="u-label hidden items-center gap-2 border border-[var(--line-strong)] px-3 py-2.5 sm:flex">
                  {RATING_BANDS.find((x) => x.id === filters.rating)?.label} <X size={12} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              <span className="u-meta mr-2 hidden sm:inline">Sort</span>
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSort(s.id)}
                  className={cn(
                    "u-label whitespace-nowrap px-3 py-2 transition-colors",
                    sort === s.id ? "text-[var(--ink)] underline underline-offset-8" : "text-[var(--ink-muted)]",
                  )}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {results.length === 0 ? (
            <div className="py-24 text-center">
              <p className="u-serif text-3xl">Nothing matches that combination.</p>
              <p className="mx-auto mt-4 max-w-[38ch] text-[14px] leading-relaxed text-[var(--ink-muted)]">
                Loosen a filter, or ask at the counter — we order most titles within two days.
              </p>
              <button
                type="button"
                onClick={() => setFilters(emptyFilters)}
                className="u-label mt-8 border border-[var(--ink)] px-6 py-3">
                Reset filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {results.map((book, i) => (
                  <motion.div
                    key={book.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: EASE.editorial, delay: Math.min(i, 8) * 0.035 }}
                    className={cn(i % 7 === 3 && "sm:mt-10")}>
                    <BookCard book={book} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <FilterSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        setFilters={setFilters}
        resultCount={results.length}
      />
    </>
  );
}
