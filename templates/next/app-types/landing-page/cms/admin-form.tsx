"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RecordListField, StringListField } from "@/components/admin/RepeaterFields";
import { getCmsDocument, saveCmsDocument } from "@/lib/cms/cms-service";
import { landingPageDefaultContent } from "./default-content";
import { landingPageSchema, type LandingPageContent } from "./schema";

export function AppContentForm() {
  const [content, setContent] = useState<LandingPageContent>(landingPageDefaultContent);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void getCmsDocument("landingPage", landingPageDefaultContent).then(setContent);
  }, []);

  async function save() {
    const parsed = landingPageSchema.safeParse(content);
    if (!parsed.success) {
      setStatus(`Please fix: ${parsed.error.issues.map((issue) => issue.path.join(".") || "content").slice(0, 4).join(", ")}`);
      return;
    }
    await saveCmsDocument("landingPage", parsed.data);
    setStatus("Landing page content saved.");
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
      <Card className="p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Hero title" value={content.heroTitle} onChange={(heroTitle) => setContent({ ...content, heroTitle })} />
          <TextField label="CTA text" value={content.ctaText} onChange={(ctaText) => setContent({ ...content, ctaText })} />
          <TextField label="CTA link" value={content.ctaLink} onChange={(ctaLink) => setContent({ ...content, ctaLink })} />
          <ImageUploadField label="Hero image URL" value={content.heroImage} folder="uploads/landing-page" onChange={(heroImage) => setContent({ ...content, heroImage })} />
          <TextField label="Hero image alt text" value={content.heroImageAlt ?? ""} onChange={(heroImageAlt) => setContent({ ...content, heroImageAlt })} />
          <TextArea label="Hero subtitle" value={content.heroSubtitle} onChange={(heroSubtitle) => setContent({ ...content, heroSubtitle })} />
          <TextArea label="Conversion note" value={content.conversionNote} onChange={(conversionNote) => setContent({ ...content, conversionNote })} />
          <TextArea label="Problem title" value={content.problemTitle} onChange={(problemTitle) => setContent({ ...content, problemTitle })} />
          <TextArea label="Problem body" value={content.problemBody} onChange={(problemBody) => setContent({ ...content, problemBody })} />
          <TextArea label="Outcome title" value={content.outcomeTitle} onChange={(outcomeTitle) => setContent({ ...content, outcomeTitle })} />
          <TextArea label="Outcome body" value={content.outcomeBody} onChange={(outcomeBody) => setContent({ ...content, outcomeBody })} />
          <TextArea label="Final CTA title" value={content.finalCtaTitle} onChange={(finalCtaTitle) => setContent({ ...content, finalCtaTitle })} />
          <TextArea label="Final CTA text" value={content.finalCtaText} onChange={(finalCtaText) => setContent({ ...content, finalCtaText })} />
          <TextField label="Contact info" value={content.contactInfo} onChange={(contactInfo) => setContent({ ...content, contactInfo })} />
          <TextField label="SEO title" value={content.seoTitle} onChange={(seoTitle) => setContent({ ...content, seoTitle })} />
          <TextArea label="SEO description" value={content.seoDescription} onChange={(seoDescription) => setContent({ ...content, seoDescription })} />
        </div>
        <div className="mt-4 grid gap-4">
          <RecordListField label="Audience segments" value={content.audienceSegments} fields={[{ key: "name", label: "Name" }, { key: "description", label: "Description", multiline: true }]} createItem={() => ({ name: "New audience", description: "Describe who this page is for." })} onChange={(audienceSegments) => setContent({ ...content, audienceSegments })} />
          <RecordListField label="Content variants" value={content.contentVariants} fields={[{ key: "name", label: "Name" }, { key: "description", label: "Description", multiline: true }, { key: "cta", label: "CTA" }]} createItem={() => ({ name: "New variant", description: "Describe the variant.", cta: "Start now" })} onChange={(contentVariants) => setContent({ ...content, contentVariants })} />
          <StringListField label="Proof points" value={content.proofPoints} onChange={(proofPoints) => setContent({ ...content, proofPoints })} />
          <StringListField label="Features" value={content.features} onChange={(features) => setContent({ ...content, features })} />
          <StringListField label="Benefits" value={content.benefits} onChange={(benefits) => setContent({ ...content, benefits })} />
          <StringListField label="How it works steps" value={content.steps} onChange={(steps) => setContent({ ...content, steps })} />
          <RecordListField label="Testimonials" value={content.testimonials} fields={[{ key: "name", label: "Name" }, { key: "role", label: "Role" }, { key: "quote", label: "Quote", multiline: true }]} createItem={() => ({ name: "Team", role: "Sample use case", quote: "Add a concise proof quote." })} onChange={(testimonials) => setContent({ ...content, testimonials })} />
          <RecordListField label="FAQ" value={content.faqs} fields={[{ key: "question", label: "Question" }, { key: "answer", label: "Answer", multiline: true }]} createItem={() => ({ question: "New question?", answer: "Add a clear answer." })} onChange={(faqs) => setContent({ ...content, faqs })} />
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
        <h2 className="mt-3 text-2xl font-black text-primary">{content.heroTitle}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{content.heroSubtitle}</p>
        <div className="mt-4 grid gap-2">
          {content.proofPoints.slice(0, 3).map((point) => (
            <p key={point} className="rounded-theme bg-page px-3 py-2 text-sm font-bold text-primary">{point}</p>
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
