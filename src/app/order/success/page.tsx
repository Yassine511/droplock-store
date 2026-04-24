"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { LockerAnimation } from "@/components/LockerAnimation";
import { BookingStatusBadge } from "@/components/BookingStatusBadge";
import { SECTORS } from "@/lib/sectors";
import { toast } from "sonner";

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "—";
  const lockerId = searchParams.get("lockerId") || "—";
  const sectorId = searchParams.get("sectorId") || "—";
  const status = searchParams.get("status") || "DROP_PENDING";

  const sector = SECTORS.find((s) => s.id === sectorId);
  const sectorLabel = sector?.label || sectorId;

  const copyBookingId = () => {
    navigator.clipboard.writeText(bookingId);
    toast.success("Booking ID copied to clipboard");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mb-8">
          <LockerAnimation />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 1.6 }} className="mb-2">
          <div className="w-9 h-9 rounded-full bg-dl-success/15 border-[0.5px] border-dl-success/20 flex items-center justify-center mx-auto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-dl-success"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 1.7 }} className="text-xl font-semibold text-dl-text tracking-tight mb-6">
          Order Confirmed
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 1.9 }} className="rounded-xl bg-dl-surface border-[0.5px] border-dl-border p-5 text-left space-y-3.5 mb-7">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-dl-text-muted">Booking ID</span>
            <button onClick={copyBookingId} className="flex items-center gap-2 group">
              <span className="font-mono text-[13px] text-dl-text bg-dl-mono-bg px-3 py-1 rounded border-[0.5px] border-dl-border group-hover:border-dl-border-2 transition-colors duration-150 tabular-nums">{bookingId}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 text-dl-text-faint group-hover:text-dl-accent transition-colors duration-150"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-dl-text-muted">Locker</span>
            <span className="font-mono text-[13px] text-dl-text bg-dl-mono-bg px-3 py-1 rounded border-[0.5px] border-dl-border">{lockerId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-dl-text-muted">Sector</span>
            <span className="text-[13px] text-dl-text">{sectorLabel}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-dl-text-muted">Status</span>
            <BookingStatusBadge status={status} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 2.1 }} className="space-y-1.5 mb-8">
          <p className="text-[13px] text-dl-text-muted">A QR code has been sent to our logistics team.</p>
          <p className="text-[13px] text-dl-text-muted">Your package will be placed in your locker within <span className="text-dl-text font-medium">24 hours</span>.</p>
          <p className="text-[13px] text-dl-text-muted">Pickup window: <span className="text-dl-text font-medium">24h – 72h</span> from now.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 2.3 }} className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Ghost-red CTA — not solid, this isn't irreversible */}
          <Link href="/" className="px-6 py-2.5 rounded-lg bg-dl-accent/[0.08] border border-dl-accent/[0.28] text-dl-accent text-[14px] font-medium transition-all duration-200 hover:bg-dl-accent/[0.14] hover:border-dl-accent/50 active:scale-[0.98]">
            Continue Shopping
          </Link>
          <button onClick={copyBookingId} className="px-6 py-2.5 rounded-lg bg-transparent border border-white/10 text-dl-text/55 text-[14px] font-medium tracking-[0.02em] transition-all duration-150 hover:border-dl-accent/45 hover:text-dl-text hover:bg-dl-accent/[0.06] active:scale-[0.98]">
            Copy Booking ID
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="w-7 h-7 border-2 border-dl-accent/30 border-t-dl-accent rounded-full animate-spin" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
