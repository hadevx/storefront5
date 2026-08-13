import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import AuthorPlate from "../components/AuthorPlate";
import BookCard from "../components/BookCard";
import { BookObject } from "../components/BookCover";
import { Reveal, RevealLines } from "../components/ui/Reveal";
import { Eyebrow } from "../components/ui/Bits";
import { AUTHORS, authorBySlug, FEATURED_AUTHORS } from "../data/authors";
import { formatPrice } from "../lib/utils";
import NotFound from "./NotFound";

export function AuthorsIndex() {
  return (
    <>
      <PageHeader
        kicker="Authors"
        index={`${AUTHORS.length} files`}
        lines={["The people", "behind the books."]}
        intro="Every author we stock has a file: what they wrote, where they wrote it, and the one line we keep quoting at the counter."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Authors" }]}
      />

      <div className="u-gutter mt-14 grid grid-cols-2 gap-x-6 gap-y-12 pb-20 sm:grid-cols-3 lg:grid-cols-4">
        {FEATURED_AUTHORS.map((a, i) => (
          <Reveal key={a.slug} delay={(i % 4) * 0.05}>
            <Link to={`/authors/${a.slug}`} data-cursor="point" className="group block">
              <AuthorPlate author={a} showName={false} />
              <p className="u-meta mt-3 text-[var(--accent)]">Author / {a.number}</p>
              <h2 className="u-serif mt-1 text-xl leading-tight">{a.name}</h2>
              <p className="u-meta mt-1">
                {a.books.length} {a.books.length === 1 ? "title" : "titles"}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="u-gutter pb-28">
        <p className="u-label mb-6 border-t border-[var(--line)] pt-8 text-[var(--ink-muted)]">Also on our shelves</p>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {AUTHORS.filter((a) => !a.featured).map((a) => (
            <Link key={a.slug} to={`/authors/${a.slug}`} className="link-draw u-serif text-xl" data-cursor="point">
              {a.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Author() {
  const { slug } = useParams();
  const author = authorBySlug(slug);
  if (!author) return <NotFound />;

  const featuredWork = [...author.books].sort((a, b) => b.rating - a.rating)[0];

  return (
    <article className="pb-28">
      <div className="u-gutter pt-[calc(var(--nav-h)+3rem)]">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2">
          <Link to="/authors" className="u-meta hover:text-[var(--ink)]" data-cursor="point">
            Authors
          </Link>
          <span className="u-meta opacity-50">/</span>
          <span className="u-meta">{author.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <AuthorPlate author={author} showName={false} />
            <dl className="mt-6 space-y-3">
              {author.born && (
                <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-2">
                  <dt className="u-meta">Born</dt>
                  <dd className="text-[13px]">{author.born}</dd>
                </div>
              )}
              {author.nationality && (
                <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-2">
                  <dt className="u-meta">Writing from</dt>
                  <dd className="text-[13px]">{author.nationality}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-2">
                <dt className="u-meta">In stock</dt>
                <dd className="text-[13px]">
                  {author.books.length} {author.books.length === 1 ? "title" : "titles"}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-[var(--line)] pb-2">
                <dt className="u-meta">Sections</dt>
                <dd className="text-[13px]">{author.genres.join(", ")}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Eyebrow accent>Author / {author.number}</Eyebrow>
            <RevealLines as="h1" lines={[author.name]} className="t-h1 mt-6" />

            {author.quote && (
              <Reveal delay={0.1}>
                <blockquote className="mt-10 border-l border-[var(--accent)] pl-6">
                  <p className="u-serif text-[clamp(1.4rem,2.6vw,2.1rem)] italic leading-[1.25]">“{author.quote}”</p>
                </blockquote>
              </Reveal>
            )}

            <Reveal delay={0.16} className="mt-10 space-y-6">
              {author.bio.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-prose2 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </div>

      {/* featured work */}
      {featuredWork && (
        <section className="on-ink mt-24 py-20">
          <div className="u-gutter grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="mx-auto w-[52%] sm:w-[34%] lg:col-span-3 lg:w-full">
              <Link to={`/books/${featuredWork.slug}`} data-cursor="book">
                <BookObject book={featuredWork} tilt={-2.5} />
              </Link>
            </div>
            <div className="lg:col-span-7 lg:col-start-5">
              <Eyebrow accent>Featured work</Eyebrow>
              <h2 className="t-h2 mt-5">{featuredWork.title}</h2>
              <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
                {featuredWork.description}
              </p>
              <p className="u-meta mt-6">
                {featuredWork.publisher} · {featuredWork.year} · {formatPrice(featuredWork.price)}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="u-gutter mt-24">
        <h2 className="t-h3 border-b border-[var(--line)] pb-6">Books by {author.name}</h2>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
          {author.books.map((b, i) => (
            <BookCard key={b.slug} book={b} index={i + 1} />
          ))}
        </div>
      </section>
    </article>
  );
}
