"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getThemeSettings, saveThemeSettings } from "@/lib/theme/theme-service";
import { defaultThemePreset } from "@/lib/app-type/theme/preset";
import type { ThemeSettings } from "@/lib/theme/theme-types";

const themeSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  secondaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  textColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  radius: z.string().min(2)
});

const colorFields: Array<{ key: keyof ThemeSettings; label: string; helper: string }> = [
  { key: "primaryColor", label: "Primary color", helper: "Headings, primary buttons, important navigation." },
  { key: "secondaryColor", label: "Secondary color", helper: "Highlights, badges, secondary CTAs." },
  { key: "accentColor", label: "Accent color", helper: "Links, focus states, and small labels." },
  { key: "backgroundColor", label: "Background color", helper: "Main public page background." },
  { key: "textColor", label: "Text color", helper: "Default body text." }
];

export function ThemeSettingsForm() {
  const [theme, setTheme] = useState<ThemeSettings>(defaultThemePreset);
  const [status, setStatus] = useState("");

  useEffect(() => {
    void getThemeSettings(defaultThemePreset).then(setTheme);
  }, []);

  async function saveTheme() {
    const parsed = themeSchema.safeParse(theme);
    if (!parsed.success) {
      setStatus("Use valid hex colors and a CSS radius value.");
      return;
    }
    try {
      await saveThemeSettings(parsed.data);
      applyPreview(parsed.data);
      setStatus("Theme saved and preview updated.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to save theme settings.";
      setStatus(message);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card className="p-5">
        <div>
          <h2 className="text-xl font-black text-primary">Theme colors</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">These values feed CSS variables used by buttons, cards, badges, public sections, and focus states.</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {colorFields.map((field) => (
            <label key={field.key} className="text-sm font-bold text-slate-700">
              {field.label}
              <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">{field.helper}</span>
              <div className="mt-2 flex overflow-hidden rounded-theme border border-slate-300 bg-white">
                <input
                  className="h-12 w-14 shrink-0 cursor-pointer border-0 bg-transparent p-1"
                  type="color"
                  value={theme[field.key]}
                  onChange={(event) => setTheme((current) => ({ ...current, [field.key]: event.target.value }))}
                />
                <input
                  className="focus-ring min-h-12 w-full border-0 px-3"
                  value={theme[field.key]}
                  onChange={(event) => setTheme((current) => ({ ...current, [field.key]: event.target.value }))}
                />
              </div>
            </label>
          ))}
          <label className="text-sm font-bold text-slate-700">
            Border radius
            <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">Use a CSS value such as 8px, 14px, or 1rem.</span>
            <input
              className="focus-ring mt-2 min-h-12 w-full rounded-theme border border-slate-300 bg-white px-4"
              value={theme.radius}
              onChange={(event) => setTheme((current) => ({ ...current, radius: event.target.value }))}
            />
          </label>
        </div>
        {status ? <p className="mt-4 rounded-theme bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">{status}</p> : null}
        <Button className="mt-5 w-full md:w-auto" type="button" onClick={() => void saveTheme()}>Save theme</Button>
      </Card>

      <Card className="overflow-hidden">
        <div className="p-5" style={{ background: theme.backgroundColor, color: theme.textColor }}>
          <p className="text-sm font-black uppercase tracking-widest" style={{ color: theme.accentColor }}>Preview</p>
          <h3 className="mt-3 text-2xl font-black" style={{ color: theme.primaryColor }}>Product card</h3>
          <p className="mt-2 text-sm leading-6">Theme changes apply to the public site with safe fallback defaults when Firebase is not configured.</p>
          <button className="mt-5 min-h-11 rounded-theme px-4 py-2 text-sm font-black" style={{ background: theme.primaryColor, color: "#fff", borderRadius: theme.radius }}>
            Primary CTA
          </button>
          <span className="ml-3 inline-flex rounded-full px-3 py-1 text-xs font-black" style={{ background: theme.secondaryColor, color: "#111827" }}>
            Badge
          </span>
        </div>
      </Card>
    </div>
  );
}

function applyPreview(theme: ThemeSettings) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", theme.primaryColor);
  root.style.setProperty("--color-secondary", theme.secondaryColor);
  root.style.setProperty("--color-accent", theme.accentColor);
  root.style.setProperty("--color-background", theme.backgroundColor);
  root.style.setProperty("--color-text", theme.textColor);
  root.style.setProperty("--radius-theme", theme.radius);
}
