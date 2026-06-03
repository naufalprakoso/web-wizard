"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CollectionCrudField } from "@/components/admin/CollectionCrudField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RecordListField, StringListField } from "@/components/admin/RepeaterFields";
import { deleteCollectionItem, getCmsDocument, listCollection, saveCmsDocument, saveCollectionItem } from "@/lib/cms/cms-service";
import { companyProfileDefaultContent } from "./default-content";
import {
  companyCaseStudySchema,
  companyProfileSchema,
  companyServiceSchema,
  companyTeamMemberSchema,
  type CompanyCaseStudy,
  type CompanyProfileContent,
  type CompanyService,
  type CompanyTeamMember
} from "./schema";

type AdminTab = "profile" | "services" | "case-studies" | "team" | "signals";
type EditableItem = { id?: string; published: boolean };
type ItemSchema<TItem extends EditableItem> = {
  safeParse: (value: unknown) => { success: true; data: TItem } | { success: false; error: { issues: Array<{ path: Array<string | number> }> } };
};

export function AppContentForm() {
  const [content, setContent] = useState<CompanyProfileContent>(companyProfileDefaultContent);
  const [services, setServices] = useState<CompanyService[]>(withPublished(companyProfileDefaultContent.services));
  const [caseStudies, setCaseStudies] = useState<CompanyCaseStudy[]>(withPublished(companyProfileDefaultContent.projects));
  const [teamMembers, setTeamMembers] = useState<CompanyTeamMember[]>(withPublished(companyProfileDefaultContent.teamMembers));
  const [tab, setTab] = useState<AdminTab>("profile");
  const [status, setStatus] = useState("");

  useEffect(() => {
    void Promise.all([
      getCmsDocument("companyProfile", companyProfileDefaultContent),
      listCollection<CompanyService>("companyServices"),
      listCollection<CompanyCaseStudy>("companyCaseStudies"),
      listCollection<CompanyTeamMember>("companyTeamMembers")
    ])
      .then(([cms, serviceItems, caseStudyItems, teamItems]) => {
        setContent({ ...companyProfileDefaultContent, ...cms });
        if (serviceItems.length > 0) setServices(serviceItems);
        if (caseStudyItems.length > 0) setCaseStudies(caseStudyItems);
        if (teamItems.length > 0) setTeamMembers(teamItems);
      })
      .catch((error) => setStatus(error instanceof Error ? error.message : "Unable to load company CMS data."));
  }, []);

  async function saveProfile() {
    const parsed = companyProfileSchema.safeParse({
      ...content,
      services: services.map(stripCollectionFields),
      projects: caseStudies.map(stripCollectionFields),
      teamMembers: teamMembers.map(stripCollectionFields)
    });
    if (!parsed.success) {
      setStatus(`Please fix: ${parsed.error.issues.map((issue) => issue.path.join(".") || "content").slice(0, 4).join(", ")}`);
      return;
    }
    try {
      await saveCmsDocument("companyProfile", parsed.data);
      setStatus("Company profile saved.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save company profile.");
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
      <div className="grid gap-5">
        <div className="flex gap-2 overflow-x-auto rounded-theme border border-slate-200 bg-white p-2 shadow-sm">
          {[
            ["profile", "Profile"],
            ["services", "Services"],
            ["case-studies", "Case studies"],
            ["team", "Team"],
            ["signals", "Signals"]
          ].map(([value, label]) => (
            <button key={value} type="button" className={`focus-ring whitespace-nowrap rounded-theme px-4 py-2 text-sm font-black transition ${tab === value ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-50"}`} onClick={() => setTab(value as AdminTab)}>
              {label}
            </button>
          ))}
        </div>

        {tab === "profile" ? (
          <Card className="p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Company name" value={content.companyName} onChange={(companyName) => setContent({ ...content, companyName })} />
              <TextField label="Company tagline" value={content.companyTagline} onChange={(companyTagline) => setContent({ ...content, companyTagline })} />
              <ImageUploadField label="Logo URL" value={content.logoUrl} folder="uploads/company-profile" onChange={(logoUrl) => setContent({ ...content, logoUrl })} />
              <ImageUploadField label="Hero image URL" value={content.heroImage} folder="uploads/company-profile" onChange={(heroImage) => setContent({ ...content, heroImage })} />
              <TextField label="Hero image alt text" value={content.heroImageAlt ?? ""} onChange={(heroImageAlt) => setContent({ ...content, heroImageAlt })} />
              <TextArea label="Company description" value={content.companyDescription} onChange={(companyDescription) => setContent({ ...content, companyDescription })} />
              <TextArea label="Values intro" value={content.valuesIntro} onChange={(valuesIntro) => setContent({ ...content, valuesIntro })} />
              <TextField label="Contact info" value={content.contactInfo} onChange={(contactInfo) => setContent({ ...content, contactInfo })} />
              <TextField label="SEO title" value={content.seoTitle} onChange={(seoTitle) => setContent({ ...content, seoTitle })} />
              <TextArea label="SEO description" value={content.seoDescription} onChange={(seoDescription) => setContent({ ...content, seoDescription })} />
            </div>
            <label className="mt-4 flex items-center gap-3 text-sm font-bold text-slate-700">
              <input type="checkbox" checked={content.published} onChange={(event) => setContent({ ...content, published: event.target.checked })} />
              Published
            </label>
            <Button className="mt-5" type="button" onClick={() => void saveProfile()}>Save profile</Button>
          </Card>
        ) : null}

        {tab === "services" ? (
          <CollectionCrudField label="Services" helper="Company services are their own records." items={services} fields={[{ key: "title", label: "Title" }, { key: "description", label: "Description", multiline: true }]} createItem={() => ({ id: "", published: true, title: "New service", description: "Describe the service outcome." })} onChange={setServices} onSave={(item) => void saveRecord("companyServices", item, companyServiceSchema, services, setServices, item.title)} onDelete={(item, index) => void removeRecord("companyServices", item, index, services, setServices)} />
        ) : null}

        {tab === "case-studies" ? (
          <CollectionCrudField label="Case studies" helper="Credibility projects are saved independently from company profile copy." items={caseStudies} fields={[{ key: "name", label: "Name" }, { key: "type", label: "Type" }, { key: "challenge", label: "Challenge", multiline: true }, { key: "approach", label: "Approach", multiline: true }, { key: "result", label: "Result" }]} createItem={() => ({ id: "", published: true, name: "New project", type: "Capability", challenge: "Describe the challenge.", approach: "Describe the approach.", result: "Describe the result." })} onChange={setCaseStudies} onSave={(item) => void saveRecord("companyCaseStudies", item, companyCaseStudySchema, caseStudies, setCaseStudies, item.name)} onDelete={(item, index) => void removeRecord("companyCaseStudies", item, index, caseStudies, setCaseStudies)} />
        ) : null}

        {tab === "team" ? (
          <CollectionCrudField label="Team members" helper="Team members are separate records and can be published one by one." items={teamMembers} fields={[{ key: "name", label: "Name" }, { key: "role", label: "Role" }, { key: "bio", label: "Bio", multiline: true }]} createItem={() => ({ id: "", published: true, name: "New team member", role: "Role", bio: "Short bio." })} onChange={setTeamMembers} onSave={(item) => void saveRecord("companyTeamMembers", item, companyTeamMemberSchema, teamMembers, setTeamMembers, item.name)} onDelete={(item, index) => void removeRecord("companyTeamMembers", item, index, teamMembers, setTeamMembers)} />
        ) : null}

        {tab === "signals" ? (
          <Card className="p-5">
            <div className="grid gap-4">
              <RecordListField label="Credibility stats" value={content.stats} fields={[{ key: "label", label: "Label" }, { key: "value", label: "Value" }]} createItem={() => ({ label: "Metric", value: "Value" })} onChange={(stats) => setContent({ ...content, stats })} />
              <StringListField label="Sectors" value={content.sectors} onChange={(sectors) => setContent({ ...content, sectors })} />
              <StringListField label="Values" value={content.values} onChange={(values) => setContent({ ...content, values })} />
            </div>
            <Button className="mt-5" type="button" onClick={() => void saveProfile()}>Save signals</Button>
          </Card>
        ) : null}

        {status ? <p className="rounded-theme border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600">{status}</p> : null}
      </div>

      <Card className="h-max p-5">
        <p className="text-sm font-black uppercase tracking-widest text-accent">Preview</p>
        <h2 className="mt-3 text-2xl font-black text-primary">{content.companyName}</h2>
        <p className="mt-2 font-bold text-primary">{content.companyTagline}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{content.companyDescription}</p>
        <div className="mt-4 grid gap-2">
          {content.stats.slice(0, 3).map((item) => (
            <p key={item.label} className="rounded-theme bg-page px-3 py-2 text-sm font-bold text-primary">{item.value} · {item.label}</p>
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
