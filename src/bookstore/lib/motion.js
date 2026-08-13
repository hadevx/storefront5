/** Shared motion language. Slow, weighted, never bouncy. */

export const EASE = {
  editorial: [0.16, 1, 0.3, 1],
  ink: [0.65, 0, 0.35, 1],
  soft: [0.33, 1, 0.68, 1],
  drawer: [0.32, 0.72, 0, 1],
};

export const DUR = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
  page: 0.6,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE.editorial } },
};

export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base, ease: EASE.editorial } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Words rise out of a clipped line — the house text reveal. */
export const lineMask = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.95, ease: EASE.editorial } },
};

export const coverReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE.editorial } },
};

/**
 * Reveals fire on the way down, so only the bottom edge needs holding back.
 * A negative top margin would strand anything tall that never gets more than a
 * sliver below the fold — the footer headline, for one.
 */
export const viewport = { once: true, margin: "0px 0px -12% 0px" };

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: DUR.page, ease: EASE.editorial } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.32, ease: EASE.ink } },
};
