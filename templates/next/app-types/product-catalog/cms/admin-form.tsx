"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { addCollectionItem, deleteCollectionItem, getCmsDocument, listCollection, saveCmsDocument, updateCollectionItem } from "@/lib/cms/cms-service";
import { productCatalogDefaultContent, defaultCategories, defaultProducts } from "./default-content";
import { categorySchema, productCatalogSchema, productSchema, type Category, type Product, type ProductCatalogContent } from "./schema";

export function AppContentForm() {
  const [content, setContent] = useState<ProductCatalogContent>(productCatalogDefaultContent);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void Promise.all([
      getCmsDocument("productCatalog", productCatalogDefaultContent),
      listCollection<Product>("products"),
      listCollection<Category>("categories")
    ]).then(([cms, productItems, categoryItems]) => {
      setContent(cms);
      if (productItems.length > 0) setProducts(productItems);
      if (categoryItems.length > 0) setCategories(categoryItems);
    });
  }, []);

  async function saveOverview() {
    const parsed = productCatalogSchema.safeParse(content);
    if (!parsed.success) {
      setStatus("Please complete catalog overview fields.");
      return;
    }
    await saveCmsDocument("productCatalog", parsed.data);
    setStatus("Catalog overview saved.");
  }

  async function saveProduct(product: Product) {
    const parsed = productSchema.safeParse(product);
    if (!parsed.success) {
      setStatus("Check product fields before saving.");
      return;
    }
    if (product.id && !defaultProducts.some((item) => item.id === product.id)) {
      await updateCollectionItem("products", product.id, parsed.data);
    } else {
      const id = await addCollectionItem("products", parsed.data);
      setProducts((items) => items.map((item) => (item === product ? { ...product, id } : item)));
    }
    setStatus("Product saved.");
  }

  async function saveCategory(category: Category) {
    const parsed = categorySchema.safeParse(category);
    if (!parsed.success) {
      setStatus("Check category fields before saving.");
      return;
    }
    if (category.id && !defaultCategories.some((item) => item.id === category.id)) {
      await updateCollectionItem("categories", category.id, parsed.data);
    } else {
      const id = await addCollectionItem("categories", parsed.data);
      setCategories((items) => items.map((item) => (item === category ? { ...category, id } : item)));
    }
    setStatus("Category saved.");
  }

  return (
    <div className="grid gap-6">
      <Card className="p-5">
        <h2 className="text-xl font-black text-primary">Catalog overview</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <TextField label="Headline" value={content.headline} onChange={(headline) => setContent({ ...content, headline })} />
          <TextField label="WhatsApp CTA" value={content.whatsappCta} onChange={(whatsappCta) => setContent({ ...content, whatsappCta })} />
          <TextField label="WhatsApp URL" value={content.whatsappUrl} onChange={(whatsappUrl) => setContent({ ...content, whatsappUrl })} />
          <TextField label="SEO title" value={content.seoTitle} onChange={(seoTitle) => setContent({ ...content, seoTitle })} />
          <TextArea label="Subtitle" value={content.subtitle} onChange={(subtitle) => setContent({ ...content, subtitle })} />
          <TextArea label="About" value={content.about} onChange={(about) => setContent({ ...content, about })} />
          <TextArea label="SEO description" value={content.seoDescription} onChange={(seoDescription) => setContent({ ...content, seoDescription })} />
        </div>
        <label className="mt-4 flex items-center gap-3 text-sm font-bold text-slate-700">
          <input type="checkbox" checked={content.published} onChange={(event) => setContent({ ...content, published: event.target.checked })} />
          Published
        </label>
        <Button className="mt-5" type="button" onClick={() => void saveOverview()}>Save overview</Button>
      </Card>

      <Card className="p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-black text-primary">Products</h2>
          <Button type="button" onClick={() => setProducts([{ published: true, featured: false, name: "New product", description: "Describe this product.", imageUrl: "", category: "General", price: "", status: "Available", seoTitle: "New product", seoDescription: "Product SEO description." }, ...products])}>Add product</Button>
        </div>
        <div className="mt-4 grid gap-4">
          {products.map((product, index) => (
            <div key={product.id ?? index} className="rounded-theme border border-slate-200 p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Name" value={product.name} onChange={(name) => updateProduct(index, { name })} />
                <TextField label="Category" value={product.category} onChange={(category) => updateProduct(index, { category })} />
                <ImageUploadField label="Image URL" value={product.imageUrl} folder="uploads/products" onChange={(imageUrl) => updateProduct(index, { imageUrl })} />
                <TextField label="Price optional" value={product.price ?? ""} onChange={(price) => updateProduct(index, { price })} />
                <TextField label="Status" value={product.status} onChange={(statusValue) => updateProduct(index, { status: statusValue })} />
                <TextField label="SEO title" value={product.seoTitle} onChange={(seoTitle) => updateProduct(index, { seoTitle })} />
                <TextArea label="Description" value={product.description} onChange={(description) => updateProduct(index, { description })} />
                <TextArea label="SEO description" value={product.seoDescription} onChange={(seoDescription) => updateProduct(index, { seoDescription })} />
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={product.published} onChange={(event) => updateProduct(index, { published: event.target.checked })} /> Published</label>
                <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={product.featured} onChange={(event) => updateProduct(index, { featured: event.target.checked })} /> Featured</label>
              </div>
              <div className="mt-4 flex gap-2">
                <Button type="button" onClick={() => void saveProduct(product)}>Save product</Button>
                {product.id ? <Button type="button" variant="ghost" onClick={() => void deleteCollectionItem("products", product.id!).then(() => setProducts(products.filter((_, itemIndex) => itemIndex !== index)))}>Delete</Button> : null}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-black text-primary">Categories</h2>
          <Button type="button" onClick={() => setCategories([{ published: true, name: "New category", description: "Describe this category." }, ...categories])}>Add category</Button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {categories.map((category, index) => (
            <div key={category.id ?? index} className="rounded-theme border border-slate-200 p-4">
              <TextField label="Name" value={category.name} onChange={(name) => updateCategory(index, { name })} />
              <TextArea label="Description" value={category.description} onChange={(description) => updateCategory(index, { description })} />
              <label className="mt-3 flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={category.published} onChange={(event) => updateCategory(index, { published: event.target.checked })} /> Published</label>
              <div className="mt-4 flex gap-2">
                <Button type="button" onClick={() => void saveCategory(category)}>Save category</Button>
                {category.id ? <Button type="button" variant="ghost" onClick={() => void deleteCollectionItem("categories", category.id!).then(() => setCategories(categories.filter((_, itemIndex) => itemIndex !== index)))}>Delete</Button> : null}
              </div>
            </div>
          ))}
        </div>
      </Card>
      {status ? <p className="text-sm font-semibold text-slate-600">{status}</p> : null}
    </div>
  );

  function updateProduct(index: number, patch: Partial<Product>) {
    setProducts((items) => items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  function updateCategory(index: number, patch: Partial<Category>) {
    setCategories((items) => items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <input className="focus-ring mt-2 min-h-12 w-full rounded-theme border border-slate-300 px-4" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <textarea className="focus-ring mt-2 min-h-32 w-full rounded-theme border border-slate-300 px-4 py-3" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
