import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GENRES } from "../data/genres";
import { STAFF_PICKS, booksByGenre } from "../data/books";
import { BookCover } from "./BookCover";
import { Eyebrow } from "./ui/Bits";
import { EASE } from "../lib/motion";

/** The Genres panel. Hovering a genre swaps the jacket on the right. */
export default function MegaMenu({ open, onClose }) {
  const [active, setActive] = useState(GENRES[0].slug);
  const preview = booksByGenre(active)[0] || STAFF_PICKS[0];
  const genre = GENRES.find((g) => g.slug === active);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: EASE.editorial }}
          className="absolute inset-x-0 top-full hidden border-y border-[var(--line)] bg-[var(--paper)] lg:block"
          onMouseLeave={onClose}>
          <div className="u-gutter grid grid-cols-12 gap-10 py-12">
            <div className="col-span-7 grid grid-cols-3 gap-x-8 gap-y-1">
              <Eyebrow className="col-span-3 mb-4">All genres</Eyebrow>
              {GENRES.map((g, i) => (
                <Link
                  key={g.slug}
                  to={`/genres/${g.slug}`}
                  onMouseEnter={() => setActive(g.slug)}
                  onFocus={() => setActive(g.slug)}
                  onClick={onClose}
                  data-cursor="point"
                  className="group flex items-baseline gap-3 py-2 transition-colors">
                  <span className="u-meta w-6 shrink-0 text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`u-serif text-2xl leading-none transition-all duration-500 ease-editorial ${
                      active === g.slug ? "translate-x-1 text-[var(--ink)]" : "text-[var(--ink-muted)]"
                    }`}>
                    {g.name}
                  </span>
                </Link>
              ))}
            </div>

            <div className="col-span-2 flex flex-col justify-end border-l border-[var(--line)] pl-8">
              <p className="u-serif text-3xl leading-[1.05]">{genre?.tagline}</p>
              <p className="mt-4 text-[13px] leading-relaxed text-[var(--ink-muted)]">{genre?.blurb}</p>
              <Link
                to={`/genres/${active}`}
                onClick={onClose}
                className="u-label mt-6 inline-flex items-center gap-2 text-[var(--accent)]"
                data-cursor="point">
                Browse {genre?.name} <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="col-span-3 border-l border-[var(--line)] pl-8">
              <Eyebrow className="mb-4">On the front table</Eyebrow>
              <AnimatePresence mode="wait">
                <motion.div
                  key={preview?.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE.editorial }}
                  className="flex items-end gap-5">
                  <Link
                    to={`/books/${preview?.slug}`}
                    onClick={onClose}
                    className="w-[104px] shrink-0"
                    data-cursor="book"
                    aria-label={`View ${preview?.title}`}>
                    <BookCover book={preview} />
                  </Link>
                  <div>
                    <h4 className="u-serif text-xl leading-tight">{preview?.title}</h4>
                    <p className="mt-1 text-[12px] text-[var(--ink-muted)]">{preview?.author}</p>
                    <p className="mt-3 text-[12px] italic leading-snug text-[var(--ink-soft)]">{preview?.hook}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
