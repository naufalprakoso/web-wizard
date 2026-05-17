import path from "node:path";
import fs from "fs-extra";
import { copyTemplate } from "./copyTemplate.js";

export async function mergeModuleTemplate(sourceDir: string, targetDir: string): Promise<void> {
  if (!(await fs.pathExists(sourceDir))) return;
  await copyTemplate(sourceDir, targetDir, { skipRootReadme: true });
}

export async function mergeAppTypeTemplate(sourceDir: string, targetDir: string): Promise<void> {
  if (!(await fs.pathExists(sourceDir))) {
    throw new Error(`Missing app type template: ${sourceDir}`);
  }

  const mappings = [
    ["public-pages", "app"],
    ["sections", "components/sections"],
    ["cms", "lib/app-type/cms"],
    ["theme", "lib/app-type/theme"]
  ] as const;

  for (const [from, to] of mappings) {
    const source = path.join(sourceDir, from);
    if (await fs.pathExists(source)) {
      await copyTemplate(source, path.join(targetDir, to));
    }
  }
}
