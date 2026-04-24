"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  const links = [
    { href: "/", label: "Catalog" },
    { href: "/cart", label: "Cart" },
    { href: "/checkout", label: "Checkout" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass-nav border-b border-dl-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-[13px] text-dl-text-muted transition-colors duration-200 hover:text-dl-text rounded-lg hover:bg-white/[0.03]"
              >
                {link.label}
                {link.label === "Cart" && totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 1.4 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    }}
                    className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-dl-accent text-white text-[10px] font-mono font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/[0.03] transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-3.5 relative flex flex-col justify-between">
              <motion.span
                className="block h-px bg-dl-text w-full origin-center"
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 6.5 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              />
              <motion.span
                className="block h-px bg-dl-text w-full"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block h-px bg-dl-text w-full origin-center"
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -6.5 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-30 bg-dl-bg/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center min-h-[100dvh] gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.07,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-2xl font-light text-dl-text py-3 px-8 rounded-xl hover:bg-white/[0.03] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-14" />
    </>
  );
}
