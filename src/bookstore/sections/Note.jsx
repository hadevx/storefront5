import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Marquee } from "../components/ui/Bits";
import { RevealWords } from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import { BookCover } from "../components/BookCover";
import { BOOKS } from "../data/books";
import { EASE } from "../lib/motion";

const LINES = [
  "Your next chapter starts here",
  "Some books are read, others become part of you",
  "Ask a bookseller",
  "Read what you want, finish what you love",
];

const flank = [BOOKS.find((b) => b.title === "Ariel"), BOOKS.find((b) => b.title === "Meditations")].filter(Boolean);

/** A quiet beat before the footer. Two jackets, one sentence. */
export default function Note() {
  const reduce = useReducedMotion();

  return (
    <>
      <div className="border-y border-[var(--line)] bg-[var(--paper-deep)] text-[var(--ink-soft)]">
        <Marquee items={LINES} speed={64} separator="—" />
      </div>

      <section className="relative overflow-hidden py-28 lg:py-40" aria-label="A note from the counter">
        <div className="u-gutter relative flex flex-col items-center text-center">
          {/* flanking jackets, floating slowly */}
          {flank[0] && (
            <motion.div
              className="pointer-events-none absolute left-[2%] top-6 hidden w-[9rem] lg:block xl:w-[11rem]"
              initial={{ opacity: 0, y: 30, rotate: -12 }}
              whileInView={{ opacity: 1, y: 0, rotate: -9 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE.editorial }}>
              <div className={reduce ? "" : "animate-floaty"}>
                <BookCover book={flank[0]} />
              </div>
            </motion.div>
          )}
          {flank[1] && (
            <motion.div
              className="pointer-events-none absolute right-[3%] top-24 hidden w-[8rem] lg:block xl:w-[10rem]"
              initial={{ opacity: 0, y: 30, rotate: 12 }}
              whileInView={{ opacity: 1, y: 0, rotate: 8 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE.editorial, delay: 0.12 }}>
              <div className={reduce ? "" : "animate-floaty"} style={{ animationDelay: "-3s" }}>
                <BookCover book={flank[1]} />
              </div>
            </motion.div>
          )}

          <span className="u-label text-[var(--accent)]">From the counter</span>

          <RevealWords
            text="Find the story you didn't know you needed."
            className="t-h1 mt-8 max-w-[14ch] text-balance"
          />

          <p className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-[var(--ink-muted)]">
            Tell us the last book you loved and we will find the next one. In the shop, by email, or in the letter we
            send on the first Thursday of every month.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button to="/books" size="lg">
              Explore books
            </Button>
            <Link to="/collections" className="link-draw u-label py-4 text-[var(--ink-soft)]" data-cursor="point">
              Browse collections
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
