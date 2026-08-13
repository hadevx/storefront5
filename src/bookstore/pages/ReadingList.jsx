import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { BookCover } from "../components/BookCover";
import Button from "../components/ui/Button";
import { useShop, SHELVES } from "../context/ShopProvider";
import { useCountUp } from "../hooks";
import { EASE } from "../lib/motion";
import { cn } from "../lib/utils";

const SHELF_META = {
  reading: { label: "Currently reading", note: "In progress — bookmark somewhere in the middle." },
  want: { label: "Want to read", note: "The pile by the bed. It is allowed to be unrealistic." },
  finished: { label: "Finished", note: "Read, kept, occasionally re-read." },
};

function Stat({ value, label }) {
  const count = useCountUp(value, true, 900);
  return (
    <div>
      <p className="u-serif text-4xl tabular-nums leading-none">{Math.round(count)}</p>
      <p className="u-meta mt-2">{label}</p>
    </div>
  );
}

export default function ReadingList() {
  const { shelfBooks, setShelf } = useShop();
  const total = SHELVES.reduce((s, k) => s + shelfBooks[k].length, 0);
  const pagesRead = shelfBooks.finished.reduce((s, b) => s + b.pages, 0);

  return (
    <>
      <PageHeader
        kicker="Reading list"
        index={`${total} tracked`}
        lines={["What you are", "in the middle of."]}
        intro="A private shelf. Move a book between piles from any book page, or from the buttons below — nothing is shared, nothing is scored."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Reading list" }]}
      />

      <div className="u-gutter mt-12 flex flex-wrap gap-x-16 gap-y-8 border-b border-[var(--line)] pb-10">
        <Stat value={shelfBooks.reading.length} label="Currently reading" />
        <Stat value={shelfBooks.want.length} label="Want to read" />
        <Stat value={shelfBooks.finished.length} label="Finished" />
        <Stat value={pagesRead} label="Pages finished" />
      </div>

      <div className="u-gutter space-y-20 py-16 pb-28">
        {SHELVES.map((shelf, si) => {
          const books = shelfBooks[shelf];
          return (
            <section key={shelf} aria-labelledby={`shelf-${shelf}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--line)] pb-5">
                <h2 id={`shelf-${shelf}`} className="t-h3">
                  {SHELF_META[shelf].label}
                </h2>
                <span className="u-meta">
                  {String(si + 1).padStart(2, "0")} — {books.length} {books.length === 1 ? "book" : "books"}
                </span>
              </div>
              <p className="u-meta mt-4">{SHELF_META[shelf].note}</p>

              {books.length === 0 ? (
                <p className="u-serif mt-8 max-w-[30ch] text-2xl italic text-[var(--ink-muted)]">
                  {shelf === "reading"
                    ? "Nothing open at the moment."
                    : shelf === "want"
                      ? "The pile is empty. Enviable, briefly."
                      : "No finished books yet — the first one is the hardest."}
                </p>
              ) : (
                <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 lg:grid-cols-6">
                  {books.map((b, i) => (
                    <motion.div
                      key={b.slug}
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE.editorial, delay: (i % 6) * 0.04 }}>
                      <Link to={`/books/${b.slug}`} data-cursor="book">
                        <BookCover book={b} />
                      </Link>
                      <h3 className="u-serif mt-3 text-base leading-tight">{b.title}</h3>
                      <p className="u-meta mt-1">{b.pages} pages</p>

                      {/* progress hairline — finished books are complete by definition */}
                      <div className="mt-3 h-px w-full bg-[var(--line)]">
                        <div
                          className={cn("h-full bg-[var(--accent)]")}
                          style={{ width: shelf === "finished" ? "100%" : shelf === "reading" ? "48%" : "0%" }}
                        />
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {SHELVES.filter((s) => s !== shelf).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setShelf(b, s)}
                            className="u-meta border border-[var(--line)] px-2 py-1 hover:border-[var(--ink)]">
                            {s === "reading" ? "Reading" : s === "want" ? "Want" : "Done"}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {total === 0 && (
          <div className="border-t border-[var(--line)] pt-12">
            <p className="u-serif max-w-[20ch] text-3xl leading-tight">Start with something short.</p>
            <Button to="/collections/start-here" className="mt-8">
              Open “Start Here”
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
