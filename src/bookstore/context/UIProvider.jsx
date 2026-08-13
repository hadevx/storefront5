import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [flights, setFlights] = useState([]);
  const [bagPulse, setBagPulse] = useState(0);
  const bagTarget = useRef(null);
  const flightId = useRef(0);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setBagOpen(false);
    setFiltersOpen(false);
  }, []);

  /** Sends a small copy of the jacket arcing toward the bag icon. */
  const flyToBag = useCallback((rect, book) => {
    if (!rect || !book) return;
    const target = bagTarget.current?.getBoundingClientRect();
    if (!target) return;
    const id = ++flightId.current;
    setFlights((f) => [
      ...f,
      {
        id,
        book,
        from: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
        to: { x: target.left + target.width / 2, y: target.top + target.height / 2 },
      },
    ]);
    window.setTimeout(() => {
      setFlights((f) => f.filter((x) => x.id !== id));
      setBagPulse((p) => p + 1);
    }, 900);
  }, []);

  const value = useMemo(
    () => ({
      menuOpen,
      setMenuOpen,
      searchOpen,
      setSearchOpen,
      bagOpen,
      setBagOpen,
      filtersOpen,
      setFiltersOpen,
      closeAll,
      flights,
      flyToBag,
      bagPulse,
      bagTarget,
    }),
    [menuOpen, searchOpen, bagOpen, filtersOpen, closeAll, flights, flyToBag, bagPulse],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
};
