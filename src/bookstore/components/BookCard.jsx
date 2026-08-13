import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { BookCover } from "./BookCover";
import { Rating } from "./ui/Bits";
import { useShop } from "../context/ShopProvider";
import { cn, formatPrice } from "../lib/utils";
import { EASE } from "../lib/motion";

/**
 * The catalogue object. Deliberately not a card: no border, no rounded box,
 * no shadowed panel — the jacket is the object and the type sits under it
 * like a gallery label.
 */
export default function BookCard({
  book,
  className,
  size = "md",
  showGenre = true,
  showRating = true,
  index,
  tilt = 0,
}) {
  const coverRef = useRef(null);
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();
  const { addToBag, toggleWishlist, inWishlist } = useShop();
  const saved = inWishlist(book.slug);

  const titleSize = {
    sm: "text-[15px] sm:text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
  }[size];

  const onQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToBag(book, { origin: coverRef.current?.getBoundingClientRect() });
  };

  return (
    <article
      className={cn("group relative flex flex-col", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className="relative">
        <Link
          to={`/books/${book.slug}`}
          data-cursor="book"
          className="block focus-visible:outline-offset-8"
          aria-label={`${book.title} by ${book.author}`}>
          <motion.div
            ref={coverRef}
            className="relative will-change-transform"
            style={{ rotate: tilt }}
            animate={reduce ? {} : { y: hover ? -10 : 0, scale: hover ? 1.025 : 1 }}
            transition={{ duration: 0.7, ease: EASE.editorial }}>
            <BookCover book={book} />
            {/* status flags sit on the jacket, letterpress style */}
            <div className="pointer-events-none absolute left-0 top-0 z-[4] flex flex-col items-start gap-1 p-2">
              {book.newRelease && (
                <span className="u-label bg-[var(--paper)] px-2 py-1 leading-none text-[var(--ink)]">New</span>
              )}
              {book.stock <= 3 && (
                <span className="u-label bg-[var(--accent)] px-2 py-1 leading-none text-[#FBF7F0]">
                  {book.stock === 0 ? "Sold out" : `${book.stock} left`}
                </span>
              )}
            </div>
          </motion.div>
        </Link>

        {/* quick actions — revealed on hover, always reachable by keyboard */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-[5] flex translate-y-2 items-center justify-between gap-2 p-2",
            "opacity-0 transition-all duration-500 ease-editorial",
            "group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100",
          )}>
          <button
            type="button"
            onClick={onQuickAdd}
            data-cursor="point"
            className={cn(
              "u-label flex h-9 flex-1 items-center justify-center gap-2 bg-[var(--ink)] text-[var(--paper)]",
              "transition-colors hover:bg-[var(--accent)]",
            )}
            aria-label={`Add ${book.title} to bag`}>
            <Plus size={13} strokeWidth={1.6} /> Add
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(book);
            }}
            data-cursor="point"
            aria-pressed={saved}
            className={cn(
              "flex h-9 w-9 items-center justify-center bg-[var(--paper)] text-[var(--ink)] transition-colors",
              saved && "bg-[var(--accent)] text-[#FBF7F0]",
            )}
            aria-label={saved ? `Remove ${book.title} from your list` : `Save ${book.title} to your list`}>
            <Heart size={14} strokeWidth={1.5} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* gallery label */}
      <div className="mt-4 flex flex-1 flex-col">
        {showGenre && (
          <div className="mb-2 flex items-center gap-2">
            {index != null && <span className="u-meta text-[var(--accent)]">{String(index).padStart(2, "0")}</span>}
            <span className="u-meta">{book.genre}</span>
            <span className="h-px flex-1 bg-[var(--line)]" />
            <span className="u-meta">{book.year}</span>
          </div>
        )}
        <h3 className={cn("u-serif leading-[1.05] text-[var(--ink)]", titleSize)}>
          <Link to={`/books/${book.slug}`} className="link-draw" data-cursor="book">
            {book.title}
          </Link>
        </h3>
        <p className="mt-1.5 font-sans text-[13px] text-[var(--ink-muted)]">{book.author}</p>

        <div
          className={cn(
            "grid transition-all duration-500 ease-editorial",
            hover ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}>
          <p className="overflow-hidden text-[13px] italic leading-snug text-[var(--ink-soft)]">
            <span className="block pt-2">{book.hook}</span>
          </p>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3 border-t border-[var(--line)] pt-3">
          <span className="font-sans text-[15px] tabular-nums text-[var(--ink)]">{formatPrice(book.price)}</span>
          {showRating && <Rating value={book.rating} size={11} showValue={false} />}
        </div>
      </div>
    </article>
  );
}

/** Horizontal variant used in lists, bag and search results. */
export function BookRow({ book, className, action }) {
  return (
    <div className={cn("flex items-start gap-5", className)}>
      <Link to={`/books/${book.slug}`} className="w-[68px] shrink-0 sm:w-[84px]" data-cursor="book">
        <BookCover book={book} />
      </Link>
      <div className="min-w-0 flex-1">
        <span className="u-meta">{book.genre}</span>
        <h3 className="u-serif mt-1 text-xl leading-tight">
          <Link to={`/books/${book.slug}`} className="link-draw" data-cursor="book">
            {book.title}
          </Link>
        </h3>
        <p className="mt-1 font-sans text-[13px] text-[var(--ink-muted)]">{book.author}</p>
        {action}
      </div>
    </div>
  );
}
