"use client";

import { Button } from "@/components/ui/Button";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type TextFieldSpec<TItem extends Record<string, string | undefined>> = {
  key: keyof TItem;
  label: string;
  multiline?: boolean;
  image?: boolean;
  folder?: string;
};

export function StringListField({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) {
  return (
    <div className="rounded-theme border border-slate-200 bg-white p-4">
      <FieldHeader label={label} onAdd={() => onChange([...value, ""])} />
      <div className="mt-3 grid gap-3">
        {value.map((item, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              className="focus-ring min-h-11 rounded-theme border border-slate-300 px-4 text-sm"
              value={item}
              onChange={(event) => onChange(value.map((entry, entryIndex) => (entryIndex === index ? event.target.value : entry)))}
            />
            <RowActions
              canMoveUp={index > 0}
              canMoveDown={index < value.length - 1}
              onMoveUp={() => onChange(moveItem(value, index, index - 1))}
              onMoveDown={() => onChange(moveItem(value, index, index + 1))}
              onRemove={() => onChange(value.filter((_, entryIndex) => entryIndex !== index))}
            />
          </div>
        ))}
        {value.length === 0 ? <p className="text-sm text-slate-500">No items yet.</p> : null}
      </div>
    </div>
  );
}

export function RecordListField<TItem extends Record<string, string | undefined>>({
  label,
  value,
  fields,
  createItem,
  onChange
}: {
  label: string;
  value: TItem[];
  fields: TextFieldSpec<TItem>[];
  createItem: () => TItem;
  onChange: (value: TItem[]) => void;
}) {
  return (
    <div className="rounded-theme border border-slate-200 bg-white p-4">
      <FieldHeader label={label} onAdd={() => onChange([...value, createItem()])} />
      <div className="mt-3 grid gap-4">
        {value.map((item, index) => (
          <div key={index} className="rounded-theme border border-slate-200 bg-slate-50 p-3">
            <div className="grid gap-3">
              {fields.map((field) => (
                <div key={String(field.key)}>
                  {field.image ? (
                    <ImageUploadField
                      label={field.label}
                      value={item[field.key] ?? ""}
                      folder={field.folder}
                      onChange={(nextValue) => onChange(updateRecord(value, index, field.key, nextValue))}
                    />
                  ) : field.multiline ? (
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                      {field.label}
                    <textarea
                      className="focus-ring mt-2 min-h-24 w-full rounded-theme border border-slate-300 bg-white px-3 py-2 text-sm font-semibold normal-case tracking-normal text-slate-900"
                      value={item[field.key] ?? ""}
                      onChange={(event) => onChange(updateRecord(value, index, field.key, event.target.value))}
                    />
                    </label>
                  ) : (
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                      {field.label}
                    <input
                      className="focus-ring mt-2 min-h-11 w-full rounded-theme border border-slate-300 bg-white px-3 text-sm font-semibold normal-case tracking-normal text-slate-900"
                      value={item[field.key] ?? ""}
                      onChange={(event) => onChange(updateRecord(value, index, field.key, event.target.value))}
                    />
                    </label>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3">
              <RowActions
                canMoveUp={index > 0}
                canMoveDown={index < value.length - 1}
                onMoveUp={() => onChange(moveItem(value, index, index - 1))}
                onMoveDown={() => onChange(moveItem(value, index, index + 1))}
                onRemove={() => onChange(value.filter((_, entryIndex) => entryIndex !== index))}
              />
            </div>
          </div>
        ))}
        {value.length === 0 ? <p className="text-sm text-slate-500">No items yet.</p> : null}
      </div>
    </div>
  );
}

function FieldHeader({ label, onAdd }: { label: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-black text-primary">{label}</p>
      <Button type="button" variant="ghost" className="min-h-9 px-3 py-2" onClick={onAdd}>Add</Button>
    </div>
  );
}

function RowActions({
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onRemove
}: {
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="ghost" className="min-h-9 px-3 py-2" disabled={!canMoveUp} onClick={onMoveUp}>Up</Button>
      <Button type="button" variant="ghost" className="min-h-9 px-3 py-2" disabled={!canMoveDown} onClick={onMoveDown}>Down</Button>
      <Button type="button" variant="ghost" className="min-h-9 px-3 py-2 text-red-700 hover:bg-red-50" onClick={onRemove}>Remove</Button>
    </div>
  );
}

function moveItem<TItem>(items: TItem[], from: number, to: number): TItem[] {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function updateRecord<TItem extends Record<string, string | undefined>>(items: TItem[], index: number, key: keyof TItem, value: string): TItem[] {
  return items.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item));
}
