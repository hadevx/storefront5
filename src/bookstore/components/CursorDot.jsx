import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useHasFinePointer } from "../hooks";

const LABELS = {
  book: "View book",
  drag: "Drag",
  shelf: "Pull out",
  search: "Search",
  close: "Close",
};

/**
 * Desktop cursor. A hairline ring that swells into a label over anything
 * worth clicking. Never shown to touch or coarse pointers.
 */
export default function CursorDot() {
  const fine = useHasFinePointer();
  const [mode, setMode] = useState(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.35 });

  useEffect(() => {
    if (!fine) return undefined;
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      const next = el?.getAttribute("data-cursor") || null;
      setMode(next === "point" ? "point" : next);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  const label = mode && LABELS[mode];
  const isPoint = mode === "point";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] mix-blend-difference"
      style={{ x: sx, y: sy }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}>
      <motion.div
        className="flex items-center justify-center rounded-full border border-white/70 text-white"
        animate={{
          width: label ? 92 : isPoint ? 34 : 14,
          height: label ? 92 : isPoint ? 34 : 14,
          x: label ? -46 : isPoint ? -17 : -7,
          y: label ? -46 : isPoint ? -17 : -7,
          backgroundColor: label ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.9)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.5 }}>
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.24 }}
              className="u-label whitespace-nowrap text-[9px] text-white">
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
