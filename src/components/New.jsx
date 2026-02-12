import { Link } from "react-router-dom";
import { useGetHomeCategorySectionsQuery } from "../redux/queries/productApi";
import ProductCard from "./ProductCard";

export default function HomeCategorySections() {
  const { data, isLoading, isError, error, refetch } = useGetHomeCategorySectionsQuery();

  const sections = data?.sections || [];

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
        <div className="space-y-14">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-8 w-64 bg-black/10 rounded animate-pulse mb-6" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((__, j) => (
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
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    const msg =
      error?.data?.message || error?.error || "Failed to load home sections. Please try again.";

    return (
      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
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

  if (!sections.length) return null;

  return (
    <div>
      {sections.map((section, index) => {
        const categoryId = section?.category?._id;
        const categoryName = section?.category?.name || "Collection";
        const products = section?.products || [];

        // ✅ Alternate background colors
        const bgClass = index % 2 === 0 ? "bg-white" : "bg-neutral-50"; // soft comforting alternate

        return (
          <section key={categoryId || index} className={`${bgClass} py-20`}>
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-black/50 mb-3">
                    New Collection
                  </p>

                  <h3 className="text-3xl md:text-5xl font-bold font-serif tracking-wide text-black">
                    {categoryName}
                  </h3>
                </div>

                <Link
                  to={`/category/${categoryId}`}
                  className="text-xs tracking-[0.25em] uppercase text-black/70 hover:text-black">
                  View All →
                </Link>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((p, i) => (
                  <ProductCard key={p?._id} product={p} index={i} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
