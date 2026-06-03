"use client";

import { Button } from "@/components/ui/Button";

type EditableCollectionItem = {
  id?: string;
  published: boolean;
};

type TextFieldSpec<TItem extends EditableCollectionItem> = {
  key: Extract<keyof TItem, string>;
  label: string;
  multiline?: boolean;
};

export function CollectionCrudField<TItem extends EditableCollectionItem>({
  label,
  helper,
  items,
  fields,
  createItem,
  onChange,
  onSave,
  onDelete
}: {
  label: string;
  helper: string;
  items: TItem[];
  fields: TextFieldSpec<TItem>[];
  createItem: () => TItem;
  onChange: (items: TItem[]) => void;
  onSave: (item: TItem) => void;
  onDelete: (item: TItem, index: number) => void;
}) {
  return (
    <div className="rounded-theme border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black text-primary">{label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">{helper}</p>
        </div>
        <Button type="button" variant="ghost" className="min-h-9 px-3 py-2" onClick={() => onChange([createItem(), ...items])}>Add</Button>
      </div>
      <div className="mt-4 grid gap-4">
        {items.length === 0 ? <p className="text-sm text-slate-500">No items yet.</p> : null}
        {items.map((item, index) => (
          <div key={item.id ?? index} className="rounded-theme border border-slate-200 bg-slate-50 p-3">
            <div className="grid gap-3 md:grid-cols-2">
              <TextInput label="Slug / ID" value={item.id ?? ""} onChange={(id) => onChange(updateItem(items, index, { id } as Partial<TItem>))} />
              <label className="flex items-center gap-3 rounded-theme border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700">
                <input type="checkbox" checked={item.published} onChange={(event) => onChange(updateItem(items, index, { published: event.target.checked } as Partial<TItem>))} />
                Published
              </label>
              {fields.map((field) => (
                <label key={field.key} className={field.multiline ? "text-sm font-bold text-slate-700 md:col-span-2" : "text-sm font-bold text-slate-700"}>
                  {field.label}
                  {field.multiline ? (
                    <textarea
                      className="focus-ring mt-2 min-h-28 w-full rounded-theme border border-slate-300 bg-white px-4 py-3"
                      value={String(item[field.key] ?? "")}
                      onChange={(event) => onChange(updateItem(items, index, { [field.key]: event.target.value } as Partial<TItem>))}
                    />
                  ) : (
                    <input
                      className="focus-ring mt-2 min-h-12 w-full rounded-theme border border-slate-300 bg-white px-4"
                      value={String(item[field.key] ?? "")}
                      onChange={(event) => onChange(updateItem(items, index, { [field.key]: event.target.value } as Partial<TItem>))}
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Button type="button" onClick={() => onSave(item)}>Save</Button>
              {item.id ? (
                <Button type="button" variant="ghost" className="text-red-700 hover:bg-red-50" onClick={() => onDelete(item, index)}>
                  Delete
                </Button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <input className="focus-ring mt-2 min-h-12 w-full rounded-theme border border-slate-300 bg-white px-4" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function updateItem<TItem>(items: TItem[], index: number, patch: Partial<TItem>) {
  return items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item));
}
