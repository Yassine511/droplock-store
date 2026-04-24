"use client";

import { useCartStore } from "@/lib/cart-store";
import { products, formatPrice } from "@/lib/products";
import { motion } from "framer-motion";
import Image from "next/image";

export function CartSummary() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (items.length === 0) return null;

  const totalPrice = items.reduce((sum, item) => {
    const product = products.find((p) => p.slug === item.productSlug);
    return sum + (product ? product.priceMilliDT * item.quantity : 0);
  }, 0);
  const totalWeight = items.reduce((sum, item) => {
    const product = products.find((p) => p.slug === item.productSlug);
    return sum + (product ? product.weightGrams * item.quantity : 0);
  }, 0);

  return (
    <div className="space-y-0">
      {items.map((item, i) => {
        const product = products.find((p) => p.slug === item.productSlug);
        if (!product) return null;

        return (
          <motion.div
            key={item.productSlug}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-4 py-4 border-b border-dl-border/50"
          >
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-dl-surface-2 shrink-0 border-[0.5px] border-dl-border">
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="56px" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-medium text-dl-text truncate">{product.name}</h4>
              <p className="text-[11px] text-dl-text-muted font-mono mt-0.5">
                {formatPrice(product.priceMilliDT)} × {item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateQuantity(item.productSlug, item.quantity - 1)}
                className="w-7 h-7 rounded-md bg-dl-surface-2 border-[0.5px] border-dl-border flex items-center justify-center text-dl-text-muted hover:text-dl-text hover:border-dl-border-2 transition-all duration-150"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><path d="M5 12h14" /></svg>
              </button>
              <span className="w-7 text-center font-mono text-[12px] text-dl-text tabular-nums">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productSlug, item.quantity + 1)}
                className="w-7 h-7 rounded-md bg-dl-surface-2 border-[0.5px] border-dl-border flex items-center justify-center text-dl-text-muted hover:text-dl-text hover:border-dl-border-2 transition-all duration-150"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><path d="M12 5v14M5 12h14" /></svg>
              </button>
            </div>
            <div className="text-right shrink-0 w-24">
              <p className="font-mono text-[13px] font-bold text-dl-accent tabular-nums">
                {formatPrice(product.priceMilliDT * item.quantity)}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.productSlug)}
              className="w-7 h-7 rounded-md flex items-center justify-center text-dl-text-faint hover:text-dl-error hover:bg-dl-error/10 transition-all duration-150"
              aria-label={`Remove ${product.name}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </motion.div>
        );
      })}

      <div className="pt-5 space-y-2.5">
        <div className="flex justify-between items-center">
          <span className="text-[13px] text-dl-text-muted">Total Weight</span>
          <span className="font-mono text-[13px] text-dl-text tabular-nums">
            {totalWeight >= 1000 ? `${(totalWeight / 1000).toFixed(1)}kg` : `${totalWeight}g`}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-medium text-dl-text">Total</span>
          <span className="font-mono text-lg font-bold text-dl-accent tabular-nums">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
