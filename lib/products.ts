export interface Product {
  slug: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  images?: string[];
  category: string;
  features: string[];
  purchaseUrl?: string;
  stlFiles?: string[]; // filenames in private/stl/ — served securely via /api/download
}

export const products: Product[] = [
  {
    slug: "tacoma-raptor-light-brackets",
    name: "Tacoma Raptor Light Brackets",
    price: 8,
    description:
      "3D-printed light pod brackets for the 3rd Gen Toyota Tacoma OEM honeycomb grille. Mounts lights cleanly in the factory grille openings.",
    longDescription:
      "These brackets are designed specifically for the 3rd Gen Toyota Tacoma (2016–2023) with the OEM honeycomb grille. They mount light pods directly into the factory grille openings for a clean, no-drill install. Sized and shaped to fit the honeycomb cell geometry precisely, giving you a tight, rattle-free fit. Print in PETG or ASA for heat and UV resistance. Includes both left and right brackets.",
    image: "/products/RAPTOR LIGHT BRACKET--01.jpg",
    images: [
      "/products/RAPTOR LIGHT BRACKET--01.jpg",
      "/products/RAPTOR LIGHT BRACKET--02.jpg",
      "/products/RAPTOR LIGHT BRACKET--03.jpg",
      "/products/RAPTOR LIGHT BRACKET--04-CAD.jpg",
    ],
    category: "Lighting",
    features: [
      "Fits 3rd Gen Tacoma OEM honeycomb grille",
      "Clean, no-drill light pod mounting",
      "Left and right brackets included",
      "Print in PETG or ASA for durability",
    ],
    stlFiles: [
      "Tacoma_Raptor_Light_Brackets.stl",
      "Raptor_Light_Clip.stl",
    ],
  },
  {
    slug: "pelican-3310-els-bracket",
    name: "Pelican 3310 ELS Bed Rail Bracket",
    price: 5,
    description:
      "Print-ready STL bracket designed to mount the Pelican 3310 ELS Emergency Lighting Station to your truck bed rail for quick, easy access.",
    longDescription:
      "Print-ready STL bracket designed to mount the Pelican 3310 ELS Emergency Lighting Station to your truck bed rail for quick, easy access. The Pelican 3310 ELS is a glow-in-the-dark photoluminescent flashlight that comes in a wall-mountable case — this bracket adapts that mount for truck bed rail use. Supports required. Print in PETG, ABS, or ASA for UV and heat resistance.",
    image: "/products/Pelican_3310_ELS_Bracket_CAD.jpg",
    category: "Storage & Organization",
    features: [
      "Mounts Pelican 3310 ELS to truck bed rail",
      "Adapts factory wall-mount case for truck use",
      "Glow-in-the-dark flashlight always within reach",
      "Print in PETG, ABS, or ASA for UV and heat resistance",
    ],
    stlFiles: ["Pelican_3310_ELS_Bracket.stl"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
