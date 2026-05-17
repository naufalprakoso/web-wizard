import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";

export function getPackageRoot(): string {
  let currentDir = path.dirname(fileURLToPath(import.meta.url));

  while (currentDir !== path.dirname(currentDir)) {
    if (fs.existsSync(path.join(currentDir, "package.json")) && fs.existsSync(path.join(currentDir, "templates"))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  throw new Error("Unable to locate Web Wizard package root.");
}
