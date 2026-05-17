"use client";

import { useEffect } from "react";
import { getThemeSettings } from "./theme-service";
import { defaultThemePreset } from "@/lib/app-type/theme/preset";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void getThemeSettings(defaultThemePreset).then((theme) => {
      const root = document.documentElement;
      root.style.setProperty("--color-primary", theme.primaryColor);
      root.style.setProperty("--color-secondary", theme.secondaryColor);
      root.style.setProperty("--color-accent", theme.accentColor);
      root.style.setProperty("--color-background", theme.backgroundColor);
      root.style.setProperty("--color-text", theme.textColor);
      root.style.setProperty("--radius-theme", theme.radius);
    });
  }, []);

  return children;
}
