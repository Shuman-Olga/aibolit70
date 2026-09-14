"use strict";

const fs = require("fs");
const path = require("path");

const cheerio = require("cheerio");

const BUILD_DIR = path.resolve(__dirname, "..", "build");
const SITE_URL = "https://aibolit70.ru";

const SEO_EXTENSIONS = new Set([".html"]);
const TECHNICAL_PATHS = new Set([
  "/200.html",
  "/error/400.html",
  "/error/401.html",
  "/error/403.html",
  "/error/404.html",
  "/error/500.html",
  "/error/502.html",
  "/error/503.html",
  "/error/504.html",
]);

const DEFAULT_TITLE_MIN = 10;
const DEFAULT_TITLE_MAX = 65;

const DESCRIPTION_MIN = 50;
const DESCRIPTION_MAX = 170;

const BODY_TEXT_WARNING_MIN = 300;

const errors = [];
const warnings = [];
const infos = [];

const pages = [];
const seoPages = [];
const technicalPages = [];

const titleMap = new Map();
const descriptionMap = new Map();
const canonicalMap = new Map();

const checkedFiles = new Set();
const checkedImages = new Set();
const checkedLinks = new Set();

const stats = {
  htmlFiles: 0,
  seoPages: 0,
  technicalPages: 0,

  titles: 0,
  descriptions: 0,
  canonicals: 0,
  h1: 0,

  links: 0,
  brokenLinks: 0,

  images: 0,
  missingAlt: 0,
  emptyAlt: 0,
  brokenImages: 0,

  jsonLd: 0,
  invalidJsonLd: 0,

  sitemapUrls: 0,
  sitemapMissing: 0,
  sitemapExtra: 0,
  sitemapDuplicates: 0,

  robotsOk: false,
};

function logError(page, message) {
  errors.push({ page, message });
}

function logWarning(page, message) {
  warnings.push({ page, message });
}

function logInfo(page, message) {
  infos.push({ page, message });
}

function exists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function normalizeRoute(value) {
  if (!value) return "/";

  let route = value.trim();

  if (!route.startsWith("/")) {
    route = `/${route}`;
  }

  route = route.replace(/\/{2,}/g, "/");

  if (!route.endsWith("/") && !path.extname(route)) {
    route += "/";
  }

  return route;
}

function routeToHtmlPath(route) {
  const normalized = normalizeRoute(route);

  if (normalized === "/") {
    return path.join(BUILD_DIR, "index.html");
  }

  const clean = normalized.replace(/^\/+|\/+$/g, "");

  return path.join(BUILD_DIR, clean, "index.html");
}

function routeExists(route) {
  return exists(routeToHtmlPath(route));
}

function localAssetPath(urlPath) {
  let clean = urlPath.split("?")[0].split("#")[0];

  try {
    clean = decodeURIComponent(clean);
  } catch {
    // Keep original value.
  }

  return path.join(BUILD_DIR, clean.replace(/^\/+/, ""));
}

function isExternalUrl(value) {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("//")
  );
}

function isIgnoredLink(value) {
  if (!value) return true;

  const lower = value.trim().toLowerCase();

  return (
    lower.startsWith("#") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:") ||
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("blob:")
  );
}

function isLocalUrl(value) {
  return value.startsWith("/");
}

function getPageRoute(filePath) {
  const relative = path.relative(BUILD_DIR, filePath);

  if (relative === "index.html") {
    return "/";
  }

  const normalized = relative.split(path.sep).join("/");

  if (normalized.endsWith("/index.html")) {
    return `/${normalized.replace(/\/index\.html$/, "")}/`;
  }

  return `/${normalized}`;
}

function collectHtmlFiles(dir) {
  const result = [];

  if (!exists(dir)) {
    return result;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...collectHtmlFiles(fullPath));
      continue;
    }

    if (
      entry.isFile() &&
      SEO_EXTENSIONS.has(path.extname(entry.name).toLowerCase())
    ) {
      result.push(fullPath);
    }
  }

  return result;
}

function cleanText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function getMeta($, name) {
  const selector = `meta[name="${name}"]`;
  return cleanText($(selector).attr("content"));
}

function getProperty($, property) {
  const selector = `meta[property="${property}"]`;
  return cleanText($(selector).attr("content"));
}

function checkBuildFiles() {
  console.log("BUILD SEO FILES");
  console.log(
    "----------------------------------------------------------------------",
  );

  const requiredFiles = ["index.html", "robots.txt", "sitemap.xml"];

  for (const file of requiredFiles) {
    if (exists(path.join(BUILD_DIR, file))) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file}`);
      logError("BUILD", `missing ${file}`);
    }
  }

  console.log();
}

function checkPageBasics(page) {
  const { route, $, filePath } = page;

  const title = cleanText($("title").first().text());
  const description = getMeta($, "description");
  const canonicalRaw = cleanText(
    $('link[rel="canonical"]').first().attr("href"),
  );
  const lang = cleanText($("html").attr("lang"));
  const robots = getMeta($, "robots");

  stats.titles++;
  stats.descriptions++;
  stats.canonicals++;

  if (!title) {
    logError(route, "missing <title>");
  } else {
    if (title.length < DEFAULT_TITLE_MIN) {
      logWarning(route, `title too short: ${title.length} characters`);
    }

    if (title.length > DEFAULT_TITLE_MAX) {
      logWarning(route, `title too long: ${title.length} characters`);
    }

    titleMap.set(title, [...(titleMap.get(title) || []), route]);
  }

  if (!description) {
    logError(route, "missing meta description");
  } else {
    if (description.length < DESCRIPTION_MIN) {
      logWarning(
        route,
        `description too short: ${description.length} characters`,
      );
    }

    if (description.length > DESCRIPTION_MAX) {
      logWarning(
        route,
        `description too long: ${description.length} characters`,
      );
    }

    descriptionMap.set(description, [
      ...(descriptionMap.get(description) || []),
      route,
    ]);
  }

  if (!canonicalRaw) {
    logError(route, "missing canonical");
  } else {
    let canonical;

    try {
      canonical = new URL(canonicalRaw, SITE_URL).href;
    } catch {
      logError(route, `invalid canonical: ${canonicalRaw}`);
      canonical = null;
    }

    if (canonical) {
      canonicalMap.set(canonical, [
        ...(canonicalMap.get(canonical) || []),
        route,
      ]);

      const expected = `${SITE_URL}${normalizeRoute(route)}`;

      if (canonical !== expected) {
        logError(
          route,
          `canonical mismatch: expected ${expected}, got ${canonical}`,
        );
      }
    }
  }

  if (!lang) {
    logWarning(route, "missing <html lang>");
  } else if (!/^ru(-|$)/i.test(lang)) {
    logWarning(route, `unexpected html lang: ${lang}`);
  }

  const charset = $("meta[charset]").attr("charset");

  if (!charset) {
    logWarning(route, "missing meta charset");
  }

  const viewport = $('meta[name="viewport"]').attr("content");

  if (!viewport) {
    logWarning(route, "missing meta viewport");
  }

  if (robots && /noindex/i.test(robots)) {
    logWarning(route, `page contains noindex: ${robots}`);
  }

  const h1s = $("h1");
  stats.h1 += h1s.length;

  if (h1s.length === 0) {
    logError(route, "missing H1");
  } else if (h1s.length > 1) {
    logWarning(route, `multiple H1: ${h1s.length}`);
  }

  h1s.each((index, element) => {
    const text = cleanText($(element).text());

    if (!text) {
      logError(route, `empty H1 (#${index + 1})`);
    }
  });

  const bodyText = cleanText($("body").text());

  if (bodyText.length < BODY_TEXT_WARNING_MIN) {
    logWarning(
      route,
      `very little rendered text: ${bodyText.length} characters`,
    );
  }

  const refresh = $('meta[http-equiv="refresh"]').attr("content");

  if (refresh) {
    logWarning(route, `meta refresh found: ${refresh}`);
  }

  const base = $("base").attr("href");

  if (base) {
    logWarning(route, `<base href> found: ${base}`);
  }

  if (filePath) {
    checkedFiles.add(filePath);
  }
}

function checkOpenGraph(page) {
  const { route, $ } = page;

  const title = cleanText($("title").first().text());
  const description = getMeta($, "description");
  const canonical = cleanText($('link[rel="canonical"]').first().attr("href"));

  const ogTitle = getProperty($, "og:title");
  const ogDescription = getProperty($, "og:description");
  const ogType = getProperty($, "og:type");
  const ogUrl = getProperty($, "og:url");
  const ogImage = getProperty($, "og:image");
  const ogImageAlt = getProperty($, "og:image:alt");

  if (!ogTitle) {
    logWarning(route, "missing og:title");
  } else if (title && ogTitle !== title) {
    logWarning(route, "og:title differs from <title>");
  }

  if (!ogDescription) {
    logWarning(route, "missing og:description");
  } else if (description && ogDescription !== description) {
    logWarning(route, "og:description differs from meta description");
  }

  if (!ogType) {
    logWarning(route, "missing og:type");
  }

  if (!ogUrl) {
    logWarning(route, "missing og:url");
  } else if (canonical && ogUrl !== canonical) {
    logWarning(route, "og:url differs from canonical");
  }

  if (!ogImage) {
    logWarning(route, "missing og:image");
  } else {
    checkLocalResource(route, ogImage, "og:image");
  }

  if (ogImage && !ogImageAlt) {
    logWarning(route, "og:image exists but og:image:alt is missing");
  }
}

function checkTwitter(page) {
  const { route, $ } = page;

  const twitterCard = getMeta($, "twitter:card");
  const twitterTitle = getMeta($, "twitter:title");
  const twitterDescription = getMeta($, "twitter:description");
  const twitterImage = getMeta($, "twitter:image");

  if (!twitterCard) {
    logWarning(route, "missing twitter:card");
  }

  if (!twitterTitle) {
    logWarning(route, "missing twitter:title");
  }

  if (!twitterDescription) {
    logWarning(route, "missing twitter:description");
  }

  if (!twitterImage) {
    logWarning(route, "missing twitter:image");
  } else {
    checkLocalResource(route, twitterImage, "twitter:image");
  }
}

function checkLocalResource(route, url, label) {
  if (!url || isExternalUrl(url)) {
    return;
  }

  if (!isLocalUrl(url)) {
    return;
  }

  const resourcePath = localAssetPath(url);

  if (!exists(resourcePath)) {
    logError(route, `broken ${label}: ${url}`);
  }
}

function checkImages(page) {
  const { route, $ } = page;

  $("img").each((index, element) => {
    stats.images++;

    const src = cleanText($(element).attr("src"));
    const altAttr = $(element).attr("alt");

    if (!src) {
      logError(route, `image #${index + 1} has empty src`);
      return;
    }

    if (altAttr === undefined) {
      stats.missingAlt++;
      logError(route, `image without alt: ${src}`);
    } else if (!cleanText(altAttr)) {
      stats.emptyAlt++;
      logInfo(route, `decorative/empty alt: ${src}`);
    }

    const width = $(element).attr("width");
    const height = $(element).attr("height");

    if (!width || !height) {
      logWarning(route, `image without explicit dimensions: ${src}`);
    }

    if (isLocalUrl(src)) {
      const imagePath = localAssetPath(src);

      if (!exists(imagePath)) {
        stats.brokenImages++;
        logError(route, `broken image: ${src}`);
      }

      checkedImages.add(src);
    }
  });
}

function checkInternalLinks(page) {
  const { route, $ } = page;

  $("a[href]").each((index, element) => {
    const href = cleanText($(element).attr("href"));

    if (isIgnoredLink(href)) {
      return;
    }

    if (isExternalUrl(href)) {
      if (
        href.startsWith("http://aibolit70.ru") ||
        href.startsWith("https://www.aibolit70.ru")
      ) {
        logWarning(route, `non-canonical absolute internal link: ${href}`);
      }

      return;
    }

    if (!isLocalUrl(href)) {
      return;
    }

    stats.links++;

    const key = `${route}|${href}`;

    if (checkedLinks.has(key)) {
      return;
    }

    checkedLinks.add(key);

    if (href === "/*/" || href === "/*") {
      stats.brokenLinks++;
      logError(route, `invalid internal link: ${href}`);
      return;
    }

    if (href === "/search/" || href === "/search") {
      if (!routeExists("/search/")) {
        stats.brokenLinks++;
        logError(route, `broken internal link: ${href}`);
      }

      return;
    }

    const cleanHref = href.split("?")[0].split("#")[0];

    const extension = path.extname(cleanHref).toLowerCase();

    if (extension) {
      const resourcePath = localAssetPath(cleanHref);

      if (!exists(resourcePath)) {
        stats.brokenLinks++;
        logError(route, `broken internal file: ${cleanHref}`);
      }

      return;
    }

    const targetRoute = normalizeRoute(cleanHref);

    if (!routeExists(targetRoute)) {
      stats.brokenLinks++;
      logError(route, `broken internal route: ${targetRoute}`);
    }

    if (
      cleanHref !== "/" &&
      !cleanHref.endsWith("/") &&
      !path.extname(cleanHref)
    ) {
      logWarning(route, `internal route without trailing slash: ${cleanHref}`);
    }

    if (href.includes("//")) {
      logWarning(route, `internal URL contains duplicate slash: ${href}`);
    }
  });
}

function checkJsonLd(page) {
  const { route, $ } = page;

  const scripts = $('script[type="application/ld+json"]');

  if (!scripts.length) {
    logWarning(route, "missing JSON-LD");
    return;
  }

  scripts.each((index, element) => {
    stats.jsonLd++;

    const raw = $(element).contents().text().trim();

    if (!raw) {
      stats.invalidJsonLd++;
      logError(route, `empty JSON-LD block #${index + 1}`);
      return;
    }

    let data;

    try {
      data = JSON.parse(raw);
    } catch (error) {
      stats.invalidJsonLd++;
      logError(route, `invalid JSON-LD #${index + 1}: ${error.message}`);
      return;
    }

    validateJsonLdObject(route, data);
  });
}

function validateJsonLdObject(route, data) {
  const objects = [];

  if (Array.isArray(data)) {
    objects.push(...data);
  } else if (Array.isArray(data["@graph"])) {
    objects.push(...data["@graph"]);
  } else {
    objects.push(data);
  }

  for (const object of objects) {
    if (!object || typeof object !== "object") {
      logError(route, "JSON-LD contains non-object item");
      continue;
    }

    if (!object["@context"]) {
      logWarning(route, "JSON-LD missing @context");
    }

    if (!object["@type"]) {
      logError(route, "JSON-LD missing @type");
      continue;
    }

    const type = Array.isArray(object["@type"])
      ? object["@type"].join(",")
      : object["@type"];

    if (type === "BreadcrumbList" && !Array.isArray(object.itemListElement)) {
      logError(route, "BreadcrumbList missing itemListElement");
    }

    if (type === "Article" && !object.headline) {
      logWarning(route, "Article JSON-LD missing headline");
    }

    if (type === "Person" && !object.name) {
      logWarning(route, "Person JSON-LD missing name");
    }

    if (type === "MedicalBusiness" && !object.name) {
      logWarning(route, "MedicalBusiness JSON-LD missing name");
    }
  }
}

function checkBreadcrumbs(page) {
  const { route, $ } = page;

  const isNested = route !== "/" && route.split("/").filter(Boolean).length > 1;

  if (!isNested) {
    return;
  }

  const breadcrumbNav = $(
    'nav[aria-label="Breadcrumb"], nav[aria-label="breadcrumb"], .breadcrumb',
  );

  const hasJsonLdBreadcrumb = $('script[type="application/ld+json"]')
    .toArray()
    .some((element) => {
      try {
        const data = JSON.parse($(element).contents().text());

        const objects = Array.isArray(data)
          ? data
          : Array.isArray(data["@graph"])
            ? data["@graph"]
            : [data];

        return objects.some(
          (item) => item && item["@type"] === "BreadcrumbList",
        );
      } catch {
        return false;
      }
    });

  if (!breadcrumbNav.length && !hasJsonLdBreadcrumb) {
    logWarning(route, "nested page has no breadcrumbs");
  }
}

function checkSuspiciousHtml(page) {
  const { route, $ } = page;

  $("a[href]").each((index, element) => {
    const href = cleanText($(element).attr("href"));

    if (!href) {
      logError(route, `empty href on link #${index + 1}`);
    }

    if (/localhost|127\.0\.0\.1/i.test(href)) {
      logError(route, `development URL found: ${href}`);
    }

    if (href.startsWith("http://") && !href.startsWith("http://schema.org")) {
      logWarning(route, `HTTP URL found: ${href}`);
    }
  });

  $("img").each((index, element) => {
    const src = cleanText($(element).attr("src"));

    if (/localhost|127\.0\.0\.1/i.test(src)) {
      logError(route, `development image URL found: ${src}`);
    }
  });
}

function inspectPages() {
  console.log("SEO BUILD CHECKER");
  console.log(
    "======================================================================",
  );
  console.log(`Build: ${BUILD_DIR}`);
  console.log(`Site:  ${SITE_URL}`);
  console.log(
    "----------------------------------------------------------------------",
  );

  if (!exists(BUILD_DIR)) {
    console.error(`❌ Build directory not found: ${BUILD_DIR}`);
    process.exitCode = 1;
    return;
  }

  const htmlFiles = collectHtmlFiles(BUILD_DIR);

  stats.htmlFiles = htmlFiles.length;

  for (const filePath of htmlFiles) {
    const route = getPageRoute(filePath);
    const html = readText(filePath);
    const $ = cheerio.load(html);

    const page = {
      route,
      filePath,
      html,
      $,
    };

    pages.push(page);

    if (TECHNICAL_PATHS.has(route)) {
      technicalPages.push(page);
      continue;
    }

    seoPages.push(page);
  }

  stats.seoPages = seoPages.length;
  stats.technicalPages = technicalPages.length;

  console.log(`Pages found: ${stats.htmlFiles}`);
  console.log(`SEO pages:   ${stats.seoPages}`);
  console.log(`Technical:   ${stats.technicalPages}`);
  console.log(
    "----------------------------------------------------------------------",
  );
  console.log();

  for (const page of seoPages) {
    console.log(page.route);

    const title = cleanText(page.$("title").first().text());
    const description = getMeta(page.$, "description");
    const canonical = cleanText(
      page.$('link[rel="canonical"]').first().attr("href"),
    );

    console.log(`  title: ${title || "MISSING"}`);
    console.log(`  description: ${description || "MISSING"}`);
    console.log(`  canonical: ${canonical || "MISSING"}`);
    console.log(`  H1: ${page.$("h1").length}`);

    const beforeErrors = errors.length;

    checkPageBasics(page);
    checkOpenGraph(page);
    checkTwitter(page);
    checkImages(page);
    checkInternalLinks(page);
    checkJsonLd(page);
    checkBreadcrumbs(page);
    checkSuspiciousHtml(page);

    const pageErrors = errors.slice(beforeErrors);

    for (const error of pageErrors) {
      console.log(`  ❌ ${error.message}`);
    }

    console.log();
  }
}

function printDuplicates(title, map) {
  let count = 0;

  for (const [value, routes] of map.entries()) {
    if (routes.length <= 1) {
      continue;
    }

    count++;

    console.log(`  "${value}"`);

    for (const route of routes) {
      console.log(`    ${route}`);
    }
  }

  return count;
}

function checkDuplicates() {
  console.log(
    "======================================================================",
  );
  console.log("DUPLICATE SEO DATA");
  console.log(
    "----------------------------------------------------------------------",
  );

  const duplicateTitles = [...titleMap.values()].filter(
    (routes) => routes.length > 1,
  ).length;

  const duplicateDescriptions = [...descriptionMap.values()].filter(
    (routes) => routes.length > 1,
  ).length;

  const duplicateCanonicals = [...canonicalMap.values()].filter(
    (routes) => routes.length > 1,
  ).length;

  if (duplicateTitles) {
    console.log(`\n⚠️ Duplicate title (${duplicateTitles} pages/groups):`);
    printDuplicates("title", titleMap);
  } else {
    console.log("  ✅ No duplicate titles");
  }

  if (duplicateDescriptions) {
    console.log(
      `\n⚠️ Duplicate description (${duplicateDescriptions} groups):`,
    );
    printDuplicates("description", descriptionMap);
  } else {
    console.log("  ✅ No duplicate descriptions");
  }

  if (duplicateCanonicals) {
    console.log(`\n❌ Duplicate canonical (${duplicateCanonicals} groups):`);
    printDuplicates("canonical", canonicalMap);
  } else {
    console.log("  ✅ No duplicate canonicals");
  }

  console.log();

  return {
    duplicateTitles,
    duplicateDescriptions,
    duplicateCanonicals,
  };
}

function parseSitemap() {
  const sitemapPath = path.join(BUILD_DIR, "sitemap.xml");

  console.log(
    "======================================================================",
  );
  console.log("SITEMAP");
  console.log(
    "----------------------------------------------------------------------",
  );

  if (!exists(sitemapPath)) {
    console.log("  ❌ sitemap.xml not found");
    logError("SITEMAP", "sitemap.xml not found");
    console.log();
    return;
  }

  const xml = readText(sitemapPath);

  const locMatches = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)];

  const urls = locMatches.map((match) => match[1].trim());

  stats.sitemapUrls = urls.length;

  console.log(`URLs: ${urls.length}`);

  const normalizedUrls = [];

  for (const url of urls) {
    let parsed;

    try {
      parsed = new URL(url);
    } catch {
      logError("SITEMAP", `invalid URL: ${url}`);
      continue;
    }

    if (parsed.origin !== SITE_URL) {
      logError("SITEMAP", `URL outside SITE_URL: ${url}`);
    }

    normalizedUrls.push(`${parsed.pathname}`);
  }

  const duplicates = normalizedUrls.filter(
    (url, index) => normalizedUrls.indexOf(url) !== index,
  );

  stats.sitemapDuplicates = new Set(duplicates).size;

  if (stats.sitemapDuplicates) {
    logError("SITEMAP", `duplicate URLs: ${stats.sitemapDuplicates}`);
  }

  const sitemapRoutes = new Set(
    normalizedUrls.map((url) => normalizeRoute(url)),
  );

  const htmlRoutes = new Set(
    seoPages.map((page) => normalizeRoute(page.route)),
  );

  for (const route of htmlRoutes) {
    if (!sitemapRoutes.has(route)) {
      stats.sitemapMissing++;
      logError("SITEMAP", `SEO page missing from sitemap: ${route}`);
    }
  }

  for (const route of sitemapRoutes) {
    if (!htmlRoutes.has(route)) {
      stats.sitemapExtra++;
      logError("SITEMAP", `sitemap URL has no SEO HTML page: ${route}`);
    }
  }

  if (
    stats.sitemapMissing === 0 &&
    stats.sitemapExtra === 0 &&
    stats.sitemapDuplicates === 0
  ) {
    console.log("  ✅ Sitemap ↔ HTML consistency OK");
  } else {
    console.log(`  Missing from sitemap: ${stats.sitemapMissing}`);
    console.log(`  Extra sitemap URLs:    ${stats.sitemapExtra}`);
    console.log(`  Duplicate URLs:        ${stats.sitemapDuplicates}`);
  }

  console.log();
}

function checkRobots() {
  console.log(
    "======================================================================",
  );
  console.log("ROBOTS.TXT");
  console.log(
    "----------------------------------------------------------------------",
  );

  const robotsPath = path.join(BUILD_DIR, "robots.txt");

  if (!exists(robotsPath)) {
    console.log("  ❌ robots.txt not found");
    logError("ROBOTS", "robots.txt not found");
    console.log();
    return;
  }

  const robots = readText(robotsPath);

  console.log("  robots.txt found");

  const sitemapLines = robots
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^sitemap\s*:/i.test(line));

  if (!sitemapLines.length) {
    console.log("  ❌ Sitemap directive missing");
    logError("ROBOTS", "Sitemap directive missing");
  } else {
    let sitemapOk = false;

    for (const line of sitemapLines) {
      const value = line.replace(/^sitemap\s*:/i, "").trim();

      if (value === `${SITE_URL}/sitemap.xml`) {
        sitemapOk = true;
      } else {
        logWarning("ROBOTS", `unexpected sitemap directive: ${value}`);
      }
    }

    if (sitemapOk) {
      console.log("  Sitemap directive: OK");
      stats.robotsOk = true;
    }
  }

  const lines = robots.split(/\r?\n/);

  for (const line of lines) {
    if (/^\s*disallow\s*:\s*\/\s*$/i.test(line)) {
      logError("ROBOTS", "Disallow: / blocks the entire site");
    }
  }

  console.log();
}

function printTechnicalFiles() {
  console.log(
    "======================================================================",
  );
  console.log("TECHNICAL FILES");
  console.log(
    "----------------------------------------------------------------------",
  );

  for (const route of TECHNICAL_PATHS) {
    const filePath =
      route === "/"
        ? path.join(BUILD_DIR, "index.html")
        : path.join(BUILD_DIR, route.replace(/^\/+/, ""));

    const status = exists(filePath) ? "SKIP" : "MISSING";

    console.log(`  ${route}  ${status}`);

    if (status === "MISSING") {
      logWarning("TECHNICAL", `technical file missing: ${route}`);
    }
  }

  console.log();
}

function printSummary(duplicates) {
  console.log(
    "======================================================================",
  );
  console.log("SEO SUMMARY");
  console.log(
    "======================================================================",
  );

  console.log(`Pages checked: ${stats.seoPages}`);
  console.log(`Technical:    ${stats.technicalPages}`);
  console.log(`Errors:       ${errors.length}`);
  console.log(`Warnings:     ${warnings.length}`);
  console.log(`Info:         ${infos.length}`);
  console.log(
    "----------------------------------------------------------------------",
  );

  console.log(`Titles:       ${stats.titles}`);
  console.log(`Descriptions: ${stats.descriptions}`);
  console.log(`Canonicals:   ${stats.canonicals}`);
  console.log(`H1:           ${stats.h1}`);
  console.log(
    "----------------------------------------------------------------------",
  );

  console.log(`Links checked: ${stats.links}`);
  console.log(`Broken links:  ${stats.brokenLinks}`);
  console.log(
    "----------------------------------------------------------------------",
  );

  console.log(`Images:        ${stats.images}`);
  console.log(`Missing alt:   ${stats.missingAlt}`);
  console.log(`Empty alt:     ${stats.emptyAlt}`);
  console.log(`Broken images: ${stats.brokenImages}`);
  console.log(
    "----------------------------------------------------------------------",
  );

  console.log(`JSON-LD:       ${stats.jsonLd}`);
  console.log(`Invalid JSON-LD: ${stats.invalidJsonLd}`);
  console.log(
    "----------------------------------------------------------------------",
  );

  console.log(`Sitemap:       ${stats.sitemapUrls} URLs`);
  console.log(`Robots:        ${stats.robotsOk ? "OK" : "CHECK"}`);
  console.log(
    `Duplicates:    titles=${duplicates.duplicateTitles}, descriptions=${duplicates.duplicateDescriptions}, canonicals=${duplicates.duplicateCanonicals}`,
  );

  console.log(
    "======================================================================",
  );

  if (errors.length === 0) {
    console.log("✅ SEO CHECK PASSED");
  } else {
    console.log("❌ SEO CHECK FAILED");
  }

  if (warnings.length) {
    console.log();
    console.log("Warnings:");

    const grouped = new Map();

    for (const warning of warnings) {
      if (!grouped.has(warning.page)) {
        grouped.set(warning.page, []);
      }

      grouped.get(warning.page).push(warning.message);
    }

    for (const [page, messages] of grouped.entries()) {
      for (const message of messages) {
        console.log(`  ⚠️ ${page}: ${message}`);
      }
    }
  }

  if (errors.length) {
    console.log();
    console.log("Errors:");

    const grouped = new Map();

    for (const error of errors) {
      if (!grouped.has(error.page)) {
        grouped.set(error.page, []);
      }

      grouped.get(error.page).push(error.message);
    }

    for (const [page, messages] of grouped.entries()) {
      console.log(`  ❌ ${page}: ${messages.length} problem(s)`);

      for (const message of messages) {
        console.log(`       ${message}`);
      }
    }
  }
}

function main() {
  if (!exists(BUILD_DIR)) {
    console.error(`❌ Build not found: ${BUILD_DIR}`);
    process.exitCode = 1;
    return;
  }

  checkBuildFiles();
  inspectPages();
  const duplicates = checkDuplicates();
  parseSitemap();
  checkRobots();
  printTechnicalFiles();
  printSummary(duplicates);

  process.exitCode = errors.length > 0 ? 1 : 0;
}

main();
