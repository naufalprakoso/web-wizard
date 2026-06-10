import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

const [
  schema,
  defaults,
  adminForm,
  publicPage,
  categoryImage,
  assetManifest
] = await Promise.all([
  read("templates/next/app-types/product-catalog/cms/schema.ts"),
  read("templates/next/app-types/product-catalog/cms/default-content.ts"),
  read("templates/next/app-types/product-catalog/cms/admin-form.tsx"),
  read("templates/next/app-types/product-catalog/public-pages/page.tsx"),
  read("templates/next/app-types/product-catalog/sections/CategoryImage.tsx"),
  read("templates/next/base/THIRD_PARTY_ASSETS.md")
]);

assert.match(
  schema,
  /export const categorySchema[\s\S]*imageUrl:\s*imageSourceSchema/,
  "Category schema must validate imageUrl."
);
assert.match(
  schema,
  /export const categorySchema[\s\S]*imageAlt:\s*z\.string\(\)/,
  "Category schema must validate imageAlt."
);
assert.match(
  defaults,
  /template-visuals\/categories\/clothing\.webp/,
  "Default categories must use local category images."
);
assert.match(
  adminForm,
  /folder="uploads\/categories"/,
  "Category CMS must upload images to uploads/categories."
);
assert.match(
  adminForm,
  /label="Image alt text"/,
  "Category CMS must expose image alt text."
);
assert.match(
  publicPage,
  /category\.imageUrl/,
  "Public category cards must render category.imageUrl."
);
assert.match(
  publicPage,
  /category\.imageAlt/,
  "Public category cards must use category.imageAlt."
);
assert.match(
  categoryImage,
  /onError=/,
  "Public category images must preserve a fallback after load failure."
);
assert.match(
  assetManifest,
  /categories\/clothing\.webp/,
  "Third-party asset documentation must include category images."
);

for (const name of ["clothing", "accessories", "sneakers", "beauty"]) {
  const assetPath = path.join(
    root,
    "templates/next/base/public/template-visuals/categories",
    `${name}.webp`
  );
  const asset = await stat(assetPath);
  assert.ok(asset.size > 0, `${name}.webp must not be empty.`);
}

console.log("Product category image contract passed.");
