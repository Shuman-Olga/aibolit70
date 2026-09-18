const fs = require("fs");
const path = require("path");

const routeConfig = require("../src/routes/routeConfig");

const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const SITEMAP_FILE = path.join(PUBLIC_DIR, "sitemap.xml");
const PACKAGE_FILE = path.join(ROOT_DIR, "package.json");

const SITE_URL = "https://aibolit70.ru";

function normalizePath(value = "") {
  if (!value) {
    return "/";
  }

  let result = value.replace(/\\/g, "/");

  if (!result.startsWith("/")) {
    result = `/${result}`;
  }

  result = result.replace(/\/+/g, "/");

  if (result !== "/" && !result.endsWith("/")) {
    result += "/";
  }

  return result;
}

function joinPaths(parentPath, childPath) {
  if (!childPath) {
    return normalizePath(parentPath);
  }

  if (childPath.startsWith("/")) {
    return normalizePath(childPath);
  }

  return normalizePath(
    `${parentPath.replace(/\/+$/, "")}/${childPath.replace(/^\/+/, "")}`,
  );
}

function isExcluded(route, fullPath) {
  const normalized = normalizePath(fullPath);

  if (route.sitemap === false) {
    return true;
  }

  if (route.handle?.sitemap === false) {
    return true;
  }

  if (route.handle?.seo?.robots?.includes("noindex")) {
    return true;
  }

  if (normalized.startsWith("/search/")) {
    return true;
  }

  if (normalized.startsWith("/error/")) {
    return true;
  }

  if (normalized.includes(":")) {
    return true;
  }

  if (normalized.includes("*")) {
    return true;
  }

  return false;
}

function collectRoutes(routes, parentPath = "") {
  const result = [];

  for (const route of routes) {
    const currentPath = joinPaths(parentPath, route.path || "");

    /*
     * Если это полноценная страница с component,
     * добавляем URL в sitemap.
     */
    if (route.component && !isExcluded(route, currentPath)) {
      result.push({
        url: currentPath,
        lastmod: route.handle?.seo?.lastmod || null,
      });
    }

    /*
     * Рекурсивно обрабатываем children.
     */
    if (Array.isArray(route.children) && route.children.length > 0) {
      result.push(...collectRoutes(route.children, currentPath));
    }
  }

  return result;
}

function removeDuplicates(routes) {
  const map = new Map();

  for (const route of routes) {
    if (!map.has(route.url)) {
      map.set(route.url, route);
    }
  }

  return Array.from(map.values());
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createSitemap(routes) {
  const urls = routes
    .map(({ url, lastmod }) => {
      const loc = `${SITE_URL}${url}`;

      if (lastmod) {
        return [
          "  <url>",
          `    <loc>${escapeXml(loc)}</loc>`,
          `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
          "  </url>",
        ].join("\n");
      }

      return ["  <url>", `    <loc>${escapeXml(loc)}</loc>`, "  </url>"].join(
        "\n",
      );
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls}
</urlset>
`;
}

function updateReactSnapInclude(routes) {
  if (!fs.existsSync(PACKAGE_FILE)) {
    throw new Error("package.json не найден.");
  }

  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_FILE, "utf8"));

  if (!packageJson.reactSnap) {
    packageJson.reactSnap = {};
  }

  packageJson.reactSnap.include = routes.map((route) => route.url);

  fs.writeFileSync(
    PACKAGE_FILE,
    `${JSON.stringify(packageJson, null, 2)}\n`,
    "utf8",
  );
}

function validateRoutes(routes) {
  const errors = [];

  const urls = routes.map((route) => route.url);

  const duplicates = urls.filter((url, index) => urls.indexOf(url) !== index);

  if (duplicates.length > 0) {
    errors.push(`Дублирующиеся URL:\n${[...new Set(duplicates)].join("\n")}`);
  }

  for (const url of urls) {
    if (url !== "/" && !url.endsWith("/")) {
      errors.push(`URL без завершающего слеша: ${url}`);
    }

    if (url.includes("//")) {
      errors.push(`URL содержит двойной слеш: ${url}`);
    }

    const segments = url.split("/").filter(Boolean);

    for (let i = 1; i < segments.length; i += 1) {
      if (segments[i] === segments[i - 1]) {
        errors.push(`Повторяющийся сегмент: ${url}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Ошибка проверки sitemap:\n\n${errors.join("\n")}`);
  }
}

function main() {
  console.log("==============================================");
  console.log("AIBOLIT SITEMAP GENERATOR");
  console.log("==============================================");

  const collected = collectRoutes(routeConfig);
  const routes = removeDuplicates(collected);

  validateRoutes(routes);

  routes.sort((a, b) => a.url.localeCompare(b.url, "ru"));

  /*
   * Главная всегда первой.
   */
  routes.sort((a, b) => {
    if (a.url === "/") return -1;
    if (b.url === "/") return 1;

    return a.url.localeCompare(b.url, "ru");
  });

  const sitemap = createSitemap(routes);

  fs.mkdirSync(PUBLIC_DIR, {
    recursive: true,
  });

  fs.writeFileSync(SITEMAP_FILE, sitemap, "utf8");

  updateReactSnapInclude(routes);

  console.log("");
  console.log(`Pages: ${routes.length}`);
  console.log(`Sitemap: ${SITEMAP_FILE}`);
  console.log("reactSnap.include: updated");
  console.log("");

  for (const route of routes) {
    console.log(route.url);
  }

  console.log("");
  console.log("Sitemap generated successfully.");
}

try {
  main();
} catch (error) {
  console.error("");
  console.error("SITEMAP GENERATION FAILED");
  console.error("");
  console.error(error.message);
  process.exit(1);
}
