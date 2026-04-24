import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ weight: "700", subsets: ["latin"], display: "swap" });

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-lg",
    md: "text-[22px]",
    lg: "text-4xl",
  };

  return (
    <span
      className={`${dmSans.className} ${sizes[size]} tracking-tight leading-none select-none`}
    >
      <span className="text-dl-text">Droplock</span>
      <span className="text-[#E8342B]">.</span>
    </span>
  );
}
