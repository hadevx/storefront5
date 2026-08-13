import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GENRES } from "../data/genres";
import { ALL_FORMATS } from "../data/books";
import { Chip } from "./ui/Bits";
import { cn } from "../lib/utils";
import { EASE } from "../lib/motion";
import { useLockBodyScroll, useOnKey } from "../hooks";

export const PRICE_BANDS = [
  { id: "under-15", label: "Under KD 15", test: (p) => p < 15 },
  { id: "15-20", label: "KD 15 – KD 20", test: (p) => p >= 15 && p <= 20 },
  { id: "over-20", label: "Over KD 20", test: (p) => p > 20 },
];

export const RATING_BANDS = [
  { id: "4.5", label: "4.5 and above", test: (r) => r >= 4.5 },
  { id: "4", label: "4.0 and above", test: (r) => r >= 4 },
];

export const emptyFilters = {
  genres: [],
  price: [],
  rating: null,
  formats: [],
  availability: null,
  language: null,
};

export const applyFilters = (books, f) =>
  books.filter((b) => {
    if (f.genres.length && !f.genres.includes(b.genreSlug)) return false;
    if (f.price.length && !f.price.some((id) => PRICE_BANDS.find((p) => p.id === id)?.test(b.price))) return false;
    if (f.rating && !RATING_BANDS.find((r) => r.id === f.rating)?.test(b.rating)) return false;
    if (f.formats.length && !f.formats.some((name) => b.formats.some((x) => x.name === name && x.available)))
      return false;
    if (f.availability === "in-stock" && b.stock <= 0) return false;
    if (f.availability === "last-copies" && b.stock > 3) return false;
    if (f.language && b.language !== f.language) return false;
    return true;
  });

export const countActive = (f) =>
  f.genres.length + f.price.length + f.formats.length + (f.rating ? 1 : 0) + (f.availability ? 1 : 0) + (f.language ? 1 : 0);

function Group({ title, children }) {
  return (
    <fieldset className="border-t border-[var(--line)] py-6">
      <legend className="u-label mb-4 text-[var(--ink-muted)]">{title}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

/** The filter form itself — shared by the desktop rail and the mobile sheet. */
export function FilterForm({ filters, setFilters, className }) {
  const toggleIn = (key, value) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));

  const setOne = (key, value) => setFilters((f) => ({ ...f, [key]: f[key] === value ? null : value }));

  return (
    <div className={cn("", className)}>
      <Group title="Genre">
        {GENRES.map((g) => (
          <Chip key={g.slug} active={filters.genres.includes(g.slug)} onClick={() => toggleIn("genres", g.slug)}>
            {g.name}
          </Chip>
        ))}
      </Group>

      <Group title="Price">
        {PRICE_BANDS.map((p) => (
          <Chip key={p.id} active={filters.price.includes(p.id)} onClick={() => toggleIn("price", p.id)}>
            {p.label}
          </Chip>
        ))}
      </Group>

      <Group title="Rating">
        {RATING_BANDS.map((r) => (
          <Chip key={r.id} active={filters.rating === r.id} onClick={() => setOne("rating", r.id)}>
            {r.label}
          </Chip>
        ))}
      </Group>

      <Group title="Format">
        {ALL_FORMATS.map((f) => (
          <Chip key={f} active={filters.formats.includes(f)} onClick={() => toggleIn("formats", f)}>
            {f}
          </Chip>
        ))}
      </Group>

      <Group title="Availability">
        {[
          { id: "in-stock", label: "In stock" },
          { id: "last-copies", label: "Last copies" },
        ].map((a) => (
          <Chip key={a.id} active={filters.availability === a.id} onClick={() => setOne("availability", a.id)}>
            {a.label}
          </Chip>
        ))}
      </Group>

      <Group title="Language">
        <Chip active={filters.language === "English"} onClick={() => setOne("language", "English")}>
          English
        </Chip>
      </Group>

      <button
        type="button"
        onClick={() => setFilters(emptyFilters)}
        className="u-label mt-4 border-t border-[var(--line)] pt-6 text-[var(--accent)] underline underline-offset-4">
        Reset everything
      </button>
    </div>
  );
}

/** Bottom sheet for touch, side panel for anything narrow. */
export function FilterSheet({ open, onClose, filters, setFilters, resultCount }) {
  useLockBodyScroll(open);
  useOnKey("Escape", onClose, open);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[82] lg:hidden">
          <motion.button
            type="button"
            aria-label="Close filters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-[rgba(21,18,14,0.4)]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: EASE.drawer }}
            className="absolute inset-x-0 bottom-0 max-h-[86vh] overflow-y-auto bg-[var(--paper)] pb-8">
            <div className="sticky top-0 flex items-center justify-between border-b border-[var(--line)] bg-[var(--paper)] px-5 py-4">
              <span className="u-serif text-2xl">Filter</span>
              <button type="button" onClick={onClose} aria-label="Close filters" className="p-2">
                <X size={20} strokeWidth={1.3} />
              </button>
            </div>
            <div className="px-5 pt-2">
              <FilterForm filters={filters} setFilters={setFilters} />
            </div>
            <div className="sticky bottom-0 border-t border-[var(--line)] bg-[var(--paper)] px-5 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="u-label h-12 w-full bg-[var(--ink)] text-[var(--paper)]">
                Show {resultCount} {resultCount === 1 ? "book" : "books"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
