import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AuthorPlate from "../components/AuthorPlate";
import { BookCover } from "../components/BookCover";
import { Reveal, RevealLines } from "../components/ui/Reveal";
import { SectionMark } from "../components/ui/Bits";
import { authorBySlug, FEATURED_AUTHORS } from "../data/authors";
import { EASE } from "../lib/motion";

export default function AuthorSpotlight({ slug = "haruki-murakami" }) {
  const author = authorBySlug(slug) || FEATURED_AUTHORS[0];

  return (
    <section className="relative py-24 lg:py-32" aria-labelledby="author-heading">
      <div className="u-gutter grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <div className="relative">
            <AuthorPlate author={author} />
            <span className="u-label absolute -right-3 top-6 hidden origin-top-right rotate-90 text-[var(--ink-muted)] xl:block">
              Author / {author.number}
            </span>
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          <SectionMark index="08" label="Author in focus" />
          <RevealLines as="h2" id="author-heading" lines={[author.name]} className="t-h2 mt-6" />

          {author.quote && (
            <Reveal delay={0.1}>
              <blockquote className="mt-8 border-l border-[var(--accent)] pl-6">
                <p className="u-serif text-[clamp(1.25rem,2.2vw,1.9rem)] italic leading-[1.3]">“{author.quote}”</p>
              </blockquote>
            </Reveal>
          )}

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-[58ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">{author.bio[0]}</p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-end gap-6">
            {author.books.slice(0, 3).map((b, i) => (
              <motion.div
                key={b.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE.editorial, delay: i * 0.08 }}
                className="w-[26%] max-w-[9rem]">
                <Link to={`/books/${b.slug}`} data-cursor="book">
                  <BookCover book={b} />
                  <p className="u-meta mt-3 line-clamp-2">{b.title}</p>
                </Link>
              </motion.div>
            ))}

            <Link
              to={`/authors/${author.slug}`}
              className="link-draw u-label mb-8 flex items-center gap-2"
              data-cursor="point">
              Author page <ArrowUpRight size={13} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
