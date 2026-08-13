import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import BookCard from "../components/BookCard";
import { BookCover } from "../components/BookCover";
import { Reveal } from "../components/ui/Reveal";
import { GENRES, genreBySlug } from "../data/genres";
import { booksByGenre } from "../data/books";
import { getPalette } from "../lib/covers";
import { EASE } from "../lib/motion";
import NotFound from "./NotFound";

/** Index of every genre — each row previews its own shelf. */
export function GenresIndex() {
  return (
    <>
      <PageHeader
        kicker="Genres"
        index={`${GENRES.length} sections`}
        lines={["Fourteen ways", "into the shop."]}
        intro="The sections as they are arranged in store — front room to back. Each is looked after by one bookseller, who writes the cards."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Genres" }]}
      />

      <div className="u-gutter mt-14 grid grid-cols-1 gap-x-8 gap-y-12 pb-28 sm:grid-cols-2 lg:grid-cols-3">
        {GENRES.map((g, i) => {
          const books = booksByGenre(g.slug);
          const pal = getPalette(books[0]?.cover?.palette);
          return (
            <Reveal key={g.slug} delay={(i % 3) * 0.06}>
              <Link to={`/genres/${g.slug}`} data-cursor="point" className="group block">
                <div
                  className="relative flex h-44 items-end overflow-hidden p-5 transition-colors duration-700 ease-editorial"
                  style={{ backgroundColor: `${pal.bg}` }}>
                  <div className="paper-grain absolute inset-0 opacity-30" />
                  <div className="absolute -right-4 bottom-[-14%] flex w-[42%] gap-2 opacity-95">
                    {books.slice(0, 2).map((b, j) => (
                      <motion.div
                        key={b.slug}
                        className="w-1/2"
                        initial={{ y: 14, rotate: j ? 6 : -4 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASE.editorial }}>
                        <BookCover book={b} />
                      </motion.div>
                    ))}
                  </div>
                  <span
                    className="u-label relative z-10"
                    style={{ color: pal.fg }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="u-serif mt-5 text-2xl leading-none">{g.name}</h2>
                <p className="mt-2 text-[13px] italic text-[var(--ink-muted)]">{g.tagline}</p>
                <p className="u-meta mt-4 border-t border-[var(--line)] pt-3">
                  {String(books.length).padStart(2, "0")} titles
                </p>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}

/** One genre. */
export default function Genre() {
  const { slug } = useParams();
  const genre = genreBySlug(slug);
  if (!genre) return <NotFound />;
  const books = booksByGenre(slug);
  const index = GENRES.findIndex((g) => g.slug === slug) + 1;

  return (
    <>
      <PageHeader
        kicker={`Genre ${String(index).padStart(2, "0")}`}
        index={`${books.length} titles`}
        lines={[genre.name]}
        intro={genre.blurb}
        meta={genre.tagline}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Genres", to: "/genres" }, { label: genre.name }]}
      />

      <div className="u-gutter mt-14 grid grid-cols-2 gap-x-6 gap-y-14 pb-28 sm:grid-cols-3 lg:grid-cols-4">
        {books.map((b, i) => (
          <div key={b.slug} className={i % 5 === 2 ? "sm:mt-12" : ""}>
            <BookCard book={b} index={i + 1} />
          </div>
        ))}
      </div>

      <div className="u-gutter pb-24">
        <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--line)] pt-8">
          <span className="u-meta">Other sections</span>
          {GENRES.filter((g) => g.slug !== slug).map((g) => (
            <Link key={g.slug} to={`/genres/${g.slug}`} className="u-meta hover:text-[var(--ink)]" data-cursor="point">
              {g.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
