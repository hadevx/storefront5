import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { BookObject } from "../components/BookCover";
import { RevealLines, Reveal } from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import { Rating, Eyebrow } from "../components/ui/Bits";
import { useShop } from "../context/ShopProvider";
import { FEATURED_BOOK } from "../data/books";
import { formatPrice } from "../lib/utils";
import { EASE } from "../lib/motion";

export default function FeaturedBook({ book = FEATURED_BOOK }) {
  const ref = useRef(null);
  const coverRef = useRef(null);
  const reduce = useReducedMotion();
  const { addToBag } = useShop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const coverY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="on-ink relative overflow-hidden py-24 lg:py-36" aria-labelledby="featured-heading">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-25" />

      {/* a slow wash of accent light behind the jacket */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduce ? 0 : glowY }}
        className="pointer-events-none absolute -left-24 top-1/4 h-[36rem] w-[36rem] rounded-full opacity-[0.16] blur-[120px]"
        // single soft light source, not a gradient blob
      >
        <div className="h-full w-full rounded-full bg-[var(--accent)]" />
      </motion.div>

      <div className="u-gutter relative grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* vertical section mark */}
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full items-start pr-1 lg:flex">
          <span className="writing-vertical u-label pt-2 text-[var(--ink-muted)]">01 / Featured</span>
        </div>

        <motion.div
          className="relative mx-auto w-[64%] max-w-[22rem] sm:w-[46%] lg:col-span-5 lg:w-full lg:max-w-[26rem]"
          style={{ y: reduce ? 0 : coverY }}>
          <motion.div
            initial={{ opacity: 0, rotate: -8, y: 40 }}
            whileInView={{ opacity: 1, rotate: -3.5, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: EASE.editorial }}>
            <div ref={coverRef}>
              <Link to={`/books/${book.slug}`} data-cursor="book" aria-label={book.title}>
                <BookObject book={book} />
              </Link>
            </div>
          </motion.div>

          {/* jacket credit */}
          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--line-strong)]" />
            <span className="u-meta">
              {book.publisher} · {book.pages} pages
            </span>
          </div>
        </motion.div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow accent>Book of the month</Eyebrow>

          <RevealLines
            as="h2"
            id="featured-heading"
            lines={book.title.split(" ").length > 3 ? [book.title] : book.title.split(" ")}
            className="t-h1 mt-6"
            delay={0.05}
          />

          <Reveal delay={0.15} className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to={`/authors/${book.authorSlug}`} className="link-draw u-serif text-xl italic" data-cursor="point">
              {book.author}
            </Link>
            <Rating value={book.rating} reviews={book.reviews} />
          </Reveal>

          <Reveal delay={0.2}>
            <blockquote className="mt-10 border-l border-[var(--accent)] pl-6">
              <p className="u-serif text-[clamp(1.4rem,2.4vw,2.1rem)] italic leading-[1.25] text-[var(--ink)]">
                “{book.hook}”
              </p>
            </blockquote>
            <p className="mt-7 max-w-[52ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">{book.description}</p>
          </Reveal>

          <Reveal delay={0.28} className="mt-10 flex flex-wrap items-center gap-5">
            <span className="u-serif text-3xl tabular-nums">{formatPrice(book.price)}</span>
            <Button
              variant="accent"
              onClick={() => addToBag(book, { origin: coverRef.current?.getBoundingClientRect() })}>
              Add to bag
            </Button>
            <Button to={`/books/${book.slug}`} variant="outline">
              Discover book
            </Button>
          </Reveal>

          <Reveal
            as="dl"
            delay={0.34}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[var(--line)] pt-8 sm:grid-cols-4">
            {[
              ["Genre", book.genre],
              ["Published", String(book.year)],
              ["Format", book.format],
              ["In stock", `${book.stock} copies`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="u-meta">{k}</dt>
                <dd className="mt-1.5 font-sans text-[14px] text-[var(--ink)]">{v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
