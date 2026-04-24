import "server-only";

import { nanoid } from "nanoid";
import { SECTORS } from "./sectors";
import { getProductBySlug } from "./products";

// ──────────────────────────────────────────────
// Validation helpers
// ──────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PARTNER_ORDER_ID_REGEX = /^[A-Za-z0-9_-]{1,64}$/;

export function generatePartnerOrderId(): string {
  const id = nanoid(12);
  // nanoid may produce chars outside [A-Za-z0-9_-] — use a custom alphabet
  return id.replace(/[^A-Za-z0-9_-]/g, "X");
}

export type CheckoutPayload = {
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  sectorId: string;
  items: Array<{ productSlug: string; quantity: number }>;
};

export type ValidationError = {
  field: string;
  message: string;
};

export function validateCheckoutPayload(
  payload: CheckoutPayload
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Customer validation
  if (!payload.customer?.name?.trim()) {
    errors.push({ field: "customer.name", message: "Full name is required" });
  }
  if (!payload.customer?.email?.trim()) {
    errors.push({ field: "customer.email", message: "Email is required" });
  } else if (!EMAIL_REGEX.test(payload.customer.email)) {
    errors.push({
      field: "customer.email",
      message: "Please enter a valid email address",
    });
  }

  // Sector validation
  if (!payload.sectorId) {
    errors.push({ field: "sectorId", message: "Please select a pickup sector" });
  } else if (!SECTORS.find((s) => s.id === payload.sectorId)) {
    errors.push({ field: "sectorId", message: "Invalid sector selected" });
  }

  // Items validation
  if (!payload.items || payload.items.length === 0) {
    errors.push({ field: "items", message: "Cart is empty" });
  } else {
    for (const item of payload.items) {
      const product = getProductBySlug(item.productSlug);
      if (!product) {
        errors.push({
          field: "items",
          message: `Unknown product: ${item.productSlug}`,
        });
      }
      if (!item.quantity || item.quantity <= 0) {
        errors.push({
          field: "items",
          message: `Invalid quantity for ${item.productSlug}`,
        });
      }
    }
  }

  // Weight validation
  let totalWeight = 0;
  for (const item of payload.items ?? []) {
    const product = getProductBySlug(item.productSlug);
    if (product) {
      totalWeight += product.weightGrams * item.quantity;
    }
  }
  if (totalWeight > 0 && totalWeight < 50) {
    errors.push({
      field: "weight",
      message: "Total weight must be at least 50g",
    });
  }
  if (totalWeight > 20000) {
    errors.push({
      field: "weight",
      message: `Total weight (${totalWeight}g) exceeds the 20kg locker limit. Please reduce your order.`,
    });
  }

  return errors;
}

export function computeWindows() {
  const now = Date.now();
  const deliveryWindow = {
    startAt: now,
    endAt: now + 24 * 60 * 60 * 1000,
  };
  const pickupWindow = {
    startAt: deliveryWindow.endAt,
    endAt: deliveryWindow.endAt + 48 * 60 * 60 * 1000,
  };
  return { deliveryWindow, pickupWindow };
}

export function computeCartTotals(
  items: Array<{ productSlug: string; quantity: number }>
) {
  let totalPriceMilliDT = 0;
  let totalWeightGrams = 0;

  for (const item of items) {
    const product = getProductBySlug(item.productSlug);
    if (product) {
      totalPriceMilliDT += product.priceMilliDT * item.quantity;
      totalWeightGrams += product.weightGrams * item.quantity;
    }
  }

  return { totalPriceMilliDT, totalWeightGrams };
}
