import path from "node:path";
import fs from "fs-extra";
import { createPrompt } from "../prompts/createPrompt.js";
import { generateProject } from "../generator/generateProject.js";
import { installDependencies } from "../generator/installDependencies.js";
import { logger } from "../utils/logger.js";
import { normalizeProjectName } from "../utils/strings.js";

type CreateOptions = {
  appType?: string;
  frontend?: string;
  storage?: string;
  install?: boolean;
};

export async function createCommand(projectName: string | undefined, options: CreateOptions): Promise<void> {
  const answers = await createPrompt({
    projectName,
    appType: options.appType,
    frontend: options.frontend,
    storage: options.storage
  });

  if (!answers) {
    logger.info("No project created.");
    return;
  }

  const safeProjectName = normalizeProjectName(answers.projectName);
  const targetDir = path.resolve(process.cwd(), safeProjectName);

  if (await fs.pathExists(targetDir)) {
    throw new Error(`Target folder already exists: ${targetDir}`);
  }

  await generateProject({
    ...answers,
    projectName: safeProjectName,
    targetDir
  });

  if (options.install) {
    await installDependencies(targetDir);
  }

  logger.success(`Created ${answers.displayName} in ${targetDir}`);
  logger.info(`Next steps: cd ${safeProjectName} && npm install && npm run dev`);
}
