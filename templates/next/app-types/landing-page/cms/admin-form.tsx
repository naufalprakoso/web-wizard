"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { getCmsDocument, saveCmsDocument } from "@/lib/cms/cms-service";
import { landingPageDefaultContent } from "./default-content";
import { landingPageSchema, type LandingPageContent } from "./schema";

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

export function AppContentForm() {
  const [content, setContent] = useState<LandingPageContent>(landingPageDefaultContent);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void getCmsDocument("landingPage", landingPageDefaultContent).then(setContent);
  }, []);

  async function save() {
    const parsed = landingPageSchema.safeParse(content);
    if (!parsed.success) {
      setStatus("Please complete required fields before publishing.");
      return;
    }
    await saveCmsDocument("landingPage", parsed.data);
    setStatus("Landing page content saved.");
  }

  return (
    <Card className="p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Hero title" value={content.heroTitle} onChange={(heroTitle) => setContent({ ...content, heroTitle })} />
        <TextField label="CTA text" value={content.ctaText} onChange={(ctaText) => setContent({ ...content, ctaText })} />
        <TextField label="CTA link" value={content.ctaLink} onChange={(ctaLink) => setContent({ ...content, ctaLink })} />
        <ImageUploadField label="Hero image URL" value={content.heroImage} folder="uploads/landing-page" onChange={(heroImage) => setContent({ ...content, heroImage })} />
        <TextArea label="Hero subtitle" value={content.heroSubtitle} onChange={(heroSubtitle) => setContent({ ...content, heroSubtitle })} />
        <TextArea label="Features, one per line" value={content.features.join("\n")} onChange={(value) => setContent({ ...content, features: lines(value) })} />
        <TextArea label="Benefits, one per line" value={content.benefits.join("\n")} onChange={(value) => setContent({ ...content, benefits: lines(value) })} />
        <TextArea label="How it works steps, one per line" value={content.steps.join("\n")} onChange={(value) => setContent({ ...content, steps: lines(value) })} />
        <TextArea label="Testimonials, Name | Quote" value={content.testimonials.map((item) => `${item.name} | ${item.quote}`).join("\n")} onChange={(value) => setContent({ ...content, testimonials: lines(value).map((row) => {
          const [name = "", quote = ""] = row.split("|").map((item) => item.trim());
          return { name, quote };
        }) })} />
        <TextArea label="FAQ, Question | Answer" value={content.faqs.map((item) => `${item.question} | ${item.answer}`).join("\n")} onChange={(value) => setContent({ ...content, faqs: lines(value).map((row) => {
          const [question = "", answer = ""] = row.split("|").map((item) => item.trim());
          return { question, answer };
        }) })} />
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
