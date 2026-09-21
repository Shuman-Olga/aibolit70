const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");

const routeConfigPath = path.join(
  projectRoot,
  "src",
  "routes",
  "routeConfig.js",
);

const packageJsonPath = path.join(projectRoot, "package.json");

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

    if (route.path !== "*" && !route.index) {
      result.push(currentPath);
    }

    if (route.index && parentPath === "") {
      result.push("/");
    }

    if (Array.isArray(route.children) && route.children.length > 0) {
      collectRoutes(route.children, currentPath, result);
    }
  }

  return result;
}

function uniqueSortedRoutes(routes) {
  return [...new Set(routes)].sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;

    return a.localeCompare(b, "ru");
  });
}

function main() {
  console.log("========================================");
  console.log("GENERATE REACT-SNAP ROUTES");
  console.log("========================================");

  const routeConfig = loadRouteConfig();

  const routes = uniqueSortedRoutes(collectRoutes(routeConfig));

  if (routes.length === 0) {
    throw new Error("Не найдено ни одного маршрута для react-snap.");
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  packageJson.reactSnap = {
    ...(packageJson.reactSnap || {}),
    source: "build",
    crawl: false,
    include: routes,
    skipThirdPartyRequests: true,
    inlineCss: false,
    puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
    puppeteer: {
      timeout: 90000,
    },
    minifyHtml: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
    },
  };

  fs.writeFileSync(
    packageJsonPath,
    `${JSON.stringify(packageJson, null, 2)}\n`,
    "utf8",
  );

  console.log(`Generated routes: ${routes.length}`);
  console.log("");

  routes.forEach((route, index) => {
    console.log(`${String(index + 1).padStart(2, " ")}. ${route}`);
  });

  console.log("");
  console.log("package.json → reactSnap.include updated");
  console.log("========================================");
}

main();
