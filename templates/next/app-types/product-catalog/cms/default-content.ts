import type { Category, Product, ProductCatalogContent } from "./schema";

export const productCatalogDefaultContent: ProductCatalogContent = {
  published: true,
  headline: "Modern essentials for everyday style",
  subtitle: "A polished storefront for fashion, lifestyle, and curated retail catalogs with campaign sections, product rails, category browsing, and direct inquiry CTAs.",
  about: "Built for boutique retailers, local fashion labels, lifestyle shops, and catalog-first teams that need a visual storefront without managing a full checkout stack.",
  trustHeadline: "A storefront designed for confident browsing",
  trustPoints: [
    "Published-only catalog reads keep draft products private",
    "Campaign, category, and product sections help visitors find collections faster",
    "Inquiry-first CTAs support assisted sales without checkout complexity"
  ],
  whatsappCta: "Ask for availability",
  whatsappUrl: "",
  seoTitle: "Modern Fashion Product Catalog",
  seoDescription: "A responsive fashion and lifestyle product catalog with CMS, Firebase, product management, and contact CTAs."
};

export const defaultCategories: Category[] = [
  { id: "clothing", published: true, featured: true, name: "Clothing", description: "Layerable shirts, jackets, knitwear, and everyday wardrobe staples." },
  { id: "accessories", published: true, featured: true, name: "Accessories", description: "Bags, belts, eyewear, and compact details that complete the look." },
  { id: "sneakers", published: true, featured: true, name: "Sneakers", description: "Daily footwear with clean profiles, soft palettes, and comfortable builds." },
  { id: "beauty", published: true, featured: false, name: "Beauty", description: "Compact beauty essentials for campaign bundles and lifestyle shelves." }
];

export const defaultProducts: Product[] = [
  {
    id: "linen-resort-shirt",
    published: true,
    featured: true,
    name: "Linen Resort Shirt",
    shortDescription: "A breathable linen shirt with relaxed tailoring and a soft drape.",
    description: "A lightweight resort shirt designed for warm days, layered outfits, and effortless catalog styling. The relaxed cut keeps the look polished without feeling formal.",
    imageUrl: "",
    imageAlt: "Neutral linen resort shirt",
    imageTone: "from-rose-100 via-stone-100 to-orange-100",
    category: "Clothing",
    price: "$58",
    status: "Available",
    specifications: [
      { label: "Material", value: "Washed linen blend" },
      { label: "Fit", value: "Relaxed unisex cut" },
      { label: "Colors", value: "Ivory, Sand, Coral" }
    ],
    seoTitle: "Linen Resort Shirt",
    seoDescription: "A breathable linen resort shirt for modern fashion catalogs."
  },
  {
    id: "cropped-utility-jacket",
    published: true,
    featured: true,
    name: "Cropped Utility Jacket",
    shortDescription: "A structured cropped jacket with oversized pockets and matte snaps.",
    description: "A statement outer layer that works across campaign, streetwear, and weekend edits. The compact silhouette pairs with wide trousers, denim, and neutral basics.",
    imageUrl: "",
    imageAlt: "Cropped utility jacket",
    imageTone: "from-orange-100 via-stone-100 to-zinc-200",
    category: "Clothing",
    price: "$92",
    status: "Available",
    specifications: [
      { label: "Material", value: "Cotton twill" },
      { label: "Details", value: "Oversized front pockets" },
      { label: "Fit", value: "Cropped box fit" }
    ],
    seoTitle: "Cropped Utility Jacket",
    seoDescription: "A cropped utility jacket for fashion product catalogs."
  },
  {
    id: "wide-leg-trouser",
    published: true,
    featured: true,
    name: "Wide Leg Trouser",
    shortDescription: "A high-rise trouser with clean pleats and soft movement.",
    description: "A polished everyday trouser for studio, office, and off-duty looks. The fabric falls cleanly and makes the product card feel editorial without needing complex photography.",
    imageUrl: "",
    imageAlt: "Wide leg trouser",
    imageTone: "from-slate-100 via-stone-100 to-sky-100",
    category: "Clothing",
    price: "$76",
    status: "Available",
    specifications: [
      { label: "Material", value: "Tencel blend" },
      { label: "Waist", value: "High rise" },
      { label: "Sizes", value: "XS to XL" }
    ],
    seoTitle: "Wide Leg Trouser",
    seoDescription: "A high-rise wide leg trouser for modern retail catalogs."
  },
  {
    id: "woven-market-bag",
    published: true,
    featured: false,
    name: "Woven Market Bag",
    shortDescription: "A soft structured bag for daily errands, weekend markets, and travel.",
    description: "A tactile accessory with a roomy interior and clean silhouette. It gives lifestyle catalogs a warm, handcrafted product moment without using branded imagery.",
    imageUrl: "",
    imageAlt: "Woven market bag",
    imageTone: "from-amber-100 via-stone-100 to-sky-100",
    category: "Accessories",
    price: "$42",
    status: "Available",
    specifications: [
      { label: "Material", value: "Recycled woven fiber" },
      { label: "Capacity", value: "18 L" },
      { label: "Details", value: "Inner zip pocket" }
    ],
    seoTitle: "Woven Market Bag",
    seoDescription: "A woven market bag for lifestyle catalog websites."
  },
  {
    id: "daily-canvas-sneaker",
    published: true,
    featured: false,
    name: "Daily Canvas Sneaker",
    shortDescription: "A clean low-top sneaker with a flexible sole and minimal stitching.",
    description: "A comfortable everyday sneaker with a quiet profile that works across fashion, lifestyle, and back-to-school collections.",
    imageUrl: "",
    imageAlt: "Daily canvas sneaker",
    imageTone: "from-blue-100 via-stone-100 to-zinc-100",
    category: "Sneakers",
    price: "$64",
    status: "Limited stock",
    specifications: [
      { label: "Upper", value: "Organic cotton canvas" },
      { label: "Sole", value: "Flexible rubber" },
      { label: "Sizes", value: "36 to 45" }
    ],
    seoTitle: "Daily Canvas Sneaker",
    seoDescription: "A low-top canvas sneaker for retail catalog websites."
  },
  {
    id: "soft-rib-sweater",
    published: true,
    featured: false,
    name: "Soft Rib Sweater",
    shortDescription: "A midweight rib sweater with a clean neckline and relaxed sleeves.",
    description: "A cozy knit for seasonal edits and soft campaign shelves. The shape is simple, the palette is flexible, and the description is ready for CMS edits.",
    imageUrl: "",
    imageAlt: "Soft rib sweater",
    imageTone: "from-purple-100 via-stone-100 to-pink-100",
    category: "Clothing",
    price: "$68",
    status: "Available",
    specifications: [
      { label: "Material", value: "Cotton merino blend" },
      { label: "Fit", value: "Relaxed sleeves" },
      { label: "Care", value: "Cold wash, dry flat" }
    ],
    seoTitle: "Soft Rib Sweater",
    seoDescription: "A soft rib sweater for seasonal fashion catalogs."
  },
  {
    id: "matte-lip-set",
    published: true,
    featured: false,
    name: "Matte Lip Set",
    shortDescription: "A compact trio of soft matte shades for daily wear and gifting.",
    description: "A beauty accessory that gives the catalog a broader lifestyle range. Use it for bundles, seasonal promos, or small-format product cards.",
    imageUrl: "",
    imageAlt: "Matte lip color set",
    imageTone: "from-pink-100 via-rose-100 to-stone-100",
    category: "Beauty",
    price: "$35",
    status: "Available",
    specifications: [
      { label: "Finish", value: "Soft matte" },
      { label: "Set", value: "Three wearable shades" },
      { label: "Use", value: "Daily, event, travel" }
    ],
    seoTitle: "Matte Lip Set",
    seoDescription: "A compact matte lip set for beauty and lifestyle catalogs."
  }
];
