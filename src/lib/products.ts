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
  {
    slug: "pulse-orange-droplock",
    name: "Pulse Orange Droplock",
    description:
      "Droplock tag with a pulse orange accent. Lightweight and ready for secure locker pickup.",
    priceMilliDT: 25000,
    weightGrams: 25,
    category: "Droplock",
    imageUrl: "/products/pulse-orange-droplock.jpeg",
    stock: 100,
  },
  {
    slug: "red-velvet-droplock",
    name: "Red Velvet Droplock",
    description:
      "Droplock tag with a red velvet accent. Lightweight and ready for secure locker pickup.",
    priceMilliDT: 25000,
    weightGrams: 25,
    category: "Droplock",
    imageUrl: "/products/red-velvet-droplock.jpeg",
    stock: 100,
  },
  {
    slug: "samsung-note-10-plus",
    name: "Samsung Note 10+",
    description:
      "Samsung Note 10+ smartphone with S Pen and gradient finish.",
    priceMilliDT: 2000000,
    weightGrams: 196,
    category: "Phone",
    imageUrl: "/products/samsung-note-10-plus.jpeg",
    stock: 100,
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
