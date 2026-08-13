import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Heart } from "lucide-react";
import { useUI } from "../context/UIProvider";
import { useShop } from "../context/ShopProvider";
import { BookCover } from "./BookCover";
import { EASE } from "../lib/motion";

/** The jacket arcs from the shelf into the bag. */
export function FlightLayer() {
  const { flights } = useUI();
  return (
    <div className="pointer-events-none fixed inset-0 z-[75]" aria-hidden="true">
      <AnimatePresence>
        {flights.map((f) => (
          <motion.div
            key={f.id}
            initial={{ x: f.from.x, y: f.from.y, width: f.from.w, opacity: 1, rotate: 0, scale: 1 }}
            animate={{
              x: [f.from.x, f.from.x + (f.to.x - f.from.x) * 0.5, f.to.x - 14],
              y: [f.from.y, f.from.y - 120, f.to.y - 14],
              scale: [1, 0.66, 0.12],
              rotate: [0, -9, 6],
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: EASE.editorial, times: [0, 0.55, 1] }}
            className="absolute left-0 top-0 origin-top-left">
            <BookCover book={f.book} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/** Small printed receipts, bottom left. */
export function Toasts() {
  const { toasts } = useShop();
  const { setBagOpen } = useUI();

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-[78] flex flex-col gap-3" role="status" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: EASE.editorial }}
            className="pointer-events-auto flex w-[21rem] items-center gap-4 border border-[var(--line)] bg-[var(--paper-raised)] p-3 shadow-[0_18px_40px_-28px_rgba(21,18,14,0.7)]">
            <div className="w-10 shrink-0">
              <BookCover book={t.book} />
            </div>
            <div className="min-w-0 flex-1">
              {/* One line, always — a wrapped label lands on top of the title. */}
              <p className="u-label flex items-center gap-1.5 whitespace-nowrap text-[var(--accent)]">
                {t.kind === "wishlist" ? <Heart size={11} /> : <Check size={11} />} {t.message}
              </p>
              <p className="u-serif mt-1 truncate text-[15px] leading-tight">{t.book.title}</p>
            </div>
            {t.kind === "bag" ? (
              <button type="button" onClick={() => setBagOpen(true)} className="u-label shrink-0 underline underline-offset-4">
                View
              </button>
            ) : (
              <Link to="/wishlist" className="u-label shrink-0 underline underline-offset-4">
                List
              </Link>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/** Hairline reading progress across the top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[86] h-[2px] origin-left bg-[var(--accent)]"
    />
  );
}
