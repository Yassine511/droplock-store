# DropLock Storefront

A production-grade Next.js 14 e-commerce storefront for **DropLock** — a smart locker delivery platform. Customers purchase products online and the system automatically reserves a smart locker for secure, contactless delivery via a Raspberry Pi–controlled IoT lock.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs in **mock mode** by default — no Raspberry Pi or DropLock API needed.

## Architecture

```
Browser → Next.js Frontend → POST /api/checkout → DropLock API (Pi)
                                                    ↓
                                              Firebase RTDB
```

- **Frontend**: Static product catalog, Zustand cart, client-side forms
- **Server route**: `POST /api/checkout` — the single server-side endpoint
- **DropLock API**: FastAPI on Raspberry Pi 4B (or mock mode)

## Environment Variables

Create `.env.local`:

```env
DROPLOCK_BASE_URL=http://192.168.1.42:8000
DROPLOCK_API_KEY=your_partner_key_here
DROPLOCK_OPS_EMAIL=ops@droplock.tn
DROPLOCK_MODE=mock   # "mock" | "live"
```

### Mock Mode (default)

Set `DROPLOCK_MODE=mock` (or omit it). The checkout route returns fake booking data with a 400ms simulated delay. No Pi required.

### Live Mode

Set `DROPLOCK_MODE=live` and configure `DROPLOCK_BASE_URL` and `DROPLOCK_API_KEY` to point at your running DropLock API instance.

## Security Model

- **`DROPLOCK_API_KEY` never reaches the browser.** It's read only by `src/lib/droplock-client.ts`, which uses `import "server-only"` to prevent accidental client-side bundling.
- The browser calls `POST /api/checkout` (Next.js Route Handler). The route handler calls the Pi API server-to-server.
- No `NEXT_PUBLIC_*` variables expose secrets.

## Idempotency

The checkout route uses an `HttpOnly; SameSite=Strict` cookie (`dl_attempt_id`) to ensure:

1. If the browser refreshes during checkout, the same `partnerOrderId` is reused
2. Duplicate bookings are prevented at the DropLock API level
3. The cookie is cleared on successful checkout
4. On failure, the cookie persists to allow safe retry

## Error Handling

| API Status | Error Type | Behavior |
|------------|-----------|----------|
| 401 | UNAUTHORIZED | "Integration misconfigured" — no retry |
| 403 | FORBIDDEN | "Sector not authorized" — no retry |
| 409 | DUPLICATE_ORDER | "Order may already exist" — no retry |
| 503 | NO_LOCKER_AVAILABLE | "No lockers available" — retry allowed |
| 500 | INTERNAL_ERROR | Ambiguous — warn user not to retry |
| Timeout | TIMEOUT | Ambiguous — warn user not to retry |

## Adding Products

Edit `src/lib/products.ts`. Each product needs:

```ts
{
  slug: "url-safe-slug",
  name: "Product Name",
  description: "Description text",
  priceMilliDT: 149000,    // 149.000 DT
  weightGrams: 500,         // 50 – 20000
  category: "Category",
  imageUrl: "https://...",
  stock: 10,
}
```

## Adding Sectors

Edit `src/lib/sectors.ts`:

```ts
export const SECTORS = [
  { id: "S1", label: "Sector 1 — Tunis Centre" },
  { id: "S2", label: "Sector 2 — La Marsa" },
  // Add more here
];
```

Sector IDs must match the `allowedSectorIds` configured for your partner in the DropLock API.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS v4**
- **shadcn/ui** (Button, Card, Badge, Input, Label, Select, Sheet, Skeleton, Sonner)
- **Framer Motion** (page transitions, staggered reveals, locker animation)
- **Zustand** (client-side cart state with localStorage persistence)
- **nanoid** (idempotent `partnerOrderId` generation)
- **server-only** (prevent API key leakage)

## Project Structure

```
src/
  app/
    layout.tsx                    # Root layout — fonts, nav, toast
    page.tsx                      # Product catalog grid
    loading.tsx                   # Skeleton loader
    error.tsx                     # Error boundary
    product/[slug]/page.tsx       # Product detail
    cart/page.tsx                 # Cart review
    checkout/page.tsx             # Checkout form + summary
    order/success/page.tsx        # Booking confirmation
    order/failure/page.tsx        # Error with attempt ID
    api/checkout/route.ts         # Server route — calls DropLock API
  components/
    Navbar.tsx                    # Floating glass nav
    CartPill.tsx                  # Fixed cart indicator
    ProductCard.tsx               # Product grid card
    CartSummary.tsx               # Cart item list
    CheckoutForm.tsx              # Checkout form with validation
    BookingStatusBadge.tsx        # Status badge component
    LockerAnimation.tsx           # SVG animated locker
  lib/
    products.ts                   # Static product catalog
    sectors.ts                    # Sector definitions
    droplock-client.ts            # Server-only API client
    cart-store.ts                 # Zustand cart store
    checkout-utils.ts             # Validation & window computation
```
