import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { Search, Heart, User, Menu } from "lucide-react";
import { NAV, STORE } from "../data/site";
import { useUI } from "../context/UIProvider";
import { useShop } from "../context/ShopProvider";
import MegaMenu from "./MegaMenu";
import { cn } from "../lib/utils";
import { EASE } from "../lib/motion";

export default function Header() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { setSearchOpen, setBagOpen, setMenuOpen, bagTarget, bagPulse } = useUI();
  const { count, wishlist } = useShop();
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, "change", (v) => setCondensed(v > 40));
  useEffect(() => setMegaOpen(false), [pathname]);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ease-editorial",
        condensed
          ? "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_92%,transparent)] backdrop-blur-[6px]"
          : "border-b border-transparent bg-transparent",
      )}
      onMouseLeave={() => setMegaOpen(false)}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-[var(--paper)]">
        Skip to content
      </a>

      <div
        className="u-gutter flex items-center justify-between transition-all duration-500 ease-editorial"
        style={{ height: condensed ? 64 : "var(--nav-h)" }}>
        {/* mark */}
        <Link to="/" className="group relative flex items-baseline gap-3" data-cursor="point" aria-label="VERSO — home">
          <span
            className="u-serif leading-none transition-all duration-500 ease-editorial"
            style={{ fontSize: condensed ? 24 : 30, letterSpacing: "0.02em" }}>
            {STORE.name}
          </span>
          <AnimatePresence>
            {!condensed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                className="u-meta hidden md:inline">
                Booksellers since {STORE.since}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* primary navigation */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <div
              key={item.to}
              onMouseEnter={() => setMegaOpen(Boolean(item.mega))}
              className="relative py-2">
              <NavLink
                to={item.to}
                data-cursor="point"
                className={({ isActive }) =>
                  cn(
                    "link-draw u-label text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]",
                    isActive && "text-[var(--ink)]",
                  )
                }>
                {item.label}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* utilities */}
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            data-cursor="search"
            aria-label="Search the shop"
            className="flex h-10 items-center gap-2 px-2 text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]">
            <Search size={17} strokeWidth={1.4} />
            <span className="u-label hidden xl:inline">Search</span>
          </button>

          <Link
            to="/wishlist"
            data-cursor="point"
            aria-label={`Your list, ${wishlist.length} books`}
            className="relative hidden h-10 items-center px-2 text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] sm:flex">
            <Heart size={17} strokeWidth={1.4} />
            {wishlist.length > 0 && (
              <span className="absolute right-0 top-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            )}
          </Link>

          <Link
            to="/reading-list"
            data-cursor="point"
            aria-label="Your reading list"
            className="hidden h-10 items-center px-2 text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] sm:flex">
            <User size={17} strokeWidth={1.4} />
          </Link>

          <motion.button
            ref={bagTarget}
            type="button"
            onClick={() => setBagOpen(true)}
            data-cursor="point"
            key={bagPulse}
            animate={bagPulse ? { scale: [1, 1.12, 1] } : {}}
            transition={{ duration: 0.5, ease: EASE.editorial }}
            className="u-label ml-1 flex h-10 items-center gap-2 border border-[var(--line-strong)] px-3 text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
            aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}>
            Bag
            <span className="tabular-nums text-[var(--accent)]">({count})</span>
          </motion.button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            data-cursor="point"
            aria-label="Open menu"
            className="ml-1 flex h-10 w-10 items-center justify-center text-[var(--ink)] lg:hidden">
            <Menu size={20} strokeWidth={1.4} />
          </button>
        </div>
      </div>

      <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
    </motion.header>
  );
}
