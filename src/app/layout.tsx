import type { Metadata } from "next";
import { Sora, Azeret_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { CartPill } from "@/components/CartPill";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Droplock. — Smart Locker Delivery",
  description:
    "Order products online and pick them up from a secure smart locker near you. No waiting, no missed deliveries.",
  keywords: ["smart locker", "delivery", "Droplock", "pickup", "e-commerce"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${azeretMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col noise-overlay">
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartPill />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#141414",
              border: "1px solid #242424",
              color: "#F2EEE8",
              fontFamily: "var(--font-sora)",
            },
          }}
        />
      </body>
    </html>
  );
}
