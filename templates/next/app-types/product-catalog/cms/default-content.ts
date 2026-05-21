import type { Category, Product, ProductCatalogContent } from "./schema";

export const productCatalogDefaultContent: ProductCatalogContent = {
  published: true,
  headline: "Curated products, presented with clarity",
  subtitle: "A premium catalog experience for teams that want buyers to browse, compare, and start a direct inquiry without the complexity of checkout.",
  about: "Built for product-led brands, studios, distributors, and small teams that need polished product pages, category browsing, and fast contact paths.",
  trustHeadline: "Designed for confident product discovery",
  trustPoints: [
    "CMS-ready product and category structure",
    "Inquiry-first calls to action for direct sales",
    "Responsive layouts tuned for mobile browsing"
  ],
  whatsappCta: "Ask about this product",
  whatsappUrl: "",
  seoTitle: "Premium Product Catalog",
  seoDescription: "A responsive product catalog website with CMS, Firebase, product management, and contact CTAs."
};

export const defaultCategories: Category[] = [
  { id: "workspace", published: true, featured: true, name: "Workspace", description: "Furniture and tools for focused, flexible work." },
  { id: "home", published: true, featured: true, name: "Home", description: "Warm interior pieces with durable everyday utility." },
  { id: "carry", published: true, featured: true, name: "Carry", description: "Soft goods and compact essentials for daily movement." }
];

export const defaultProducts: Product[] = [
  {
    id: "modular-oak-desk",
    published: true,
    featured: true,
    name: "Modular Oak Desk",
    shortDescription: "A compact oak desk with soft edges and integrated cable routing.",
    description: "A refined work surface for home offices, studios, and compact retail spaces. The modular frame keeps the profile light while the oak top brings warmth and long-term durability.",
    imageUrl: "",
    imageAlt: "Minimal oak writing desk with rounded corners",
    imageTone: "from-amber-100 via-stone-100 to-slate-200",
    category: "Workspace",
    price: "$420",
    status: "Available",
    specifications: [
      { label: "Material", value: "Oak veneer, powder-coated steel" },
      { label: "Dimensions", value: "120 x 62 x 74 cm" },
      { label: "Lead time", value: "Ships in 5-7 business days" }
    ],
    seoTitle: "Modular Oak Desk",
    seoDescription: "A modular oak desk for focused home and studio work."
  },
  {
    id: "linen-lounge-chair",
    published: true,
    featured: true,
    name: "Linen Lounge Chair",
    shortDescription: "A low-profile lounge chair with textured linen and a generous seat.",
    description: "A relaxed accent chair designed for reading corners, lobby spaces, and calm living rooms. The neutral upholstery lets the shape work across furniture, decor, and lifestyle catalogs.",
    imageUrl: "",
    imageAlt: "Neutral linen lounge chair",
    imageTone: "from-stone-200 via-zinc-100 to-emerald-100",
    category: "Home",
    price: "$310",
    status: "Available",
    specifications: [
      { label: "Material", value: "Linen blend, solid ash frame" },
      { label: "Seat height", value: "40 cm" },
      { label: "Care", value: "Removable cushion cover" }
    ],
    seoTitle: "Linen Lounge Chair",
    seoDescription: "A neutral linen lounge chair for premium home and decor catalogs."
  },
  {
    id: "ceramic-task-lamp",
    published: true,
    featured: true,
    name: "Ceramic Task Lamp",
    shortDescription: "A dimmable ceramic lamp for desks, shelves, and bedside tables.",
    description: "A warm directional lamp with a compact footprint and tactile ceramic shade. It adds a focused pool of light without overpowering the surrounding interior.",
    imageUrl: "",
    imageAlt: "Ceramic task lamp with warm shade",
    imageTone: "from-yellow-100 via-orange-100 to-stone-200",
    category: "Home",
    price: "$95",
    status: "Available",
    specifications: [
      { label: "Material", value: "Matte ceramic, brass switch" },
      { label: "Light", value: "Dimmable warm LED" },
      { label: "Cable", value: "1.8 m braided cord" }
    ],
    seoTitle: "Ceramic Task Lamp",
    seoDescription: "A refined ceramic task lamp for warm interior lighting."
  },
  {
    id: "canvas-travel-bag",
    published: true,
    featured: false,
    name: "Canvas Travel Bag",
    shortDescription: "A structured canvas bag for short trips and daily carry.",
    description: "A durable carryall with reinforced handles, weather-resistant canvas, and a practical interior layout for three-day trips, studio equipment, or everyday essentials.",
    imageUrl: "",
    imageAlt: "Neutral canvas travel bag",
    imageTone: "from-amber-100 via-stone-100 to-sky-100",
    category: "Carry",
    price: "$160",
    status: "Available",
    specifications: [
      { label: "Material", value: "Waxed cotton canvas" },
      { label: "Capacity", value: "32 L" },
      { label: "Details", value: "Reinforced handles, inner zip pocket" }
    ],
    seoTitle: "Canvas Travel Bag",
    seoDescription: "A neutral canvas travel bag for catalog and inquiry websites."
  },
  {
    id: "minimal-wall-shelf",
    published: true,
    featured: false,
    name: "Minimal Wall Shelf",
    shortDescription: "A slim display shelf for books, ceramics, and small decor.",
    description: "A clean wall-mounted shelf that creates a simple product display moment in homes, studios, and retail interiors.",
    imageUrl: "",
    imageAlt: "Minimal wall shelf with decor objects",
    imageTone: "from-slate-100 via-stone-100 to-rose-100",
    category: "Home",
    price: "$88",
    status: "Limited stock",
    specifications: [
      { label: "Material", value: "Ash wood, hidden bracket" },
      { label: "Dimensions", value: "80 x 18 x 5 cm" },
      { label: "Load", value: "Up to 12 kg" }
    ],
    seoTitle: "Minimal Wall Shelf",
    seoDescription: "A minimal wall shelf for home decor and product catalog websites."
  },
  {
    id: "everyday-tote-bag",
    published: true,
    featured: false,
    name: "Everyday Tote Bag",
    shortDescription: "A soft, structured tote for workdays and weekend errands.",
    description: "A neutral tote with reinforced seams, a padded laptop sleeve, and enough structure to stand cleanly in product photography and catalog grids.",
    imageUrl: "",
    imageAlt: "Everyday neutral tote bag",
    imageTone: "from-indigo-100 via-stone-100 to-teal-100",
    category: "Carry",
    price: "$72",
    status: "Available",
    specifications: [
      { label: "Material", value: "Recycled cotton canvas" },
      { label: "Fits", value: "Up to 14-inch laptop" },
      { label: "Care", value: "Spot clean only" }
    ],
    seoTitle: "Everyday Tote Bag",
    seoDescription: "A neutral everyday tote bag for premium product catalogs."
  },
  {
    id: "desktop-organizer-tray",
    published: true,
    featured: false,
    name: "Desktop Organizer Tray",
    shortDescription: "A low-profile tray for notebooks, tools, and daily desk essentials.",
    description: "A compact organizer that keeps workspace surfaces calm and intentional. The tray is designed for desks, counters, and studio shelves where small objects need a clean home.",
    imageUrl: "",
    imageAlt: "Minimal desktop organizer tray",
    imageTone: "from-zinc-100 via-stone-100 to-amber-100",
    category: "Workspace",
    price: "$48",
    status: "Available",
    specifications: [
      { label: "Material", value: "Pressed fiber composite" },
      { label: "Dimensions", value: "32 x 18 x 3 cm" },
      { label: "Finish", value: "Soft-touch matte coating" }
    ],
    seoTitle: "Desktop Organizer Tray",
    seoDescription: "A minimal desktop organizer tray for workspace product catalogs."
  }
];
