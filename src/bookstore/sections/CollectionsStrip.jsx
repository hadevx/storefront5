import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BookCover } from "../components/BookCover";
import { RevealLines } from "../components/ui/Reveal";
import { SectionMark } from "../components/ui/Bits";
import { COLLECTIONS_WITH_BOOKS } from "../data/collections";
import { getPalette } from "../lib/covers";
import { EASE } from "../lib/motion";
import { cn } from "../lib/utils";

/** Six curated shelves. Each row takes on its own colour when hovered. */
export default function CollectionsStrip() {
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();

  return (
    <section className="relative py-24 lg:py-32" aria-labelledby="collections-heading">
      <div className="u-gutter">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-[var(--line)] pb-8">
          <div>
            <SectionMark index="07" label="Curated" />
            <RevealLines
              as="h2"
              id="collections-heading"
              lines={["Shelves with", "a point of view."]}
              className="t-h2 mt-6"
            />
          </div>
          <Link to="/collections" className="link-draw u-label flex items-center gap-2 pb-2" data-cursor="point">
            All collections <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div>
        {COLLECTIONS_WITH_BOOKS.map((c, i) => {
          const pal = getPalette(c.palette);
          const isActive = active === i;
          return (
            <motion.div
              key={c.slug}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              animate={{
                backgroundColor: isActive ? pal.bg : "rgba(0,0,0,0)",
                color: isActive ? pal.fg : "var(--ink)",
              }}
              transition={{ duration: 0.6, ease: EASE.editorial }}
              className="border-b border-[var(--line)]">
              <Link
                to={`/collections/${c.slug}`}
                data-cursor="point"
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="u-gutter flex items-center gap-6 py-8 lg:py-10">
                <span className="u-label w-8 shrink-0 opacity-70">{c.number}</span>

                <div className="min-w-0 flex-1">
                  <motion.h3
                    className="u-serif text-[clamp(1.6rem,4.4vw,3.2rem)] leading-[1]"
                    animate={reduce ? {} : { x: isActive ? 16 : 0 }}
                    transition={{ duration: 0.55, ease: EASE.editorial }}>
                    {c.title}
                  </motion.h3>
                  <motion.p
                    className="mt-2 max-w-[52ch] text-[13px] leading-relaxed opacity-70"
                    animate={reduce ? {} : { x: isActive ? 16 : 0 }}
                    transition={{ duration: 0.55, ease: EASE.editorial, delay: 0.02 }}>
                    {c.tagline}
                  </motion.p>
                </div>

                {/* stacked jackets, fanned on hover */}
                <div className="hidden h-[112px] w-[224px] shrink-0 sm:block">
                  <div className="relative h-full w-full">
                    {c.books.slice(0, 3).map((b, j) => (
                      <motion.div
                        key={b.slug}
                        className="absolute bottom-0 w-[72px]"
                        style={{ left: j * 58, zIndex: 3 - j }}
                        animate={
                          reduce
                            ? {}
                            : {
                                y: isActive ? -8 - j * 4 : 0,
                                rotate: isActive ? (j - 1) * 6 : (j - 1) * 2,
                                x: isActive ? j * 12 : 0,
                              }
                        }
                        transition={{ duration: 0.6, ease: EASE.editorial, delay: j * 0.04 }}>
                        <BookCover book={b} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <span
                  className={cn(
                    "u-meta hidden w-24 shrink-0 text-right tabular-nums opacity-70 lg:block",
                  )}>
                  {String(c.books.length).padStart(2, "0")} books
                </span>

                <motion.span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current"
                  animate={reduce ? {} : { rotate: isActive ? 45 : 0, scale: isActive ? 1.06 : 1 }}
                  transition={{ duration: 0.5, ease: EASE.editorial }}>
                  <ArrowUpRight size={16} strokeWidth={1.4} />
                </motion.span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
