import { motion, useReducedMotion } from "framer-motion";
import { EASE, lineMask, viewport } from "../../lib/motion";
import { cn } from "../../lib/utils";

/** Scroll-triggered rise. Distance and delay are the only knobs. */
export function Reveal({ children, className, delay = 0, y = 26, as = "div", once = true }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ ...viewport, once }}
      transition={{ duration: 0.85, ease: EASE.editorial, delay }}>
      {children}
    </Comp>
  );
}

/**
 * Headline reveal: each line sits in a clipped box and rises out of it.
 * Pass an array of strings — one per line — so line breaks stay art-directed.
 *
 * The heading itself watches the viewport, not the lines: a line parked at 110%
 * sits entirely outside its clipping box, so an observer on it would only ever
 * see an empty intersection rect and the reveal would never fire.
 */
export function RevealLines({ lines = [], className, lineClassName, delay = 0, stagger = 0.08, as = "h2", ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={cn("block", className)}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="block overflow-hidden pb-[0.06em]">
          <motion.span className={cn("block", lineClassName)} variants={lineMask}>
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

/** Word-by-word fade for body copy that deserves a moment. */
export function RevealWords({ text = "", className, delay = 0 }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.022, delayChildren: delay } } }}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE.editorial } },
          }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}

/** A hairline that draws itself across the viewport. */
export function DrawRule({ className, delay = 0, vertical = false }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(vertical ? "w-px bg-[var(--line)]" : "h-px w-full bg-[var(--line)]", className)}
      style={{ transformOrigin: vertical ? "top" : "left" }}
      initial={reduce ? false : { scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={viewport}
      transition={{ duration: 1.1, ease: EASE.editorial, delay }}
    />
  );
}

export default Reveal;
