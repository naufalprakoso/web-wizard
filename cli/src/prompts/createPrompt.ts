import prompts from "prompts";
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
  appType: "landing-page" | "company-profile" | "product-catalog";
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
  { title: "Product Catalog Website", value: "product-catalog" }
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

const includeChoices = [
  { title: "Admin Dashboard", value: "admin-dashboard", selected: true },
  { title: "CMS", value: "cms", selected: true },
  { title: "Firebase Auth", value: "firebase-auth", selected: true },
  { title: "Contact Form", value: "contact-form", selected: true },
  { title: "SEO Setup", value: "seo", selected: true },
  { title: "Theme Color Settings", value: "theme-settings", selected: true }
];

export async function createPrompt(input: CreatePromptInput): Promise<CreatePromptResult | null> {
  const fullySpecified = Boolean(input.projectName && input.appType && input.frontend && input.storage);
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
      },
      {
        type: fullySpecified ? null : "multiselect",
        name: "includeOptions",
        message: "Include options",
        choices: includeChoices,
        instructions: false
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
    throw new Error("Supported app types are: landing-page, company-profile, product-catalog.");
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

  const includeOptions = (firstPass.includeOptions as string[] | undefined) ?? includeChoices.map((choice) => choice.value);
  const missingOptions = includeChoices.filter((choice) => !includeOptions.includes(choice.value));
  if (missingOptions.length > 0) {
    console.log("For this MVP, all include options are generated so the project stays complete and runnable.");
  }

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
  return value === "landing-page" || value === "company-profile" || value === "product-catalog";
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
