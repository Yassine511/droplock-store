"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { products, formatPrice } from "@/lib/products";

export function CartPill() {
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const product = products.find((p) => p.slug === item.productSlug);
    return sum + (product ? product.priceMilliDT * item.quantity : 0);
  }, 0);

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
    >
      <Link href="/cart">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-dl-surface-2 border border-dl-border-2 rounded-full px-4 py-2.5 flex items-center gap-3 cursor-pointer shadow-lg shadow-black/30"
        >
          <div className="w-7 h-7 rounded-full bg-dl-accent flex items-center justify-center">
            <span className="text-white font-mono text-[11px] font-bold">
              {totalItems}
            </span>
          </div>
          <span className="font-mono text-[13px] text-dl-text font-medium tabular-nums">
            {formatPrice(totalPrice)}
          </span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-3.5 h-3.5 text-dl-text-muted"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </Link>
    </motion.div>
  );
}
