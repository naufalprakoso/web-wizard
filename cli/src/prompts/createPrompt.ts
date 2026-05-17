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
        initial: 0
      },
      {
        type: null,
        name: "frontend"
      },
      {
        type: null,
        name: "storage"
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

  if (frontend !== "next") {
    throw new Error("Web Wizard currently supports Next.js only. Use --frontend next.");
  }

  if (storage !== "firebase-storage") {
    throw new Error("Web Wizard currently supports Firebase Storage only. Use --storage firebase-storage.");
  }

  return {
    projectName,
    displayName: toDisplayName(projectName),
    appType,
    appDisplayName: toDisplayName(appType),
    frontend: "next",
    storage: "firebase-storage",
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
