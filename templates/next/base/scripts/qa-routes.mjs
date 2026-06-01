const appType = "__APP_TYPE__";
const baseUrl = process.env.QA_BASE_URL || "http://localhost:3000";
const routes = appType === "product-catalog"
  ? ["/", "/products", "/about", "/contact", "/admin/login"]
  : ["/", "/admin/login"];

let failed = false;

for (const route of routes) {
  const url = new URL(route, baseUrl);
  try {
    const response = await fetch(url, { redirect: "manual" });
    const ok = response.status >= 200 && response.status < 400;
    console.log(`${ok ? "PASS" : "FAIL"} ${response.status} ${url.pathname}`);
    if (!ok) failed = true;
  } catch (error) {
    failed = true;
    const message = error instanceof Error ? error.message : String(error);
    console.log(`FAIL 000 ${url.pathname} - ${message}`);
  }
}

if (failed) {
  process.exitCode = 1;
}
