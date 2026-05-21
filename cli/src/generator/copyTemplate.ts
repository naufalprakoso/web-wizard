import path from "node:path";
import fs from "fs-extra";

type CopyTemplateOptions = {
  skipRootReadme?: boolean;
};

export async function copyTemplate(sourceDir: string, targetDir: string, options: CopyTemplateOptions = {}): Promise<void> {
  await fs.copy(sourceDir, targetDir, {
    overwrite: true,
    errorOnExist: false,
    filter: (source) => {
      const relativeSource = path.relative(sourceDir, source);
      if (relativeSource.split(path.sep).includes("node_modules")) return false;
      if (options.skipRootReadme && path.relative(sourceDir, source) === "README.md") return false;
      return true;
    }
  });
}
