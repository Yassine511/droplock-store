"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { SECTORS } from "@/lib/sectors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormErrors = { name?: string; email?: string; sectorId?: string; general?: string };

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sectorId, setSectorId] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email address";
    if (!sectorId) e.sectorId = "Please select a pickup sector";
    return e;
  };

  const handleBlur = (field: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setTouched({ name: true, email: true, sectorId: true });
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    if (items.length === 0) { setErrors({ general: "Your cart is empty" }); return; }
    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: name.trim(), email: email.trim(), phone: phone.trim() || undefined },
          sectorId,
          items: items.map((i) => ({ productSlug: i.productSlug, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        const params = new URLSearchParams({ bookingId: data.booking.bookingId, lockerId: data.booking.lockerId, sectorId: data.booking.sectorId, status: data.booking.status, partnerOrderId: data.booking.partnerOrderId });
        router.push(`/order/success?${params.toString()}`);
      } else {
        const params = new URLSearchParams({ errorType: data.errorType || "INTERNAL_ERROR", message: data.message || "Something went wrong", attemptId: data.attemptId || "unknown" });
        if (data.existingBookingId) params.set("existingBookingId", data.existingBookingId);
        router.push(`/order/failure?${params.toString()}`);
      }
    } catch {
      router.push(`/order/failure?errorType=INTERNAL_ERROR&message=${encodeURIComponent("Network error. Your order may have been placed — do not retry.")}&attemptId=unknown`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "bg-dl-surface border-dl-border text-dl-text placeholder:text-dl-text-faint focus:border-dl-accent/40 focus:ring-dl-accent/20 h-10 text-[13px]";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="checkout-name" className="text-[13px] text-dl-text">Full Name</Label>
        <Input id="checkout-name" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => handleBlur("name")} placeholder="Your full name" className={inputClasses} disabled={isSubmitting} />
        {touched.name && errors.name && <p className="text-[11px] text-dl-error">{errors.name}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="checkout-email" className="text-[13px] text-dl-text">Email Address</Label>
        <Input id="checkout-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => handleBlur("email")} placeholder="you@example.com" className={inputClasses} disabled={isSubmitting} />
        {touched.email && errors.email && <p className="text-[11px] text-dl-error">{errors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="checkout-phone" className="text-[13px] text-dl-text-muted">Phone <span className="text-dl-text-faint">(optional)</span></Label>
        <Input id="checkout-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+216 XX XXX XXX" className={inputClasses} disabled={isSubmitting} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="checkout-sector" className="text-[13px] text-dl-text">Pickup Sector</Label>
        <select id="checkout-sector" value={sectorId} onChange={(e) => setSectorId(e.target.value)} onBlur={() => handleBlur("sectorId")}
          className="w-full h-10 px-3 rounded-md bg-dl-surface border border-dl-border text-dl-text text-[13px] focus:border-dl-accent/40 focus:ring-1 focus:ring-dl-accent/20 outline-none transition-colors duration-150 appearance-none cursor-pointer" disabled={isSubmitting}>
          <option value="" className="bg-dl-surface text-dl-text-faint">Select a sector...</option>
          {SECTORS.map((s) => (<option key={s.id} value={s.id} className="bg-dl-surface text-dl-text">{s.label}</option>))}
        </select>
        {touched.sectorId && errors.sectorId && <p className="text-[11px] text-dl-error">{errors.sectorId}</p>}
      </div>

      <div className="rounded-lg bg-dl-accent-dim/30 border-[0.5px] border-dl-accent/10 p-3.5">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-md bg-dl-accent/10 flex items-center justify-center shrink-0 mt-0.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 text-dl-accent"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
          </div>
          <p className="text-[12px] text-dl-text-muted leading-relaxed">A QR code will be sent to our courier team. Your order will be placed in a secure locker within 24 hours. Pickup window: 24h–72h from placement.</p>
        </div>
      </div>

      {errors.general && (<div className="rounded-lg bg-dl-error/10 border border-dl-error/20 p-3"><p className="text-[11px] text-dl-error">{errors.general}</p></div>)}

      {/* Place Order — the ONE solid red button in the entire UI */}
      <motion.button
        type="submit"
        disabled={isSubmitting || items.length === 0}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className="w-full h-11 rounded-lg bg-[#E8342B] border border-[#E8342B] text-white font-medium text-[15px] tracking-[0.01em] transition-all duration-150 hover:bg-[#C82D25] hover:border-[#C82D25] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <motion.svg animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M21 12a9 9 0 11-6.219-8.56" /></motion.svg>
            Placing Order...
          </>
        ) : "Place Order"}
      </motion.button>
    </form>
  );
}
