import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";
import {
  validateCheckoutPayload,
  computeWindows,
  computeCartTotals,
  generatePartnerOrderId,
  type CheckoutPayload,
} from "@/lib/checkout-utils";
import { DropLockClient, type DropLockPayload } from "@/lib/droplock-client";

const COOKIE_NAME = "dl_attempt_id";

export async function POST(request: NextRequest) {
  try {
    // 1. Read or generate idempotency cookie
    const cookieStore = await cookies();
    let attemptId = cookieStore.get(COOKIE_NAME)?.value;
    const isNewAttempt = !attemptId;

    if (!attemptId) {
      attemptId = nanoid(12).replace(/[^A-Za-z0-9_-]/g, "X");
    }

    // 2. Parse and validate payload
    let body: CheckoutPayload;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          errorType: "VALIDATION_ERROR",
          message: "Invalid request body",
          attemptId,
        },
        { status: 400 }
      );
    }

    const errors = validateCheckoutPayload(body);
    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          errorType: "VALIDATION_ERROR",
          message: errors[0].message,
          errors,
          attemptId,
        },
        { status: 400 }
      );
    }

    // 3. Compute windows and totals
    const { deliveryWindow, pickupWindow } = computeWindows();
    const { totalPriceMilliDT, totalWeightGrams } = computeCartTotals(
      body.items
    );

    // 4. Validate weight bounds
    if (totalWeightGrams < 50) {
      return NextResponse.json(
        {
          success: false,
          errorType: "VALIDATION_ERROR",
          message: "Total weight must be at least 50g",
          attemptId,
        },
        { status: 400 }
      );
    }
    if (totalWeightGrams > 20000) {
      return NextResponse.json(
        {
          success: false,
          errorType: "VALIDATION_ERROR",
          message: `Total weight (${totalWeightGrams}g) exceeds the 20kg locker limit`,
          attemptId,
        },
        { status: 400 }
      );
    }

    // 5. Build DropLock payload
    const partnerOrderId = generatePartnerOrderId();
    const opsEmail = process.env.DROPLOCK_OPS_EMAIL || "ops@droplock.tn";

    const droplockPayload: DropLockPayload = {
      partnerOrderId,
      sectorId: body.sectorId,
      websiteAdminEmail: opsEmail,
      customer: {
        name: body.customer.name,
        email: body.customer.email,
        phone: body.customer.phone,
      },
      deliveryWindow,
      pickupWindow,
      expectedWeightGrams: totalWeightGrams,
      priceMilliDT: totalPriceMilliDT,
    };

    // 6. Call DropLock API
    const result = await DropLockClient.createBooking(droplockPayload);

    // 7. Handle result
    if (result.success) {
      // Clear idempotency cookie on success
      const response = NextResponse.json({
        success: true,
        booking: result.booking,
        locker: {
          lockerId: result.booking.lockerId,
          sectorId: result.booking.sectorId,
        },
      });

      response.cookies.set(COOKIE_NAME, "", {
        httpOnly: true,
        sameSite: "strict",
        path: "/api/checkout",
        maxAge: 0,
      });

      return response;
    }

    // Error — set idempotency cookie if new (allow retry with same ID)
    const errorResponse = NextResponse.json(
      {
        success: false,
        errorType: result.errorType,
        message: result.message,
        attemptId,
        existingBookingId: result.existingBookingId,
      },
      {
        status:
          result.errorType === "UNAUTHORIZED"
            ? 401
            : result.errorType === "FORBIDDEN"
              ? 403
              : result.errorType === "DUPLICATE_ORDER"
                ? 409
                : result.errorType === "NO_LOCKER_AVAILABLE"
                  ? 503
                  : 500,
      }
    );

    if (isNewAttempt) {
      errorResponse.cookies.set(COOKIE_NAME, attemptId, {
        httpOnly: true,
        sameSite: "strict",
        path: "/api/checkout",
        maxAge: 60 * 60, // 1 hour
      });
    }

    return errorResponse;
  } catch (error) {
    console.error("Checkout route error:", error);
    return NextResponse.json(
      {
        success: false,
        errorType: "INTERNAL_ERROR",
        message:
          "Something went wrong. Your order may have been placed — do not retry. Check your email or contact support.",
        attemptId: "unknown",
      },
      { status: 500 }
    );
  }
}
