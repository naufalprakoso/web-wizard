"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/firebase/storage";

type ImageUploadFieldProps = {
  label: string;
  value: string;
  folder?: string;
  onChange: (value: string) => void;
};

export function ImageUploadField({ label, value, folder = "uploads", onChange }: ImageUploadFieldProps) {
  const [status, setStatus] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setStatus("Uploading...");
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      setStatus("Image uploaded.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed.";
      setStatus(message);
    }
  }

  return (
    <div>
      <label className="text-sm font-bold text-slate-700">
        {label}
        <input
          className="focus-ring mt-2 min-h-12 w-full rounded-theme border border-slate-300 px-4"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://..."
        />
      </label>
      <label className="mt-2 flex min-h-12 cursor-pointer items-center justify-center rounded-theme border border-dashed border-slate-300 px-4 text-sm font-bold text-slate-600 hover:bg-slate-50">
        Upload image
        <input
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(event) => void handleFile(event.target.files?.[0])}
        />
      </label>
      {status ? <p className="mt-2 text-xs font-semibold text-slate-500">{status}</p> : null}
    </div>
  );
}
