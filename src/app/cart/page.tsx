"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CartSummary } from "@/components/CartSummary";
import { useCartStore } from "@/lib/cart-store";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="px-4 py-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-dl-text tracking-tight">Your Cart</h1>
            <p className="text-[13px] text-dl-text-muted mt-0.5">
              {items.length === 0
                ? "Nothing here yet"
                : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""}`}
            </p>
          </div>
          {items.length > 0 && (
            <button onClick={clearCart} className="text-[12px] text-dl-text-faint hover:text-dl-error transition-colors duration-150">
              Clear all
            </button>
          )}
        </div>

        <div className="h-px bg-dl-border/50 mb-4" />

        {items.length === 0 ? (
          /* ── Empty cart state ── */
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-12 h-12 rounded-xl bg-dl-accent-dim border-[0.5px] border-dl-accent/20 flex items-center justify-center mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-dl-accent/60">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p className="text-[14px] text-dl-text mb-1.5">Your cart is empty.</p>
            <p className="text-[12px] text-dl-text-faint mb-6">Add something from the catalog to get started.</p>
            <Link
              href="/"
              className="px-5 py-2 rounded-md bg-transparent border border-white/10 text-dl-text/55 text-[13px] font-medium tracking-[0.04em] transition-all duration-150 hover:border-dl-accent/45 hover:text-dl-text hover:bg-dl-accent/[0.06]"
            >
              ← Catalog
            </Link>
          </div>
        ) : (
          <>
            <CartSummary />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/checkout"
                className="flex-1 h-11 rounded-lg bg-dl-accent text-white font-medium text-[14px] flex items-center justify-center transition-colors duration-150 hover:bg-[#C82D25] active:scale-[0.98]"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/"
                className="flex-1 h-11 rounded-lg bg-transparent border border-dl-border-2 text-dl-text text-[14px] font-medium flex items-center justify-center transition-all duration-150 hover:border-dl-text-faint"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
