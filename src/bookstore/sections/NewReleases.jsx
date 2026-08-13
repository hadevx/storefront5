import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BookObject } from "../components/BookCover";
import { RevealLines } from "../components/ui/Reveal";
import { SectionMark } from "../components/ui/Bits";
import { NEW_RELEASES } from "../data/books";
import { useScrollRail } from "../hooks";
import { formatShortDate, formatPrice, cn } from "../lib/utils";
import { EASE } from "../lib/motion";

/** Horizontal rail. Wheel gestures over the rail translate to horizontal. */
export default function NewReleases() {
  const { ref, progress, scrollBy } = useScrollRail();

  /* Vertical wheel over the rail becomes horizontal travel — but only while
     there is rail left to travel, so the page never feels trapped. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft >= max - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [ref]);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" aria-labelledby="new-heading">
      <div className="u-gutter">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-[var(--line)] pb-8">
          <div>
            <SectionMark index="04" label="Just published" />
            <RevealLines as="h2" id="new-heading" lines={["Fresh off", "the press."]} className="t-h2 mt-6" />
          </div>

          <div className="flex items-center gap-6">
            <p className="u-meta hidden max-w-[26ch] sm:block">
              {NEW_RELEASES.length} titles landed this season. Drag, swipe or scroll.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous books"
                className="flex h-11 w-11 items-center justify-center border border-[var(--line-strong)] transition-colors hover:border-[var(--ink)]">
                <ArrowLeft size={16} strokeWidth={1.4} />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next books"
                className="flex h-11 w-11 items-center justify-center border border-[var(--line-strong)] transition-colors hover:border-[var(--ink)]">
                <ArrowRight size={16} strokeWidth={1.4} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        data-cursor="drag"
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-[var(--gutter)] pb-4 lg:gap-12"
        role="region"
        aria-label="New releases carousel"
        tabIndex={0}>
        {NEW_RELEASES.map((book, i) => (
          <motion.article
            key={book.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: EASE.editorial, delay: (i % 4) * 0.06 }}
            className={cn(
              "group w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-[21vw] xl:w-[17vw]",
              i % 2 === 1 && "lg:mt-16",
            )}>
            <Link to={`/books/${book.slug}`} data-cursor="book" className="block">
              <div className="transition-transform duration-700 ease-editorial group-hover:-translate-y-2">
                <BookObject book={book} tilt={i % 2 ? 1.5 : -1.5} />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-[var(--line)] pt-3">
                <span className="u-meta text-[var(--accent)]">{formatShortDate(book.published)}</span>
                <span className="u-meta tabular-nums">{formatPrice(book.price)}</span>
              </div>
              <h3 className="u-serif mt-3 text-xl leading-tight">{book.title}</h3>
              <p className="mt-1 text-[13px] text-[var(--ink-muted)]">{book.author}</p>
            </Link>
          </motion.article>
        ))}

        {/* end plate */}
        <div className="flex w-[52vw] shrink-0 items-center sm:w-[30vw] lg:w-[18vw]">
          <Link to="/new" className="group" data-cursor="point">
            <span className="u-serif text-3xl leading-tight">
              See all
              <br />
              new releases
            </span>
            <span className="mt-4 flex h-11 w-11 items-center justify-center border border-[var(--line-strong)] transition-transform duration-500 ease-editorial group-hover:translate-x-2">
              <ArrowRight size={16} strokeWidth={1.4} />
            </span>
          </Link>
        </div>
      </div>

      {/* rail progress */}
      <div className="u-gutter mt-8">
        <div className="h-px w-full bg-[var(--line)]">
          <div
            className="h-full bg-[var(--accent)] transition-[width] duration-200 ease-linear"
            style={{ width: `${Math.max(6, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
