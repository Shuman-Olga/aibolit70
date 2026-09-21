const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");

const routeConfigPath = path.join(
  projectRoot,
  "src",
  "routes",
  "routeConfig.js",
);

const sitemapPath = path.join(projectRoot, "public", "sitemap.xml");

const SITE_URL = "https://aibolit70.ru";

function normalizePath(value = "") {
  return String(value)
    .trim()
    .replace(/\/+/g, "/")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

function joinPaths(parentPath = "", childPath = "") {
  const parent = normalizePath(parentPath);
  const child = normalizePath(childPath);

  if (!parent && !child) {
    return "/";
  }

  return `/${[parent, child].filter(Boolean).join("/")}/`;
}

function loadRouteConfig() {
  delete require.cache[require.resolve(routeConfigPath)];

  const routeConfig = require(routeConfigPath);

  if (!Array.isArray(routeConfig)) {
    throw new Error("routeConfig.js должен экспортировать массив маршрутов.");
  }

  return routeConfig;
}

function collectRoutes(routes, parentPath = "", result = []) {
  for (const route of routes) {
    if (!route || typeof route !== "object") {
      continue;
    }

    if (route.path === "*") {
      continue;
    }

    if (route.handle?.sitemap === false) {
      continue;
    }

    if (route.handle?.robots === "noindex") {
      continue;
    }

    const currentPath = route.index
      ? joinPaths(parentPath)
      : joinPaths(parentPath, route.path);

    if (route.path !== "*" && (route.index || route.path)) {
      result.push({
        path: currentPath,
        lastmod: route.handle?.seo?.lastmod || null,
      });
    }

    if (Array.isArray(route.children)) {
      collectRoutes(route.children, currentPath, result);
    }
  }

  return result;
}

function uniqueRoutes(routes) {
  const map = new Map();

  for (const route of routes) {
    if (!map.has(route.path)) {
      map.set(route.path, route);
    }
  }

  return [...map.values()];
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
    .map(({ path: routePath, lastmod }) => {
      const loc =
        routePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;

      const lastmodXml = lastmod
        ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>`
        : "";

      return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmodXml}
  </url>`;
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

function main() {
  console.log("========================================");
  console.log("GENERATE SITEMAP");
  console.log("========================================");

  const routeConfig = loadRouteConfig();

  const routes = uniqueRoutes(collectRoutes(routeConfig));

  const sitemap = createSitemap(routes);

  fs.writeFileSync(sitemapPath, sitemap, "utf8");

  console.log(`Sitemap generated: ${routes.length} URLs`);

  console.log(`File: ${path.relative(projectRoot, sitemapPath)}`);

  console.log("========================================");
}

main();
