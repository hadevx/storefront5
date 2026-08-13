import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import BookCard from "../components/BookCard";
import { BookCover, BookObject } from "../components/BookCover";
import { Reveal, RevealLines } from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import { COLLECTIONS, COLLECTIONS_WITH_BOOKS, collectionBySlug, collectionBooks } from "../data/collections";
import { getPalette } from "../lib/covers";
import { EASE } from "../lib/motion";
import { cn } from "../lib/utils";
import NotFound from "./NotFound";

export function CollectionsIndex() {
  return (
    <>
      <PageHeader
        kicker="Collections"
        index={`${COLLECTIONS.length} shelves`}
        lines={["Six shelves,", "six arguments."]}
        intro="A collection is a bookseller putting their name to a group of books. These change twice a year; the cards are rewritten every time."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Collections" }]}
      />

      <div className="mt-16 pb-28">
        {COLLECTIONS_WITH_BOOKS.map((c, i) => {
          const pal = getPalette(c.palette);
          const dark = c.theme === "dark";
          return (
            <section
              key={c.slug}
              className={cn("relative overflow-hidden py-16 lg:py-24", dark && "on-ink")}
              style={{ backgroundColor: dark ? pal.bg : "transparent", color: dark ? pal.fg : undefined }}>
              <div className="paper-grain pointer-events-none absolute inset-0 opacity-20" />
              <div className="u-gutter relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
                <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
                  <span className="u-label opacity-70">
                    {c.number} — {c.kicker}
                  </span>
                  <RevealLines as="h2" lines={[c.title]} className="t-h2 mt-5" />
                  <p className="u-serif mt-5 text-xl italic opacity-80">{c.tagline}</p>
                  <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed opacity-80">{c.description}</p>
                  <p className="u-meta mt-6 opacity-70">{c.curator}</p>
                  <Button
                    to={`/collections/${c.slug}`}
                    variant={dark ? "outline" : "solid"}
                    className="mt-8"
                    size="md">
                    Open collection
                  </Button>
                </div>

                <div className={cn("flex items-end gap-4 lg:col-span-6", i % 2 === 1 ? "lg:col-start-1" : "lg:col-start-7")}>
                  {c.books.slice(0, 4).map((b, j) => (
                    <motion.div
                      key={b.slug}
                      initial={{ opacity: 0, y: 30, rotate: (j - 1.5) * 3 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.85, ease: EASE.editorial, delay: j * 0.07 }}
                      className={cn("w-1/4", j % 2 ? "mb-8" : "")}>
                      <Link to={`/books/${b.slug}`} data-cursor="book">
                        <BookObject book={b} tilt={(j - 1.5) * 2.4} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

export default function Collection() {
  const { slug } = useParams();
  const collection = collectionBySlug(slug);
  if (!collection) return <NotFound />;
  const books = collectionBooks(slug);
  const pal = getPalette(collection.palette);
  const dark = collection.theme === "dark";

  return (
    <>
      <div
        className={cn("relative overflow-hidden", dark && "on-ink")}
        style={{ backgroundColor: dark ? pal.bg : `${pal.bg}55` }}>
        <div className="paper-grain pointer-events-none absolute inset-0 opacity-20" />
        <PageHeader
          kicker={`Collection ${collection.number}`}
          index={`${books.length} titles`}
          lines={collection.title.split(" ").length > 2 ? [collection.title] : [collection.title]}
          intro={collection.description}
          meta={collection.curator}
          breadcrumb={[
            { label: "Home", to: "/" },
            { label: "Collections", to: "/collections" },
            { label: collection.title },
          ]}
          className="relative pb-16"
        />
      </div>

      <div className="u-gutter mt-16 pb-28">
        <p className="u-serif max-w-[24ch] text-[clamp(1.6rem,3vw,2.4rem)] italic leading-[1.25]">
          “{collection.tagline}”
        </p>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
          {books.map((b, i) => (
            <Reveal key={b.slug} delay={(i % 4) * 0.05} className={i % 4 === 1 ? "sm:mt-10" : ""}>
              <BookCard book={b} index={i + 1} />
            </Reveal>
          ))}
        </div>

        <div className="mt-24 border-t border-[var(--line)] pt-10">
          <p className="u-label mb-6 text-[var(--ink-muted)]">Other collections</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {COLLECTIONS.filter((c) => c.slug !== slug).map((c) => (
              <Link key={c.slug} to={`/collections/${c.slug}`} className="group" data-cursor="point">
                <div className="flex gap-1">
                  {collectionBooks(c.slug)
                    .slice(0, 3)
                    .map((b) => (
                      <span key={b.slug} className="w-1/3">
                        <BookCover book={b} />
                      </span>
                    ))}
                </div>
                <p className="u-serif mt-3 text-lg leading-tight">{c.title}</p>
                <p className="u-meta mt-1">{c.kicker}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
