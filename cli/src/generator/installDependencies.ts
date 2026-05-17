import { execa } from "execa";
import ora from "ora";

export async function installDependencies(targetDir: string): Promise<void> {
  const spinner = ora("Installing dependencies").start();
  try {
    await execa("npm", ["install"], { cwd: targetDir });
    spinner.succeed("Dependencies installed");
  } catch (error) {
    spinner.fail("Dependency installation failed");
    throw error;
  }
}
