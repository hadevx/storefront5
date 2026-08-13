import { Link } from "react-router-dom";
import { BookCover } from "../components/BookCover";
import Button from "../components/ui/Button";
import { STAFF_PICKS } from "../data/books";

export default function NotFound() {
  const picks = STAFF_PICKS.slice(0, 4);
  return (
    <section className="u-gutter flex min-h-[80vh] flex-col justify-center pb-24 pt-[calc(var(--nav-h)+4rem)]">
      <span className="u-label text-[var(--accent)]">Error 404</span>
      <h1 className="t-h1 mt-6 max-w-[16ch] text-balance">This page is not on any of our shelves.</h1>
      <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-[var(--ink-muted)]">
        The link may have moved, or the title may have sold out and been retired from the catalogue. Here are four
        books we would rather you were reading anyway.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button to="/books">Explore books</Button>
        <Button to="/" variant="outline">
          Back to the shop
        </Button>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {picks.map((b) => (
          <Link key={b.slug} to={`/books/${b.slug}`} data-cursor="book">
            <BookCover book={b} />
            <p className="u-serif mt-3 text-lg leading-tight">{b.title}</p>
            <p className="u-meta mt-1">{b.author}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
