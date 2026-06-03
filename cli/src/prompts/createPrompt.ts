import prompts from "prompts";
import type { SupportedAppType } from "../types.js";
import { normalizeAppType, normalizeFrontend, normalizeStorage, toDisplayName } from "../utils/strings.js";
import { validateProjectName } from "../utils/validation.js";

export type CreatePromptInput = {
  projectName?: string;
  appType?: string;
  frontend?: string;
  storage?: string;
};

export type CreatePromptResult = {
  projectName: string;
  displayName: string;
  appType: SupportedAppType;
  appDisplayName: string;
  frontend: "next";
  storage: "firebase-storage";
  includeAdminDashboard: true;
  includeCms: true;
  includeFirebaseAuth: true;
  includeContactForm: true;
  includeSeoSetup: true;
  includeThemeSettings: true;
};

const appChoices = [
  { title: "Landing Page", value: "landing-page" },
  { title: "Company Profile", value: "company-profile" },
  { title: "Product Catalog Website", value: "product-catalog" },
  { title: "Portfolio Website", value: "portfolio" },
  { title: "Service Business Website", value: "service-business" }
];

const frontendChoices = [
  { title: "Next.js", description: "Fully supported", value: "next" },
  { title: "React.js", description: "Planned", value: "react" },
  { title: "Nuxt.js", description: "Planned", value: "nuxt" }
];

const storageChoices = [
  { title: "Firebase Storage", description: "Fully supported", value: "firebase-storage" },
  { title: "Bunny.net", description: "Planned", value: "bunny" },
  { title: "No Storage", description: "Planned", value: "none" }
];

export async function createPrompt(input: CreatePromptInput): Promise<CreatePromptResult | null> {
  const firstPass = await prompts(
    [
      {
        type: input.projectName ? null : "text",
        name: "projectName",
        message: "Project name",
        initial: "my-website",
        validate: validateProjectName
      },
      {
        type: input.appType ? null : "select",
        name: "appType",
        message: "App type",
        choices: appChoices,
        initial: 2
      },
      {
        type: input.frontend ? null : "select",
        name: "frontend",
        message: "Frontend",
        choices: frontendChoices,
        initial: 0
      },
      {
        type: input.storage ? null : "select",
        name: "storage",
        message: "Storage",
        choices: storageChoices,
        initial: 0
      }
    ],
    { onCancel: () => true }
  );

  const projectName = input.projectName ?? firstPass.projectName;
  const appType = normalizeAppType(input.appType ?? firstPass.appType);
  const frontend = normalizeFrontend(input.frontend ?? firstPass.frontend ?? "next");
  const storage = normalizeStorage(input.storage ?? firstPass.storage ?? "firebase-storage");

  if (!projectName || !appType || !frontend || !storage) {
    return null;
  }

  const nameValidation = validateProjectName(projectName);
  if (nameValidation !== true) {
    throw new Error(String(nameValidation));
  }

  if (!isSupportedAppType(appType)) {
    throw new Error("Supported app types are: landing-page, company-profile, product-catalog, portfolio, service-business.");
  }

  const selectedFrontend = await resolvePlannedChoice({
    kind: "Frontend",
    value: frontend,
    supportedValue: "next",
    supportedLabel: "Next.js"
  });
  if (!selectedFrontend) return null;

  const selectedStorage = await resolvePlannedChoice({
    kind: "Storage",
    value: storage,
    supportedValue: "firebase-storage",
    supportedLabel: "Firebase Storage"
  });
  if (!selectedStorage) return null;

  return {
    projectName,
    displayName: toDisplayName(projectName),
    appType,
    appDisplayName: toDisplayName(appType),
    frontend: selectedFrontend,
    storage: selectedStorage,
    includeAdminDashboard: true,
    includeCms: true,
    includeFirebaseAuth: true,
    includeContactForm: true,
    includeSeoSetup: true,
    includeThemeSettings: true
  };
}

function isSupportedAppType(value: string): value is CreatePromptResult["appType"] {
  return value === "landing-page" || value === "company-profile" || value === "product-catalog" || value === "portfolio" || value === "service-business";
}

async function resolvePlannedChoice<TSupported extends "next" | "firebase-storage">({
  kind,
  value,
  supportedValue,
  supportedLabel
}: {
  kind: string;
  value: string;
  supportedValue: TSupported;
  supportedLabel: string;
}): Promise<TSupported | null> {
  if (value === supportedValue) return supportedValue;

  const friendlyName = value === "react" ? "React.js" : value === "nuxt" ? "Nuxt.js" : value === "bunny" ? "Bunny.net" : value === "none" ? "No Storage" : value;
  if (!process.stdin.isTTY) {
    console.warn(`${kind} option "${friendlyName}" is planned. Generating the stable ${supportedLabel} template instead.`);
    return supportedValue;
  }

  const answer = await prompts(
    {
      type: "confirm",
      name: "continueWithSupported",
      message: `${kind} option "${friendlyName}" is planned but not fully implemented yet. Continue with ${supportedLabel} instead?`,
      initial: true
    },
    { onCancel: () => true }
  );

  return answer.continueWithSupported ? supportedValue : null;
}
