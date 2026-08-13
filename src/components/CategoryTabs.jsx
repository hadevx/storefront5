import { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGetHomeCategorySectionsQuery } from "../redux/queries/productApi";
import ProductCard from "./ProductCard";

export default function HomeCategorySections() {
  const { data, isLoading, isError, error, refetch } = useGetHomeCategorySectionsQuery();

  const sections = useMemo(() => data?.sections || [], [data]);

  const tabs = useMemo(() => {
    return sections
      .map((s, idx) => ({
        key: s?.category?._id || `idx-${idx}`,
        id: s?.category?._id || null,
        name: s?.category?.name || "Collection",
        products: s?.products || [],
      }))
      .filter((t) => t.name);
  }, [sections]);

  const [activeKey, setActiveKey] = useState(tabs[0]?.key);

  useEffect(() => {
    if (!tabs.length) return;
    const stillExists = tabs.some((t) => t.key === activeKey);
    if (!stillExists) setActiveKey(tabs[0].key);
  }, [tabs, activeKey]);

  const activeTab = tabs.find((t) => t.key === activeKey) || tabs[0];
  const activeCategoryId = activeTab?.id;
  const activeCategoryName = activeTab?.name;
  const products = activeTab?.products || [];

  // --- Fix mobile horizontal scroll:
  // 1) Ensure no element forces overflow on the page
  // 2) Tabs: use wrap on mobile instead of overflow-x
  // 3) Keep a compact, responsive grid gap
  const tabsWrapRef = useRef(null);

  // Optional: when switching tabs on small screens, keep tabs visible
  const onSelectTab = (key) => {
    setActiveKey(key);
    // Scroll the tabs area into view (nice UX, avoids page sideways drift)
    tabsWrapRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 overflow-x-hidden">
        <div className="space-y-8">
          {/* Tabs skeleton (wrap, no horizontal scroll) */}
          <div className="flex flex-wrap gap-3 pb-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 w-28 rounded-full bg-black/10 animate-pulse" />
            ))}
          </div>

          {/* Title + link skeleton */}
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="h-3 w-32 bg-black/10 rounded animate-pulse" />
              <div className="h-10 w-64 bg-black/10 rounded animate-pulse" />
            </div>
            <div className="h-3 w-24 bg-black/10 rounded animate-pulse" />
          </div>

          {/* Products skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {[...Array(8)].map((__, j) => (
              <div key={j} className="rounded-2xl border border-black/10 overflow-hidden">
                <div className="aspect-[4/5] bg-black/10 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 bg-black/10 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-black/10 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    const msg =
      error?.data?.message || error?.error || "Failed to load home sections. Please try again.";

    return (
      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16 overflow-x-hidden">
        <div className="rounded-2xl border border-black/10 bg-neutral-50 p-6">
          <p className="text-sm text-black/70">{msg}</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90">
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (!tabs.length) return null;

  return (
    <section className="bg-white py-16 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Tabs (WRAP on mobile, scroll allowed only from md and up if you want) */}
        <div ref={tabsWrapRef} className="mb-10">
          <div className="flex flex-wrap gap-3">
            {tabs.map((t) => {
              const isActive = t.key === activeKey;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => onSelectTab(t.key)}
                  className={[
                    "rounded-full px-4 py-2 text-xs tracking-[0.25em] uppercase transition",
                    "max-w-full", // prevent forcing width
                    isActive
                      ? "bg-black text-white"
                      : "bg-neutral-100 text-black/70 hover:bg-neutral-200",
                  ].join(" ")}>
                  <span className="block truncate">{t.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="min-w-0">
            <p className="text-xs tracking-[0.3em] uppercase text-black/50 mb-3">New Collection</p>
            <h3 className="text-3xl md:text-5xl font-bold font-serif tracking-wide text-black break-words">
              {activeCategoryName}
            </h3>
          </div>

          {activeCategoryId ? (
            <Link
              to={`/category/${activeCategoryId}`}
              className="text-xs tracking-[0.25em] uppercase text-black/70 hover:text-black">
              View All →
            </Link>
          ) : null}
        </div>

        {/* Products */}
        {products.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {products.map((p, i) => (
              <ProductCard key={p?._id || `${activeKey}-${i}`} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-black/10 bg-neutral-50 p-8">
            <p className="text-sm text-black/70">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
