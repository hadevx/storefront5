import { Link } from "react-router-dom";
import { RevealLines, Reveal } from "./ui/Reveal";
import { cn } from "../lib/utils";

/**
 * Every page opens the same way: a breadcrumb line, an index number, a
 * display headline and a rule. Consistency here is what makes the rest of
 * the site feel like one publication.
 */
export default function PageHeader({
  kicker,
  index,
  lines = [],
  intro,
  meta,
  breadcrumb = [],
  className,
  children,
  size = "lg",
}) {
  return (
    <header className={cn("u-gutter pt-[calc(var(--nav-h)+3rem)] lg:pt-[calc(var(--nav-h)+4.5rem)]", className)}>
      {breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2">
          {breadcrumb.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {i > 0 && <span className="u-meta opacity-50">/</span>}
              {c.to ? (
                <Link to={c.to} className="u-meta hover:text-[var(--ink)]" data-cursor="point">
                  {c.label}
                </Link>
              ) : (
                <span className="u-meta">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-wrap items-baseline gap-4">
        {kicker && <span className="u-label text-[var(--accent)]">{kicker}</span>}
        {index && (
          <>
            <span className="h-px w-12 bg-[var(--line-strong)]" />
            <span className="u-meta">{index}</span>
          </>
        )}
      </div>

      <RevealLines
        as="h1"
        lines={lines}
        className={cn("mt-6", size === "lg" ? "t-h1" : "t-h2")}
        stagger={0.07}
      />

      {(intro || meta) && (
        <Reveal delay={0.15} className="mt-8 flex flex-wrap items-end justify-between gap-8 border-b border-[var(--line)] pb-8">
          {intro && <p className="t-lede max-w-[54ch]">{intro}</p>}
          {meta && <p className="u-meta shrink-0">{meta}</p>}
        </Reveal>
      )}

      {children}
    </header>
  );
}
