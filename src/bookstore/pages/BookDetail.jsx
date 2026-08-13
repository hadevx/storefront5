import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Heart, Check, ArrowUpRight, Truck, BookOpen } from "lucide-react";
import { BookObject, BookCover } from "../components/BookCover";
import BookCard from "../components/BookCard";
import Button from "../components/ui/Button";
import { Rating, Eyebrow, Badge } from "../components/ui/Bits";
import { Reveal, RevealLines, DrawRule } from "../components/ui/Reveal";
import { bookBySlug, relatedBooks } from "../data/books";
import { authorBySlug } from "../data/authors";
import { useShop } from "../context/ShopProvider";
import { formatPrice, formatDate, cn } from "../lib/utils";
import { EASE } from "../lib/motion";
import NotFound from "./NotFound";

const SHELF_LABELS = {
  reading: "Currently reading",
  want: "Want to read",
  finished: "Finished",
};

export default function BookDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const book = bookBySlug(slug);
  const coverRef = useRef(null);
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const { addToBag, toggleWishlist, inWishlist, shelves, setShelf, markViewed } = useShop();
  const [format, setFormat] = useState(null);
  const [qty, setQty] = useState(1);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const coverY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    if (book) {
      setFormat(book.formats.find((f) => f.available)?.name || book.formats[0].name);
      setQty(1);
      markViewed(book.slug);
    }
  }, [book, markViewed]);

  if (!book) return <NotFound />;

  const author = authorBySlug(book.authorSlug);
  const related = relatedBooks(book, 4);
  const activeFormat = book.formats.find((f) => f.name === format) || book.formats[0];
  const saved = inWishlist(book.slug);
  const shelf = shelves[book.slug];

  const add = () => addToBag(book, { qty, format: activeFormat.name, origin: coverRef.current?.getBoundingClientRect() });
  const buyNow = () => {
    addToBag(book, { qty, format: activeFormat.name, silent: true });
    navigate("/checkout");
  };

  return (
    <article className="pb-32">
      {/* ---------------- purchase hero ---------------- */}
      <div ref={heroRef} className="u-gutter pt-[calc(var(--nav-h)+2.5rem)]">
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2">
          <Link to="/books" className="u-meta hover:text-[var(--ink)]" data-cursor="point">
            Books
          </Link>
          <span className="u-meta opacity-50">/</span>
          <Link to={`/genres/${book.genreSlug}`} className="u-meta hover:text-[var(--ink)]" data-cursor="point">
            {book.genre}
          </Link>
          <span className="u-meta opacity-50">/</span>
          <span className="u-meta">{book.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* jacket */}
          <div className="lg:col-span-5">
            <motion.div
              style={{ y: reduce ? 0 : coverY }}
              className="mx-auto w-[68%] max-w-[22rem] sm:w-[48%] lg:sticky lg:top-28 lg:w-full lg:max-w-none">
              <motion.div
                ref={coverRef}
                initial={{ opacity: 0, y: 30, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: -1.8 }}
                transition={{ duration: 1, ease: EASE.editorial }}>
                <BookObject book={book} />
              </motion.div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-x-5 gap-y-1 border-t border-[var(--line)] pt-4">
                <span className="u-meta whitespace-nowrap">{book.publisher}</span>
                <span className="u-meta whitespace-nowrap">{book.pages} pages</span>
                <span className="u-meta whitespace-nowrap">{book.language}</span>
              </div>
            </motion.div>
          </div>

          {/* purchase panel */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow accent>{book.genre}</Eyebrow>
              {book.newRelease && <Badge tone="accent">New</Badge>}
              {book.bestseller && <Badge>No. {book.rank ?? "—"} bestseller</Badge>}
              {book.staffPick && <Badge tone="muted">Staff pick</Badge>}
            </div>

            <RevealLines as="h1" lines={[book.title]} className="t-h1 mt-6" />
            {book.subtitle && <p className="u-serif mt-3 text-2xl italic text-[var(--ink-muted)]">{book.subtitle}</p>}

            <Reveal delay={0.1} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to={`/authors/${book.authorSlug}`}
                className="link-draw u-serif text-xl italic"
                data-cursor="point">
                {book.author}
              </Link>
              <Rating value={book.rating} reviews={book.reviews} />
            </Reveal>

            <Reveal delay={0.14}>
              <p className="u-serif mt-8 text-[clamp(1.3rem,2.1vw,1.75rem)] italic leading-[1.3] text-[var(--ink)]">
                “{book.hook}”
              </p>
            </Reveal>

            <DrawRule className="mt-10" />

            {/* format */}
            <div className="mt-8">
              <p className="u-label mb-4 text-[var(--ink-muted)]">Format</p>
              <div className="flex flex-wrap gap-2">
                {book.formats.map((f) => (
                  <button
                    key={f.name}
                    type="button"
                    disabled={!f.available}
                    onClick={() => setFormat(f.name)}
                    className={cn(
                      "flex flex-col items-start gap-1 border px-4 py-3 text-left transition-all duration-[400ms] ease-editorial",
                      f.name === format
                        ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                        : "border-[var(--line-strong)] hover:border-[var(--ink)]",
                      !f.available && "cursor-not-allowed opacity-40",
                    )}>
                    <span className="u-label">{f.name}</span>
                    <span className="font-sans text-[13px] tabular-nums">
                      {f.available ? formatPrice(f.price) : "Out of print"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* price + actions */}
            <div className="mt-10 flex flex-wrap items-end gap-6">
              <div>
                <p className="u-label text-[var(--ink-muted)]">Price</p>
                <p className="u-serif mt-2 text-4xl tabular-nums">{formatPrice(activeFormat.price)}</p>
              </div>
              <div>
                <p className="u-label text-[var(--ink-muted)]">Quantity</p>
                <div className="mt-2 flex items-center border border-[var(--line-strong)]">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="h-11 w-11 text-[var(--ink-soft)] hover:text-[var(--ink)]">
                    −
                  </button>
                  <span className="w-8 text-center text-[15px] tabular-nums">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(12, q + 1))}
                    aria-label="Increase quantity"
                    className="h-11 w-11 text-[var(--ink-soft)] hover:text-[var(--ink)]">
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={add} disabled={book.stock === 0}>
                Add to bag
              </Button>
              <Button size="lg" variant="outline" onClick={buyNow} disabled={book.stock === 0}>
                Buy now
              </Button>
              <button
                type="button"
                onClick={() => toggleWishlist(book)}
                aria-pressed={saved}
                data-cursor="point"
                className={cn(
                  "flex h-14 w-14 items-center justify-center border transition-colors",
                  saved
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[#FBF7F0]"
                    : "border-[var(--line-strong)] hover:border-[var(--ink)]",
                )}
                aria-label={saved ? "Remove from your list" : "Save to your list"}>
                <Heart size={18} strokeWidth={1.4} fill={saved ? "currentColor" : "none"} />
              </button>
            </div>

            {/* reading list */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="u-meta mr-2 flex items-center gap-2">
                <BookOpen size={13} /> Reading list
              </span>
              {Object.entries(SHELF_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setShelf(book, key)}
                  aria-pressed={shelf === key}
                  className={cn(
                    "u-label rounded-full border px-3 py-2 transition-colors",
                    shelf === key
                      ? "border-[var(--accent)] text-[var(--accent)]"
                      : "border-[var(--line-strong)] text-[var(--ink-muted)] hover:border-[var(--ink)]",
                  )}>
                  {shelf === key && <Check size={11} className="mr-1.5 inline" />}
                  {label}
                </button>
              ))}
            </div>

            <ul className="mt-10 space-y-2 border-t border-[var(--line)] pt-6">
              <li className="u-meta flex items-center gap-3">
                <Truck size={13} /> Free delivery on orders over KD 45 — dispatched next working day
              </li>
              <li className="u-meta flex items-center gap-3">
                <Check size={13} />{" "}
                {book.stock > 3 ? "In stock at Aldergate Lane" : `Only ${book.stock} copies left in store`}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ---------------- about ---------------- */}
      <section className="u-gutter mt-28 lg:mt-36" aria-labelledby="about-book">
        <div className="grid grid-cols-1 gap-10 border-t border-[var(--line)] pt-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 id="about-book" className="u-label text-[var(--ink-muted)]">
              About the book
            </h2>
            <span className="u-meta mt-3 block">01 / 04</span>
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal>
              <p className="u-serif text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.28] text-balance">
                {book.description}
              </p>
              <p className="mt-8 max-w-prose2 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                {book.author} wrote {book.title} for {book.publisher}, published {formatDate(book.published)}. Our
                copies are the {activeFormat.name.toLowerCase()} edition, {book.pages} pages, printed on uncoated
                paper. If you would like it wrapped in marbled paper, leave a note at checkout — there is no charge.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- why you'll love it ---------------- */}
      <section className="u-gutter mt-24" aria-labelledby="why-love">
        <div className="grid grid-cols-1 gap-10 border-t border-[var(--line)] pt-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 id="why-love" className="u-label text-[var(--ink-muted)]">
              Why you'll love it
            </h2>
            <span className="u-meta mt-3 block">02 / 04</span>
          </div>
          <ol className="grid gap-8 sm:grid-cols-3 lg:col-span-9">
            {book.whyLove.map((reason, i) => (
              <Reveal as="li" key={reason} delay={i * 0.08} className="border-t border-[var(--line)] pt-5">
                <span className="u-serif text-3xl text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">{reason}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- details ---------------- */}
      <section className="u-gutter mt-24" aria-labelledby="details">
        <div className="grid grid-cols-1 gap-10 border-t border-[var(--line)] pt-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 id="details" className="u-label text-[var(--ink-muted)]">
              Details
            </h2>
            <span className="u-meta mt-3 block">03 / 04</span>
          </div>
          <dl className="grid gap-x-12 gap-y-0 sm:grid-cols-2 lg:col-span-9">
            {[
              ["Pages", book.pages],
              ["Publisher", book.publisher],
              ["Published", formatDate(book.published)],
              ["Language", book.language],
              ["ISBN", book.isbn],
              ["Format", activeFormat.name],
              ["Genre", book.genre],
              ["In store", `${book.stock} copies`],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] py-4">
                <dt className="u-meta">{k}</dt>
                <dd className="font-sans text-[14px] text-[var(--ink)]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- praise ---------------- */}
      <section className="on-ink mt-28 py-24" aria-labelledby="praise">
        <div className="u-gutter">
          <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-6">
            <h2 id="praise" className="u-label text-[var(--ink-muted)]">
              Praise
            </h2>
            <span className="u-meta">04 / 04</span>
          </div>
          <div className="grid gap-12 pt-14 lg:grid-cols-3">
            {book.praise.map((p, i) => (
              <Reveal key={p.quote} delay={i * 0.08}>
                <blockquote>
                  <p className="u-serif text-[clamp(1.3rem,2vw,1.7rem)] italic leading-[1.32]">“{p.quote}”</p>
                  <footer className="u-meta mt-6">{p.source}</footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- author strip ---------------- */}
      {author && (
        <section className="u-gutter mt-24" aria-label={`About ${author.name}`}>
          <div className="grid grid-cols-1 items-center gap-10 border-t border-[var(--line)] pt-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>About the author</Eyebrow>
              <h2 className="t-h3 mt-4">{author.name}</h2>
              <p className="mt-5 max-w-prose2 text-[15px] leading-relaxed text-[var(--ink-soft)]">{author.bio[0]}</p>
              <Link
                to={`/authors/${author.slug}`}
                className="link-draw u-label mt-6 inline-flex items-center gap-2"
                data-cursor="point">
                All books by {author.name} <ArrowUpRight size={13} />
              </Link>
            </div>
            <div className="flex gap-4 lg:col-span-4 lg:col-start-9">
              {author.books.slice(0, 3).map((b) => (
                <Link
                  key={b.slug}
                  to={`/books/${b.slug}`}
                  className="w-1/3"
                  data-cursor="book"
                  aria-label={`View ${b.title}`}>
                  <BookCover book={b} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- related ---------------- */}
      <section className="u-gutter mt-28" aria-labelledby="related">
        <div className="flex items-end justify-between border-b border-[var(--line)] pb-6">
          <h2 id="related" className="t-h3">
            You may also like
          </h2>
          <Link to="/books" className="link-draw u-label" data-cursor="point">
            All books
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
          {related.map((b, i) => (
            <BookCard key={b.slug} book={b} index={i + 1} size="sm" />
          ))}
        </div>
      </section>

      {/* ---------------- sticky mobile purchase bar ---------------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-[var(--line)] bg-[var(--paper)] px-4 py-3 lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] text-[var(--ink-muted)]">{book.title}</p>
          <p className="u-serif text-lg tabular-nums leading-none">{formatPrice(activeFormat.price)}</p>
        </div>
        <Button size="sm" onClick={add} className="h-11 px-6">
          Add to bag
        </Button>
      </div>
    </article>
  );
}
