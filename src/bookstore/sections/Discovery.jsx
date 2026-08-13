import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BookCover } from "../components/BookCover";
import { RevealLines } from "../components/ui/Reveal";
import { SectionMark } from "../components/ui/Bits";
import { booksByGenre } from "../data/books";
import { GENRES } from "../data/genres";
import { getPalette } from "../lib/covers";
import { EASE } from "../lib/motion";

const FEATURED_GENRES = [
  "fiction",
  "psychology",
  "business",
  "philosophy",
  "science",
  "history",
].map((slug) => GENRES.find((g) => g.slug === slug));

/**
 * Category discovery. Hovering a line pulls the relevant jacket to the
 * cursor and warms the whole section toward that book's palette.
 */
export default function Discovery() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.5 });

  const activeGenre = FEATURED_GENRES[active ?? 0];
  const preview = activeGenre ? booksByGenre(activeGenre.slug)[0] : null;
  const pal = preview ? getPalette(preview.cover?.palette) : null;

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set(e.clientX - r.left);
    rawY.set(e.clientY - r.top);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative overflow-hidden py-24 transition-colors duration-[900ms] ease-editorial lg:py-32"
      style={{ backgroundColor: active != null && pal ? `${pal.bg}22` : "transparent" }}
      aria-labelledby="discovery-heading">
      <div className="u-gutter relative">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--line)] pb-8">
          <div>
            <SectionMark index="02" label="Discovery" />
            <RevealLines
              as="h2"
              id="discovery-heading"
              lines={["Find your next", "obsession."]}
              className="t-h2 mt-6"
            />
          </div>
          <Link to="/genres" data-cursor="point" className="link-draw u-label flex items-center gap-2 pb-2">
            All genres <ArrowUpRight size={14} />
          </Link>
        </div>

        <ul className="relative">
          {FEATURED_GENRES.map((g, i) => {
            const isActive = active === i;
            return (
              <li key={g.slug}>
                <Link
                  to={`/genres/${g.slug}`}
                  data-cursor="point"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="group flex items-center gap-5 border-b border-[var(--line)] py-6 sm:gap-10 sm:py-8">
                  <motion.span
                    className="u-label w-8 shrink-0 tabular-nums"
                    animate={{ color: isActive ? "var(--accent)" : "var(--ink-muted)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>

                  <motion.span
                    className="u-serif flex-1 text-[clamp(1.9rem,6vw,4.4rem)] leading-[0.95] transition-[font-style]"
                    style={{ fontStyle: isActive ? "italic" : "normal" }}
                    animate={
                      reduce
                        ? {}
                        : { x: isActive ? 22 : 0, opacity: active == null || isActive ? 1 : 0.34 }
                    }
                    transition={{ duration: 0.6, ease: EASE.editorial }}>
                    {g.name}
                  </motion.span>

                  {/* mobile jacket — no cursor to follow on touch */}
                  <span className="w-12 shrink-0 lg:hidden">
                    <BookCover book={booksByGenre(g.slug)[0]} />
                  </span>

                  <motion.span
                    className="u-serif hidden max-w-[26ch] text-right text-[15px] italic leading-snug lg:block"
                    animate={{ opacity: isActive ? 1 : 0.4, x: isActive ? 0 : 8 }}
                    transition={{ duration: 0.45, ease: EASE.editorial }}>
                    {g.tagline}
                  </motion.span>

                  <span className="u-meta hidden w-[5.5rem] shrink-0 whitespace-nowrap text-right tabular-nums sm:block">
                    {String(booksByGenre(g.slug).length).padStart(2, "0")} titles
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* the jacket that follows the cursor */}
        <AnimatePresence>
          {active != null && preview && !reduce && (
            <motion.div
              key={preview.slug}
              className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
              style={{ x, y }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE.editorial }}>
              <motion.div
                className="w-[13rem]"
                style={{ translateX: "-50%", translateY: "-50%" }}
                initial={{ scale: 0.86, rotate: -9 }}
                animate={{ scale: 1, rotate: -4 }}
                exit={{ scale: 0.92, rotate: 2 }}
                transition={{ duration: 0.5, ease: EASE.editorial }}>
                <BookCover book={preview} />
                <p className="u-meta mt-3 text-center">{preview.title}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
