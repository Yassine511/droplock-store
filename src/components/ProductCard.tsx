"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { type Product, formatPrice } from "@/lib/products";
import { toast } from "sonner";

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.slug);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.045,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="group relative rounded-xl bg-dl-surface border-[0.5px] border-dl-border overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-[3px] hover:border-dl-border-2">
          {/* Image with zoom on hover */}
          <div className="relative aspect-[4/3] overflow-hidden bg-dl-surface-raised">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              quality={80}
              priority={index < 4}
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Weight badge */}
            <span className="absolute top-3 right-3 mono-pill">
              ~{product.weightGrams}g
            </span>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dl-surface to-transparent" />
          </div>

          {/* Content */}
          <div className="p-4 pt-3.5">
            <h3 className="text-[13px] font-medium text-dl-text leading-snug mb-1 group-hover:text-white transition-colors duration-200">
              {product.name}
            </h3>

            <p className="text-[12px] text-dl-text-muted leading-relaxed mb-3.5 line-clamp-1">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-mono text-[14px] font-bold text-dl-accent tabular-nums">
                {formatPrice(product.priceMilliDT)}
              </span>

              <motion.button
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={handleAdd}
                className="px-3.5 py-[7px] rounded-md bg-transparent border border-white/10 text-dl-text/55 text-[12px] font-medium tracking-[0.04em] transition-all duration-[180ms] ease-out hover:border-dl-accent/45 hover:text-dl-text hover:bg-dl-accent/[0.06] whitespace-nowrap"
              >
                Add to cart
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
