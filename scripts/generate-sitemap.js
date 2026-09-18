/**
 * Generate sitemap.xml from React Router route definitions.
 *
 * Project:
 *   aibolit70.ru
 *
 * Source:
 *   src/routes/
 *
 * Output:
 *   public/sitemap.xml
 *
 * The script does NOT import React route modules.
 * It parses route definitions as text, so it can run directly with Node.js.
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://aibolit70.ru";

const ROOT_DIR = path.resolve(__dirname, "..");
const ROUTES_DIR = path.join(ROOT_DIR, "src", "routes");
const OUTPUT_FILE = path.join(ROOT_DIR, "public", "sitemap.xml");

/**
 * Routes that must never appear in sitemap.
 */
const EXCLUDED_PATHS = new Set(["/search/", "/error/"]);

/**
 * Route segments that are technical/fallback routes.
 */
const EXCLUDED_SEGMENTS = new Set(["*"]);

/**
 * Normalize URL:
 * - absolute URL -> pathname
 * - remove duplicate slashes
 * - ensure leading slash
 * - ensure trailing slash
 */
function normalizeUrl(value) {
  if (!value) {
    return null;
  }

  let url = String(value).trim();

  if (!url) {
    return null;
  }

  // Convert absolute URL to pathname.
  if (/^https?:\/\//i.test(url)) {
    try {
      url = new URL(url).pathname;
    } catch {
      return null;
    }
  }

  // Ignore query strings and hashes.
  url = url.split("#")[0].split("?")[0];

  // Normalize slashes.
  url = url.replace(/\/+/g, "/");

  if (!url.startsWith("/")) {
    url = `/${url}`;
  }

  if (url !== "/" && !url.endsWith("/")) {
    url += "/";
  }

  return url;
}

/**
 * Check whether route should be excluded.
 */
function shouldExclude(url) {
  if (!url) {
    return true;
  }

  if (EXCLUDED_PATHS.has(url)) {
    return true;
  }

  const segments = url.split("/").filter(Boolean);

  return segments.some((segment) => EXCLUDED_SEGMENTS.has(segment));
}

/**
 * Remove comments from source without destroying strings.
 */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

/**
 * Find all route module files.
 */
function getRouteFiles() {
  return fs
    .readdirSync(ROUTES_DIR)
    .filter((file) => /\.(js|jsx|ts|tsx)$/.test(file))
    .filter((file) => file !== "index.js" && file !== "index.jsx")
    .map((file) => path.join(ROUTES_DIR, file));
}

/**
 * Find matching closing bracket.
 *
 * Supports:
 *   []
 *   {}
 *
 * while respecting strings and template literals.
 */
function findMatchingBracket(source, start, openChar, closeChar) {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = start; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === openChar) {
      depth += 1;
    } else if (char === closeChar) {
      depth -= 1;

      if (depth === 0) {
        return i;
      }
    }
  }

  return -1;
}

/**
 * Extract a JavaScript property value from an object.
 *
 * Example:
 *
 * path: "doctors"
 *
 * returns:
 *
 * doctors
 */
function getPropertyValue(objectSource, propertyName) {
  const regex = new RegExp(`\\b${propertyName}\\s*:\\s*(['"])(.*?)\\1`);

  const match = objectSource.match(regex);

  return match ? match[2] : null;
}

/**
 * Find the `children: [...]` block in a route object.
 */
function getChildrenBlock(objectSource) {
  const match = /\bchildren\s*:\s*\[/m.exec(objectSource);

  if (!match) {
    return null;
  }

  const start = match.index + match[0].lastIndexOf("[");

  const end = findMatchingBracket(objectSource, start, "[", "]");

  if (end === -1) {
    return null;
  }

  return objectSource.slice(start + 1, end);
}

/**
 * Find route objects inside an array/object source.
 *
 * This is intentionally limited to the project's route structure:
 *
 * {
 *   path: "...",
 *   children: [...]
 * }
 *
 * It does not try to execute application JavaScript.
 */
function findRouteObjects(source) {
  const objects = [];

  let quote = null;
  let escaped = false;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char !== "{") {
      continue;
    }

    const end = findMatchingBracket(source, i, "{", "}");

    if (end === -1) {
      continue;
    }

    const objectSource = source.slice(i, end + 1);

    if (/\bpath\s*:/.test(objectSource)) {
      objects.push(objectSource);
    }

    i = end;
  }

  return objects;
}

/**
 * Extract routes recursively.
 *
 * Parent:
 *   doctors
 *
 * Child:
 *   sadovnikova-elena-gennadevna
 *
 * Result:
 *   /doctors/
 *   /doctors/sadovnikova-elena-gennadevna/
 */
function extractRoutes(source, parentPath = "") {
  const routes = [];

  const objects = findRouteObjects(source);

  for (const objectSource of objects) {
    const routePath = getPropertyValue(objectSource, "path");

    /*
     * `path: "*"` is a fallback route.
     */
    if (routePath === "*") {
      continue;
    }

    /*
     * Ignore dynamic parameters.
     *
     * Current project does not use them for public SEO pages,
     * and they should not be blindly inserted into sitemap.
     */
    if (routePath && /[:*]/.test(routePath)) {
      continue;
    }

    /*
     * Parent path + current path.
     */
    let currentPath = parentPath;

    if (routePath) {
      if (routePath.startsWith("/")) {
        currentPath = routePath;
      } else {
        currentPath = `${parentPath}/${routePath}`;
      }
    }

    currentPath = normalizeUrl(currentPath || "/");

    /*
     * `index: true` represents the current parent URL.
     *
     * We intentionally don't add an empty route here because
     * the parent route itself is already represented by its path.
     */
    const isIndexRoute = /\bindex\s*:\s*true\b/.test(objectSource);

    if (isIndexRoute && currentPath) {
      routes.push(currentPath);
    }

    /*
     * A normal route with a path is itself a public URL.
     */
    if (routePath && currentPath) {
      routes.push(currentPath);
    }

    /*
     * Recursively process children.
     */
    const childrenBlock = getChildrenBlock(objectSource);

    if (childrenBlock) {
      routes.push(...extractRoutes(childrenBlock, currentPath || parentPath));
    }
  }

  return routes;
}

/**
 * Extract routes from one route module.
 */
function parseRouteFile(file) {
  const source = fs.readFileSync(file, "utf8");
  const cleaned = stripComments(source);

  return extractRoutes(cleaned, "");
}

/**
 * The project has some routes generated through `.map()`.
 *
 * blogRoutes is special:
 *
 *   ...posts.map((post) => {
 *     return {
 *       path: post.path,
 *       ...
 *     };
 *   })
 *
 * Static parsing cannot execute `posts.map()`, therefore the blog
 * paths are extracted separately from the `posts` array.
 */
function parseBlogRoutes(file) {
  const source = stripComments(fs.readFileSync(file, "utf8"));

  const postsMatch = /\bconst\s+posts\s*=\s*\[/.exec(source);

  if (!postsMatch) {
    return [];
  }

  const start = source.indexOf("[", postsMatch.index);

  const end = findMatchingBracket(source, start, "[", "]");

  if (end === -1) {
    return [];
  }

  const postsSource = source.slice(start + 1, end);
  const objects = findRouteObjects(postsSource);

  return objects
    .map((objectSource) => getPropertyValue(objectSource, "path"))
    .filter(Boolean)
    .map((postPath) => normalizeUrl(`/blog/${postPath}`));
}

/**
 * Build complete sitemap URL list.
 */
function collectUrls() {
  const urls = new Set();

  /*
   * Root route.
   *
   * src/routes/index.jsx:
   *
   * path: "/"
   */
  urls.add("/");

  const routeFiles = getRouteFiles();

  for (const file of routeFiles) {
    const fileName = path.basename(file);

    /*
     * Blog posts are generated with posts.map().
     */
    if (fileName === "blogRoutes.jsx" || fileName === "blogRoutes.js") {
      for (const url of parseBlogRoutes(file)) {
        if (!shouldExclude(url)) {
          urls.add(url);
        }
      }

      /*
       * Also collect /blog/ itself.
       */
      urls.add("/blog/");

      continue;
    }

    for (const url of parseRouteFile(file)) {
      if (!shouldExclude(url)) {
        urls.add(url);
      }
    }
  }

  /*
   * Routes explicitly defined in src/routes/index.jsx.
   *
   * These are handled here because index.jsx also contains
   * SearchPage and Contacts.
   */
  const indexFile = path.join(ROUTES_DIR, "index.jsx");

  if (fs.existsSync(indexFile)) {
    const source = stripComments(fs.readFileSync(indexFile, "utf8"));

    const indexObjects = findRouteObjects(source);

    for (const objectSource of indexObjects) {
      const routePath = getPropertyValue(objectSource, "path");

      if (!routePath || routePath === "*") {
        continue;
      }

      const url = normalizeUrl(routePath);

      if (url && !shouldExclude(url)) {
        urls.add(url);
      }
    }

    /*
     * Contacts is a normal public page.
     */
    if (/\bpath\s*:\s*["']kontakty["']/.test(source)) {
      urls.add("/kontakty/");
    }

    /*
     * Search is deliberately excluded from sitemap.
     */
    urls.delete("/search/");
  }

  return [...urls]
    .map(normalizeUrl)
    .filter(Boolean)
    .filter((url) => !shouldExclude(url))
    .sort((a, b) => {
      if (a === "/") {
        return -1;
      }

      if (b === "/") {
        return 1;
      }

      return a.localeCompare(b, "ru");
    });
}

/**
 * Escape XML characters.
 */
function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Build XML.
 */
function createSitemap(urls) {
  const entries = urls
    .map((url) => {
      const loc = escapeXml(`${SITE_URL}${url}`);

      return `  <url>
    <loc>${loc}</loc>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${entries}
</urlset>
`;
}

/**
 * Main.
 */
function main() {
  console.log("==============================================");
  console.log("AIBOLIT SITEMAP GENERATOR");
  console.log("==============================================");
  console.log(`Routes:  ${ROUTES_DIR}`);
  console.log(`Output:  ${OUTPUT_FILE}`);
  console.log(`Site:    ${SITE_URL}`);
  console.log("----------------------------------------------");

  const urls = collectUrls();

  if (!urls.length) {
    throw new Error("No public routes were found. Sitemap was not generated.");
  }

  const xml = createSitemap(urls);

  fs.mkdirSync(path.dirname(OUTPUT_FILE), {
    recursive: true,
  });

  fs.writeFileSync(OUTPUT_FILE, xml, "utf8");

  console.log(`URLs:    ${urls.length}`);
  console.log("----------------------------------------------");

  urls.forEach((url, index) => {
    console.log(`${String(index + 1).padStart(3, " ")} ${url}`);
  });

  console.log("----------------------------------------------");
  console.log(`Sitemap written to: ${OUTPUT_FILE}`);
  console.log("==============================================");
}

try {
  main();
} catch (error) {
  console.error("\nSITEMAP GENERATION FAILED\n");
  console.error(error);
  process.exit(1);
}
