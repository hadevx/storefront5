import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import BookCard from "../components/BookCard";
import { BookObject } from "../components/BookCover";
import { Reveal, RevealLines, DrawRule } from "../components/ui/Reveal";
import { SectionMark, Eyebrow } from "../components/ui/Bits";
import Button from "../components/ui/Button";
import { BOOKS, STAFF_PICKS, booksByGenre } from "../data/books";
import { formatPrice, cn } from "../lib/utils";

const pickByTitle = (t) => BOOKS.find((b) => b.title === t);

/**
 * The main shelf. Built as one asymmetric composition rather than a grid of
 * identical cards: a hero object, a pair, a column of type, a quiet stack.
 */
export default function EditorialGrid() {
  const hero = pickByTitle("Tomorrow, and Tomorrow, and Tomorrow") || STAFF_PICKS[0];
  const pair = [pickByTitle("Piranesi"), pickByTitle("Exhalation")].filter(Boolean);
  const wide = pickByTitle("Braiding Sweetgrass") || booksByGenre("science")[0];
  const trio = [pickByTitle("Just Kids"), pickByTitle("Babel"), pickByTitle("Four Thousand Weeks")].filter(Boolean);

  return (
    <section className="relative py-24 lg:py-32" aria-labelledby="shelf-heading">
      <div className="u-gutter">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionMark index="03" label="The shelf" />
            <RevealLines
              as="h2"
              id="shelf-heading"
              lines={["Chosen, not", "recommended."]}
              className="t-h2 mt-6"
            />
          </div>
          <p className="max-w-[38ch] text-[14px] leading-relaxed text-[var(--ink-muted)]">
            Every title below carries a card written by the bookseller who put it there. Nothing on this table was paid
            for by a publisher.
          </p>
        </div>

        <DrawRule className="mt-10" />

        {/* ---- composition ---- */}
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-24">
          {/* hero object + its label */}
          <Reveal className="lg:col-span-4">
            <div className="relative">
              <Link to={`/books/${hero.slug}`} data-cursor="book" className="block">
                <BookObject book={hero} tilt={-2.5} />
              </Link>
              <span className="writing-vertical u-label absolute -left-7 top-0 hidden text-[var(--ink-muted)] xl:block">
                Editor's choice
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col justify-end lg:col-span-4 lg:col-start-5">
            <Eyebrow accent>{hero.genre}</Eyebrow>
            <h3 className="t-h3 mt-4">{hero.title}</h3>
            <p className="mt-2 text-[14px] text-[var(--ink-muted)]">{hero.author}</p>
            <p className="mt-6 text-[15px] leading-relaxed text-[var(--ink-soft)]">{hero.description}</p>
            <div className="mt-8 flex items-center gap-5">
              <span className="u-serif text-2xl tabular-nums">{formatPrice(hero.price)}</span>
              <Link
                to={`/books/${hero.slug}`}
                className="link-draw u-label flex items-center gap-2"
                data-cursor="point">
                Read more <ArrowUpRight size={13} />
              </Link>
            </div>
          </Reveal>

          {/* a pair, side by side, dropped below the fold line */}
          <div className="grid grid-cols-2 gap-6 md:col-span-2 lg:col-span-3 lg:col-start-10 lg:gap-5 lg:self-end">
            {pair.map((b, i) => (
              <Reveal key={b.slug} delay={0.12 + i * 0.06} className={i === 1 ? "lg:mt-10" : ""}>
                <BookCard book={b} size="sm" showRating={false} />
              </Reveal>
            ))}
          </div>

          {/* pull quote — a quiet beat between objects */}
          <Reveal className="md:col-span-2 lg:col-span-3 lg:col-start-1 lg:flex lg:flex-col lg:justify-center">
            <blockquote className="border-t border-[var(--line)] pt-8">
              <p className="u-serif text-[clamp(1.5rem,2.2vw,2.1rem)] italic leading-[1.2]">
                “Some books are read. Others become part of you.”
              </p>
              <footer className="u-meta mt-6">Ines Kovač — fiction buyer, since 2011</footer>
            </blockquote>
          </Reveal>

          {/* wide object */}
          <Reveal delay={0.06} className="grid grid-cols-5 items-center gap-6 md:col-span-2 lg:col-span-7 lg:col-start-5 lg:gap-10">
            <Link to={`/books/${wide.slug}`} className="col-span-2" data-cursor="book">
              <BookObject book={wide} tilt={2} />
            </Link>
            <div className="col-span-3">
              <Eyebrow>Nature & science</Eyebrow>
              <h3 className="t-h3 mt-3">{wide.title}</h3>
              <p className="mt-2 text-[14px] text-[var(--ink-muted)]">{wide.author}</p>
              <p className="mt-5 max-w-[46ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">{wide.hook}</p>
              <Button to={`/books/${wide.slug}`} variant="outline" size="sm" className="mt-7">
                Discover
              </Button>
            </div>
          </Reveal>

          {/* trio */}
          {trio.map((b, i) => (
            <Reveal key={b.slug} delay={0.05 * i} className={cn("lg:col-span-3", i === 0 && "lg:col-start-2")}>
              <BookCard book={b} index={i + 1} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Button to="/books" variant="outline" size="lg">
            Browse all {BOOKS.length} titles
          </Button>
        </div>
      </div>
    </section>
  );
}
