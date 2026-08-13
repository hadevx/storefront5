import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BookCover, BookSpine, spineWidth } from "../components/BookCover";
import { RevealLines } from "../components/ui/Reveal";
import { SectionMark, Rating } from "../components/ui/Bits";
import Button from "../components/ui/Button";
import { useShop } from "../context/ShopProvider";
import { BOOKS } from "../data/books";
import { hash, formatPrice } from "../lib/utils";
import { EASE } from "../lib/motion";

/* A deliberately mixed shelf — the way a real one looks. */
const SHELF = BOOKS.filter((b) => b.staffPick || b.bestseller).slice(0, 16);

export default function Bookshelf() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(null);
  const reduce = useReducedMotion();
  const coverRef = useRef(null);
  const { addToBag, toggleWishlist, inWishlist } = useShop();
  const book = SHELF[selected];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="shelf-experience-heading">
      <div className="u-gutter">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-[var(--line)] pb-8">
          <div>
            <SectionMark index="06" label="The bookshelf" />
            <RevealLines
              as="h2"
              id="shelf-experience-heading"
              lines={["Pull one out.", "Have a look."]}
              className="t-h2 mt-6"
            />
          </div>
          <p className="max-w-[34ch] text-[14px] leading-relaxed text-[var(--ink-muted)]">
            Sixteen spines from the front room. Select one and it comes off the shelf, opened.
          </p>
        </div>

        {/* ---------- reading table ---------- */}
        <div className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={book.slug}
                ref={coverRef}
                initial={{ opacity: 0, y: 30, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: -2.5 }}
                exit={{ opacity: 0, y: -20, rotate: 3 }}
                transition={{ duration: 0.5, ease: EASE.editorial }}
                className="mx-auto w-[56%] sm:w-[38%] lg:w-[86%]">
                <BookCover book={book} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={book.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE.editorial }}>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="u-label text-[var(--accent)]">{book.genre}</span>
                  <span className="h-px w-10 bg-[var(--line-strong)]" />
                  <span className="u-meta">
                    {book.year} · {book.pages} pages
                  </span>
                </div>

                <h3 className="t-h2 mt-5 max-w-[16ch] text-balance">{book.title}</h3>
                <Link
                  to={`/authors/${book.authorSlug}`}
                  className="link-draw u-serif mt-3 inline-block text-xl italic text-[var(--ink-soft)]"
                  data-cursor="point">
                  {book.author}
                </Link>

                <p className="mt-6 max-w-[54ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                  {book.description}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-6">
                  <Rating value={book.rating} reviews={book.reviews} />
                  <span className="u-serif text-2xl tabular-nums">{formatPrice(book.price)}</span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button onClick={() => addToBag(book, { origin: coverRef.current?.getBoundingClientRect() })}>
                    Add to bag
                  </Button>
                  <Button variant="outline" onClick={() => toggleWishlist(book)}>
                    {inWishlist(book.slug) ? "Saved" : "Save for later"}
                  </Button>
                  <Link
                    to={`/books/${book.slug}`}
                    className="link-draw u-label ml-2 flex items-center gap-2"
                    data-cursor="point">
                    Full details <ArrowUpRight size={13} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ---------- the shelf itself ---------- */}
      <div className="relative mt-4">
        <div
          className="no-scrollbar flex items-end gap-[3px] overflow-x-auto px-[var(--gutter)] pb-0 pt-14"
          role="listbox"
          aria-label="Books on the shelf"
          aria-activedescendant={`spine-${book.slug}`}>
          {SHELF.map((b, i) => {
            const isSelected = selected === i;
            const isHovered = hovered === i;
            const height = 190 + (hash(b.slug) % 46);
            return (
              <motion.button
                key={b.slug}
                id={`spine-${b.slug}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                data-cursor="shelf"
                onClick={() => setSelected(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="relative shrink-0 origin-bottom"
                style={{ width: spineWidth(b), height }}
                animate={
                  reduce
                    ? {}
                    : {
                        y: isSelected ? -26 : isHovered ? -12 : 0,
                        rotate: isSelected ? -1.5 : 0,
                        filter: isSelected || hovered == null ? "saturate(1)" : "saturate(0.75)",
                      }
                }
                transition={{ duration: 0.5, ease: EASE.editorial }}
                title={`${b.title} — ${b.author}`}>
                <BookSpine book={b} className="h-full w-full" />
                {isSelected && (
                  <motion.span
                    layoutId="shelf-marker"
                    className="absolute -bottom-6 left-1/2 h-3 w-px -translate-x-1/2 bg-[var(--accent)]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* the shelf board */}
        <div className="relative mx-[calc(var(--gutter)-1rem)] h-[10px] bg-[var(--ink)] opacity-90" />
        <div className="mx-[calc(var(--gutter)-1rem)] h-6 bg-gradient-to-b from-[rgba(21,18,14,0.16)] to-transparent" />

        <div className="u-gutter mt-6 flex items-center justify-between">
          <span className="u-meta">Front room · shelf 03</span>
          <span className="u-meta">
            {String(selected + 1).padStart(2, "0")} / {String(SHELF.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
