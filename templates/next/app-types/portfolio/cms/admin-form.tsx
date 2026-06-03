"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CollectionCrudField } from "@/components/admin/CollectionCrudField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { StringListField } from "@/components/admin/RepeaterFields";
import { deleteCollectionItem, getCmsDocument, listCollection, saveCmsDocument, saveCollectionItem } from "@/lib/cms/cms-service";
import { portfolioDefaultContent } from "./default-content";
import {
  portfolioNoteSchema,
  portfolioProjectSchema,
  portfolioSchema,
  portfolioServiceSchema,
  portfolioTestimonialSchema,
  type PortfolioContent,
  type PortfolioNote,
  type PortfolioProject,
  type PortfolioService,
  type PortfolioTestimonial
} from "./schema";

type AdminTab = "profile" | "projects" | "services" | "proof" | "notes";

export function AppContentForm() {
  const [content, setContent] = useState<PortfolioContent>(portfolioDefaultContent);
  const [projects, setProjects] = useState<PortfolioProject[]>(withPublished(portfolioDefaultContent.projects));
  const [services, setServices] = useState<PortfolioService[]>(withPublished(portfolioDefaultContent.services));
  const [testimonials, setTestimonials] = useState<PortfolioTestimonial[]>(withPublished(portfolioDefaultContent.testimonials));
  const [notes, setNotes] = useState<PortfolioNote[]>(withPublished(portfolioDefaultContent.notes));
  const [tab, setTab] = useState<AdminTab>("profile");
  const [status, setStatus] = useState("");

  useEffect(() => {
    void Promise.all([
      getCmsDocument("portfolio", portfolioDefaultContent),
      listCollection<PortfolioProject>("portfolioProjects"),
      listCollection<PortfolioService>("portfolioServices"),
      listCollection<PortfolioTestimonial>("portfolioTestimonials"),
      listCollection<PortfolioNote>("portfolioNotes")
    ])
      .then(([cms, projectItems, serviceItems, testimonialItems, noteItems]) => {
        setContent({ ...portfolioDefaultContent, ...cms });
        if (projectItems.length > 0) setProjects(projectItems);
        if (serviceItems.length > 0) setServices(serviceItems);
        if (testimonialItems.length > 0) setTestimonials(testimonialItems);
        if (noteItems.length > 0) setNotes(noteItems);
      })
      .catch((error) => setStatus(error instanceof Error ? error.message : "Unable to load portfolio CMS data."));
  }, []);

  async function saveProfile() {
    const parsed = portfolioSchema.safeParse({
      ...content,
      projects: projects.map(stripCollectionFields),
      services: services.map(stripCollectionFields),
      testimonials: testimonials.map(stripCollectionFields),
      notes: notes.map(stripCollectionFields)
    });
    if (!parsed.success) {
      setStatus(`Please fix: ${parsed.error.issues.map((issue) => issue.path.join(".") || "content").slice(0, 4).join(", ")}`);
      return;
    }
    try {
      await saveCmsDocument("portfolio", parsed.data);
      setStatus("Portfolio profile saved.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save portfolio profile.");
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
      <div className="grid gap-5">
        <div className="flex gap-2 overflow-x-auto rounded-theme border border-slate-200 bg-white p-2 shadow-sm">
          {[
            ["profile", "Profile"],
            ["projects", "Projects"],
            ["services", "Services"],
            ["proof", "Testimonials"],
            ["notes", "Notes"]
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

        {tab === "profile" ? (
          <Card className="p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Name" value={content.name} onChange={(name) => setContent({ ...content, name })} />
              <TextField label="Role" value={content.role} onChange={(role) => setContent({ ...content, role })} />
              <TextArea label="Headline" value={content.headline} onChange={(headline) => setContent({ ...content, headline })} />
              <TextArea label="Bio" value={content.bio} onChange={(bio) => setContent({ ...content, bio })} />
              <TextField label="Location" value={content.location} onChange={(location) => setContent({ ...content, location })} />
              <TextField label="Availability" value={content.availability} onChange={(availability) => setContent({ ...content, availability })} />
              <ImageUploadField label="Hero image URL" value={content.heroImage} folder="uploads/portfolio" onChange={(heroImage) => setContent({ ...content, heroImage })} />
              <TextField label="Hero image alt text" value={content.heroImageAlt ?? ""} onChange={(heroImageAlt) => setContent({ ...content, heroImageAlt })} />
              <TextField label="Contact info" value={content.contactInfo} onChange={(contactInfo) => setContent({ ...content, contactInfo })} />
              <TextField label="SEO title" value={content.seoTitle} onChange={(seoTitle) => setContent({ ...content, seoTitle })} />
              <TextArea label="SEO description" value={content.seoDescription} onChange={(seoDescription) => setContent({ ...content, seoDescription })} />
            </div>
            <div className="mt-4">
              <StringListField label="Skills" value={content.skills} onChange={(skills) => setContent({ ...content, skills })} />
            </div>
            <label className="mt-4 flex items-center gap-3 text-sm font-bold text-slate-700">
              <input type="checkbox" checked={content.published} onChange={(event) => setContent({ ...content, published: event.target.checked })} />
              Published
            </label>
            <Button className="mt-5" type="button" onClick={() => void saveProfile()}>Save profile</Button>
          </Card>
        ) : null}

        {tab === "projects" ? (
          <CollectionCrudField
            label="Projects"
            helper="Portfolio projects are saved as their own CMS records."
            items={projects}
            fields={[{ key: "name", label: "Name" }, { key: "type", label: "Type" }, { key: "summary", label: "Summary", multiline: true }, { key: "impact", label: "Impact" }, { key: "stack", label: "Stack" }, { key: "link", label: "Link" }]}
            createItem={() => ({ id: "", published: true, name: "New project", type: "Project type", summary: "Describe the work and audience.", impact: "Outcome", stack: "Tools", link: "" })}
            onChange={setProjects}
            onSave={(item) => void saveCollection("portfolioProjects", item, portfolioProjectSchema, projects, setProjects, item.name)}
            onDelete={(item, index) => void removeCollection("portfolioProjects", item, index, projects, setProjects)}
          />
        ) : null}

        {tab === "services" ? (
          <CollectionCrudField
            label="Services"
            helper="Service offers are separate records so the CMS matches portfolio work."
            items={services}
            fields={[{ key: "title", label: "Title" }, { key: "description", label: "Description", multiline: true }]}
            createItem={() => ({ id: "", published: true, title: "New service", description: "Describe what you offer." })}
            onChange={setServices}
            onSave={(item) => void saveCollection("portfolioServices", item, portfolioServiceSchema, services, setServices, item.title)}
            onDelete={(item, index) => void removeCollection("portfolioServices", item, index, services, setServices)}
          />
        ) : null}

        {tab === "proof" ? (
          <CollectionCrudField
            label="Testimonials"
            helper="Testimonials are managed independently from profile copy."
            items={testimonials}
            fields={[{ key: "name", label: "Name" }, { key: "role", label: "Role" }, { key: "quote", label: "Quote", multiline: true }]}
            createItem={() => ({ id: "", published: true, name: "Client", role: "Role", quote: "Add a concise quote." })}
            onChange={setTestimonials}
            onSave={(item) => void saveCollection("portfolioTestimonials", item, portfolioTestimonialSchema, testimonials, setTestimonials, item.name)}
            onDelete={(item, index) => void removeCollection("portfolioTestimonials", item, index, testimonials, setTestimonials)}
          />
        ) : null}

        {tab === "notes" ? (
          <CollectionCrudField
            label="Notes"
            helper="Short notes are collection records and can be published one by one."
            items={notes}
            fields={[{ key: "title", label: "Title" }, { key: "summary", label: "Summary", multiline: true }]}
            createItem={() => ({ id: "", published: true, title: "New note", summary: "Short article summary." })}
            onChange={setNotes}
            onSave={(item) => void saveCollection("portfolioNotes", item, portfolioNoteSchema, notes, setNotes, item.title)}
            onDelete={(item, index) => void removeCollection("portfolioNotes", item, index, notes, setNotes)}
          />
        ) : null}

        {status ? <p className="rounded-theme border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600">{status}</p> : null}
      </div>

      <Card className="h-max p-5">
        <p className="text-sm font-black uppercase tracking-widest text-accent">Preview</p>
        <h2 className="mt-3 text-2xl font-black text-primary">{content.name}</h2>
        <p className="mt-2 font-bold text-primary">{content.role}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{content.headline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {content.skills.slice(0, 5).map((skill) => (
            <span key={skill} className="rounded-full bg-page px-3 py-2 text-xs font-black text-primary">{skill}</span>
          ))}
        </div>
      </Card>
    </div>
  );

  async function saveCollection<TItem extends { id?: string; published: boolean }, TSchema extends { safeParse: (value: TItem) => { success: true; data: TItem } | { success: false; error: { issues: Array<{ path: Array<string | number> }> } } }>(
    collectionName: string,
    item: TItem,
    schema: TSchema,
    items: TItem[],
    setItems: (items: TItem[]) => void,
    slugSource: string
  ) {
    const id = item.id?.trim() || slugify(slugSource);
    const parsed = schema.safeParse({ ...item, id });
    if (!parsed.success) {
      setStatus(`Please fix: ${parsed.error.issues.map((issue) => issue.path.join(".") || "item").slice(0, 4).join(", ")}`);
      return;
    }
    try {
      await saveCollectionItem(collectionName, id, parsed.data);
      setItems(updateByReference(items, item, { ...parsed.data, id }));
      setStatus(`Saved "${slugSource}".`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save item.");
    }
  }

  async function removeCollection<TItem extends { id?: string }>(collectionName: string, item: TItem, index: number, items: TItem[], setItems: (items: TItem[]) => void) {
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

function updateByReference<TItem>(items: TItem[], current: TItem, next: TItem) {
  return items.map((item) => (item === current ? next : item));
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
