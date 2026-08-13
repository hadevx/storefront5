import { memo } from "react";
import { getPalette, getTemplate } from "../lib/covers";
import { hash, cn } from "../lib/utils";

/* ------------------------------------------------------------------ *
 * Geometry layer — drawn on a 200 × 300 board that matches the 2:3
 * trim of the cover exactly, so nothing ever distorts.
 * ------------------------------------------------------------------ */
function Geometry({ template, pal, seed }) {
  const h = hash(seed);
  const a = pal.ac;
  const f = pal.fg;

  switch (template) {
    case "block":
      return (
        <>
          <rect x="0" y="0" width="132" height="176" fill={a} />
          <rect x="132" y="0" width="68" height="176" fill={f} opacity="0.08" />
          <rect x="18" y="196" width="52" height="1.4" fill={f} opacity="0.65" />
        </>
      );
    case "arc":
      return (
        <>
          <circle cx="100" cy="112" r="74" fill={a} opacity="0.92" />
          <circle cx="100" cy="112" r="74" fill="none" stroke={f} strokeWidth="0.8" opacity="0.35" />
          <path d="M26 112a74 74 0 0 1 148 0" fill="none" stroke={f} strokeWidth="1.2" opacity="0.5" />
          <rect x="0" y="230" width="200" height="0.8" fill={f} opacity="0.28" />
        </>
      );
    case "stripes":
      return (
        <>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={16 + i * 25}
              y={150 + ((h >> i) % 5) * 6}
              width={6 + ((h >> (i + 2)) % 9)}
              height={300}
              fill={i % 3 === 0 ? a : f}
              opacity={i % 3 === 0 ? 0.95 : 0.16}
            />
          ))}
        </>
      );
    case "grid":
      return (
        <>
          {[1, 2, 3].map((i) => (
            <rect key={`v${i}`} x={i * 50} y="0" width="0.7" height="300" fill={f} opacity="0.18" />
          ))}
          {[1, 2, 3, 4, 5].map((i) => (
            <rect key={`h${i}`} x="0" y={i * 50} width="200" height="0.7" fill={f} opacity="0.18" />
          ))}
          <rect x={(h % 3) * 50 + 50} y={(h % 2) * 50 + 50} width="50" height="50" fill={a} />
        </>
      );
    case "horizon":
      return (
        <>
          <circle cx="100" cy="196" r="46" fill={a} />
          <rect x="0" y="196" width="200" height="104" fill={pal.bg} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="0" y={200 + i * 12} width="200" height={3 + i} fill={f} opacity={0.1 + i * 0.05} />
          ))}
          <rect x="0" y="196" width="200" height="1" fill={f} opacity="0.5" />
        </>
      );
    case "orbit":
      return (
        <>
          <circle cx="100" cy="150" r="86" fill="none" stroke={f} strokeWidth="0.7" opacity="0.28" />
          <circle cx="100" cy="150" r="62" fill="none" stroke={f} strokeWidth="0.7" opacity="0.4" />
          <circle cx="100" cy="150" r="38" fill="none" stroke={a} strokeWidth="1.6" />
          <circle cx="100" cy="88" r="6.5" fill={a} />
          <circle cx="162" cy="150" r="3.2" fill={f} opacity="0.6" />
        </>
      );
    case "diagonal":
      return (
        <>
          <path d="M0 300 L200 60 L200 300 Z" fill={a} opacity="0.95" />
          <path d="M0 300 L200 60" stroke={f} strokeWidth="1" opacity="0.35" />
          <path d="M0 244 L200 4" stroke={f} strokeWidth="0.7" opacity="0.22" />
        </>
      );
    case "frame":
      return (
        <>
          <rect x="14" y="14" width="172" height="272" fill="none" stroke={f} strokeWidth="0.9" opacity="0.5" />
          <rect x="20" y="20" width="160" height="260" fill="none" stroke={a} strokeWidth="1.6" />
          <rect x="86" y="14" width="28" height="6" fill={pal.bg} />
          <circle cx="100" cy="17" r="2.6" fill={a} />
        </>
      );
    case "type":
      return (
        <>
          <rect x="0" y="0" width="200" height="4" fill={a} />
          <rect x="0" y="296" width="200" height="4" fill={a} />
        </>
      );
    case "rule":
    default:
      return (
        <>
          <rect x="24" y="52" width="152" height="1" fill={f} opacity="0.55" />
          <rect x="24" y="248" width="152" height="1" fill={f} opacity="0.55" />
          <rect x="92" y="70" width="15" height="15" fill="none" stroke={a} strokeWidth="1.4" transform="rotate(45 99.5 77.5)" />
        </>
      );
  }
}

/** Title size, in container-query width units, tuned to title length. */
const titleSize = (title, scale) => {
  const n = title.length;
  const base = n < 12 ? 17 : n < 20 ? 14 : n < 30 ? 11.5 : n < 44 ? 9.2 : 7.6;
  return `${(base * scale).toFixed(2)}cqw`;
};

const PLACEMENT = {
  center: "justify-center",
  bottom: "justify-end",
  top: "justify-start",
  fill: "justify-start",
};

function BookCoverBase({ book, className, showAuthor = true, style }) {
  const pal = getPalette(book.cover?.palette);
  const tpl = getTemplate(book.cover?.template);
  const templateKey = book.cover?.template || "rule";
  const seed = book.slug || book.title;
  const isType = templateKey === "type";
  const onBlock = templateKey === "block";
  // The imprint mark shares the top-left corner; hide it where type starts there.
  const showImprint = !onBlock && tpl.place !== "top" && !isType;

  return (
    <div
      className={cn("book-obj select-none", className)}
      style={{ background: pal.bg, color: pal.fg, ...style }}
      aria-hidden="true">
      <svg
        viewBox="0 0 200 300"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        focusable="false">
        <Geometry template={templateKey} pal={pal} seed={seed} />
      </svg>

      <div
        className={cn(
          "absolute inset-0 z-[2] flex flex-col px-[8cqw] py-[7cqw]",
          PLACEMENT[tpl.place] || "justify-center",
          tpl.align === "center" ? "items-center text-center" : "items-start text-left",
        )}>
        {/* imprint mark */}
        {showImprint && (
          <div
            className="absolute left-[8cqw] top-[6cqw] font-sans uppercase"
            style={{ fontSize: "2.6cqw", letterSpacing: "0.34em", opacity: 0.62 }}>
            Verso
          </div>
        )}

        <div
          className={cn(
            "w-full",
            tpl.place === "bottom" && "mb-[1cqw]",
            tpl.place === "center" && showImprint && "mt-[6cqw]",
            (isType || tpl.place === "top") && "mt-[3cqw]",
          )}>
          <h4
            className="u-serif leading-[0.88]"
            style={{
              fontSize: titleSize(book.title, tpl.scale),
              letterSpacing: isType ? "-0.03em" : "-0.015em",
              textTransform: tpl.case === "upper" ? "uppercase" : "none",
              color: onBlock && tpl.place === "bottom" ? pal.fg : undefined,
            }}>
            {book.title}
          </h4>

          {book.subtitle && !isType && (
            <p
              className="mt-[2.5cqw] font-sans"
              style={{ fontSize: "3cqw", letterSpacing: "0.04em", opacity: 0.72 }}>
              {book.subtitle}
            </p>
          )}

          {showAuthor && (
            <>
              <div
                className={cn("my-[3.5cqw] h-px w-[26%]", tpl.align === "center" && "mx-auto")}
                style={{ background: pal.ac, opacity: 0.9 }}
              />
              <p
                className="font-sans uppercase"
                style={{ fontSize: "3.05cqw", letterSpacing: "0.2em", opacity: 0.86 }}>
                {book.author}
              </p>
            </>
          )}
        </div>
      </div>

      {/* fine grain over the whole jacket */}
      <div className="paper-grain absolute inset-0 z-[2] opacity-40" />
    </div>
  );
}

export const BookCover = memo(BookCoverBase);

/* ------------------------------------------------------------------ *
 * BookObject — the cover as a physical thing: page block on the fore
 * edge, contact shadow, optional tilt.
 * ------------------------------------------------------------------ */
export function BookObject({ book, className, tilt = 0, lift = true, pages = true, style, children }) {
  return (
    <div
      className={cn("relative", className)}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined, ...style }}>
      <div className={cn("relative", lift && "book-shadow")}>
        <BookCover book={book} />
        {pages && (
          <div
            className="pointer-events-none absolute right-[-2px] top-[1.5%] z-[1] h-[97%] w-[6px] rounded-r-[1px]"
            style={{
              background: `repeating-linear-gradient(180deg, ${getPalette(book.cover?.palette).edge} 0 2px, rgba(21,18,14,0.22) 2px 3px)`,
              transform: "skewY(-0.6deg)",
              boxShadow: "1px 0 2px rgba(21,18,14,0.18)",
            }}
          />
        )}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * BookSpine — for the shelf. Width is derived from the page count, so
 * a 720-page novel really is fatter than a 96-page collection.
 * ------------------------------------------------------------------ */
export function BookSpine({ book, className, style }) {
  const pal = getPalette(book.cover?.palette);
  return (
    <div
      className={cn("relative h-full overflow-hidden", className)}
      style={{
        background: pal.bg,
        color: pal.fg,
        boxShadow: "inset -6px 0 12px -8px rgba(0,0,0,0.65), inset 3px 0 6px -4px rgba(255,255,255,0.28)",
        ...style,
      }}>
      <div className="absolute inset-x-0 top-[9%] h-[2px]" style={{ background: pal.ac, opacity: 0.9 }} />
      <div className="absolute inset-x-0 bottom-[9%] h-[2px]" style={{ background: pal.ac, opacity: 0.9 }} />
      <div className="flex h-full items-center justify-center px-1">
        <span
          className="writing-vertical u-serif whitespace-nowrap text-[13px] leading-none tracking-tight sm:text-[14px]"
          style={{ textOrientation: "mixed" }}>
          {book.title}
        </span>
      </div>
      <div className="paper-grain absolute inset-0 opacity-50" />
    </div>
  );
}

/** Spine thickness in px, derived from extent. */
export const spineWidth = (book) => Math.round(18 + Math.min(book.pages, 800) / 22);

export default BookCover;
