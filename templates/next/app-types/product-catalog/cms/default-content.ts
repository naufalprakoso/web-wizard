import type { Category, Product, ProductCatalogContent } from "./schema";

export const productCatalogDefaultContent: ProductCatalogContent = {
  published: true,
  heroImageUrl: "/template-visuals/product-fashion-hero.png",
  heroImageAlt: "Editorial fashion campaign with neutral modern outfits",
  campaignLabel: "Limited edit",
  campaignPeriod: "Spring 2026",
  campaignEyebrow: "Fashion campaign",
  headline: "Modern essentials for everyday style",
  subtitle: "A polished storefront for fashion, lifestyle, and curated retail catalogs with campaign sections, product rails, category browsing, and direct inquiry CTAs.",
  primaryCtaLabel: "Shop the edit",
  sideBanners: [
    {
      eyebrow: "Exclusive offer",
      title: "New streetwear drops",
      body: "Campaign-ready product sections for seasonal retail edits.",
      ctaLabel: "Explore",
      href: "#products",
      imageUrl: "/template-visuals/products/cropped-utility-jacket.webp",
      imageAlt: "Streetwear collection promotion",
      tone: "rose"
    },
    {
      eyebrow: "Accessories",
      title: "Bags, sneakers, beauty",
      body: "Use categories and rails to separate collections visually.",
      ctaLabel: "Explore",
      href: "#categories",
      imageUrl: "/template-visuals/products/woven-market-bag.webp",
      imageAlt: "Accessories collection promotion",
      tone: "violet"
    }
  ],
  categoryEyebrow: "Popular categories",
  categoryTitle: "Browse the shelves faster.",
  topDealsTitle: "Today's best deals",
  promoTiles: [
    { title: "Spring outfit picks", ctaLabel: "Shop now", href: "/products", imageUrl: "/template-visuals/products/linen-resort-shirt.webp", imageAlt: "Spring outfit collection", tone: "orange" },
    { title: "Daily sneakers edit", ctaLabel: "Explore", href: "/products?category=Sneakers", imageUrl: "/template-visuals/products/daily-canvas-sneaker.webp", imageAlt: "Daily sneakers collection", tone: "blue" },
    { title: "Essential accessories", ctaLabel: "View collection", href: "/products?category=Accessories", imageUrl: "/template-visuals/products/woven-market-bag.webp", imageAlt: "Essential accessories collection", tone: "purple" }
  ],
  accessoryRailTitle: "Accessories, sneakers, and beauty",
  finderEyebrow: "Style finder",
  finderTitle: "Search, filter, and sort the collection.",
  finderDescription: "Visitors can search by product, category, material, or availability. The CMS controls what is published, while the public page keeps the shopping flow fast and visual.",
  clothingRailTitle: "Clothing deals",
  brandStrip: ["City Edit", "Local Studio", "Daily Mode", "Soft Essentials", "Weekend Wear", "Market Select"],
  serviceBenefits: [
    { title: "Free pick up", body: "Collect local orders in store" },
    { title: "Fast shipping", body: "Clear delivery notes" },
    { title: "Flexible payment", body: "Inquiry-first purchase path" },
    { title: "Convenient help", body: "Product questions stay visible" }
  ],
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
    imageUrl: "/template-visuals/products/linen-resort-shirt.webp",
    imageAlt: "Neutral linen resort shirt",
    imageTone: "from-rose-100 via-stone-100 to-orange-100",
    category: "Clothing",
    price: "$58",
    compareAtPrice: "$77",
    rating: 4.8,
    soldCount: 986,
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
    imageUrl: "/template-visuals/products/cropped-utility-jacket.webp",
    imageAlt: "Cropped utility jacket",
    imageTone: "from-orange-100 via-stone-100 to-zinc-200",
    category: "Clothing",
    price: "$92",
    compareAtPrice: "$121",
    rating: 4.8,
    soldCount: 1134,
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
    name: "Wide Leg Denim",
    shortDescription: "Relaxed wide-leg denim with a clean wash and everyday structure.",
    description: "A versatile denim staple for studio, city, and off-duty looks. The wide silhouette gives clothing rails an editorial shape while staying familiar and easy to style.",
    imageUrl: "/template-visuals/products/wide-leg-trouser.webp",
    imageAlt: "Wide leg denim displayed on wooden hangers",
    imageTone: "from-slate-100 via-stone-100 to-sky-100",
    category: "Clothing",
    price: "$76",
    compareAtPrice: "$100",
    rating: 4.6,
    soldCount: 912,
    status: "Available",
    specifications: [
      { label: "Material", value: "Midweight cotton denim" },
      { label: "Waist", value: "High rise" },
      { label: "Sizes", value: "XS to XL" }
    ],
    seoTitle: "Wide Leg Denim",
    seoDescription: "Relaxed high-rise wide leg denim for modern retail catalogs."
  },
  {
    id: "woven-market-bag",
    published: true,
    featured: false,
    name: "Woven Market Bag",
    shortDescription: "A soft structured bag for daily errands, weekend markets, and travel.",
    description: "A tactile accessory with a roomy interior and clean silhouette. It gives lifestyle catalogs a warm, handcrafted product moment without using branded imagery.",
    imageUrl: "/template-visuals/products/woven-market-bag.webp",
    imageAlt: "Woven market bag",
    imageTone: "from-amber-100 via-stone-100 to-sky-100",
    category: "Accessories",
    price: "$42",
    compareAtPrice: "$55",
    rating: 4.6,
    soldCount: 912,
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
    imageUrl: "/template-visuals/products/daily-canvas-sneaker.webp",
    imageAlt: "Daily canvas sneaker",
    imageTone: "from-blue-100 via-stone-100 to-zinc-100",
    category: "Sneakers",
    price: "$64",
    compareAtPrice: "$84",
    rating: 4.6,
    soldCount: 1060,
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
    imageUrl: "/template-visuals/products/soft-rib-sweater.webp",
    imageAlt: "Soft rib sweater",
    imageTone: "from-purple-100 via-stone-100 to-pink-100",
    category: "Clothing",
    price: "$68",
    compareAtPrice: "$90",
    rating: 4.6,
    soldCount: 912,
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
    imageUrl: "/template-visuals/products/matte-lip-set.webp",
    imageAlt: "Matte lip color set",
    imageTone: "from-pink-100 via-rose-100 to-stone-100",
    category: "Beauty",
    price: "$35",
    compareAtPrice: "$46",
    rating: 4.7,
    soldCount: 801,
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
