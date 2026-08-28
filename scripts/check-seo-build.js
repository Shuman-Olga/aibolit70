/**
 * SEO build checker for prerendered React pages.
 *
 * Run:
 *   node scripts/check-seo-build.js
 *
 * Checks:
 * - title
 * - meta description
 * - canonical
 * - H1
 * - JSON-LD
 * - images / alt
 * - robots
 * - html lang
 * - Open Graph
 * - Twitter Card
 * - duplicate title / description
 *
 * Exit codes:
 *   0 = no critical errors
 *   1 = critical SEO errors
 */

const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.resolve(__dirname, "..", "build");
const SEO_DIR = path.join(BUILD_DIR, "seo");

const SITE_ORIGIN = process.env.SEO_SITE_ORIGIN || "https://aibolit70.ru";

const LIMITS = {
  title: {
    min: 30,
    max: 65,
  },
  description: {
    min: 70,
    max: 160,
  },
};

const CRITICAL = {
  missingTitle: true,
  missingDescription: true,
  missingCanonical: true,
  invalidCanonical: true,
  missingH1: true,
  multipleH1: true,
  invalidJsonLd: true,
  missingLang: true,
};

const results = [];
const warnings = [];
const errors = [];

function logLine(char = "=", length = 60) {
  console.log(char.repeat(length));
}

function normalizeWhitespace(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function stripHtml(value) {
  return normalizeWhitespace(
    String(value || "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
}

function getAttribute(tag, attribute) {
  const escaped = attribute.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const match = tag.match(
    new RegExp(`${escaped}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"),
  );

  if (!match) {
    return null;
  }

  return decodeHtml(match[1] || match[2] || match[3] || "");
}

function getMetaContent(html, name, attribute = "name") {
  const regex = new RegExp(
    `<meta\\b[^>]*${attribute}\\s*=\\s*["']${name}["'][^>]*>`,
    "i",
  );

  const match = html.match(regex);

  if (!match) {
    return null;
  }

  return getAttribute(match[0], "content");
}

function getTitle(html) {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);

  if (!match) {
    return "";
  }

  return normalizeWhitespace(stripHtml(match[1]));
}

function getCanonical(html) {
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);

  const canonical = links.find((tag) => {
    const rel = getAttribute(tag, "rel");

    if (!rel) {
      return false;
    }

    return rel
      .split(/\s+/)
      .map((item) => item.toLowerCase())
      .includes("canonical");
  });

  if (!canonical) {
    return "";
  }

  return getAttribute(canonical, "href") || "";
}

function getHtmlLang(html) {
  const match = html.match(/<html\b[^>]*>/i);

  if (!match) {
    return "";
  }

  return getAttribute(match[0], "lang") || "";
}

function getH1Count(html) {
  const matches = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi);

  return matches ? matches.length : 0;
}

function getImages(html) {
  return [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
}

function getImageAltErrors(images) {
  let errorsCount = 0;

  for (const image of images) {
    const alt = getAttribute(image, "alt");

    /*
     * alt="" is valid for decorative images.
     *
     * We only report:
     *   - missing alt attribute
     *
     * Empty alt is allowed because decorative images
     * should intentionally use alt="".
     */
    if (alt === null) {
      errorsCount += 1;
    }
  }

  return errorsCount;
}

function getJsonLdBlocks(html) {
  return [
    ...html.matchAll(
      /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => match[1].trim());
}

function validateJsonLd(html) {
  const blocks = getJsonLdBlocks(html);

  if (blocks.length === 0) {
    return {
      count: 0,
      valid: false,
    };
  }

  let valid = true;

  for (const block of blocks) {
    try {
      JSON.parse(block);
    } catch (error) {
      valid = false;
    }
  }

  return {
    count: blocks.length,
    valid,
  };
}

function getRobots(html) {
  return getMetaContent(html, "robots");
}

function getOpenGraph(html) {
  return {
    title: getMetaContent(html, "og:title", "property"),
    description: getMetaContent(html, "og:description", "property"),
    url: getMetaContent(html, "og:url", "property"),
    image: getMetaContent(html, "og:image", "property"),
    type: getMetaContent(html, "og:type", "property"),
  };
}

function getTwitterCard(html) {
  return getMetaContent(html, "twitter:card");
}

function getRelativeUrl(filePath) {
  const relative = path.relative(BUILD_DIR, filePath);

  if (relative === "index.html") {
    return "/";
  }

  const directory = path.dirname(relative);

  if (directory === ".") {
    return "/";
  }

  return `/${directory.split(path.sep).join("/").replace(/^\/+/, "")}/`;
}

function findIndexFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...findIndexFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase() === "index.html") {
      files.push(fullPath);
    }
  }

  return files;
}

function checkLength(value, type, url, pageWarnings) {
  const length = value.length;
  const limits = LIMITS[type];

  if (!length) {
    return;
  }

  if (length < limits.min) {
    pageWarnings.push(
      `⚠️ ${type} short (${length}; recommended ${limits.min}-${limits.max})`,
    );
  }

  if (length > limits.max) {
    pageWarnings.push(
      `⚠️ ${type} long (${length}; recommended ${limits.min}-${limits.max})`,
    );
  }
}

function isSameOrigin(url) {
  try {
    const parsed = new URL(url);

    return parsed.origin === SITE_ORIGIN;
  } catch (error) {
    return false;
  }
}

function checkCanonical(canonical, url, pageWarnings, pageErrors) {
  if (!canonical) {
    pageErrors.push("❌ canonical missing");
    return;
  }

  let parsed;

  try {
    parsed = new URL(canonical);
  } catch (error) {
    pageErrors.push(`❌ canonical invalid: ${canonical}`);
    return;
  }

  if (parsed.origin !== SITE_ORIGIN) {
    pageErrors.push(
      `❌ canonical domain mismatch: ${parsed.origin} (expected ${SITE_ORIGIN})`,
    );
  }

  const pathname = parsed.pathname || "/";

  if (url === "/" && pathname !== "/") {
    pageWarnings.push(`⚠️ canonical path mismatch: ${pathname}`);
  }

  if (url !== "/" && pathname !== url) {
    pageWarnings.push(
      `⚠️ canonical path mismatch: ${pathname} (expected ${url})`,
    );
  }

  if (parsed.search) {
    pageWarnings.push("⚠️ canonical contains query string");
  }

  if (parsed.hash) {
    pageWarnings.push("⚠️ canonical contains hash");
  }

  if (!parsed.pathname.endsWith("/") && parsed.pathname !== "/") {
    pageWarnings.push("⚠️ canonical does not use trailing slash");
  }
}

function checkOpenGraph(openGraph, url, pageWarnings) {
  if (!openGraph.title) {
    pageWarnings.push("ℹ️ og:title missing");
  }

  if (!openGraph.description) {
    pageWarnings.push("ℹ️ og:description missing");
  }

  if (!openGraph.url) {
    pageWarnings.push("ℹ️ og:url missing");
  } else if (!isSameOrigin(openGraph.url)) {
    pageWarnings.push(`ℹ️ og:url uses another domain: ${openGraph.url}`);
  }

  if (!openGraph.image) {
    pageWarnings.push("ℹ️ og:image missing");
  }

  if (!openGraph.type) {
    pageWarnings.push("ℹ️ og:type missing");
  }

  if (openGraph.url) {
    try {
      const ogUrl = new URL(openGraph.url);
      const expectedPath = url === "/" ? "/" : url;

      if (ogUrl.pathname !== expectedPath) {
        pageWarnings.push(
          `ℹ️ og:url path differs from page: ${ogUrl.pathname}`,
        );
      }
    } catch (error) {
      pageWarnings.push("ℹ️ og:url invalid");
    }
  }
}

function printPageProblems(url, pageWarnings, pageErrors) {
  if (pageErrors.length === 0 && pageWarnings.length === 0) {
    return;
  }

  console.log(`\n${url}`);

  for (const error of pageErrors) {
    console.log(`  ${error}`);
  }

  for (const warning of pageWarnings) {
    console.log(`  ${warning}`);
  }
}

function writeCsv(filePath, rows) {
  const headers = [
    "URL",
    "Title",
    "TitleLength",
    "Description",
    "DescriptionLength",
    "Canonical",
    "H1",
    "JSONLD",
    "Images",
    "AltErrors",
    "Robots",
    "Lang",
    "OGTitle",
    "OGDescription",
    "OGUrl",
    "OGImage",
    "TwitterCard",
    "Status",
  ];

  const escapeCsv = (value) => {
    const stringValue = String(value ?? "");

    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
  };

  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      headers.map((header) => escapeCsv(row[header])).join(","),
    ),
  ];

  fs.writeFileSync(filePath, lines.join("\n"), "utf8");
}

function writeDuplicates(filePath, duplicateGroups) {
  const lines = ["TYPE,VALUE,URLS"];

  for (const group of duplicateGroups) {
    lines.push(
      [
        group.type,
        `"${group.value.replace(/"/g, '""')}"`,
        `"${group.urls.join(" | ").replace(/"/g, '""')}"`,
      ].join(","),
    );
  }

  fs.writeFileSync(filePath, lines.join("\n"), "utf8");
}

function findDuplicates(rows, field, type) {
  const map = new Map();

  for (const row of rows) {
    const value = normalizeWhitespace(row[field]);

    if (!value) {
      continue;
    }

    if (!map.has(value)) {
      map.set(value, []);
    }

    map.get(value).push(row.URL);
  }

  return [...map.entries()]
    .filter(([, urls]) => urls.length > 1)
    .map(([value, urls]) => ({
      type,
      value,
      urls,
    }));
}

function ensureSeoDirectory() {
  fs.mkdirSync(SEO_DIR, {
    recursive: true,
  });
}

function main() {
  console.log();
  logLine();
  console.log(" SEO CHECK: build/**/index.html");
  logLine();
  console.log();
  console.log(`Site origin: ${SITE_ORIGIN}`);

  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`\n❌ Build directory not found: ${BUILD_DIR}`);
    process.exitCode = 1;
    return;
  }

  const files = findIndexFiles(BUILD_DIR);

  if (files.length === 0) {
    console.error("\n❌ No index.html files found in build/");
    process.exitCode = 1;
    return;
  }

  for (const filePath of files) {
    const html = fs.readFileSync(filePath, "utf8");

    const url = getRelativeUrl(filePath);

    const title = getTitle(html);
    const description = getMetaContent(html, "description") || "";

    const canonical = getCanonical(html);

    const h1Count = getH1Count(html);

    const jsonLd = validateJsonLd(html);

    const images = getImages(html);

    const altErrors = getImageAltErrors(images);

    const robots = getRobots(html);

    const lang = getHtmlLang(html);

    const openGraph = getOpenGraph(html);

    const twitterCard = getTwitterCard(html);

    const pageWarnings = [];
    const pageErrors = [];

    /*
     * TITLE
     */
    if (!title) {
      pageErrors.push("❌ title missing");
    } else {
      checkLength(title, "title", url, pageWarnings);
    }

    /*
     * DESCRIPTION
     */
    if (!description) {
      pageErrors.push("❌ description missing");
    } else {
      checkLength(description, "description", url, pageWarnings);
    }

    /*
     * CANONICAL
     */
    checkCanonical(canonical, url, pageWarnings, pageErrors);

    /*
     * H1
     */
    if (h1Count === 0) {
      pageErrors.push("❌ H1 missing");
    }

    if (h1Count > 1) {
      pageErrors.push(`❌ multiple H1 (${h1Count})`);
    }

    /*
     * JSON-LD
     */
    if (jsonLd.count === 0) {
      pageWarnings.push("⚠️ JSON-LD missing");
    } else if (!jsonLd.valid) {
      pageErrors.push("❌ JSON-LD contains invalid JSON");
    }

    /*
     * IMAGES
     */
    if (altErrors > 0) {
      pageWarnings.push(`⚠️ images without alt attribute: ${altErrors}`);
    }

    /*
     * LANG
     */
    if (!lang) {
      pageErrors.push("❌ html lang missing");
    } else if (lang.toLowerCase() !== "ru") {
      pageWarnings.push(`⚠️ html lang="${lang}" (expected ru)`);
    }

    /*
     * ROBOTS
     */
    if (!robots) {
      pageWarnings.push("ℹ️ robots meta missing");
    } else if (/noindex/i.test(robots)) {
      pageWarnings.push(`⚠️ page contains noindex: ${robots}`);
    }

    /*
     * OPEN GRAPH
     */
    checkOpenGraph(openGraph, url, pageWarnings);

    /*
     * TWITTER CARD
     *
     * This is deliberately INFO, not WARNING.
     * Twitter/X metadata is social metadata and
     * does not make the page SEO-invalid.
     */
    if (!twitterCard) {
      pageWarnings.push("ℹ️ twitter:card missing");
    }

    const status =
      pageErrors.length > 0
        ? "ERROR"
        : pageWarnings.length > 0
          ? "WARNING"
          : "OK";

    const row = {
      URL: url,
      Title: title,
      TitleLength: title.length,
      Description: description,
      DescriptionLength: description.length,
      Canonical: canonical ? "✓" : "✗",
      H1: h1Count,
      JSONLD: jsonLd.count,
      Images: images.length,
      AltErrors: altErrors,
      Robots: robots || "",
      Lang: lang,
      OGTitle: openGraph.title || "",
      OGDescription: openGraph.description || "",
      OGUrl: openGraph.url || "",
      OGImage: openGraph.image || "",
      TwitterCard: twitterCard || "",
      Status: status,
    };

    results.push(row);

    if (pageErrors.length > 0) {
      errors.push({
        url,
        problems: pageErrors,
      });
    }

    if (pageWarnings.length > 0) {
      warnings.push({
        url,
        problems: pageWarnings,
      });
    }

    printPageProblems(url, pageWarnings, pageErrors);
  }

  /*
   * DUPLICATES
   */
  const titleDuplicates = findDuplicates(results, "Title", "TITLE");

  const descriptionDuplicates = findDuplicates(
    results,
    "Description",
    "DESCRIPTION",
  );

  const duplicateGroups = [...titleDuplicates, ...descriptionDuplicates];

  /*
   * TABLE
   */
  console.log();
  logLine();
  console.log(" SEO RESULTS");
  logLine();
  console.table(
    results.map((row) => ({
      URL: row.URL,
      Title: row.Title,
      Desc: row.Description,
      Canonical: row.Canonical,
      H1: row.H1,
      JSONLD: row.JSONLD,
      Images: row.Images,
      AltErrors: row.AltErrors,
      Status: row.Status,
    })),
  );

  /*
   * WARNINGS / PROBLEMS
   */
  console.log();
  logLine();
  console.log(" SEO WARNINGS / PROBLEMS");
  logLine();

  if (warnings.length === 0 && errors.length === 0) {
    console.log("\n✓ No warnings or errors.");
  } else {
    for (const item of errors) {
      console.log(`\n${item.url}`);

      for (const problem of item.problems) {
        console.log(`  ${problem}`);
      }
    }

    for (const item of warnings) {
      console.log(`\n${item.url}`);

      for (const problem of item.problems) {
        console.log(`  ${problem}`);
      }
    }
  }

  /*
   * DUPLICATES
   */
  console.log();
  logLine();
  console.log(" DUPLICATES");
  logLine();

  if (duplicateGroups.length === 0) {
    console.log("\n✓ No duplicate titles or descriptions.");
  } else {
    for (const group of duplicateGroups) {
      console.log(`\n⚠️ ${group.type}: "${group.value}"`);

      for (const url of group.urls) {
        console.log(`  ${url}`);
      }
    }
  }

  /*
   * SUMMARY
   */
  const okCount = results.filter((row) => row.Status === "OK").length;

  const warningCount = results.filter((row) => row.Status === "WARNING").length;

  const errorCount = results.filter((row) => row.Status === "ERROR").length;

  console.log();
  logLine();
  console.log(" SUMMARY");
  logLine();

  console.log(`Total:       ${results.length}`);
  console.log(`OK:          ${okCount}`);
  console.log(`WARNING:     ${warningCount}`);
  console.log(`ERROR:       ${errorCount}`);
  console.log(`Duplicates:  ${duplicateGroups.length}`);

  /*
   * REPORTS
   */
  ensureSeoDirectory();

  const reportPath = path.join(SEO_DIR, "seo-report.csv");

  const duplicatesPath = path.join(SEO_DIR, "seo-duplicates.csv");

  writeCsv(reportPath, results);
  writeDuplicates(duplicatesPath, duplicateGroups);

  console.log();
  logLine();
  console.log(" REPORTS");
  logLine();

  console.log(`SEO report:       ${reportPath}`);
  console.log(`Duplicates:       ${duplicatesPath}`);

  /*
   * FINAL RESULT
   */
  console.log();

  if (errorCount > 0) {
    console.log("❌ SEO CHECK FAILED: critical errors found.");

    process.exitCode = 1;
    return;
  }

  if (warningCount > 0 || duplicateGroups.length > 0) {
    console.log("⚠️ SEO CHECK PASSED WITH RECOMMENDATIONS.");

    /*
     * IMPORTANT:
     * Warnings do NOT fail npm/CI.
     */
    process.exitCode = 0;
    return;
  }

  console.log("✅ SEO CHECK PASSED.");

  process.exitCode = 0;
}

main();
