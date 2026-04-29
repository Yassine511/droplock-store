"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Extract unique categories with counts
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((p) => counts.set(p.category, (counts.get(p.category) || 0) + 1));
    return [
      { label: "All", count: products.length },
      ...Array.from(counts.entries()).map(([label, count]) => ({ label, count })),
    ];
  }, []);

  const filtered = useMemo(
    () => activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Hero strip */}
      <section className="pt-10 pb-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-1">
            {["DELIVERED.", "LOCKED.", "YOURS."].map((word, i) => (
              <motion.h1
                key={word}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-dl-text leading-[1.05]"
              >
                {word}
              </motion.h1>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-5 text-[13px] text-dl-text-muted max-w-md"
          >
            Smart locker delivery. Pick up on your schedule.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-4 flex items-center gap-3 text-[11px] font-mono text-dl-text-faint"
          >
            <span>25g - 5kg</span>
            <span className="text-dl-border-2">·</span>
            <span>24h delivery window</span>
            <span className="text-dl-border-2">·</span>
            <span>QR pickup</span>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-8 h-px bg-gradient-to-r from-dl-accent/40 via-dl-border to-transparent origin-left"
          />
        </div>
      </section>

      {/* Category filter bar + product count */}
      <section className="px-4 pb-2">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="flex items-center justify-between gap-4 mb-5"
          >
            {/* Scrollable pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-[12px] font-medium tracking-[0.04em] border transition-all duration-150 whitespace-nowrap ${
                    activeCategory === cat.label
                      ? "bg-dl-accent/10 border-dl-accent/35 text-dl-accent"
                      : "bg-transparent border-white/10 text-dl-text/50 hover:border-white/20 hover:text-dl-text/70"
                  }`}
                >
                  {cat.label}
                  <span className="ml-1.5 text-[10px] opacity-50">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Product count */}
            <span className="shrink-0 text-[12px] font-mono text-dl-text-faint tabular-nums">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Product grid */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
