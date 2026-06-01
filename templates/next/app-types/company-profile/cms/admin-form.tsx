"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RecordListField, StringListField } from "@/components/admin/RepeaterFields";
import { getCmsDocument, saveCmsDocument } from "@/lib/cms/cms-service";
import { companyProfileDefaultContent } from "./default-content";
import { companyProfileSchema, type CompanyProfileContent } from "./schema";

export function AppContentForm() {
  const [content, setContent] = useState<CompanyProfileContent>(companyProfileDefaultContent);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void getCmsDocument("companyProfile", companyProfileDefaultContent).then(setContent);
  }, []);

  async function save() {
    const parsed = companyProfileSchema.safeParse(content);
    if (!parsed.success) {
      setStatus(`Please fix: ${parsed.error.issues.map((issue) => issue.path.join(".") || "content").slice(0, 4).join(", ")}`);
      return;
    }
    await saveCmsDocument("companyProfile", parsed.data);
    setStatus("Company profile content saved.");
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
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
        <div className="mt-4 grid gap-4">
          <RecordListField label="Services" value={content.services} fields={[{ key: "title", label: "Title" }, { key: "description", label: "Description", multiline: true }]} createItem={() => ({ title: "New service", description: "Describe the service outcome." })} onChange={(services) => setContent({ ...content, services })} />
          <RecordListField label="Case studies" value={content.projects} fields={[{ key: "name", label: "Name" }, { key: "type", label: "Type" }, { key: "challenge", label: "Challenge", multiline: true }, { key: "approach", label: "Approach", multiline: true }, { key: "result", label: "Result" }]} createItem={() => ({ name: "New project", type: "Capability", challenge: "Describe the challenge.", approach: "Describe the approach.", result: "Describe the result." })} onChange={(projects) => setContent({ ...content, projects })} />
          <RecordListField label="Credibility stats" value={content.stats} fields={[{ key: "label", label: "Label" }, { key: "value", label: "Value" }]} createItem={() => ({ label: "Metric", value: "Value" })} onChange={(stats) => setContent({ ...content, stats })} />
          <StringListField label="Sectors" value={content.sectors} onChange={(sectors) => setContent({ ...content, sectors })} />
          <RecordListField label="Team members" value={content.teamMembers} fields={[{ key: "name", label: "Name" }, { key: "role", label: "Role" }, { key: "bio", label: "Bio", multiline: true }]} createItem={() => ({ name: "New team member", role: "Role", bio: "Short bio." })} onChange={(teamMembers) => setContent({ ...content, teamMembers })} />
          <StringListField label="Values" value={content.values} onChange={(values) => setContent({ ...content, values })} />
        </div>
        <label className="mt-4 flex items-center gap-3 text-sm font-bold text-slate-700">
          <input type="checkbox" checked={content.published} onChange={(event) => setContent({ ...content, published: event.target.checked })} />
          Published
        </label>
        {status ? <p className="mt-4 text-sm font-semibold text-slate-600">{status}</p> : null}
        <Button className="mt-5" type="button" onClick={() => void save()}>Save content</Button>
      </Card>
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
