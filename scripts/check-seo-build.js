"use strict";

const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "..", "build");
const SITE_URL = "https://aibolit70.ru";

const TECHNICAL_FILES = new Set([
  "/200.html",
  "/bundle-report.html",
  "/error/400.html",
  "/error/401.html",
  "/error/403.html",
  "/error/404.html",
  "/error/500.html",
  "/error/502.html",
  "/error/503.html",
  "/error/504.html",
]);

/*
 * SEO thresholds.
 *
 * These are recommendations, not hard SEO errors.
 * Google does not use an exact character limit for title/description.
 */
const TITLE_MIN = 30;
const TITLE_MAX = 60;

const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 160;

let errors = 0;
let warnings = 0;
let pagesChecked = 0;
let technicalPages = 0;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function normalizePath(filePath) {
  let relative = path.relative(BUILD_DIR, filePath);

  relative = relative.replace(/\\/g, "/");

  if (relative === "index.html") {
    return "/";
  }

  if (relative.endsWith("/index.html")) {
    relative = relative.slice(0, -"/index.html".length) + "/";
  }

  if (!relative.startsWith("/")) {
    relative = `/${relative}`;
  }

  return relative;
}

function isTechnicalPage(urlPath) {
  return TECHNICAL_FILES.has(urlPath);
}

function collectHtmlFiles(dir) {
  const result = [];

  if (!fs.existsSync(dir)) {
    return result;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      result.push(...collectHtmlFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      result.push(fullPath);
    }
  }

  return result;
}

function decodeHtml(value) {
  if (!value) {
    return "";
  }

  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .trim();
}

function cleanText(value) {
  return decodeHtml(value).replace(/\s+/g, " ").trim();
}

function getTitle(html) {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);

  return match ? cleanText(match[1]) : "";
}

function getMetaContent(html, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(
    `<meta\\s+[^>]*(?:name|property)=["']${escapedName}["'][^>]*content=["']([^"']*)["'][^>]*>`,
    "i",
  );

  const reverseRegex = new RegExp(
    `<meta\\s+[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${escapedName}["'][^>]*>`,
    "i",
  );

  const match = html.match(regex) || html.match(reverseRegex);

  return match ? cleanText(match[1]) : "";
}

function getCanonical(html) {
  const regex =
    /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i;

  const reverseRegex =
    /<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i;

  const match = html.match(regex) || html.match(reverseRegex);

  return match ? match[1].trim() : "";
}

function getH1Count(html) {
  const matches = html.match(/<h1\b[^>]*>/gi);

  return matches ? matches.length : 0;
}

function getHtmlLang(html) {
  const match = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i);

  return match ? match[1].trim() : "";
}

function hasJsonLd(html) {
  return /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i.test(
    html,
  );
}

function validateJsonLd(html) {
  const scripts = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];

  if (!scripts.length) {
    return {
      exists: false,
      valid: true,
    };
  }

  for (const script of scripts) {
    const json = script[1].trim();

    if (!json) {
      return {
        exists: true,
        valid: false,
      };
    }

    try {
      JSON.parse(json);
    } catch {
      return {
        exists: true,
        valid: false,
      };
    }
  }

  return {
    exists: true,
    valid: true,
  };
}

function printWarning(message) {
  warnings += 1;
  console.log(`  ⚠️ ${message}`);
}

function printError(message) {
  errors += 1;
  console.log(`  ❌ ${message}`);
}

function printOk() {
  console.log("  ✅ OK");
}

/* -------------------------------------------------------------------------- */
/* SEO validation                                                             */
/* -------------------------------------------------------------------------- */

function checkSeoPage(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  const urlPath = normalizePath(filePath);

  pagesChecked += 1;

  console.log("");
  console.log(urlPath);

  const title = getTitle(html);
  const description = getMetaContent(html, "description");
  const canonical = getCanonical(html);
  const h1Count = getH1Count(html);

  const robots = getMetaContent(html, "robots");

  const ogTitle = getMetaContent(html, "og:title");
  const ogDescription = getMetaContent(html, "og:description");
  const ogType = getMetaContent(html, "og:type");
  const ogUrl = getMetaContent(html, "og:url");
  const ogImage = getMetaContent(html, "og:image");

  const twitterCard = getMetaContent(html, "twitter:card");

  const htmlLang = getHtmlLang(html);

  const jsonLd = validateJsonLd(html);

  console.log(`  title: ${title || "(missing)"}`);

  if (description) {
    console.log(`  description: ${description}`);
  }

  if (canonical) {
    console.log(`  canonical: ${canonical}`);
  }

  console.log(`  H1: ${h1Count}`);

  /* ------------------------------- Critical -------------------------------- */

  if (!title) {
    printError("title missing");
  }

  if (!description) {
    printError("meta description missing");
  }

  if (!canonical) {
    printError("canonical missing");
  }

  if (h1Count === 0) {
    printError("H1 missing");
  }

  if (h1Count > 1) {
    printWarning(`multiple H1 tags: ${h1Count}`);
  }

  /* ------------------------------- Canonical -------------------------------- */

  if (canonical) {
    const expectedCanonical = `${SITE_URL}${urlPath}`;

    if (canonical !== expectedCanonical) {
      printWarning(
        `canonical mismatch: ${canonical} (expected ${expectedCanonical})`,
      );
    }
  }

  /* --------------------------------- Title ---------------------------------- */

  if (title) {
    const titleLength = title.length;

    if (titleLength < TITLE_MIN) {
      printWarning(`title too short: ${titleLength} characters`);
    }

    if (titleLength > TITLE_MAX) {
      printWarning(`title too long: ${titleLength} characters`);
    }
  }

  /* ------------------------------ Description ------------------------------- */

  if (description) {
    const descriptionLength = description.length;

    if (descriptionLength < DESCRIPTION_MIN) {
      printWarning(`description too short: ${descriptionLength} characters`);
    }

    if (descriptionLength > DESCRIPTION_MAX) {
      printWarning(`description too long: ${descriptionLength} characters`);
    }
  }

  /* -------------------------------- Robots ---------------------------------- */

  if (!robots) {
    printWarning("robots meta missing");
  }

  /* -------------------------------- OpenGraph ------------------------------- */

  if (!ogTitle) {
    printWarning("og:title missing");
  }

  if (!ogDescription) {
    printWarning("og:description missing");
  }

  if (!ogType) {
    printWarning("og:type missing");
  }

  if (!ogUrl) {
    printWarning("og:url missing");
  }

  if (!ogImage) {
    printWarning("og:image missing");
  }

  if (ogTitle && title && ogTitle !== title) {
    printWarning("og:title differs from title");
  }

  if (ogUrl && canonical && ogUrl !== canonical) {
    printWarning("og:url differs from canonical");
  }

  /* -------------------------------- Twitter --------------------------------- */

  if (!twitterCard) {
    printWarning("twitter:card missing");
  }

  /* --------------------------------- Lang ----------------------------------- */

  if (!htmlLang) {
    printWarning("html lang missing");
  }

  /* -------------------------------- JSON-LD --------------------------------- */

  if (!jsonLd.exists) {
    printWarning("JSON-LD missing");
  } else if (!jsonLd.valid) {
    printError("JSON-LD contains invalid JSON");
  }

  /* --------------------------------- Result --------------------------------- */

  const pageHasCriticalError =
    !title ||
    !description ||
    !canonical ||
    h1Count === 0 ||
    (jsonLd.exists && !jsonLd.valid);

  if (!pageHasCriticalError) {
    /*
     * Do not print OK when warnings exist.
     * This makes the output easier to read.
     */
    const before = warnings;

    /*
     * We cannot know page-specific warning count directly here,
     * therefore OK is printed only when the page passed all checks
     * without any warning/error generated during this function.
     *
     * The global counters are handled by the snapshot below.
     */
  }
}

/* -------------------------------------------------------------------------- */
/* Main                                                                       */
/* -------------------------------------------------------------------------- */

console.log("=".repeat(70));
console.log("SEO BUILD CHECKER");
console.log("=".repeat(70));
console.log(`Build: ${BUILD_DIR}`);
console.log(`Site:  ${SITE_URL}`);

if (!fs.existsSync(BUILD_DIR)) {
  console.error("");
  console.error(`❌ Build directory not found: ${BUILD_DIR}`);
  console.error("");
  console.error("Run the production build first.");
  process.exit(1);
}

const htmlFiles = collectHtmlFiles(BUILD_DIR);

if (!htmlFiles.length) {
  console.error("");
  console.error("❌ No HTML files found in build.");
  process.exit(1);
}

const sortedFiles = htmlFiles.sort((a, b) => {
  const pathA = normalizePath(a);
  const pathB = normalizePath(b);

  return pathA.localeCompare(pathB, "ru");
});

const seoFiles = sortedFiles.filter(
  (filePath) => !isTechnicalPage(normalizePath(filePath)),
);

const technicalFiles = sortedFiles.filter((filePath) =>
  isTechnicalPage(normalizePath(filePath)),
);

console.log(`Pages found: ${sortedFiles.length}`);
console.log(`SEO pages:   ${seoFiles.length}`);
console.log(`Technical:   ${technicalFiles.length}`);
console.log("-".repeat(70));

/* -------------------------------------------------------------------------- */
/* SEO pages                                                                  */
/* -------------------------------------------------------------------------- */

for (const filePath of seoFiles) {
  const warningBefore = warnings;
  const errorBefore = errors;

  checkSeoPage(filePath);

  const pageWarnings = warnings - warningBefore;
  const pageErrors = errors - errorBefore;

  if (pageWarnings === 0 && pageErrors === 0) {
    console.log("  ✅ OK");
  }
}

/* -------------------------------------------------------------------------- */
/* Technical files                                                            */
/* -------------------------------------------------------------------------- */

console.log("");
console.log("=".repeat(70));
console.log("TECHNICAL FILES");
console.log("-".repeat(70));

for (const filePath of technicalFiles) {
  technicalPages += 1;
  console.log(`  ${normalizePath(filePath)}  SKIP`);
}

/* -------------------------------------------------------------------------- */
/* Summary                                                                    */
/* -------------------------------------------------------------------------- */

console.log("=".repeat(70));
console.log("SEO SUMMARY");
console.log("=".repeat(70));

console.log(`Pages checked: ${pagesChecked}`);
console.log(`Errors:        ${errors}`);
console.log(`Warnings:      ${warnings}`);

console.log("=".repeat(70));

if (errors > 0) {
  console.log("❌ SEO CHECK FAILED");
  console.log("=".repeat(70));
  process.exit(1);
}

console.log("✅ SEO CHECK PASSED");

if (warnings > 0) {
  console.log("");
  console.log(
    `⚠️ ${warnings} warning(s) require attention, but they are not critical.`,
  );
}

console.log("=".repeat(70));

process.exit(0);
