import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileMenu from "../components/MobileMenu";
import CartDrawer from "../components/CartDrawer";
import SearchOverlay from "../components/SearchOverlay";
import CursorDot from "../components/CursorDot";
import { FlightLayer, Toasts, ScrollProgress } from "../components/FeedbackLayer";
import { useUI } from "../context/UIProvider";

export default function SiteLayout({ children }) {
  const { pathname } = useLocation();
  const { closeAll } = useUI();

  useEffect(() => {
    closeAll();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, closeAll]);

  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="grain-fixed" aria-hidden="true" />
      <ScrollProgress />
      <Header />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer />

      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <FlightLayer />
      <Toasts />
      <CursorDot />
    </div>
  );
}
