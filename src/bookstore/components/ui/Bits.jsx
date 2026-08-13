import { Star } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "../../lib/utils";

/* ---------------------------------------------------------------- *
 * Small typographic parts. These carry most of the shop's voice.
 * ---------------------------------------------------------------- */

export function Eyebrow({ children, className, accent = false }) {
  return (
    <span
      className={cn(
        "u-label inline-flex items-center gap-2",
        accent ? "text-[var(--accent)]" : "text-[var(--ink-muted)]",
        className,
      )}>
      {children}
    </span>
  );
}

/** Section index mark, e.g. 03 / BESTSELLERS */
export function SectionMark({ index, label, className, align = "left" }) {
  return (
    <div
      className={cn(
        "u-label flex items-center gap-3 text-[var(--ink-muted)]",
        align === "right" && "justify-end",
        className,
      )}>
      <span className="text-[var(--accent)]">{index}</span>
      <span className="h-px w-8 bg-[var(--line-strong)]" />
      <span>{label}</span>
    </div>
  );
}

export function Meta({ children, className }) {
  return <span className={cn("u-meta", className)}>{children}</span>;
}

export function Rating({ value = 0, reviews, size = 12, className, showValue = true }) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className="flex items-center gap-[3px]"
        role="img"
        aria-label={`Rated ${value} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            strokeWidth={1.4}
            className={cn(i <= rounded ? "text-[var(--accent)]" : "text-[var(--ink-muted)] opacity-35")}
            fill={i <= rounded ? "currentColor" : "none"}
            aria-hidden="true"
          />
        ))}
      </span>
      {showValue && (
        <span className="u-meta tracking-[0.08em]">
          {value.toFixed(1)}
          {reviews != null && ` · ${reviews.toLocaleString()}`}
        </span>
      )}
    </div>
  );
}

export function Chip({ active, children, className, ...props }) {
  return (
    <button
      type="button"
      data-cursor="point"
      aria-pressed={active}
      className={cn(
        "u-label rounded-full border px-4 py-2 transition-all duration-[400ms] ease-editorial",
        active
          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
          : "border-[var(--line-strong)] text-[var(--ink-soft)] hover:border-[var(--ink)]",
        className,
      )}
      {...props}>
      {children}
    </button>
  );
}

export function Badge({ children, tone = "ink", className }) {
  const tones = {
    ink: "border-[var(--ink)] text-[var(--ink)]",
    accent: "border-[var(--accent)] text-[var(--accent)]",
    muted: "border-[var(--line-strong)] text-[var(--ink-muted)]",
  };
  return (
    <span className={cn("u-label border px-2.5 py-1 leading-none", tones[tone], className)}>{children}</span>
  );
}

export function Field({ label, id, className, inputClassName, ...props }) {
  return (
    <div className={cn("group relative", className)}>
      {label && (
        <label htmlFor={id} className="u-label mb-2 block text-[var(--ink-muted)]">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full border-b border-[var(--line-strong)] bg-transparent pb-3 pt-1 font-sans text-[15px]",
          "text-[var(--ink)] placeholder:text-[var(--ink-muted)] placeholder:opacity-60 focus:border-[var(--accent)] focus:outline-none",
          "transition-colors duration-[400ms]",
          inputClassName,
        )}
        {...props}
      />
    </div>
  );
}

/** A button that leans toward the cursor. Disabled for coarse pointers. */
export function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("inline-block", className)}>
      {children}
    </motion.div>
  );
}

/** Continuous typographic ticker. */
export function Marquee({ items = [], className, separator = "✦", speed = 42 }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="u-label flex items-center whitespace-nowrap px-6 py-4">
          {item}
          <span className="ml-6 text-[var(--accent)]">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("relative flex w-full overflow-hidden", className)}>
      <div className="flex animate-marquee will-change-transform" style={{ animationDuration: `${speed}s` }}>
        {row}
        {row}
      </div>
    </div>
  );
}

export function Divider({ className }) {
  return <hr className={cn("border-0 border-t border-[var(--line)]", className)} />;
}
