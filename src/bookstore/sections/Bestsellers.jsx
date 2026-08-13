import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BookCover } from "../components/BookCover";
import { RevealLines } from "../components/ui/Reveal";
import { SectionMark } from "../components/ui/Bits";
import { BESTSELLERS } from "../data/books";
import { formatPrice } from "../lib/utils";
import { EASE } from "../lib/motion";

/**
 * The chart. Typography does the ranking work; the jacket only appears for
 * the row you are looking at.
 */
export default function Bestsellers() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const book = BESTSELLERS[active];

  return (
    <section className="on-ink relative overflow-hidden py-24 lg:py-32" aria-labelledby="chart-heading">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-20" />

      <div className="u-gutter relative">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-[var(--line)] pb-8">
          <div>
            <SectionMark index="05" label="The chart" />
            <RevealLines as="h2" id="chart-heading" lines={["What everyone", "is reading."]} className="t-h2 mt-6" />
          </div>
          <p className="max-w-[32ch] text-[14px] leading-relaxed text-[var(--ink-muted)]">
            Counted at our own till, week ending Friday. No sponsored placements.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* ranking */}
          <ol className="lg:col-span-8">
            {BESTSELLERS.map((b, i) => {
              const isActive = active === i;
              return (
                <li key={b.slug}>
                  <Link
                    to={`/books/${b.slug}`}
                    data-cursor="book"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-[var(--line)] py-5 sm:gap-8 sm:py-6">
                    <motion.span
                      className="u-serif w-[2.2ch] text-[clamp(2rem,4.4vw,3.6rem)] leading-none tabular-nums"
                      animate={{
                        color: isActive ? "var(--accent)" : "var(--ink)",
                        opacity: isActive ? 1 : 0.35,
                      }}
                      transition={{ duration: 0.4 }}>
                      {String(b.rank).padStart(2, "0")}
                    </motion.span>

                    <div className="min-w-0">
                      <motion.h3
                        className="u-serif truncate text-[clamp(1.15rem,2.6vw,2rem)] leading-tight"
                        animate={reduce ? {} : { x: isActive ? 12 : 0 }}
                        transition={{ duration: 0.5, ease: EASE.editorial }}>
                        {b.title}
                      </motion.h3>
                      <motion.p
                        className="mt-1 text-[13px] text-[var(--ink-muted)]"
                        animate={reduce ? {} : { x: isActive ? 12 : 0 }}
                        transition={{ duration: 0.5, ease: EASE.editorial }}>
                        {b.author}
                      </motion.p>
                    </div>

                    {/* jacket appears inline on small screens */}
                    <span className="w-11 shrink-0 lg:hidden">
                      <BookCover book={b} />
                    </span>
                    <span className="u-meta hidden shrink-0 tabular-nums lg:block">{formatPrice(b.price)}</span>
                  </Link>
                </li>
              );
            })}
          </ol>

          {/* sticky preview */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28 pt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={book.slug}
                  initial={{ opacity: 0, y: 24, rotate: -3 }}
                  animate={{ opacity: 1, y: 0, rotate: -2 }}
                  exit={{ opacity: 0, y: -16, rotate: 1 }}
                  transition={{ duration: 0.45, ease: EASE.editorial }}>
                  <div className="w-[74%]">
                    <BookCover book={book} />
                  </div>
                  <p className="u-label mt-8 text-[var(--accent)]">No. {String(book.rank).padStart(2, "0")}</p>
                  <p className="u-serif mt-3 text-2xl leading-tight">{book.title}</p>
                  <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">{book.hook}</p>
                  <p className="u-meta mt-6">
                    {book.genre} · {book.pages} pages · {formatPrice(book.price)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
