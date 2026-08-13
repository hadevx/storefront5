import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { BookObject } from "../components/BookCover";
import { RevealLines } from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import { Magnetic } from "../components/ui/Bits";
import { FEATURED_BOOK, STAFF_PICKS, BOOKS } from "../data/books";
import { EASE } from "../lib/motion";
import { cn } from "../lib/utils";

const byTitle = (t) => BOOKS.find((b) => b.title === t);

/** The five jackets, arranged the way a window display is arranged. */
const COMPOSITION = [
  { book: FEATURED_BOOK, left: "13%", top: "5%", width: "41%", rotate: -4, z: 30, depth: 1 },
  { book: byTitle("Piranesi") || STAFF_PICKS[0], left: "52%", top: "1%", width: "30%", rotate: 5, z: 20, depth: 0.55 },
  { book: byTitle("Devotions") || STAFF_PICKS[1], left: "0%", top: "50%", width: "26%", rotate: 7, z: 26, depth: 1.5 },
  { book: byTitle("Circe") || STAFF_PICKS[2], left: "56%", top: "45%", width: "33%", rotate: -6, z: 24, depth: 0.9 },
  { book: byTitle("Tokyo Express") || STAFF_PICKS[3], left: "31%", top: "67%", width: "21%", rotate: 2.5, z: 18, depth: 1.9 },
];

function FloatingCover({ item, mx, my, scrollY, reduce, index }) {
  const x = useTransform(mx, (v) => v * 34 * item.depth);
  const y = useTransform(my, (v) => v * 26 * item.depth);
  const drift = useTransform(scrollY, [0, 1], [0, -70 * item.depth]);
  const yCombined = useTransform([y, drift], ([a, b]) => a + b);

  return (
    <motion.div
      className="absolute"
      style={{
        left: item.left,
        top: item.top,
        width: item.width,
        zIndex: item.z,
        x: reduce ? 0 : x,
        y: reduce ? 0 : yCombined,
      }}
      initial={{ opacity: 0, y: 60, rotate: item.rotate * 2.4, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, rotate: item.rotate, scale: 1 }}
      transition={{ duration: 1.25, ease: EASE.editorial, delay: 0.35 + index * 0.11 }}>
      <Link to={`/books/${item.book.slug}`} data-cursor="book" className="block" aria-label={item.book.title}>
        <BookObject book={item.book} tilt={item.rotate} />
      </Link>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.8 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.8 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const typeY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const onPointerMove = (e) => {
    if (reduce) return;
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      className="relative overflow-hidden pb-16 pt-[calc(var(--nav-h)+2rem)] lg:pb-24 lg:pt-[calc(var(--nav-h)+3.5rem)]"
      aria-label="Featured">
      {/* hairline column guides, barely there */}
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-full opacity-60 lg:block" aria-hidden="true">
        <div className="u-gutter h-full">
          <div className="col-guides h-full w-full" />
        </div>
      </div>

      <div className="u-gutter relative grid grid-cols-1 items-center gap-y-14 lg:grid-cols-12 lg:gap-x-10">
        {/* ---------------- type side ---------------- */}
        <motion.div className="lg:col-span-6 xl:col-span-5" style={{ y: reduce ? 0 : typeY, opacity: typeOpacity }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-4">
            <span className="u-label text-[var(--accent)]">The art of reading</span>
            <span className="h-px w-16 bg-[var(--line-strong)]" />
            <span className="u-meta">No. 01</span>
          </motion.div>

          <RevealLines
            as="h1"
            lines={["Stories", "that stay", "with you."]}
            className="t-display mt-7 text-[var(--ink)]"
            delay={0.15}
            stagger={0.09}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE.editorial }}
            className="t-lede mt-8 max-w-[46ch]">
            Books that challenge your thinking, expand your imagination, and quietly become part of your own story.
            Chosen by seven booksellers who read for a living.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE.editorial }}
            className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button to="/books" size="lg">
                Explore books
              </Button>
            </Magnetic>
            <Link
              to="/collections"
              data-cursor="point"
              className="link-draw u-label flex items-center gap-2 py-4 text-[var(--ink-soft)]">
              View collection <ArrowUpRight size={14} strokeWidth={1.6} />
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.15 }}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-[var(--line)] pt-6">
            {[
              ["11,000", "titles in store"],
              ["7", "booksellers"],
              ["1994", "since"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="u-serif text-2xl leading-none">{value}</dt>
                <dd className="u-meta mt-1.5">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------------- display side ---------------- */}
        <div className="relative lg:col-span-6 lg:col-start-7 xl:col-span-7">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[32rem] sm:max-w-[36rem] lg:aspect-square lg:max-w-none">
            {COMPOSITION.map((item, i) => (
              <FloatingCover
                key={item.book.slug}
                item={item}
                index={i}
                mx={mx}
                my={my}
                scrollY={scrollYProgress}
                reduce={reduce}
              />
            ))}
          </div>

          {/* caption, set like a gallery label */}
          <motion.figcaption
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-8 flex items-start gap-4 border-t border-[var(--line)] pt-4 lg:ml-auto lg:max-w-[22rem]">
            <span className="u-label text-[var(--accent)]">Window display</span>
            <p className="text-[12px] leading-relaxed text-[var(--ink-muted)]">
              This week: {FEATURED_BOOK.title}, {FEATURED_BOOK.author}. Five jackets from the front table — move your
              cursor to look closer.
            </p>
          </motion.figcaption>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className={cn("u-gutter mt-14 flex items-center gap-3 lg:mt-6")}>
        <ArrowDown size={14} strokeWidth={1.4} className="text-[var(--accent)]" />
        <span className="u-meta">Scroll — 01 / 08</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
      </motion.div>
    </section>
  );
}
