import "server-only";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export type DropLockPayload = {
  partnerOrderId: string;
  sectorId: string;
  websiteAdminEmail: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  deliveryWindow: {
    startAt: number;
    endAt: number;
  };
  pickupWindow: {
    startAt: number;
    endAt: number;
  };
  expectedWeightGrams: number;
  priceMilliDT?: number;
};

export type DropLockBooking = {
  bookingId: string;
  partnerOrderId: string;
  userId: string;
  courierId: string;
  sectorId: string;
  lockerId: string;
  status: string;
};

export type DropLockQR = {
  tokenId: string;
  purpose: string;
  expiresAt: number;
};

export type DropLockSuccessResponse = {
  success: true;
  booking: DropLockBooking;
  qr: DropLockQR;
  email: {
    sentTo: string;
    type: string;
  };
};

export type DropLockErrorType =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "DUPLICATE_ORDER"
  | "NO_LOCKER_AVAILABLE"
  | "INTERNAL_ERROR"
  | "TIMEOUT"
  | "VALIDATION_ERROR";

export type DropLockErrorResponse = {
  success: false;
  errorType: DropLockErrorType;
  message: string;
  existingBookingId?: string;
};

export type DropLockResponse = DropLockSuccessResponse | DropLockErrorResponse;

// ──────────────────────────────────────────────
// Mode
// ──────────────────────────────────────────────

const MODE = process.env.DROPLOCK_MODE ?? "mock";
const BASE_URL = process.env.DROPLOCK_BASE_URL ?? "";
const API_KEY = process.env.DROPLOCK_API_KEY ?? "";

// ──────────────────────────────────────────────
// Mock response
// ──────────────────────────────────────────────

function generateMockId(prefix: string): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = prefix + "_";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function mockResponse(
  payload: DropLockPayload
): Promise<DropLockSuccessResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  const bookingId = generateMockId("bk");
  const lockerNum = Math.floor(Math.random() * 20) + 1;
  const lockerId = `L${String(lockerNum).padStart(2, "0")}`;

  return {
    success: true,
    booking: {
      bookingId,
      partnerOrderId: payload.partnerOrderId,
      userId: generateMockId("usr"),
      courierId: generateMockId("usr"),
      sectorId: payload.sectorId,
      lockerId,
      status: "DROP_PENDING",
    },
    qr: {
      tokenId: generateMockId("qt"),
      purpose: "COURIER_DROP",
      expiresAt: payload.deliveryWindow.endAt,
    },
    email: {
      sentTo: payload.websiteAdminEmail,
      type: "COURIER_DROP",
    },
  };
}

// ──────────────────────────────────────────────
// Live client
// ──────────────────────────────────────────────

async function liveCreateBooking(
  payload: DropLockPayload
): Promise<DropLockResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${BASE_URL}/api/v1/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const data = await res.json();

    if (res.ok) {
      return data as DropLockSuccessResponse;
    }

    // Map HTTP status to error types
    const detail = data?.detail;
    switch (res.status) {
      case 401:
        return {
          success: false,
          errorType: "UNAUTHORIZED",
          message:
            "Integration misconfigured. Contact support.",
        };
      case 403:
        return {
          success: false,
          errorType: "FORBIDDEN",
          message: "Sector not authorized. Contact support.",
        };
      case 409:
        return {
          success: false,
          errorType: "DUPLICATE_ORDER",
          message:
            "Order may already exist. Check your email or contact support.",
          existingBookingId:
            typeof detail === "object"
              ? detail?.existingBookingId
              : undefined,
        };
      case 503:
        return {
          success: false,
          errorType: "NO_LOCKER_AVAILABLE",
          message:
            "No lockers available right now. Please retry in a few minutes.",
        };
      default:
        return {
          success: false,
          errorType: "INTERNAL_ERROR",
          message:
            "Something went wrong. Your order may have been placed — do not retry. Check your email or contact support.",
        };
    }
  } catch (error) {
    clearTimeout(timeout);

    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        success: false,
        errorType: "TIMEOUT",
        message:
          "Something went wrong. Your order may have been placed — do not retry. Check your email or contact support.",
      };
    }

    return {
      success: false,
      errorType: "INTERNAL_ERROR",
      message:
        "Something went wrong. Your order may have been placed — do not retry. Check your email or contact support.",
    };
  }
}

// ──────────────────────────────────────────────
// Public API
// ──────────────────────────────────────────────

export const DropLockClient = {
  async createBooking(payload: DropLockPayload): Promise<DropLockResponse> {
    if (MODE === "mock") {
      return mockResponse(payload);
    }
    return liveCreateBooking(payload);
  },
};
