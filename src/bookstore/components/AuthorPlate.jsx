import { getPalette } from "../lib/covers";
import { hash, cn } from "../lib/utils";

/**
 * Author portrait plate. We do not carry photographs of living authors, so
 * each author gets a printed plate instead: initials set enormous, a ruled
 * frame, and the palette of the book they are best known for here.
 */
export default function AuthorPlate({ author, className, ratio = "3/4", showName = true }) {
  const pal = getPalette(author.palette);
  const h = hash(author.slug);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: ratio, background: pal.bg, color: pal.fg, containerType: "inline-size" }}
      aria-hidden="true">
      <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <circle cx={150} cy={168} r={104} fill={pal.ac} opacity="0.9" />
        <circle cx={150} cy={168} r={104} fill="none" stroke={pal.fg} strokeWidth="0.8" opacity="0.4" />
        <rect x="24" y="24" width="252" height="352" fill="none" stroke={pal.fg} strokeWidth="0.8" opacity="0.35" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x="24"
            y={296 + i * 5}
            width={252 - ((h >> i) % 6) * 22}
            height="1"
            fill={pal.fg}
            opacity={0.12 + i * 0.03}
          />
        ))}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="u-serif leading-none" style={{ fontSize: "26cqw", letterSpacing: "-0.04em" }}>
          {author.initials}
        </span>
      </div>

      {showName && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-[6cqw]">
          <span className="font-sans uppercase" style={{ fontSize: "3cqw", letterSpacing: "0.22em", opacity: 0.8 }}>
            {author.name}
          </span>
          <span className="font-sans uppercase" style={{ fontSize: "3cqw", letterSpacing: "0.22em", opacity: 0.6 }}>
            {author.number}
          </span>
        </div>
      )}

      <div className="paper-grain absolute inset-0 opacity-40" />
    </div>
  );
}
