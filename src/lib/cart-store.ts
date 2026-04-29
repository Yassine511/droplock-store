"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productSlug: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (slug: string) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (slug: string) => {
        const existing = get().items.find((i) => i.productSlug === slug);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productSlug === slug
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, { productSlug: slug, quantity: 1 }] });
        }
      },

      removeItem: (slug: string) => {
        set({ items: get().items.filter((i) => i.productSlug !== slug) });
      },

      updateQuantity: (slug: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(slug);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productSlug === slug ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "droplock-cart-v2" }
  )
);
