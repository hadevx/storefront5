import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { BookCover } from "../components/BookCover";
import Button from "../components/ui/Button";
import { useShop } from "../context/ShopProvider";
import { STAFF_PICKS } from "../data/books";
import { STORE } from "../data/site";
import { formatPrice } from "../lib/utils";
import { EASE } from "../lib/motion";

export default function Cart() {
  const { bag, subtotal, count, setQty, removeLine, freeShippingGap, addToBag } = useShop();
  const shipping = freeShippingGap > 0 && subtotal > 0 ? 4.5 : 0;

  if (bag.length === 0) {
    return (
      <section className="u-gutter flex min-h-[76vh] flex-col justify-center pb-24 pt-[calc(var(--nav-h)+3rem)]">
        <span className="u-label text-[var(--accent)]">Your bag</span>
        <h1 className="t-h1 mt-6 max-w-[15ch] text-balance">An empty bag is just a bag before the good part.</h1>
        <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-[var(--ink-muted)]">
          Nothing in here yet. Start with the front table, or let one of our booksellers choose for you.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/books" size="lg">
            Explore books
          </Button>
          <Button to="/bestsellers" variant="outline" size="lg">
            See the chart
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader
        kicker="Your bag"
        index={`${count} ${count === 1 ? "book" : "books"}`}
        lines={["Ready when", "you are."]}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Bag" }]}
      />

      <div className="u-gutter mt-12 grid grid-cols-1 gap-14 pb-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ul className="border-t border-[var(--line)]">
            <AnimatePresence initial={false}>
              {bag.map((line) => (
                <motion.li
                  key={`${line.slug}-${line.format}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: EASE.editorial }}
                  className="overflow-hidden border-b border-[var(--line)]">
                  <div className="flex gap-6 py-8">
                    <Link
                      to={`/books/${line.slug}`}
                      className="w-[84px] shrink-0 sm:w-[104px]"
                      data-cursor="book"
                      aria-label={`View ${line.book.title}`}>
                      <BookCover book={line.book} />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <span className="u-meta">{line.book.genre}</span>
                          <h2 className="u-serif mt-1 text-xl leading-tight sm:text-2xl">
                            <Link to={`/books/${line.slug}`} className="link-draw">
                              {line.book.title}
                            </Link>
                          </h2>
                          <p className="mt-1 text-[13px] text-[var(--ink-muted)]">{line.book.author}</p>
                          <p className="u-meta mt-3">{line.format}</p>
                        </div>
                        <span className="u-serif shrink-0 text-xl tabular-nums">{formatPrice(line.total)}</span>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-5">
                        <div className="flex items-center border border-[var(--line-strong)]">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(line.slug, line.format, line.qty - 1)}
                            className="flex h-9 w-9 items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)]">
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-[13px] tabular-nums">{line.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQty(line.slug, line.format, line.qty + 1)}
                            className="flex h-9 w-9 items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)]">
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(line.slug, line.format)}
                          className="u-meta underline underline-offset-4 hover:text-[var(--accent)]">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {/* add-ons */}
          <div className="mt-14">
            <p className="u-label mb-6 text-[var(--ink-muted)]">Booksellers also suggest</p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STAFF_PICKS.filter((b) => !bag.some((l) => l.slug === b.slug))
                .slice(0, 4)
                .map((b) => (
                  <div key={b.slug}>
                    <Link to={`/books/${b.slug}`} data-cursor="book" aria-label={`View ${b.title}`}>
                      <BookCover book={b} />
                    </Link>
                    <p className="u-serif mt-3 text-base leading-tight">{b.title}</p>
                    <button
                      type="button"
                      onClick={() => addToBag(b)}
                      className="u-label mt-2 border-b border-[var(--line-strong)] pb-1 hover:border-[var(--ink)]">
                      Add — {formatPrice(b.price)}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* summary */}
        <aside className="lg:col-span-4 lg:col-start-9" aria-label="Order summary">
          <div className="sticky top-28 border border-[var(--line)] p-7">
            <h2 className="u-serif text-2xl">Summary</h2>

            <dl className="mt-7 space-y-3">
              <div className="flex items-baseline justify-between">
                <dt className="u-meta">Subtotal</dt>
                <dd className="text-[15px] tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="u-meta">Shipping</dt>
                <dd className="text-[15px] tabular-nums">{shipping ? formatPrice(shipping) : "Free"}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-[var(--line)] pt-4">
                <dt className="u-label">Total</dt>
                <dd className="u-serif text-2xl tabular-nums">{formatPrice(subtotal + shipping)}</dd>
              </div>
            </dl>

            {freeShippingGap > 0 && (
              <p className="u-meta mt-5 border-t border-[var(--line)] pt-5">
                <span className="text-[var(--accent)]">{formatPrice(freeShippingGap)}</span> away from free shipping —
                orders over {formatPrice(STORE.freeShippingThreshold)} travel free.
              </p>
            )}

            <Button to="/checkout" size="lg" className="mt-7 w-full" icon={<ArrowRight size={14} />}>
              Checkout
            </Button>
            <Link to="/books" className="link-draw u-label mt-5 inline-block text-[var(--ink-muted)]">
              Continue browsing
            </Link>

            <p className="u-meta mt-8 border-t border-[var(--line)] pt-5 leading-relaxed">
              Wrapped in marbled paper on request. Collect in store at {STORE.address[0]} within two hours.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
