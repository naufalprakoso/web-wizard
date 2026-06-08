"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category, Product } from "@/lib/app-type/cms/schema";

type CatalogExplorerProps = {
  products: Product[];
  categories: Category[];
  ctaLabel: string;
  compact?: boolean;
  syncUrl?: boolean;
};

type SortMode = "featured" | "price-asc" | "price-desc" | "newest";

export function CatalogExplorer({ products, categories, ctaLabel, compact = false, syncUrl = false }: CatalogExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortMode>("featured");

  useEffect(() => {
    if (!syncUrl) return;
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
    setCategory(params.get("category") ?? "All");
    const sortParam = params.get("sort") as SortMode | null;
    if (sortParam && ["featured", "price-asc", "price-desc", "newest"].includes(sortParam)) {
      setSort(sortParam);
    }
  }, [syncUrl]);

  useEffect(() => {
    if (!syncUrl) return;
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category !== "All") params.set("category", category);
    if (sort !== "featured") params.set("sort", sort);
    const nextUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState(null, "", nextUrl);
  }, [category, query, sort, syncUrl]);

  const categoryNames = useMemo(() => ["All", ...categories.map((item) => item.name)], [categories]);
  const activeFilterCount = Number(Boolean(query.trim())) + Number(category !== "All") + Number(sort !== "featured");
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products
      .filter((product) => (category === "All" ? true : product.category === category))
      .filter((product) => {
        if (!normalizedQuery) return true;
        return [product.name, product.category, product.shortDescription, product.description]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .sort((a, b) => sortProducts(a, b, sort));
  }, [category, products, query, sort]);

  return (
    <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-theme border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-primary">Categories</p>
        <div className="mt-4 grid gap-1">
          {categoryNames.map((item) => {
            const active = item === category;
            return (
              <button
                key={item}
                type="button"
                className={`focus-ring flex min-h-10 items-center justify-between rounded-theme px-3 text-left text-sm font-bold transition ${
                  active ? "bg-primary text-white" : "text-slate-600 hover:bg-page hover:text-primary"
                }`}
                onClick={() => setCategory(item)}
              >
                <span>{item === "All" ? "All products" : item}</span>
                <span aria-hidden="true">{active ? "→" : ""}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-6 border-t border-slate-200 pt-5">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Catalog filters</p>
          {["Published products", "Category browsing", "Availability status", "Inquiry-first CTA"].map((item) => (
            <p key={item} className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-600">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              {item}
            </p>
          ))}
        </div>
      </aside>

      <div className="grid gap-5">
        <div className="rounded-theme border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur md:p-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="block">
            <span className="sr-only">Search products</span>
            <input
              className="focus-ring min-h-12 w-full rounded-theme border border-slate-200 bg-page px-4 text-sm font-semibold text-ink placeholder:text-slate-400"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, materials, or categories"
            />
          </label>
          <label className="block">
            <span className="sr-only">Sort products</span>
            <select
              className="focus-ring min-h-12 w-full rounded-theme border border-slate-200 bg-page px-4 text-sm font-bold text-ink lg:w-48"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price low to high</option>
              <option value="price-desc">Price high to low</option>
              <option value="newest">Newest</option>
            </select>
          </label>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-slate-600">
              Showing <span className="text-primary">{filteredProducts.length}</span> of <span className="text-primary">{products.length}</span> products
            </p>
            {activeFilterCount > 0 ? (
              <button type="button" className="focus-ring rounded-full px-3 py-2 text-sm font-black text-accent hover:bg-page" onClick={() => {
                setQuery("");
                setCategory("All");
                setSort("featured");
              }}>
                Clear filters
              </button>
            ) : null}
          </div>
          {activeFilterCount > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {query.trim() ? <ActiveChip label={`Search: ${query.trim()}`} onClear={() => setQuery("")} /> : null}
              {category !== "All" ? <ActiveChip label={`Category: ${category}`} onClear={() => setCategory("All")} /> : null}
              {sort !== "featured" ? <ActiveChip label={`Sort: ${sortLabel(sort)}`} onClear={() => setSort("featured")} /> : null}
            </div>
          ) : null}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-theme border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-lg font-black text-primary">No matching products yet.</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
            Try another search term or category. In the admin dashboard, you can publish more products and categories for this catalog.
          </p>
          <button type="button" className="focus-ring mt-5 rounded-theme bg-primary px-5 py-3 text-sm font-black text-white" onClick={() => {
            setQuery("");
            setCategory("All");
            setSort("featured");
          }}>
            Reset catalog view
          </button>
          </div>
        ) : (
          <div className={`grid gap-5 ${compact ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
          {filteredProducts.map((product) => (
            <a
              key={product.id ?? product.name}
              href={`/products/${product.id ?? encodeURIComponent(product.name)}`}
              className="group overflow-hidden rounded-theme border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
            >
              <ProductVisual product={product} className="aspect-[4/3] w-full" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-slate-200 bg-page px-3 py-1 text-xs font-black uppercase tracking-widest text-primary">{product.category}</span>
                  {product.price ? <span className="text-sm font-black text-primary">{product.price}</span> : null}
                </div>
                <h3 className="mt-3 text-xl font-black leading-tight text-primary">{product.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.shortDescription || product.description}</p>
                {product.specifications?.[0] ? (
                  <p className="mt-3 rounded-theme bg-page px-3 py-2 text-xs font-bold text-slate-600">
                    {product.specifications[0].label}: {product.specifications[0].value}
                  </p>
                ) : null}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-accent">Compare details</span>
                  <span className="rounded-full bg-page px-3 py-1 text-xs font-bold text-slate-600">{product.status}</span>
                </div>
                <p className="mt-2 text-xs font-bold text-slate-500">{ctaLabel}</p>
              </div>
            </a>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ActiveChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button type="button" className="focus-ring rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-black text-accent" onClick={onClear}>
      {label} ×
    </button>
  );
}

function sortLabel(sort: SortMode) {
  if (sort === "price-asc") return "Price low to high";
  if (sort === "price-desc") return "Price high to low";
  if (sort === "newest") return "Newest";
  return "Featured";
}

export function ProductVisual({ product, className = "" }: { product: Product; className?: string }) {
  if (product.imageUrl) {
    return <img className={`${className} object-cover`} src={product.imageUrl} alt={product.imageAlt || product.name} />;
  }

  return (
    <div className={`${className} relative overflow-hidden bg-gradient-to-br ${product.imageTone || "from-slate-100 via-stone-100 to-zinc-200"}`}>
      <div className="absolute left-[12%] top-[14%] h-[42%] w-[52%] rotate-[-5deg] rounded-theme border border-white/70 bg-white/45 shadow-sm" />
      <div className="absolute right-[13%] top-[22%] h-[48%] w-[30%] rotate-[7deg] rounded-theme border border-white/70 bg-white/35 shadow-sm" />
      <div className="absolute inset-x-8 bottom-8 rounded-theme border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
        <p className="text-xs font-black uppercase tracking-widest text-accent">{product.category}</p>
        <p className="mt-1 text-lg font-black text-primary">{product.name}</p>
      </div>
    </div>
  );
}

function sortProducts(a: Product, b: Product, sort: SortMode) {
  if (sort === "featured") return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
  if (sort === "price-asc") return priceNumber(a.price) - priceNumber(b.price);
  if (sort === "price-desc") return priceNumber(b.price) - priceNumber(a.price);
  return (b.id ?? b.name).localeCompare(a.id ?? a.name);
}

function priceNumber(value?: string) {
  if (!value) return Number.MAX_SAFE_INTEGER;
  const parsed = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
}
