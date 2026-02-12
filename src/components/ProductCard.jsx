import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * ProductCard (React.js)
 * - clean image block
 * - crossfade to hover image
 * - serif name + muted price (no "Starting at")
 * - shows available colors as small circles below price
 *
 * Expects:
 * product.variants[].color  (e.g. "Black", "Red")
 * product.image[0].url
 */
export default function ProductCard({ product, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  const id = product?._id;
  const name = product?.name || "Product";

  console.log(product);
  const category = useMemo(() => {
    return (
      product?.category?.name ||
      product?.category?.title ||
      product?.category ||
      product?.brand ||
      "Collection"
    );
  }, [product]);

  const oldPrice = Number(product?.price ?? 0);
  const price = product?.hasDiscount ? Number(product?.discountedPrice ?? oldPrice) : oldPrice;

  const primaryImage =
    product?.image?.[0]?.url || product?.image?.url || product?.image || "/placeholder.svg";

  const hoverImage =
    product?.hoverImage?.url ||
    product?.hoverImage ||
    product?.image?.[1]?.url ||
    product?.image?.[0]?.url ||
    "/placeholder.svg";

  // ✅ Collect available colors from variants (unique, normalized)
  const colors = useMemo(() => {
    const variants = Array.isArray(product?.variants) ? product.variants : [];
    const set = new Set();

    for (const v of variants) {
      if (v?.color) set.add(String(v.color).trim());
    }

    return Array.from(set).filter(Boolean);
  }, [product]);

  // ✅ Map common color names to CSS colors (fallback to neutral)
  const colorToCss = (c) => {
    const key = String(c || "")
      .trim()
      .toLowerCase();

    const map = {
      black: "#111111",
      white: "#ffffff",
      gray: "#9ca3af",
      grey: "#9ca3af",
      silver: "#d1d5db",
      charcoal: "#374151",

      red: "#ef4444",
      maroon: "#7f1d1d",
      burgundy: "#7f1d1d",
      wine: "#7f1d1d",

      blue: "#3b82f6",
      navy: "#1e3a8a",
      sky: "#38bdf8",

      green: "#22c55e",
      olive: "#4d7c0f",
      emerald: "#10b981",

      yellow: "#eab308",
      gold: "#d4af37",
      orange: "#f97316",

      purple: "#a855f7",
      violet: "#8b5cf6",
      pink: "#ec4899",

      brown: "#92400e",
      tan: "#d2b48c",
      beige: "#f5f5dc",
      cream: "#fffdd0",

      "off white": "#f8fafc",
      "off-white": "#f8fafc",
      ivory: "#fffff0",
    };

    return map[key] || "#e5e7eb"; // neutral fallback
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}>
      <Link
        to={`/product/${id}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Image block */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
          {/* Primary */}
          <img
            src={primaryImage}
            alt={name}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Hover */}
          <img
            src={hoverImage}
            alt={`${name} alternate view`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Hover shadow overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.10)]"
          />
        </div>

        {/* Text */}
        <div className="space-y-1">
          {/* Optional category line */}
          {/* <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground">{category}</p> */}

          <h3 className="font-serif text-lg leading-snug">{name}</h3>

          <div className="text-sm text-muted-foreground tracking-wide">
            {product?.hasDiscount ? (
              <>
                <span className="line-through mr-2">{oldPrice.toFixed(3)} KD</span>
                <span className="text-foreground">{price.toFixed(3)} KD</span>
              </>
            ) : (
              <span className="text-foreground">{price.toFixed(3)} KD</span>
            )}
          </div>

          {/* ✅ Color circles */}
          {colors.length > 0 && (
            <div className="flex items-center gap-2">
              {colors.slice(0, 8).map((c) => {
                const css = colorToCss(c);
                const isWhiteLike = [
                  "#ffffff",
                  "#f8fafc",
                  "#fffff0",
                  "#fffdd0",
                  "#f5f5dc",
                ].includes(css);

                return (
                  <span
                    key={c}
                    title={c}
                    aria-label={c}
                    className="h-3 w-3 rounded-full border"
                    style={{
                      backgroundColor: css,
                      borderColor: isWhiteLike ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.12)",
                    }}
                  />
                );
              })}

              {colors.length > 8 && (
                <span className="text-xs text-muted-foreground">+{colors.length - 8}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
