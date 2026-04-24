"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { products, formatPrice } from "@/lib/products";
import { CheckoutForm } from "@/components/CheckoutForm";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);

  const cartProducts = items
    .map((item) => {
      const product = products.find((p) => p.slug === item.productSlug);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as (typeof products[number] & { quantity: number })[];

  const totalPrice = cartProducts.reduce((sum, p) => sum + p.priceMilliDT * p.quantity, 0);
  const totalWeight = cartProducts.reduce((sum, p) => sum + p.weightGrams * p.quantity, 0);

  if (items.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-14 h-14 rounded-xl bg-dl-surface-2 border-[0.5px] border-dl-border flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-dl-text-faint">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-dl-text mb-2">Your cart is empty</h2>
          <p className="text-[13px] text-dl-text-muted mb-6">Add some products before checking out</p>
          <Link href="/" className="px-5 py-2.5 rounded-md bg-transparent border border-white/10 text-dl-text/55 text-[13px] font-medium tracking-[0.04em] transition-all duration-150 hover:border-dl-accent/45 hover:text-dl-text hover:bg-dl-accent/[0.06]">
            Browse Products
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }} className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold text-dl-text tracking-tight mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-xl bg-dl-surface border-[0.5px] border-dl-border p-5 sticky top-20">
              <h2 className="text-[11px] font-mono text-dl-text-muted uppercase tracking-[0.15em] mb-4">Order Summary</h2>
              <div className="space-y-0">
                {cartProducts.map((product) => (
                  <div key={product.slug} className="flex items-center gap-3 py-3 border-b border-dl-border/50 last:border-0">
                    <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-dl-surface-2 shrink-0">
                      <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="44px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-dl-text truncate">{product.name}</p>
                      <p className="text-[11px] text-dl-text-muted font-mono">x{product.quantity}</p>
                    </div>
                    <p className="font-mono text-[13px] text-dl-text shrink-0 tabular-nums">{formatPrice(product.priceMilliDT * product.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-dl-border/50 space-y-2.5">
                <div className="flex justify-between text-[13px]">
                  <span className="text-dl-text-muted">Subtotal</span>
                  <span className="font-mono text-dl-text tabular-nums">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-dl-text-muted">Total Weight</span>
                  <span className="font-mono text-dl-text tabular-nums">{totalWeight >= 1000 ? `${(totalWeight / 1000).toFixed(1)}kg` : `${totalWeight}g`}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-dl-text-muted">Locker fee</span>
                  <span className="font-mono text-dl-success">Free</span>
                </div>
                <div className="h-px bg-dl-border/50" />
                <div className="flex justify-between items-center">
                  <span className="font-medium text-dl-text text-[14px]">Total</span>
                  <span className="font-mono text-lg font-bold text-dl-accent tabular-nums">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="max-w-lg">
              <h2 className="text-[11px] font-mono text-dl-text-muted uppercase tracking-[0.15em] mb-5">Customer Details</h2>
              <CheckoutForm />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
