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
    <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-[24px] border border-zinc-200 bg-white p-4 shadow-[0_18px_60px_rgba(17,17,17,0.06)]">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-950">Categories</p>
        <div className="mt-4 grid gap-1">
          {categoryNames.map((item) => {
            const active = item === category;
            return (
              <button
                key={item}
                type="button"
                className={`focus-ring flex min-h-11 items-center justify-between rounded-full px-4 text-left text-sm font-black transition ${
                  active ? "bg-zinc-950 text-white" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
                onClick={() => setCategory(item)}
              >
                <span>{item === "All" ? "All products" : item}</span>
                <span aria-hidden="true">{active ? ">" : ""}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-6 rounded-[20px] bg-[#f8f5ef] p-4">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-400">Shop assist</p>
          {["Published products", "Category browsing", "Live availability", "Direct inquiry CTA"].map((item) => (
            <p key={item} className="mt-3 flex items-center gap-2 text-xs font-bold text-zinc-600">
              <span className="h-2 w-2 rounded-full bg-[#f97316]" />
              {item}
            </p>
          ))}
        </div>
      </aside>

      <div className="grid gap-5">
        <div className="rounded-[24px] border border-zinc-200 bg-white/95 p-3 shadow-[0_18px_60px_rgba(17,17,17,0.06)] backdrop-blur md:p-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="block">
            <span className="sr-only">Search products</span>
            <input
              className="focus-ring min-h-12 w-full rounded-full border border-zinc-200 bg-[#f8f5ef] px-5 text-sm font-bold text-zinc-950 placeholder:text-zinc-400"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search shirts, bags, sneakers, materials..."
            />
          </label>
          <label className="block">
            <span className="sr-only">Sort products</span>
            <select
              className="focus-ring min-h-12 w-full rounded-full border border-zinc-200 bg-[#f8f5ef] px-5 text-sm font-black text-zinc-950 lg:w-52"
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
            <p className="text-sm font-bold text-zinc-600">
              Showing <span className="text-zinc-950">{filteredProducts.length}</span> of <span className="text-zinc-950">{products.length}</span> products
            </p>
            {activeFilterCount > 0 ? (
              <button type="button" className="focus-ring rounded-full px-3 py-2 text-sm font-black text-[#f97316] hover:bg-[#fff7ed]" onClick={() => {
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
          <div className="rounded-[24px] border border-dashed border-zinc-300 bg-white p-8 text-center">
          <p className="text-lg font-black text-zinc-950">No matching products yet.</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-zinc-600">
            Try another search term or category. In the admin dashboard, you can publish more products and categories for this catalog.
          </p>
          <button type="button" className="focus-ring mt-5 rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white" onClick={() => {
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
              className="group overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-[0_18px_60px_rgba(17,17,17,0.06)] transition duration-200 hover:-translate-y-1 hover:border-zinc-950 hover:shadow-[0_24px_80px_rgba(17,17,17,0.12)]"
            >
              <ProductVisual product={product} className="aspect-[4/5] w-full" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#f4efe7] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-zinc-700">{product.status}</span>
                  <span className="text-xs font-black text-amber-500">4.{ratingSeed(product.name)} · {soldSeed(product.name)} sold</span>
                </div>
                <h3 className="mt-3 text-xl font-black leading-tight text-zinc-950">{product.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">{product.shortDescription || product.description}</p>
                {product.specifications?.[0] ? (
                  <p className="mt-3 rounded-[16px] bg-[#f8f5ef] px-3 py-2 text-xs font-bold text-zinc-600">
                    {product.specifications[0].label}: {product.specifications[0].value}
                  </p>
                ) : null}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="flex items-baseline gap-2">
                    {product.price ? <span className="text-lg font-black text-zinc-950">{product.price}</span> : <span className="text-lg font-black text-zinc-950">Ask</span>}
                    {product.price ? <span className="text-xs font-bold text-zinc-400 line-through">{oldPrice(product.price)}</span> : null}
                  </span>
                  <span className="rounded-full bg-zinc-950 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition group-hover:bg-[#f97316]">{ctaLabel}</span>
                </div>
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
    <button type="button" className="focus-ring rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-black text-[#c2410c]" onClick={onClear}>
      {label} x
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.82),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.2),rgba(0,0,0,0.04))]" />
      <div className="absolute left-1/2 top-[14%] h-[58%] w-[34%] -translate-x-1/2 rounded-t-[42%] rounded-b-[18%] border border-white/75 bg-white/55 shadow-[0_30px_70px_rgba(17,17,17,0.14)] backdrop-blur-sm" />
      <div className="absolute left-[28%] top-[25%] h-[34%] w-[12%] -rotate-12 rounded-full border border-white/70 bg-white/35 shadow-sm" />
      <div className="absolute right-[28%] top-[25%] h-[34%] w-[12%] rotate-12 rounded-full border border-white/70 bg-white/35 shadow-sm" />
      <div className="absolute bottom-[16%] left-[30%] h-[22%] w-[17%] rotate-3 rounded-b-[38%] border border-white/75 bg-white/45 shadow-sm" />
      <div className="absolute bottom-[16%] right-[30%] h-[22%] w-[17%] -rotate-3 rounded-b-[38%] border border-white/75 bg-white/45 shadow-sm" />
      <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-zinc-700 shadow-sm backdrop-blur">
        {product.category}
      </div>
      <div className="absolute inset-x-4 bottom-4 rounded-[20px] border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f97316]">New edit</p>
        <p className="mt-1 text-lg font-black text-zinc-950">{product.name}</p>
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

function oldPrice(value?: string) {
  const price = priceNumber(value);
  if (!Number.isFinite(price) || price === Number.MAX_SAFE_INTEGER) return "";
  return `$${Math.round(price * 1.32)}`;
}

function ratingSeed(value: string) {
  return 6 + (value.length % 4);
}

function soldSeed(value: string) {
  return 320 + value.length * 37;
}
