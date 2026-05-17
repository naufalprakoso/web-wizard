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
    await saveThemeSettings(parsed.data);
    setStatus("Theme saved.");
  }

  return (
    <Card className="p-5">
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(theme).map(([key, value]) => (
          <label key={key} className="text-sm font-bold capitalize text-slate-700">
            {key.replace(/([A-Z])/g, " $1")}
            <input
              className="focus-ring mt-2 min-h-12 w-full rounded-theme border border-slate-300 px-4"
              type={key.includes("Color") ? "color" : "text"}
              value={value}
              onChange={(event) => setTheme((current) => ({ ...current, [key]: event.target.value }))}
            />
          </label>
        ))}
      </div>
      {status ? <p className="mt-4 text-sm font-semibold text-slate-600">{status}</p> : null}
      <Button className="mt-5" type="button" onClick={() => void saveTheme()}>Save theme</Button>
    </Card>
  );
}
