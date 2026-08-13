import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PageHeader from "../components/PageHeader";
import BookCard from "../components/BookCard";
import { BookCover } from "../components/BookCover";
import Button from "../components/ui/Button";
import { useShop } from "../context/ShopProvider";
import { STAFF_PICKS } from "../data/books";
import { formatPrice } from "../lib/utils";
import { EASE } from "../lib/motion";

export default function Wishlist() {
  const { wishlistBooks, toggleWishlist, addToBag } = useShop();
  const total = wishlistBooks.reduce((s, b) => s + b.price, 0);

  if (wishlistBooks.length === 0) {
    return (
      <section className="u-gutter flex min-h-[78vh] flex-col justify-center pb-24 pt-[calc(var(--nav-h)+3rem)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <span className="u-label text-[var(--accent)]">Your list</span>
            <h1 className="t-h1 mt-6 max-w-[14ch] text-balance">Your next favourite book is waiting.</h1>
            <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-[var(--ink-muted)]">
              Nothing saved yet. Tap the heart on any jacket and it will keep its place here until you are ready — no
              expiry, no nudging emails.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button to="/books" size="lg">
                Explore books
              </Button>
              <Button to="/collections" variant="outline" size="lg">
                Browse collections
              </Button>
            </div>
          </div>

          <div className="flex items-end gap-4 lg:col-span-5 lg:col-start-8">
            {STAFF_PICKS.slice(0, 3).map((b, i) => (
              <motion.div
                key={b.slug}
                initial={{ opacity: 0, y: 30, rotate: (i - 1) * 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE.editorial, delay: i * 0.1 }}
                className="w-1/3">
                <Link to={`/books/${b.slug}`} data-cursor="book">
                  <BookCover book={b} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader
        kicker="Your list"
        index={`${wishlistBooks.length} saved`}
        lines={["Kept for", "later."]}
        intro="Saved jackets live here until you want them. Nothing expires, and we never email you about it."
        meta={`Total if you took them all — ${formatPrice(total)}`}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Your list" }]}
      />

      <div className="u-gutter mt-14 grid grid-cols-2 gap-x-6 gap-y-14 pb-28 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {wishlistBooks.map((b, i) => (
            <motion.div
              key={b.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: EASE.editorial }}
              className="relative">
              <button
                type="button"
                onClick={() => toggleWishlist(b)}
                aria-label={`Remove ${b.title} from your list`}
                className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center border border-[var(--line-strong)] bg-[var(--paper)] text-[var(--ink-soft)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]">
                <X size={13} />
              </button>
              <BookCard book={b} index={i + 1} />
              <button
                type="button"
                onClick={() => addToBag(b)}
                className="u-label mt-3 w-full border border-[var(--line-strong)] py-2.5 transition-colors hover:border-[var(--ink)]">
                Add to bag
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
