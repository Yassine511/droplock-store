"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 rounded-xl bg-dl-accent-dim border border-dl-accent/20 flex items-center justify-center mx-auto mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-dl-accent">
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-dl-text mb-2">Something went wrong</h2>
        <p className="text-[13px] text-dl-text-muted mb-5">{error.message || "An unexpected error occurred"}</p>
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-lg bg-transparent border border-dl-border-2 text-[14px] text-dl-text hover:border-dl-text-faint transition-all duration-150"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
