"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { getCmsDocument, saveCmsDocument } from "@/lib/cms/cms-service";
import { companyProfileDefaultContent } from "./default-content";
import { companyProfileSchema, type CompanyProfileContent } from "./schema";

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

export function AppContentForm() {
  const [content, setContent] = useState<CompanyProfileContent>(companyProfileDefaultContent);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void getCmsDocument("companyProfile", companyProfileDefaultContent).then(setContent);
  }, []);

  async function save() {
    const parsed = companyProfileSchema.safeParse(content);
    if (!parsed.success) {
      setStatus("Please complete required fields before saving.");
      return;
    }
    await saveCmsDocument("companyProfile", parsed.data);
    setStatus("Company profile content saved.");
  }

  return (
    <Card className="p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Company name" value={content.companyName} onChange={(companyName) => setContent({ ...content, companyName })} />
        <TextField label="Company tagline" value={content.companyTagline} onChange={(companyTagline) => setContent({ ...content, companyTagline })} />
        <ImageUploadField label="Logo URL" value={content.logoUrl} folder="uploads/company-profile" onChange={(logoUrl) => setContent({ ...content, logoUrl })} />
        <ImageUploadField label="Hero image URL" value={content.heroImage} folder="uploads/company-profile" onChange={(heroImage) => setContent({ ...content, heroImage })} />
        <TextArea label="Company description" value={content.companyDescription} onChange={(companyDescription) => setContent({ ...content, companyDescription })} />
        <TextArea label="Services, one per line" value={content.services.join("\n")} onChange={(value) => setContent({ ...content, services: lines(value) })} />
        <TextArea label="Projects/clients, one per line" value={content.projects.join("\n")} onChange={(value) => setContent({ ...content, projects: lines(value) })} />
        <TextArea label="Team, Name | Role" value={content.teamMembers.map((item) => `${item.name} | ${item.role}`).join("\n")} onChange={(value) => setContent({ ...content, teamMembers: lines(value).map((row) => {
          const [name = "", role = ""] = row.split("|").map((item) => item.trim());
          return { name, role };
        }) })} />
        <TextArea label="Values, one per line" value={content.values.join("\n")} onChange={(value) => setContent({ ...content, values: lines(value) })} />
        <TextField label="Contact info" value={content.contactInfo} onChange={(contactInfo) => setContent({ ...content, contactInfo })} />
        <TextField label="SEO title" value={content.seoTitle} onChange={(seoTitle) => setContent({ ...content, seoTitle })} />
        <TextArea label="SEO description" value={content.seoDescription} onChange={(seoDescription) => setContent({ ...content, seoDescription })} />
      </div>
      <label className="mt-4 flex items-center gap-3 text-sm font-bold text-slate-700">
        <input type="checkbox" checked={content.published} onChange={(event) => setContent({ ...content, published: event.target.checked })} />
        Published
      </label>
      {status ? <p className="mt-4 text-sm font-semibold text-slate-600">{status}</p> : null}
      <Button className="mt-5" type="button" onClick={() => void save()}>Save content</Button>
    </Card>
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
