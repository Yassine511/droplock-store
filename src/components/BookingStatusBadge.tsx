"use client";

export function BookingStatusBadge({ status }: { status: string }) {
  const getStyle = () => {
    switch (status) {
      case "DROP_PENDING":
        return "bg-dl-accent-dim text-dl-accent border-dl-accent/25";
      case "DROPPED":
        return "bg-dl-success/15 text-dl-success border-dl-success/20";
      case "PICKED_UP":
        return "bg-blue-500/15 text-blue-400 border-blue-500/20";
      case "EXPIRED":
        return "bg-dl-error/15 text-dl-error border-dl-error/20";
      default:
        return "bg-dl-muted/15 text-dl-text-muted border-dl-muted/20";
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-[12px] font-mono font-medium uppercase tracking-[0.1em] ${getStyle()}`}
    >
      <span
        className={`w-1 h-1 rounded-full ${
          status === "DROP_PENDING"
            ? "bg-dl-accent animate-pulse-red"
            : status === "DROPPED"
              ? "bg-dl-success"
              : status === "PICKED_UP"
                ? "bg-blue-400"
                : "bg-dl-error"
        }`}
      />
      {status}
    </span>
  );
}
