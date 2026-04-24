"use client";

import { motion } from "framer-motion";

export function LockerAnimation() {
  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Locker body */}
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect x="30" y="30" width="140" height="140" rx="8" fill="#1A1A1A" stroke="#242424" strokeWidth="1" />
        <rect x="38" y="38" width="124" height="124" rx="4" fill="#111111" />
        <line x1="38" y1="90" x2="162" y2="90" stroke="#1C1C1C" strokeWidth="1" />
        <line x1="38" y1="130" x2="162" y2="130" stroke="#1C1C1C" strokeWidth="1" />
        {[50, 65, 80, 95, 110, 125, 140, 155].map((x) => (
          <circle key={x} cx={x} cy="26" r="1" fill="#242424" />
        ))}
      </svg>

      {/* Door */}
      <motion.div className="absolute inset-0" style={{ transformOrigin: "left center", perspective: 600 }}>
        <motion.svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -90 }}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1], delay: 0.3 }}
          style={{ transformOrigin: "30px center" }}
        >
          <rect x="30" y="30" width="140" height="140" rx="8" fill="#141414" stroke="#2A2A2A" strokeWidth="1" />
          <rect x="145" y="92" width="12" height="16" rx="3" fill="#242424" stroke="#333" strokeWidth="0.5" />
          <text x="100" y="105" textAnchor="middle" fill="#2A2A2A" fontSize="9" fontFamily="monospace" letterSpacing="2">DROPLOCK</text>
          <circle cx="34" cy="55" r="2" fill="#1C1C1C" stroke="#333" strokeWidth="0.5" />
          <circle cx="34" cy="145" r="2" fill="#1C1C1C" stroke="#333" strokeWidth="0.5" />
        </motion.svg>
      </motion.div>

      {/* Lock icon */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.4 }}
      >
        <div className="w-11 h-11 rounded-lg bg-dl-accent-dim border border-dl-accent/25 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-dl-accent">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <circle cx="12" cy="16.5" r="1.5" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
