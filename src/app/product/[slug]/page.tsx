"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getProductBySlug, formatPrice } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";

// ── Step Popup ─────────────────────────────────────

type Step = {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
};

function StepWithPopup({ step }: { step: Step }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center gap-2.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(!hovered)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[240px] bg-dl-surface-2 border-[0.5px] border-dl-border-2 rounded-[10px] p-3.5 z-50 pointer-events-none"
          >
            <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 rotate-45 w-[9px] h-[9px] bg-dl-surface-2 border-r-[0.5px] border-b-[0.5px] border-dl-border-2" />
            <p className="text-[11px] text-dl-text-muted mb-1.5 uppercase tracking-[0.08em] font-mono">
              {step.label}
            </p>
            <p className="text-[13px] text-dl-text leading-[1.55]">
              {step.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`w-12 h-12 rounded-full bg-dl-surface-2 border-[0.5px] flex items-center justify-center transition-colors duration-150 cursor-pointer ${
          hovered ? "border-dl-accent" : "border-dl-border-2"
        }`}
      >
        <span className="text-dl-accent">{step.icon}</span>
      </div>
      <span className="text-[10px] font-mono text-dl-text-muted tracking-wide">
        {step.label}
      </span>
    </div>
  );
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
      <path d="M21 8v13H3V8" /><path d="M1 3h22v5H1z" /><path d="M10 12h4" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><path d="M12 18h.01" />
    </svg>
  );
}

const STEPS: Step[] = [
  {
    id: "order",
    label: "Order",
    description:
      "Browse the catalog, add items to cart, and complete checkout with your name, email, and preferred pickup sector. Your total weight and delivery window are calculated automatically.",
    icon: <BoxIcon />,
  },
  {
    id: "reserve",
    label: "Reserve Locker",
    description:
      "The moment you confirm, our system contacts the DropLock API on the Raspberry Pi and atomically reserves the first available smart locker in your sector. No locker is ever double-booked.",
    icon: <LockIcon />,
  },
  {
    id: "receive",
    label: "Receive QR",
    description:
      "A unique QR code is generated and sent to our courier via email. The courier places your package in the reserved locker. You receive your Booking ID and locker number — come pick it up within your 48-hour window.",
    icon: <PhoneIcon />,
  },
];

// ── Product Detail Page ────────────────────────────

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);

  if (!product) notFound();

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product.slug);
    toast.success(`${quantity}x ${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="px-4 py-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb — editorial back nav */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-[13px]">
            <Link href="/" className="text-dl-text-muted hover:text-dl-text transition-colors duration-150 flex items-center gap-1.5">
              <span className="text-dl-accent">←</span>
              <span>Catalog</span>
            </Link>
            <span className="text-dl-border-2">/</span>
            <span className="text-dl-text-muted">{product.category}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image — high quality */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-dl-surface border-[0.5px] border-dl-border">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                quality={90}
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dl-bg/20 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-5">
              <span className="text-[11px] font-mono text-dl-text-faint uppercase tracking-[0.12em]">
                {product.category}
              </span>

              <h1 className="text-2xl md:text-3xl font-semibold text-dl-text tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="font-mono text-xl font-bold text-dl-accent tabular-nums">
                {formatPrice(product.priceMilliDT)}
              </p>

              <p className="text-[14px] text-dl-text-muted leading-relaxed max-w-lg">
                {product.description}
              </p>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-dl-text-faint bg-dl-surface-2 px-2.5 py-1 rounded border-[0.5px] border-dl-border">
                  ~{product.weightGrams}g
                </span>
                <span className="text-[11px] font-mono text-dl-success/70 bg-dl-success/5 px-2.5 py-1 rounded border-[0.5px] border-dl-success/10">
                  {product.stock} in stock
                </span>
              </div>

              {/* Qty */}
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-dl-text-muted">Qty</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-md bg-dl-surface-2 border-[0.5px] border-dl-border flex items-center justify-center text-dl-text-muted hover:text-dl-text hover:border-dl-border-2 transition-all duration-150"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><path d="M5 12h14" /></svg>
                  </button>
                  <span className="w-9 text-center font-mono text-[13px] text-dl-text font-medium tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-md bg-dl-surface-2 border-[0.5px] border-dl-border flex items-center justify-center text-dl-text-muted hover:text-dl-text hover:border-dl-border-2 transition-all duration-150"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                </div>
              </div>

              {/* Ghost-red add to cart — detail page variant */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className="w-full sm:max-w-[360px] px-7 py-[13px] rounded-lg bg-dl-accent/[0.08] border border-dl-accent/[0.28] text-dl-accent text-[14px] font-medium tracking-[0.02em] transition-all duration-200 hover:bg-dl-accent/[0.14] hover:border-dl-accent/50"
              >
                Add to Cart
              </motion.button>

              {/* How Droplock Works */}
              <div className="mt-6 pt-8 border-t border-dl-border/50">
                <p className="text-[11px] font-mono text-dl-text-muted mb-6 uppercase tracking-[0.15em]">
                  How Droplock Works
                </p>
                <div className="flex items-start justify-start gap-10">
                  {STEPS.map((step, i) => (
                    <div key={step.id} className="flex items-start gap-10">
                      <StepWithPopup step={step} />
                      {i < STEPS.length - 1 && (
                        <div className="mt-6 w-10 border-t border-dashed border-dl-border" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
