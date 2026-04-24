"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

type ErrorConfig = { headline: string; message: string; canRetry: boolean; showWarning: boolean };

function getErrorConfig(errorType: string, message: string, existingBookingId?: string | null): ErrorConfig {
  switch (errorType) {
    case "UNAUTHORIZED": return { headline: "Integration Error", message: "Integration misconfigured. Contact support.", canRetry: false, showWarning: false };
    case "FORBIDDEN": return { headline: "Sector Not Authorized", message: "Sector not authorized for this integration. Contact support.", canRetry: false, showWarning: false };
    case "DUPLICATE_ORDER": return { headline: "Order May Already Exist", message: existingBookingId ? `This order may already exist (${existingBookingId}). Check your email or contact support.` : "Order may already exist. Check your email or contact support.", canRetry: false, showWarning: false };
    case "NO_LOCKER_AVAILABLE": return { headline: "Locker Unavailable", message: "No lockers available right now. Please retry in a few minutes.", canRetry: true, showWarning: false };
    case "TIMEOUT": return { headline: "Request Timed Out", message: message || "Something went wrong. Your order may have been placed — do not retry.", canRetry: false, showWarning: true };
    case "VALIDATION_ERROR": return { headline: "Validation Error", message: message || "Please check your order details and try again.", canRetry: true, showWarning: false };
    default: return { headline: "Something Went Wrong", message: message || "Something went wrong. Your order may have been placed — do not retry.", canRetry: false, showWarning: true };
  }
}

function FailureContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorType = searchParams.get("errorType") || "INTERNAL_ERROR";
  const message = searchParams.get("message") || "";
  const attemptId = searchParams.get("attemptId") || "unknown";
  const existingBookingId = searchParams.get("existingBookingId");
  const config = getErrorConfig(errorType, message, existingBookingId);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }} className="mb-5">
          <div className="w-14 h-14 rounded-xl bg-dl-accent-dim border-[0.5px] border-dl-accent/20 flex items-center justify-center mx-auto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-dl-accent"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" strokeLinecap="round" /></svg>
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }} className="text-xl font-semibold text-dl-text tracking-tight mb-2">{config.headline}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="text-[13px] text-dl-text-muted leading-relaxed mb-5 max-w-md mx-auto">{config.message}</motion.p>

        {config.showWarning && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="rounded-lg bg-dl-accent-dim/30 border-[0.5px] border-dl-accent/10 p-3.5 mb-5 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-dl-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 text-dl-accent"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <p className="text-[12px] text-dl-text-muted leading-relaxed"><span className="text-dl-accent font-medium">Do not retry</span> — your order may already have been placed. Check your email first, or contact support with the attempt ID below.</p>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} className="rounded-lg bg-dl-surface border-[0.5px] border-dl-border p-3.5 mb-7">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-dl-text-muted">Attempt ID</span>
            <span className="font-mono text-[11px] text-dl-text bg-dl-mono-bg px-3 py-1 rounded border-[0.5px] border-dl-border tabular-nums">{attemptId}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }} className="flex flex-col sm:flex-row gap-3 justify-center">
          {config.canRetry && (
            <button onClick={() => router.push("/checkout")} className="px-6 py-2.5 rounded-lg bg-dl-accent/[0.08] border border-dl-accent/[0.28] text-dl-accent text-[14px] font-medium transition-all duration-200 hover:bg-dl-accent/[0.14] hover:border-dl-accent/50 active:scale-[0.98]">Retry</button>
          )}
          <a href={`mailto:support@droplock.tn?subject=Order%20Issue%20-%20${attemptId}&body=Attempt%20ID:%20${attemptId}%0AError:%20${errorType}`} className="px-6 py-2.5 rounded-lg bg-transparent border border-white/10 text-dl-text/55 text-[14px] font-medium transition-all duration-150 hover:border-dl-accent/45 hover:text-dl-text hover:bg-dl-accent/[0.06] active:scale-[0.98]">Contact Support</a>
          <Link href="/" className="px-6 py-2.5 rounded-lg bg-transparent border border-white/10 text-dl-text/55 text-[14px] transition-all duration-150 hover:border-dl-accent/45 hover:text-dl-text hover:bg-dl-accent/[0.06] active:scale-[0.98]">Back to Store</Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function FailurePage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="w-7 h-7 border-2 border-dl-error/30 border-t-dl-error rounded-full animate-spin" /></div>}>
      <FailureContent />
    </Suspense>
  );
}
