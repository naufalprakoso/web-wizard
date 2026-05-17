import type { Category, Product, ProductCatalogContent } from "./schema";

export const productCatalogDefaultContent: ProductCatalogContent = {
  published: true,
  headline: "A clear catalog for your best products",
  subtitle: "Showcase best-selling items, help visitors compare categories, and route serious buyers to a direct contact or WhatsApp conversation.",
  about: "This catalog is for teams that need product pages and direct buyer contact without checkout, carts, or payment flows.",
  whatsappCta: "Ask about this product",
  whatsappUrl: "https://wa.me/6200000000000",
  seoTitle: "Premium Product Catalog",
  seoDescription: "A responsive product catalog website with CMS, Firebase, product management, and contact CTAs."
};

export const defaultCategories: Category[] = [
  { id: "workspace", published: true, name: "Workspace", description: "Tools and furniture for focused teams." },
  { id: "travel", published: true, name: "Travel", description: "Durable essentials for people on the move." },
  { id: "home", published: true, name: "Home", description: "Useful pieces with refined materials." }
];

export const defaultProducts: Product[] = [
  {
    id: "modular-desk",
    published: true,
    featured: true,
    name: "Modular Oak Desk",
    description: "A clean work surface with integrated cable routing, soft edges, and a compact footprint for modern home offices.",
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80",
    category: "Workspace",
    price: "$420",
    status: "Available",
    seoTitle: "Modular Oak Desk",
    seoDescription: "A modular oak desk for focused home and studio work."
  },
  {
    id: "canvas-weekender",
    published: true,
    featured: true,
    name: "Canvas Weekender",
    description: "A structured travel bag with weather-resistant canvas, reinforced handles, and enough room for three-day trips.",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    category: "Travel",
    price: "$160",
    status: "Available",
    seoTitle: "Canvas Weekender",
    seoDescription: "A durable canvas weekender bag for short business and leisure trips."
  },
  {
    id: "ceramic-task-lamp",
    published: true,
    featured: false,
    name: "Ceramic Task Lamp",
    description: "A warm, directional lamp with a ceramic shade and dimmable control for desks, shelves, and bedside tables.",
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    category: "Home",
    price: "$95",
    status: "Available",
    seoTitle: "Ceramic Task Lamp",
    seoDescription: "A refined ceramic task lamp for warm interior lighting."
  }
];
