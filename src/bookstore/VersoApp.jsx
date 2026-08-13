import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { UIProvider } from "./context/UIProvider";
import { ShopProvider } from "./context/ShopProvider";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";
import { pageTransition } from "./lib/motion";
import { BOOKS } from "./data/books";
import "./verso.css";

/* Everything past the homepage is split out — the front door stays light. */
const Catalog = lazy(() => import("./pages/Catalog"));
const BookDetail = lazy(() => import("./pages/BookDetail"));
const Genre = lazy(() => import("./pages/Genres"));
const GenresIndex = lazy(() => import("./pages/Genres").then((m) => ({ default: m.GenresIndex })));
const Collection = lazy(() => import("./pages/Collections"));
const CollectionsIndex = lazy(() => import("./pages/Collections").then((m) => ({ default: m.CollectionsIndex })));
const Author = lazy(() => import("./pages/Authors"));
const AuthorsIndex = lazy(() => import("./pages/Authors").then((m) => ({ default: m.AuthorsIndex })));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const ReadingList = lazy(() => import("./pages/ReadingList"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <span className="u-label animate-pulse text-[var(--ink-muted)]">Fetching from the shelf…</span>
    </div>
  );
}

function Page({ children }) {
  /* Object props, not variant labels: a label here would cascade down and pull
     every scroll reveal in the page open the moment the route mounts. */
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}>
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  /* No `initial={false}` on AnimatePresence — it reaches every motion child
     through presence context and lands the first page fully revealed, hero
     intro and scroll reveals alike. */
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Page>
                <Home />
              </Page>
            }
          />
          <Route
            path="/books"
            element={
              <Page>
                <Catalog />
              </Page>
            }
          />
          <Route
            path="/books/:slug"
            element={
              <Page>
                <BookDetail />
              </Page>
            }
          />
          <Route
            path="/new"
            element={
              <Page>
                <Catalog
                  preset={{ filter: (b) => b.newRelease, sort: "new" }}
                  header={{
                    kicker: "Just published",
                    lines: ["Fresh off", "the press."],
                    intro:
                      "Everything that has landed this season, newest first. Signed copies of the starred titles are behind the counter while they last.",
                  }}
                />
              </Page>
            }
          />
          <Route
            path="/bestsellers"
            element={
              <Page>
                <Catalog
                  preset={{ filter: (b) => b.bestseller, sort: "rating" }}
                  header={{
                    kicker: "The chart",
                    lines: ["What everyone", "is reading."]
                    ,
                    intro:
                      "Counted at our own till, week ending Friday. No sponsored placements, no publisher money — just what left the shop.",
                  }}
                />
              </Page>
            }
          />
          <Route
            path="/genres"
            element={
              <Page>
                <GenresIndex />
              </Page>
            }
          />
          <Route
            path="/genres/:slug"
            element={
              <Page>
                <Genre />
              </Page>
            }
          />
          <Route
            path="/collections"
            element={
              <Page>
                <CollectionsIndex />
              </Page>
            }
          />
          <Route
            path="/collections/:slug"
            element={
              <Page>
                <Collection />
              </Page>
            }
          />
          <Route
            path="/authors"
            element={
              <Page>
                <AuthorsIndex />
              </Page>
            }
          />
          <Route
            path="/authors/:slug"
            element={
              <Page>
                <Author />
              </Page>
            }
          />
          <Route
            path="/wishlist"
            element={
              <Page>
                <Wishlist />
              </Page>
            }
          />
          <Route
            path="/reading-list"
            element={
              <Page>
                <ReadingList />
              </Page>
            }
          />
          <Route
            path="/cart"
            element={
              <Page>
                <Cart />
              </Page>
            }
          />
          <Route
            path="/checkout"
            element={
              <Page>
                <Checkout />
              </Page>
            }
          />
          <Route
            path="/about"
            element={
              <Page>
                <About />
              </Page>
            }
          />
          <Route
            path="*"
            element={
              <Page>
                <NotFound />
              </Page>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function VersoApp() {
  return (
    <UIProvider>
      <ShopProvider>
        <SiteLayout>
          <AnimatedRoutes />
        </SiteLayout>
      </ShopProvider>
    </UIProvider>
  );
}

/* Handy in the console while art-directing the catalogue. */
if (import.meta.env?.DEV) {
  window.__VERSO__ = { books: BOOKS };
}
