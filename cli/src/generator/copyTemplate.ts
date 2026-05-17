import fs from "fs-extra";

type CopyTemplateOptions = {
  skipRootReadme?: boolean;
};

export async function copyTemplate(sourceDir: string, targetDir: string, options: CopyTemplateOptions = {}): Promise<void> {
  await fs.copy(sourceDir, targetDir, {
    overwrite: true,
    errorOnExist: false,
    filter: (source) => {
      if (source.includes("node_modules")) return false;
      if (options.skipRootReadme && source === `${sourceDir}/README.md`) return false;
      return true;
    }
  });
}
