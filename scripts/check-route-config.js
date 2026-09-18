const routeConfig = require("../src/routes/routeConfig");

const registeredComponents = new Set([
  "Home",

  "About",
  "ControllingOrgan",
  "Licenses",
  "Documents",
  "OurPartners",
  "PravovyInformation",
  "Vacancies",
  "MapSite",

  "Doctors",
  "DoctorSadovnikova",
  "DoctorPetuhova",
  "DoctorShevchenko",
  "DoctorOstrouhova",

  "Programs",
  "ProgramOne",
  "ProgramTwo",
  "ProgramThree",

  "ChekUp",

  "Uslugi",
  "DoctorNaDom",
  "Pediatr",
  "MedicalCertificates",
  "SanatornoKurortnayaKarta",
  "SpravkavShkolu",
  "SpravkavDetskiiSad",
  "SpravkavBassein",
  "SpravkavZdorove",
  "SpravkaForma026u",
  "MedicinskayaSpravka079u",

  "ForPatients",
  "Prices",
  "SposobyOplaty",
  "LekarstvennoeObespechenie",
  "PravilaPodgotovki",
  "SvedeniyaSpecialistah",
  "NalogovyjVychet",
  "Otzyvy",

  "Blog",

  "Post1",
  "Post2",
  "Post3",
  "Post4",
  "Post5",
  "Post6",
  "Post7",
  "Post8",
  "Post9",
  "Post10",
  "Post11",
  "Post12",

  "Contacts",
  "SearchPage",
]);

const errors = [];
const warnings = [];
const urls = new Map();

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

function checkRoute(route, parentPath = "") {
  const currentPath = joinPaths(parentPath, route.path || "");

  if (
    route.component &&
    !route.handle?.seo &&
    route.handle?.sitemap !== false
  ) {
    warnings.push(`Нет SEO для: ${currentPath}`);
  }

  if (
    route.component &&
    route.component !== undefined &&
    !registeredComponents.has(route.component)
  ) {
    errors.push(
      `Не зарегистрирован component "${route.component}" для ${currentPath}`,
    );
  }

  if (currentPath !== "/" && !currentPath.endsWith("/")) {
    errors.push(`Нет завершающего /: ${currentPath}`);
  }

  if (currentPath.includes("//")) {
    errors.push(`Двойной // в URL: ${currentPath}`);
  }

  if (currentPath.includes(":") || currentPath.includes("*")) {
    if (route.component) {
      errors.push(
        `Динамический/wildcard URL нельзя включать как обычную страницу: ${currentPath}`,
      );
    }
  }

  const segments = currentPath.split("/").filter(Boolean);

  for (let i = 1; i < segments.length; i += 1) {
    if (segments[i] === segments[i - 1]) {
      errors.push(`Повторяющийся сегмент: ${currentPath}`);
    }
  }

  if (
    route.component &&
    route.handle?.sitemap !== false &&
    !route.handle?.seo?.robots?.includes("noindex")
  ) {
    if (urls.has(currentPath)) {
      errors.push(`Дублирующийся URL: ${currentPath}`);
    } else {
      urls.set(currentPath, route);
    }
  }

  if (Array.isArray(route.children)) {
    for (const child of route.children) {
      checkRoute(child, currentPath);
    }
  }
}

console.log("==============================================");
console.log("AIBOLIT ROUTE CONFIG CHECK");
console.log("==============================================");
console.log("");

if (!Array.isArray(routeConfig)) {
  errors.push("routeConfig должен экспортировать массив.");
} else {
  for (const route of routeConfig) {
    checkRoute(route);
  }
}

const pageCount = urls.size;

console.log(`Pages: ${pageCount}`);
console.log(`Registered components: ${registeredComponents.size}`);
console.log("");

if (warnings.length > 0) {
  console.log("WARNINGS:");
  for (const warning of warnings) {
    console.log(`  ! ${warning}`);
  }
  console.log("");
}

if (errors.length > 0) {
  console.error("ERRORS:");

  for (const error of errors) {
    console.error(`  ✕ ${error}`);
  }

  console.error("");
  console.error(`Route config check failed: ${errors.length} error(s).`);

  process.exit(1);
}

console.log("✓ Route config is valid.");
console.log("");
