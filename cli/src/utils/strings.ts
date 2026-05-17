import path from "node:path";
import fs from "fs-extra";

const textExtensions = new Set([
  ".css",
  ".env",
  ".example",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt"
]);

export function normalizeProjectName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeAppType(value: string | undefined): string | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase().replace(/\s+/g, "-");
  const aliases: Record<string, string> = {
    landing: "landing-page",
    "landing-page": "landing-page",
    company: "company-profile",
    "company-profile": "company-profile",
    "product-catalog": "product-catalog",
    catalog: "product-catalog"
  };
  return aliases[normalized] ?? normalized;
}

export function normalizeFrontend(value: string | undefined): string | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase().replace(".", "");
  if (["next", "nextjs"].includes(normalized)) return "next";
  return normalized;
}

export function normalizeStorage(value: string | undefined): string | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase().replace(/\s+/g, "-");
  if (["firebase", "firebase-storage"].includes(normalized)) return "firebase-storage";
  return normalized;
}

export function toDisplayName(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export async function replacePlaceholders(targetDir: string, replacements: Record<string, string>): Promise<void> {
  const entries = await fs.readdir(targetDir);

  for (const entry of entries) {
    const fullPath = path.join(targetDir, entry);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await replacePlaceholders(fullPath, replacements);
      continue;
    }

    if (!shouldProcessTextFile(fullPath)) continue;

    let contents = await fs.readFile(fullPath, "utf8");
    for (const [placeholder, value] of Object.entries(replacements)) {
      contents = contents.split(placeholder).join(value);
    }
    await fs.writeFile(fullPath, contents);
  }
}

function shouldProcessTextFile(filePath: string): boolean {
  const basename = path.basename(filePath);
  if (basename === ".env.example") return true;
  const ext = path.extname(filePath);
  return textExtensions.has(ext);
}
