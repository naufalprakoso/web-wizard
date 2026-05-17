#!/usr/bin/env node
import { Command } from "commander";
import { createCommand } from "./commands/create.js";

const program = new Command();

program
  .name("web-wizard")
  .description("Generate responsive websites with CMS, admin dashboard, Firebase, and customizable themes.")
  .version("0.1.0");

program
  .command("create")
  .description("Create a new website project.")
  .argument("[projectName]", "Project folder name")
  .option("--app-type <appType>", "landing-page, company-profile, product-catalog")
  .option("--frontend <frontend>", "next")
  .option("--storage <storage>", "firebase-storage")
  .option("--install", "Install generated project dependencies")
  .action((projectName: string | undefined, options) => {
    return createCommand(projectName, options);
  });

program.parseAsync(process.argv).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
