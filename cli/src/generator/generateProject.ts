import path from "node:path";
import fs from "fs-extra";
import ora from "ora";
import { copyTemplate } from "./copyTemplate.js";
import { mergeAppTypeTemplate, mergeModuleTemplate } from "./mergeTemplates.js";
import { writeEnvExample } from "./writeEnvExample.js";
import { getPackageRoot } from "../utils/paths.js";
import { replacePlaceholders } from "../utils/strings.js";

export type GenerateProjectOptions = {
  projectName: string;
  displayName: string;
  appType: "landing-page" | "company-profile" | "product-catalog";
  appDisplayName: string;
  frontend: "next";
  storage: "firebase-storage";
  targetDir: string;
};

const requiredModules = [
  "firebase-auth",
  "firebase-storage",
  "firestore-rules",
  "admin-dashboard",
  "cms",
  "theme-settings",
  "contact-form",
  "seo"
] as const;

export async function generateProject(options: GenerateProjectOptions): Promise<void> {
  const spinner = ora("Generating project").start();
  const root = getPackageRoot();
  const nextRoot = path.join(root, "templates", "next");

  try {
    await fs.ensureDir(options.targetDir);
    await copyTemplate(path.join(nextRoot, "base"), options.targetDir);

    for (const moduleName of requiredModules) {
      await mergeModuleTemplate(path.join(nextRoot, "modules", moduleName), options.targetDir);
    }

    await mergeAppTypeTemplate(path.join(nextRoot, "app-types", options.appType), options.targetDir);

    await replacePlaceholders(options.targetDir, {
      __PROJECT_NAME__: options.projectName,
      __APP_TYPE__: options.appType,
      __APP_DISPLAY_NAME__: options.appDisplayName,
      __DEFAULT_THEME__: options.appType
    });

    await writeEnvExample(options.targetDir);
    spinner.succeed("Project files generated");
  } catch (error) {
    spinner.fail("Project generation failed");
    await fs.remove(options.targetDir);
    throw error;
  }
}
