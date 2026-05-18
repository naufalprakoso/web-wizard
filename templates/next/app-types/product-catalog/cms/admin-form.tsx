"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { deleteCollectionItem, getCmsDocument, listCollection, saveCmsDocument, saveCollectionItem } from "@/lib/cms/cms-service";
import { productCatalogDefaultContent, defaultCategories, defaultProducts } from "./default-content";
import { categorySchema, productCatalogSchema, productSchema, type Category, type Product, type ProductCatalogContent } from "./schema";

type AdminTab = "overview" | "products" | "categories";

export function AppContentForm() {
  const [content, setContent] = useState<ProductCatalogContent>(productCatalogDefaultContent);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [tab, setTab] = useState<AdminTab>("overview");
  const [status, setStatus] = useState("");

  useEffect(() => {
    void Promise.all([
      getCmsDocument("productCatalog", productCatalogDefaultContent),
      listCollection<Product>("products"),
      listCollection<Category>("categories")
    ]).then(([cms, productItems, categoryItems]) => {
      setContent({
        ...productCatalogDefaultContent,
        ...cms,
        trustPoints: cms.trustPoints ?? productCatalogDefaultContent.trustPoints
      });
      if (productItems.length > 0) setProducts(productItems.map(normalizeProduct));
      if (categoryItems.length > 0) setCategories(categoryItems);
    });
  }, []);

  async function saveOverview() {
    const parsed = productCatalogSchema.safeParse(content);
    if (!parsed.success) {
      setStatus("Complete catalog overview, trust, CTA, and SEO fields before saving.");
      return;
    }
    await saveCmsDocument("productCatalog", parsed.data);
    setStatus("Catalog overview saved.");
  }

  async function saveProduct(product: Product) {
    const parsed = productSchema.safeParse(normalizeProduct(product));
    if (!parsed.success) {
      setStatus("Check product name, descriptions, category, status, image URL, specifications, and SEO fields.");
      return;
    }
    const id = product.id?.trim() || slugify(product.name);
    await saveCollectionItem("products", id, { ...parsed.data, id });
    setProducts((items) => items.map((item) => (item === product ? { ...parsed.data, id } : item)));
    setStatus(`Product "${parsed.data.name}" saved.`);
  }

  async function saveCategory(category: Category) {
    const parsed = categorySchema.safeParse(category);
    if (!parsed.success) {
      setStatus("Check category name and description before saving.");
      return;
    }
    const id = category.id?.trim() || slugify(category.name);
    await saveCollectionItem("categories", id, { ...parsed.data, id });
    setCategories((items) => items.map((item) => (item === category ? { ...parsed.data, id } : item)));
    setStatus(`Category "${parsed.data.name}" saved.`);
  }

  return (
    <div className="grid gap-6">
      <div className="flex gap-2 overflow-x-auto rounded-theme border border-slate-200 bg-white p-2 shadow-sm">
        {[
          ["overview", "Overview"],
          ["products", "Products"],
          ["categories", "Categories"]
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={`focus-ring whitespace-nowrap rounded-theme px-4 py-2 text-sm font-black transition ${tab === value ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-50"}`}
            onClick={() => setTab(value as AdminTab)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" ? (
        <Card className="p-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-xl font-black text-primary">Catalog overview</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">Hero copy, trust messaging, WhatsApp CTA, and SEO defaults.</p>
            </div>
            <label className="flex items-center gap-3 rounded-theme border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700">
              <input type="checkbox" checked={content.published} onChange={(event) => setContent({ ...content, published: event.target.checked })} />
              Published
            </label>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <TextField label="Headline" value={content.headline} onChange={(headline) => setContent({ ...content, headline })} />
            <TextField label="WhatsApp CTA" value={content.whatsappCta} onChange={(whatsappCta) => setContent({ ...content, whatsappCta })} />
            <TextField label="WhatsApp URL" value={content.whatsappUrl} onChange={(whatsappUrl) => setContent({ ...content, whatsappUrl })} />
            <TextField label="SEO title" value={content.seoTitle} onChange={(seoTitle) => setContent({ ...content, seoTitle })} />
            <TextArea label="Subtitle" value={content.subtitle} onChange={(subtitle) => setContent({ ...content, subtitle })} />
            <TextArea label="About" value={content.about} onChange={(about) => setContent({ ...content, about })} />
            <TextArea label="Trust headline" value={content.trustHeadline} onChange={(trustHeadline) => setContent({ ...content, trustHeadline })} />
            <TextArea label="Trust points, one per line" value={content.trustPoints.join("\n")} onChange={(value) => setContent({ ...content, trustPoints: lines(value) })} />
            <TextArea label="SEO description" value={content.seoDescription} onChange={(seoDescription) => setContent({ ...content, seoDescription })} />
          </div>
          <Button className="mt-5 w-full md:w-auto" type="button" onClick={() => void saveOverview()}>Save overview</Button>
        </Card>
      ) : null}

      {tab === "products" ? (
        <Card className="p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-black text-primary">Products</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">Manage product cards, detail pages, availability, images, and SEO.</p>
            </div>
            <Button type="button" onClick={() => setProducts([newProduct(), ...products])}>Add product</Button>
          </div>
          <div className="mt-5 grid gap-4">
            {products.length === 0 ? <EmptyState title="No products yet" body="Add the first product to start building the catalog." /> : null}
            {products.map((product, index) => (
              <div key={product.id ?? index} className="rounded-theme border border-slate-200 bg-slate-50 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <TextField label="Slug / ID" value={product.id ?? ""} onChange={(id) => updateProduct(index, { id })} />
                  <TextField label="Name" value={product.name} onChange={(name) => updateProduct(index, { name })} />
                  <TextField label="Category" value={product.category} onChange={(category) => updateProduct(index, { category })} />
                  <TextField label="Price optional" value={product.price ?? ""} onChange={(price) => updateProduct(index, { price })} />
                  <TextField label="Status" value={product.status} onChange={(statusValue) => updateProduct(index, { status: statusValue })} />
                  <TextField label="SEO title" value={product.seoTitle} onChange={(seoTitle) => updateProduct(index, { seoTitle })} />
                  <ImageUploadField label="Image URL" value={product.imageUrl} folder="uploads/products" onChange={(imageUrl) => updateProduct(index, { imageUrl })} />
                  <TextField label="Image alt text" value={product.imageAlt ?? ""} onChange={(imageAlt) => updateProduct(index, { imageAlt })} />
                  <TextField label="Fallback image tone" value={product.imageTone ?? ""} onChange={(imageTone) => updateProduct(index, { imageTone })} />
                  <TextArea label="Short description" value={product.shortDescription} onChange={(shortDescription) => updateProduct(index, { shortDescription })} />
                  <TextArea label="Long description" value={product.description} onChange={(description) => updateProduct(index, { description })} />
                  <TextArea label="Specifications, one per line as Label: Value" value={specsToText(product.specifications)} onChange={(value) => updateProduct(index, { specifications: textToSpecs(value) })} />
                  <TextArea label="SEO description" value={product.seoDescription} onChange={(seoDescription) => updateProduct(index, { seoDescription })} />
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Checkbox label="Published" checked={product.published} onChange={(published) => updateProduct(index, { published })} />
                  <Checkbox label="Featured" checked={product.featured} onChange={(featured) => updateProduct(index, { featured })} />
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button type="button" onClick={() => void saveProduct(product)}>Save product</Button>
                  {product.id ? (
                    <Button type="button" variant="ghost" onClick={() => void deleteCollectionItem("products", product.id!).then(() => setProducts(products.filter((_, itemIndex) => itemIndex !== index)))}>
                      Delete
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {tab === "categories" ? (
        <Card className="p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-black text-primary">Categories</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">Organize the catalog and shape the filter experience.</p>
            </div>
            <Button type="button" onClick={() => setCategories([newCategory(), ...categories])}>Add category</Button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {categories.length === 0 ? <EmptyState title="No categories yet" body="Create categories to make browsing easier." /> : null}
            {categories.map((category, index) => (
              <div key={category.id ?? index} className="rounded-theme border border-slate-200 bg-slate-50 p-4">
                <TextField label="Slug / ID" value={category.id ?? ""} onChange={(id) => updateCategory(index, { id })} />
                <TextField label="Name" value={category.name} onChange={(name) => updateCategory(index, { name })} />
                <TextArea label="Description" value={category.description} onChange={(description) => updateCategory(index, { description })} />
                <div className="mt-4 flex flex-wrap gap-4">
                  <Checkbox label="Published" checked={category.published} onChange={(published) => updateCategory(index, { published })} />
                  <Checkbox label="Featured" checked={Boolean(category.featured)} onChange={(featured) => updateCategory(index, { featured })} />
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button type="button" onClick={() => void saveCategory(category)}>Save category</Button>
                  {category.id ? (
                    <Button type="button" variant="ghost" onClick={() => void deleteCollectionItem("categories", category.id!).then(() => setCategories(categories.filter((_, itemIndex) => itemIndex !== index)))}>
                      Delete
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {status ? <p className="rounded-theme border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600">{status}</p> : null}
    </div>
  );

  function updateProduct(index: number, patch: Partial<Product>) {
    setProducts((items) => items.map((item, itemIndex) => (itemIndex === index ? normalizeProduct({ ...item, ...patch }) : item)));
  }

  function updateCategory(index: number, patch: Partial<Category>) {
    setCategories((items) => items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <input className="focus-ring mt-2 min-h-12 w-full rounded-theme border border-slate-300 bg-white px-4" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <textarea className="focus-ring mt-2 min-h-32 w-full rounded-theme border border-slate-300 bg-white px-4 py-3" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      {label}
    </label>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-theme border border-dashed border-slate-300 bg-white p-5">
      <p className="font-black text-primary">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    shortDescription: product.shortDescription || product.description,
    specifications: product.specifications ?? []
  };
}

function newProduct(): Product {
  return {
    id: "",
    published: true,
    featured: false,
    name: "New product",
    shortDescription: "Short product summary for cards and search results.",
    description: "Describe what makes this product useful, who it is for, and why someone should ask about it.",
    imageUrl: "",
    imageAlt: "Product image",
    imageTone: "from-slate-100 via-stone-100 to-zinc-200",
    category: "General",
    price: "",
    status: "Available",
    specifications: [{ label: "Material", value: "Add material" }],
    seoTitle: "New product",
    seoDescription: "Product SEO description."
  };
}

function newCategory(): Category {
  return { id: "", published: true, featured: false, name: "New category", description: "Describe this category." };
}

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function specsToText(specs: Product["specifications"]) {
  return (specs ?? []).map((item) => `${item.label}: ${item.value}`).join("\n");
}

function textToSpecs(value: string): Product["specifications"] {
  return lines(value).map((line) => {
    const [label, ...rest] = line.split(":");
    return { label: label.trim(), value: rest.join(":").trim() || "Add value" };
  });
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
