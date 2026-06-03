"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CollectionCrudField } from "@/components/admin/CollectionCrudField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { StringListField } from "@/components/admin/RepeaterFields";
import { deleteCollectionItem, getCmsDocument, listCollection, saveCmsDocument, saveCollectionItem } from "@/lib/cms/cms-service";
import { serviceBusinessDefaultContent } from "./default-content";
import {
  serviceBusinessCaseStudySchema,
  serviceBusinessFaqSchema,
  serviceBusinessPackageSchema,
  serviceBusinessProcessSchema,
  serviceBusinessSchema,
  serviceBusinessServiceSchema,
  type ServiceBusinessCaseStudy,
  type ServiceBusinessContent,
  type ServiceBusinessFaq,
  type ServiceBusinessPackage,
  type ServiceBusinessProcess,
  type ServiceBusinessService
} from "./schema";

type AdminTab = "overview" | "services" | "packages" | "process" | "proof" | "faq";
type EditableItem = { id?: string; published: boolean };
type ItemSchema<TItem extends EditableItem> = {
  safeParse: (value: unknown) => { success: true; data: TItem } | { success: false; error: { issues: Array<{ path: Array<string | number> }> } };
};

export function AppContentForm() {
  const [content, setContent] = useState<ServiceBusinessContent>(serviceBusinessDefaultContent);
  const [services, setServices] = useState<ServiceBusinessService[]>(withPublished(serviceBusinessDefaultContent.services));
  const [packages, setPackages] = useState<ServiceBusinessPackage[]>(withPublished(serviceBusinessDefaultContent.packages));
  const [processItems, setProcessItems] = useState<ServiceBusinessProcess[]>(withPublished(serviceBusinessDefaultContent.process));
  const [caseStudies, setCaseStudies] = useState<ServiceBusinessCaseStudy[]>(withPublished(serviceBusinessDefaultContent.caseStudies));
  const [faqs, setFaqs] = useState<ServiceBusinessFaq[]>(withPublished(serviceBusinessDefaultContent.faqs));
  const [tab, setTab] = useState<AdminTab>("overview");
  const [status, setStatus] = useState("");

  useEffect(() => {
    void Promise.all([
      getCmsDocument("serviceBusiness", serviceBusinessDefaultContent),
      listCollection<ServiceBusinessService>("serviceBusinessServices"),
      listCollection<ServiceBusinessPackage>("serviceBusinessPackages"),
      listCollection<ServiceBusinessProcess>("serviceBusinessProcess"),
      listCollection<ServiceBusinessCaseStudy>("serviceBusinessCaseStudies"),
      listCollection<ServiceBusinessFaq>("serviceBusinessFaqs")
    ])
      .then(([cms, serviceItems, packageItems, processRecords, caseStudyItems, faqItems]) => {
        setContent({ ...serviceBusinessDefaultContent, ...cms });
        if (serviceItems.length > 0) setServices(serviceItems);
        if (packageItems.length > 0) setPackages(packageItems);
        if (processRecords.length > 0) setProcessItems(processRecords);
        if (caseStudyItems.length > 0) setCaseStudies(caseStudyItems);
        if (faqItems.length > 0) setFaqs(faqItems);
      })
      .catch((error) => setStatus(error instanceof Error ? error.message : "Unable to load service CMS data."));
  }, []);

  async function saveOverview() {
    const parsed = serviceBusinessSchema.safeParse({
      ...content,
      services: services.map(stripCollectionFields),
      packages: packages.map(stripCollectionFields),
      process: processItems.map(stripCollectionFields),
      caseStudies: caseStudies.map(stripCollectionFields),
      faqs: faqs.map(stripCollectionFields)
    });
    if (!parsed.success) {
      setStatus(`Please fix: ${parsed.error.issues.map((issue) => issue.path.join(".") || "content").slice(0, 4).join(", ")}`);
      return;
    }
    try {
      await saveCmsDocument("serviceBusiness", parsed.data);
      setStatus("Service business overview saved.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save service business overview.");
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
      <div className="grid gap-5">
        <div className="flex gap-2 overflow-x-auto rounded-theme border border-slate-200 bg-white p-2 shadow-sm">
          {[
            ["overview", "Overview"],
            ["services", "Services"],
            ["packages", "Packages"],
            ["process", "Process"],
            ["proof", "Case studies"],
            ["faq", "FAQ"]
          ].map(([value, label]) => (
            <button key={value} type="button" className={`focus-ring whitespace-nowrap rounded-theme px-4 py-2 text-sm font-black transition ${tab === value ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-50"}`} onClick={() => setTab(value as AdminTab)}>
              {label}
            </button>
          ))}
        </div>

        {tab === "overview" ? (
          <Card className="p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Business name" value={content.businessName} onChange={(businessName) => setContent({ ...content, businessName })} />
              <TextArea label="Headline" value={content.headline} onChange={(headline) => setContent({ ...content, headline })} />
              <TextArea label="Subtitle" value={content.subtitle} onChange={(subtitle) => setContent({ ...content, subtitle })} />
              <ImageUploadField label="Hero image URL" value={content.heroImage} folder="uploads/service-business" onChange={(heroImage) => setContent({ ...content, heroImage })} />
              <TextField label="Hero image alt text" value={content.heroImageAlt ?? ""} onChange={(heroImageAlt) => setContent({ ...content, heroImageAlt })} />
              <TextField label="Service area" value={content.serviceArea} onChange={(serviceArea) => setContent({ ...content, serviceArea })} />
              <TextField label="Response promise" value={content.responsePromise} onChange={(responsePromise) => setContent({ ...content, responsePromise })} />
              <TextField label="Contact info" value={content.contactInfo} onChange={(contactInfo) => setContent({ ...content, contactInfo })} />
              <TextField label="SEO title" value={content.seoTitle} onChange={(seoTitle) => setContent({ ...content, seoTitle })} />
              <TextArea label="SEO description" value={content.seoDescription} onChange={(seoDescription) => setContent({ ...content, seoDescription })} />
            </div>
            <div className="mt-4">
              <StringListField label="Trust points" value={content.trustPoints} onChange={(trustPoints) => setContent({ ...content, trustPoints })} />
            </div>
            <label className="mt-4 flex items-center gap-3 text-sm font-bold text-slate-700">
              <input type="checkbox" checked={content.published} onChange={(event) => setContent({ ...content, published: event.target.checked })} />
              Published
            </label>
            <Button className="mt-5" type="button" onClick={() => void saveOverview()}>Save overview</Button>
          </Card>
        ) : null}

        {tab === "services" ? (
          <CollectionCrudField label="Services" helper="Service offers are independent records." items={services} fields={[{ key: "title", label: "Title" }, { key: "description", label: "Description", multiline: true }, { key: "outcome", label: "Outcome" }]} createItem={() => ({ id: "", published: true, title: "New service", description: "Describe the service.", outcome: "Outcome" })} onChange={setServices} onSave={(item) => void saveRecord("serviceBusinessServices", item, serviceBusinessServiceSchema, services, setServices, item.title)} onDelete={(item, index) => void removeRecord("serviceBusinessServices", item, index, services, setServices)} />
        ) : null}

        {tab === "packages" ? (
          <CollectionCrudField label="Packages" helper="Packages are collection records so admins can publish them separately." items={packages} fields={[{ key: "name", label: "Name" }, { key: "price", label: "Price" }, { key: "description", label: "Description", multiline: true }, { key: "features", label: "Features" }]} createItem={() => ({ id: "", published: true, name: "New package", price: "From $0", description: "Describe the package.", features: "Feature list" })} onChange={setPackages} onSave={(item) => void saveRecord("serviceBusinessPackages", item, serviceBusinessPackageSchema, packages, setPackages, item.name)} onDelete={(item, index) => void removeRecord("serviceBusinessPackages", item, index, packages, setPackages)} />
        ) : null}

        {tab === "process" ? (
          <CollectionCrudField label="Process steps" helper="Process steps can be saved and published one by one." items={processItems} fields={[{ key: "step", label: "Step" }, { key: "description", label: "Description", multiline: true }]} createItem={() => ({ id: "", published: true, step: "New step", description: "Describe the step." })} onChange={setProcessItems} onSave={(item) => void saveRecord("serviceBusinessProcess", item, serviceBusinessProcessSchema, processItems, setProcessItems, item.step)} onDelete={(item, index) => void removeRecord("serviceBusinessProcess", item, index, processItems, setProcessItems)} />
        ) : null}

        {tab === "proof" ? (
          <CollectionCrudField label="Case studies" helper="Proof records are separate from top-level page copy." items={caseStudies} fields={[{ key: "client", label: "Client" }, { key: "need", label: "Need", multiline: true }, { key: "result", label: "Result" }]} createItem={() => ({ id: "", published: true, client: "Client", need: "Describe the need.", result: "Result" })} onChange={setCaseStudies} onSave={(item) => void saveRecord("serviceBusinessCaseStudies", item, serviceBusinessCaseStudySchema, caseStudies, setCaseStudies, item.client)} onDelete={(item, index) => void removeRecord("serviceBusinessCaseStudies", item, index, caseStudies, setCaseStudies)} />
        ) : null}

        {tab === "faq" ? (
          <CollectionCrudField label="FAQ" helper="FAQ items are managed as records so they can be published independently." items={faqs} fields={[{ key: "question", label: "Question" }, { key: "answer", label: "Answer", multiline: true }]} createItem={() => ({ id: "", published: true, question: "New question?", answer: "Add an answer." })} onChange={setFaqs} onSave={(item) => void saveRecord("serviceBusinessFaqs", item, serviceBusinessFaqSchema, faqs, setFaqs, item.question)} onDelete={(item, index) => void removeRecord("serviceBusinessFaqs", item, index, faqs, setFaqs)} />
        ) : null}

        {status ? <p className="rounded-theme border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600">{status}</p> : null}
      </div>

      <Card className="h-max p-5">
        <p className="text-sm font-black uppercase tracking-widest text-accent">Preview</p>
        <h2 className="mt-3 text-2xl font-black text-primary">{content.businessName}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{content.headline}</p>
        <div className="mt-4 grid gap-2">
          {packages.slice(0, 3).map((item) => (
            <p key={item.id || item.name} className="rounded-theme bg-page px-3 py-2 text-sm font-bold text-primary">{item.name} · {item.price}</p>
          ))}
        </div>
      </Card>
    </div>
  );

  async function saveRecord<TItem extends EditableItem>(collectionName: string, item: TItem, schema: ItemSchema<TItem>, items: TItem[], setItems: (items: TItem[]) => void, slugSource: string) {
    const id = item.id?.trim() || slugify(slugSource);
    const parsed = schema.safeParse({ ...item, id });
    if (!parsed.success) {
      setStatus(`Please fix: ${parsed.error.issues.map((issue) => issue.path.join(".") || "item").slice(0, 4).join(", ")}`);
      return;
    }
    try {
      await saveCollectionItem(collectionName, id, parsed.data);
      setItems(items.map((entry) => (entry === item ? { ...parsed.data, id } : entry)));
      setStatus(`Saved "${slugSource}".`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save item.");
    }
  }

  async function removeRecord<TItem extends { id?: string }>(collectionName: string, item: TItem, index: number, items: TItem[], setItems: (items: TItem[]) => void) {
    if (!item.id) return;
    try {
      await deleteCollectionItem(collectionName, item.id);
      setItems(items.filter((_, itemIndex) => itemIndex !== index));
      setStatus("Item deleted.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to delete item.");
    }
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

function withPublished<TItem extends Record<string, unknown>>(items: TItem[]) {
  return items.map((item) => ({ ...item, id: "", published: true }));
}

function stripCollectionFields<TItem extends { id?: string; published?: boolean }>(item: TItem) {
  const { id: _id, published: _published, ...rest } = item;
  return rest;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
