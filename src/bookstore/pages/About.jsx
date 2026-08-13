import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookCover, BookObject } from "../components/BookCover";
import { Reveal, RevealLines, DrawRule } from "../components/ui/Reveal";
import { SectionMark, Eyebrow, Marquee } from "../components/ui/Bits";
import Button from "../components/ui/Button";
import { ABOUT_CHAPTERS, MANIFESTO, PRESS, STORE } from "../data/site";
import { STAFF_PICKS, BOOKS } from "../data/books";
import { COLLECTIONS } from "../data/collections";
import { EASE } from "../lib/motion";
import { useCountUp } from "../hooks";

const STAFF = [
  { name: "Ines Kovač", role: "Fiction", since: 2011 },
  { name: "Ada Mensah", role: "Non-fiction", since: 2014 },
  { name: "Tomas Rey", role: "Night shift, poetry", since: 2009 },
  { name: "Bea Lindqvist", role: "Children & young adult", since: 2018 },
  { name: "Samir Haddad", role: "History & politics", since: 2016 },
  { name: "Nell Okafor", role: "Art & design", since: 2021 },
  { name: "Jonas Wirth", role: "Buying & imports", since: 2003 },
];

function Counter({ to, label, suffix = "" }) {
  const value = useCountUp(to, true, 1400);
  return (
    <div>
      <p className="u-serif text-[clamp(2.4rem,5vw,4rem)] leading-none tabular-nums">
        {Math.round(value).toLocaleString()}
        {suffix}
      </p>
      <p className="u-meta mt-3">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <article className="pb-4">
      {/* ---------- statement ---------- */}
      <section className="u-gutter pt-[calc(var(--nav-h)+4rem)]">
        <Eyebrow accent>About VERSO</Eyebrow>
        <RevealLines
          as="h1"
          lines={["We believe", "books change", "the way we see", "the world."]}
          className="t-display mt-8"
          stagger={0.08}
        />

        <div className="mt-16 grid gap-10 border-t border-[var(--line)] pt-10 lg:grid-cols-12">
          <p className="t-lede lg:col-span-6">
            A recto is the right-hand page — the one you are moving toward. A verso is the left: the page you have
            just read, the one that got you here. We named the shop after it on purpose.
          </p>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
              VERSO is an independent bookshop on Aldergate Lane with three rooms, seven booksellers and no
              algorithm. We stock around eleven thousand titles, which is fewer than the chain across the road, and
              that is the entire strategy.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- window of jackets ---------- */}
      <section className="u-gutter mt-20" aria-label="A row from the front table">
        <div className="flex items-end gap-3 sm:gap-6">
          {STAFF_PICKS.slice(0, 7).map((b, i) => (
            <motion.div
              key={b.slug}
              initial={{ opacity: 0, y: 40, rotate: (i - 3) * 2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: EASE.editorial, delay: i * 0.06 }}
              className="shrink-0"
              style={{ width: `${100 / 7}%` }}>
              <Link to={`/books/${b.slug}`} data-cursor="book">
                <BookObject book={b} tilt={(i - 3) * 1.6} />
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="u-meta mt-6">The front table, photographed on a Tuesday.</p>
      </section>

      {/* ---------- numbers ---------- */}
      <section className="u-gutter mt-24" aria-label="The shop in numbers">
        <DrawRule />
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 sm:grid-cols-4">
          <Counter to={11000} label="Titles in store" />
          <Counter to={new Date().getFullYear() - STORE.since} label="Years on the lane" />
          <Counter to={7} label="Booksellers" />
          <Counter to={214} label="Independent presses" />
        </div>
        <DrawRule />
      </section>

      {/* ---------- chapters ---------- */}
      <section className="u-gutter mt-20" aria-labelledby="story">
        <SectionMark index="01" label="The story" />
        <h2 id="story" className="sr-only">
          The story of the shop
        </h2>
        <div className="mt-12 grid gap-x-10 gap-y-16 lg:grid-cols-2">
          {ABOUT_CHAPTERS.map((c, i) => (
            <Reveal key={c.number} delay={(i % 2) * 0.08} className="border-t border-[var(--line)] pt-6">
              <span className="u-label text-[var(--accent)]">{c.number}</span>
              <h3 className="t-h3 mt-4">{c.title}</h3>
              <p className="mt-5 max-w-prose2 text-[15px] leading-relaxed text-[var(--ink-soft)]">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- philosophy on ink ---------- */}
      <section className="on-ink relative mt-28 overflow-hidden py-24" aria-labelledby="philosophy">
        <div className="paper-grain pointer-events-none absolute inset-0 opacity-20" />
        <div className="u-gutter relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionMark index="02" label="How we choose" />
            <RevealLines as="h2" id="philosophy" lines={["A shop is", "an argument."]} className="t-h2 mt-6" />
            <p className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
              Every shelf is a claim about what is worth your evening. We would rather be wrong in an interesting way
              than right in a boring one, so we say what we think on the little cards — and sign them.
            </p>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {MANIFESTO.map((line, i) => (
              <Reveal
                as="li"
                key={line}
                delay={i * 0.06}
                className="flex gap-6 border-b border-[var(--line)] py-6">
                <span className="u-label shrink-0 text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="u-serif text-[clamp(1.15rem,2vw,1.6rem)] leading-snug">{line}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- booksellers ---------- */}
      <section className="u-gutter mt-24" aria-labelledby="staff">
        <SectionMark index="03" label="Booksellers" />
        <h2 id="staff" className="t-h2 mt-6 max-w-[18ch]">
          Seven people, seven sections.
        </h2>
        <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {STAFF.map((s, i) => (
            <Reveal as="li" key={s.name} delay={(i % 3) * 0.05} className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] py-5">
              <span>
                <span className="u-serif block text-xl leading-none">{s.name}</span>
                <span className="u-meta mt-2 block">{s.role}</span>
              </span>
              <span className="u-meta tabular-nums">since {s.since}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------- reading room ---------- */}
      <section id="reading-room" className="u-gutter mt-28 scroll-mt-28" aria-labelledby="reading-room-heading">
        <div className="grid gap-12 border-t border-[var(--line)] pt-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionMark index="04" label="The reading room" />
            <h2 id="reading-room-heading" className="t-h2 mt-6 max-w-[16ch]">
              Eight seats, a kettle, no wifi.
            </h2>
            <p className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-[var(--ink-soft)]">
              The room at the back is open to anyone, whether or not you buy anything. We run readings there on the
              first Thursday of the month, and a translation evening every quarter. It closes at seven, mid-chapter or
              not.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/collections">Browse collections</Button>
              <Button to="/books" variant="outline">
                All books
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:col-span-5 lg:col-start-8">
            {BOOKS.slice(20, 26).map((b, i) => (
              <motion.div
                key={b.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE.editorial, delay: i * 0.05 }}>
                <BookCover book={b} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- press ---------- */}
      <section className="u-gutter mt-28" aria-label="Press">
        <div className="grid gap-10 border-t border-[var(--line)] pt-12 lg:grid-cols-3">
          {PRESS.map((p, i) => (
            <Reveal key={p.source} delay={i * 0.08}>
              <blockquote>
                <p className="u-serif text-[clamp(1.2rem,1.9vw,1.6rem)] italic leading-[1.3]">“{p.quote}”</p>
                <footer className="u-meta mt-5">{p.source}</footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mt-24 border-y border-[var(--line)] bg-[var(--paper-deep)] text-[var(--ink-muted)]">
        <Marquee items={COLLECTIONS.map((c) => c.title)} speed={54} />
      </div>
    </article>
  );
}
