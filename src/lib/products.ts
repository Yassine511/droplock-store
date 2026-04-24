export type Product = {
  slug: string;
  name: string;
  description: string;
  priceMilliDT: number;
  weightGrams: number;
  category: string;
  imageUrl: string;
  stock: number;
};

export const products: Product[] = [
  // ── AUDIO: EARBUDS ──────────────────────────────────
  {
    slug: "airpods-pro-2",
    name: "AirPods Pro (2nd Gen)",
    description:
      "Active noise cancellation, adaptive transparency, and personalized spatial audio. MagSafe charging case with Precision Finding.",
    priceMilliDT: 149000,
    weightGrams: 51,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80&auto=format&fit=crop",
    stock: 12,
  },
  {
    slug: "galaxy-buds2-pro",
    name: "Galaxy Buds2 Pro",
    description:
      "Hi-Fi 24-bit audio with intelligent ANC. IPX7 waterproof, 360° Audio with head tracking, 8-hour battery.",
    priceMilliDT: 119000,
    weightGrams: 61,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80&auto=format&fit=crop",
    stock: 8,
  },
  {
    slug: "jabra-elite-5",
    name: "Jabra Elite 5",
    description:
      "Hybrid ANC with six-microphone call clarity. Multipoint connection, IP55 rated, 28-hour total battery life.",
    priceMilliDT: 89000,
    weightGrams: 55,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80&auto=format&fit=crop",
    stock: 15,
  },

  // ── AUDIO: HEADPHONES ────────────────────────────────
  {
    slug: "sony-wh1000xm5",
    name: "Sony WH-1000XM5",
    description:
      "Industry-leading noise cancellation with eight microphones and two processors. 30-hour battery, multipoint pairing.",
    priceMilliDT: 349000,
    weightGrams: 250,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80&auto=format&fit=crop",
    stock: 6,
  },
  {
    slug: "bose-qc45",
    name: "Bose QuietComfort 45",
    description:
      "World-class noise cancelling with TriPort acoustic architecture. Aware Mode lets ambient sound through. 24-hour battery.",
    priceMilliDT: 299000,
    weightGrams: 238,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format&fit=crop",
    stock: 9,
  },
  {
    slug: "anker-q45",
    name: "Anker Soundcore Q45",
    description:
      "Adaptive hybrid noise cancellation with LDAC Hi-Res Audio. 50-hour battery, foldable design, ultra-soft cushions.",
    priceMilliDT: 89000,
    weightGrams: 295,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80&auto=format&fit=crop",
    stock: 20,
  },
  {
    slug: "audio-technica-m50xbt2",
    name: "Audio-Technica M50xBT2",
    description:
      "Professional studio monitor headphones with wireless freedom. 50-hour battery, aptX HD, multi-device connectivity.",
    priceMilliDT: 189000,
    weightGrams: 310,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&q=80&auto=format&fit=crop",
    stock: 7,
  },

  // ── AUDIO: SPEAKERS ──────────────────────────────────
  {
    slug: "jbl-charge-5",
    name: "JBL Charge 5",
    description:
      "Powerful portable speaker with 20 hours of playtime. IP67 waterproof, USB-A charging output, JBL PartyBoost support.",
    priceMilliDT: 129000,
    weightGrams: 960,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80&auto=format&fit=crop",
    stock: 11,
  },
  {
    slug: "bose-soundlink-flex",
    name: "Bose SoundLink Flex",
    description:
      "Rugged portable speaker built for the outdoors. Waterproof, floatable, PositionIQ technology, 12-hour battery.",
    priceMilliDT: 149000,
    weightGrams: 590,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80&auto=format&fit=crop",
    stock: 5,
  },

  // ── KEYBOARDS ────────────────────────────────────────
  {
    slug: "mk84-mechanical",
    name: "MK-84 Mechanical Keyboard",
    description:
      "Hot-swappable Gateron switches, PBT double-shot keycaps, RGB per-key lighting. Compact tenkeyless layout with USB-C detachable cable.",
    priceMilliDT: 89000,
    weightGrams: 900,
    category: "Keyboards",
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80&auto=format&fit=crop",
    stock: 14,
  },
  {
    slug: "logitech-mx-keys",
    name: "Logitech MX Keys",
    description:
      "Slim wireless keyboard with spherically dished keys for precise, comfortable typing. Smart backlighting, USB-C, 10-day battery.",
    priceMilliDT: 129000,
    weightGrams: 810,
    category: "Keyboards",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
    stock: 10,
  },
  {
    slug: "keychron-k2-v2",
    name: "Keychron K2 V2",
    description:
      "Compact 75% wireless mechanical keyboard with hot-swappable Gateron switches. Mac/Windows compatible, RGB backlit, aluminum frame.",
    priceMilliDT: 79000,
    weightGrams: 663,
    category: "Keyboards",
    imageUrl:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&q=80&auto=format&fit=crop",
    stock: 18,
  },
  {
    slug: "apple-magic-keyboard",
    name: "Apple Magic Keyboard",
    description:
      "Ultra-slim wireless keyboard with scissor mechanism keys. Touch ID, USB-C charging, seamless pairing with Apple devices.",
    priceMilliDT: 109000,
    weightGrams: 243,
    category: "Keyboards",
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80&auto=format&fit=crop",
    stock: 8,
  },

  // ── MICE ─────────────────────────────────────────────
  {
    slug: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S",
    description:
      "8K DPI precision tracking on any surface. MagSpeed electromagnetic scroll wheel, USB-C, multi-device with Easy Switch.",
    priceMilliDT: 119000,
    weightGrams: 141,
    category: "Mice",
    imageUrl:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80&auto=format&fit=crop",
    stock: 13,
  },
  {
    slug: "razer-deathadder-v3",
    name: "Razer DeathAdder V3",
    description:
      "Ultra-lightweight ergonomic gaming mouse at 59g. Focus Pro 30K optical sensor, 6 programmable buttons, 90-hour battery.",
    priceMilliDT: 99000,
    weightGrams: 59,
    category: "Mice",
    imageUrl:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80&auto=format&fit=crop",
    stock: 16,
  },

  // ── WEARABLES ────────────────────────────────────────
  {
    slug: "apple-watch-s9",
    name: "Apple Watch Series 9",
    description:
      "The most powerful Apple Watch yet. S9 chip, Double Tap gesture, always-on Retina display, advanced health sensors, 18-hour battery.",
    priceMilliDT: 499000,
    weightGrams: 51,
    category: "Wearables",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop",
    stock: 6,
  },
  {
    slug: "garmin-venu-3",
    name: "Garmin Venu 3",
    description:
      "Premium AMOLED GPS smartwatch with wheelchair activity profiles. Nap detection, sleep coaching, 14-day battery life.",
    priceMilliDT: 389000,
    weightGrams: 49,
    category: "Wearables",
    imageUrl:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80&auto=format&fit=crop",
    stock: 4,
  },
  {
    slug: "xiaomi-band-8",
    name: "Xiaomi Smart Band 8",
    description:
      "Ultra-thin fitness tracker with 16-day battery life. 150+ sport modes, blood oxygen monitoring, always-on AMOLED.",
    priceMilliDT: 39000,
    weightGrams: 25,
    category: "Wearables",
    imageUrl:
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&q=80&auto=format&fit=crop",
    stock: 30,
  },

  // ── DESK & MONITORS ──────────────────────────────────
  {
    slug: "benq-mobiuz-27",
    name: 'BenQ MOBIUZ 27" Monitor',
    description:
      "IPS panel, 165Hz refresh rate, HDRi technology, 1ms response time. Built-in 2.1 speakers with treVolo tuning.",
    priceMilliDT: 749000,
    weightGrams: 5400,
    category: "Monitors",
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80&auto=format&fit=crop",
    stock: 3,
  },
  {
    slug: "benq-screenbar",
    name: "BenQ ScreenBar Light",
    description:
      "Monitor-mounted LED light bar with auto-dimming sensor. Asymmetric optical design avoids screen glare, USB powered.",
    priceMilliDT: 89000,
    weightGrams: 530,
    category: "Desk",
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80&auto=format&fit=crop",
    stock: 12,
  },
  {
    slug: "usb-c-hub-7port",
    name: "7-in-1 USB-C Hub",
    description:
      "Expands your USB-C port to HDMI 4K@60Hz, 3× USB-A 3.0, SD/microSD, 100W PD pass-through. Aluminum chassis, bus-powered.",
    priceMilliDT: 55000,
    weightGrams: 86,
    category: "Desk",
    imageUrl:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80&auto=format&fit=crop",
    stock: 22,
  },
  {
    slug: "vertical-laptop-stand",
    name: "Vertical Laptop Stand",
    description:
      "Adjustable aluminum vertical stand for laptops 11–17 inches. Saves 80% desk space, anti-slip silicone grips, tool-free setup.",
    priceMilliDT: 35000,
    weightGrams: 310,
    category: "Desk",
    imageUrl:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80&auto=format&fit=crop",
    stock: 25,
  },

  // ── CHARGING ─────────────────────────────────────────
  {
    slug: "anker-powerbank-20k",
    name: "Anker PowerCore 20K",
    description:
      "20,000mAh high-capacity power bank with PowerIQ 3.0. Two USB-A + one USB-C output, 25W fast charging, charges most phones 4–5×.",
    priceMilliDT: 79000,
    weightGrams: 356,
    category: "Charging",
    imageUrl:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80&auto=format&fit=crop",
    stock: 18,
  },
  {
    slug: "belkin-magsafe-pad",
    name: "Belkin MagSafe Charger",
    description:
      "Official MFi-certified MagSafe charging pad for iPhone. 15W fast wireless charging, braided cable, perfect magnetic alignment.",
    priceMilliDT: 59000,
    weightGrams: 95,
    category: "Charging",
    imageUrl:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80&auto=format&fit=crop",
    stock: 14,
  },

  // ── PHONE ACCESSORIES ────────────────────────────────
  {
    slug: "peak-design-case",
    name: "Peak Design iPhone Case",
    description:
      "Ultra-slim everyday case with built-in MagSafe ecosystem compatibility. Military-grade drop protection, raised edges, 100% recycled materials.",
    priceMilliDT: 55000,
    weightGrams: 40,
    category: "Phone",
    imageUrl:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80&auto=format&fit=crop",
    stock: 20,
  },
  {
    slug: "moft-phone-stand",
    name: "MOFT Snap Phone Stand",
    description:
      "Ultra-thin magnetic phone stand that folds completely flat. MagSafe compatible, multiple angles, works as wallet, weighs 26g.",
    priceMilliDT: 35000,
    weightGrams: 26,
    category: "Phone",
    imageUrl:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80&auto=format&fit=crop",
    stock: 30,
  },

  // ── TRAVEL & CARRY ───────────────────────────────────
  {
    slug: "nomad-tech-pouch",
    name: "Nomad Tech Pouch",
    description:
      "Premium Horween leather tech organizer with elastic loops for cables, adapters, and drives. Interior dimensions 22×12cm.",
    priceMilliDT: 89000,
    weightGrams: 185,
    category: "Travel",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&auto=format&fit=crop",
    stock: 9,
  },
  {
    slug: "laptop-sleeve-mbp",
    name: 'Felt Laptop Sleeve 14"',
    description:
      "Merino wool felt laptop sleeve with secure velcro closure. Slim, soft interior lining, fits MacBook Pro 14\" and similar.",
    priceMilliDT: 49000,
    weightGrams: 220,
    category: "Travel",
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop",
    stock: 16,
  },
  {
    slug: "anker-cable-kit",
    name: "Anker Cable Organizer Kit",
    description:
      "Set of 10 reusable silicone cable ties and 6 adhesive cable clips. Tangle-free desk and bag management, heat-resistant.",
    priceMilliDT: 19000,
    weightGrams: 65,
    category: "Travel",
    imageUrl:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80&auto=format&fit=crop",
    stock: 50,
  },

  // ── STATIONERY ───────────────────────────────────────
  {
    slug: "leuchtturm-a5-dotted",
    name: "Leuchtturm1917 Notebook A5",
    description:
      "Classic hardcover dotted notebook with 251 numbered pages, two bookmarks, and pocket. Acid-free paper, thread-bound.",
    priceMilliDT: 35000,
    weightGrams: 330,
    category: "Stationery",
    imageUrl:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80&auto=format&fit=crop",
    stock: 25,
  },
  {
    slug: "lamy-safari-pen",
    name: "LAMY Safari Fountain Pen",
    description:
      "Iconic ABS plastic fountain pen with stainless steel nib. Ergonomic grip, transparent ink window, converter included.",
    priceMilliDT: 45000,
    weightGrams: 17,
    category: "Stationery",
    imageUrl:
      "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80&auto=format&fit=crop",
    stock: 20,
  },
  {
    slug: "ceramic-pour-mug",
    name: "Ceramic Pour-Over Mug Set",
    description:
      "Handmade ceramic mug with matching pour-over dripper. Matte glaze, heat-retaining thick walls, 350ml capacity.",
    priceMilliDT: 55000,
    weightGrams: 420,
    category: "Stationery",
    imageUrl:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80&auto=format&fit=crop",
    stock: 12,
  },

  // ── GAMING ───────────────────────────────────────────
  {
    slug: "dualsense-controller",
    name: "PS5 DualSense Controller",
    description:
      "Haptic feedback and adaptive triggers provide physical sensations matched to in-game actions. Built-in microphone, USB-C charging.",
    priceMilliDT: 179000,
    weightGrams: 280,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80&auto=format&fit=crop",
    stock: 8,
  },
  {
    slug: "switch-carrying-case",
    name: "Nintendo Switch Case",
    description:
      "EVA hard shell carrying case fits Nintendo Switch OLED. Holds 24 game cards, 4 Joy-Con straps, and accessories.",
    priceMilliDT: 25000,
    weightGrams: 180,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80&auto=format&fit=crop",
    stock: 22,
  },
  {
    slug: "xl-desk-mousepad",
    name: "XL Gaming Desk Mat",
    description:
      "900×400mm extended mousepad with anti-slip rubber base and stitched edges. Smooth micro-weave surface, 4mm thick.",
    priceMilliDT: 39000,
    weightGrams: 540,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=800&q=80&auto=format&fit=crop",
    stock: 18,
  },
  {
    slug: "ps5-charging-dock",
    name: "DualSense Charging Station",
    description:
      "Officially licensed dual charging dock for two DualSense controllers simultaneously. LED indicators, USB-C, 3-hour full charge.",
    priceMilliDT: 55000,
    weightGrams: 245,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80&auto=format&fit=crop",
    stock: 10,
  },

  // ── E-READERS ────────────────────────────────────────
  {
    slug: "kindle-paperwhite-5",
    name: "Kindle Paperwhite 11th Gen",
    description:
      '6.8" 300ppi display, adjustable warm light, IPX8 waterproof, weeks of battery. Thin, light, holds thousands of books.',
    priceMilliDT: 149000,
    weightGrams: 205,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&q=80&auto=format&fit=crop",
    stock: 7,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(milliDT: number): string {
  const dt = milliDT / 1000;
  const [whole, decimal] = dt.toFixed(3).split(".");
  return `${whole}.${decimal} DT`;
}
