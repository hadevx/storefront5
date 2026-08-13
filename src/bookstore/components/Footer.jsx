import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GENRES } from "../data/genres";
import { COLLECTIONS } from "../data/collections";
import { MANIFESTO, STORE } from "../data/site";
import { RevealLines, Reveal } from "./ui/Reveal";
import { cn } from "../lib/utils";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All books", to: "/books" },
      { label: "New releases", to: "/new" },
      { label: "Best sellers", to: "/bestsellers" },
      { label: "Collections", to: "/collections" },
      { label: "Genres", to: "/genres" },
    ],
  },
  {
    title: "Yours",
    links: [
      { label: "Your list", to: "/wishlist" },
      { label: "Reading list", to: "/reading-list" },
      { label: "Bag", to: "/cart" },
      { label: "Checkout", to: "/checkout" },
    ],
  },
  {
    title: "The shop",
    links: [
      { label: "About VERSO", to: "/about" },
      { label: "Authors", to: "/authors" },
      { label: "Events", to: "/about#reading-room" },
      { label: "Independent presses", to: "/about" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="on-ink relative overflow-hidden">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-20" />

      <div className="u-gutter relative pt-24">
        {/* the sign above the door */}
        <RevealLines
          as="p"
          lines={["Keep", "reading."]}
          className="t-display text-[var(--ink)]"
          lineClassName="block"
        />

        <div className="mt-16 grid gap-14 border-t border-[var(--line)] pt-14 lg:grid-cols-12">
          {/* newsletter */}
          <div className="lg:col-span-5">
            <p className="u-label text-[var(--accent)]">The letter</p>
            <h3 className="t-h3 mt-4 max-w-[18ch]">Stories worth knowing about.</h3>
            <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-[var(--ink-soft)]">
              One email a month: what arrived, what we finished, what we are pressing into people's hands. No
              countdown timers, no discount codes.
            </p>

            <form onSubmit={submit} className="mt-8 max-w-md">
              <label htmlFor="verso-newsletter" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-3 border-b border-[var(--line-strong)] pb-3">
                <input
                  id="verso-newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-transparent font-sans text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-muted)] focus:outline-none"
                />
                <button
                  type="submit"
                  data-cursor="point"
                  aria-label="Subscribe"
                  className="shrink-0 text-[var(--accent)] transition-transform duration-500 ease-editorial hover:translate-x-1">
                  <ArrowRight size={20} strokeWidth={1.4} />
                </button>
              </div>
              <p
                className={cn(
                  "u-meta mt-3 transition-opacity duration-500",
                  sent ? "opacity-100" : "opacity-0",
                )}
                aria-live="polite">
                Thank you — the next letter goes out on the first Thursday.
              </p>
            </form>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-4">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="u-label mb-5 text-[var(--ink-muted)]">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        data-cursor="point"
                        className="link-draw text-[14px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* shop card */}
          <div className="lg:col-span-3">
            <p className="u-label mb-5 text-[var(--ink-muted)]">Visit</p>
            <address className="not-italic text-[14px] leading-relaxed text-[var(--ink-soft)]">
              {STORE.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <a href={`mailto:${STORE.email}`} className="link-draw mt-3 inline-block text-[var(--ink)]">
                {STORE.email}
              </a>
            </address>
            <ul className="mt-5 space-y-1">
              {STORE.hours.map((h) => (
                <li key={h} className="u-meta">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* manifesto */}
        <Reveal className="mt-20 border-t border-[var(--line)] pt-10">
          <p className="u-label mb-6 text-[var(--ink-muted)]">A short manifesto</p>
          <ol className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
            {MANIFESTO.map((line, i) => (
              <li key={line} className="text-[13px] leading-relaxed text-[var(--ink-soft)]">
                <span className="u-meta mr-2 text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                {line}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* genre index — the fine print that still looks designed */}
        <div className="mt-16 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--line)] pt-8">
          {GENRES.map((g) => (
            <Link key={g.slug} to={`/genres/${g.slug}`} className="u-meta hover:text-[var(--ink)]">
              {g.name}
            </Link>
          ))}
          {COLLECTIONS.map((c) => (
            <Link key={c.slug} to={`/collections/${c.slug}`} className="u-meta hover:text-[var(--ink)]">
              {c.title}
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--line)] py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="u-meta">
            © {new Date().getFullYear()} {STORE.legalName} — {STORE.tagline}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Instagram", "Substack", "Terms", "Privacy"].map((l) => (
              <span key={l} className="u-meta cursor-default hover:text-[var(--ink)]">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
