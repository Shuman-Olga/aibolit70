import { withSlash } from "../../data/constans";

/**
 * Нормализует часть URL.
 */
function normalizeSegment(value) {
  return String(value || "")
    .replace(/^\/+|\/+$/g, "")
    .trim();
}

/**
 * Собирает абсолютный путь из всех родителей.
 *
 * ["uslugi-i-ceny", "medicinskie-spravki-rebenku", "spravka-v-shkolu"]
 *
 * =>
 *
 * /uslugi-i-ceny/medicinskie-spravki-rebenku/spravka-v-shkolu/
 */
export function buildFullPath(parts = []) {
  const segments = parts.map(normalizeSegment).filter(Boolean);

  if (!segments.length) {
    return "/";
  }

  return withSlash(`/${segments.join("/")}`);
}

/**
 * Технические маршруты, которые не должны
 * попадать в навигацию.
 */
export function isTechnicalRoute(route) {
  if (!route) return true;

  if (route.index) return true;

  if (route.path === "*") return true;

  if (route.path === "/") return true;

  if (route.path === "search") return true;

  return false;
}

/**
 * Строит навигационное дерево.
 *
 * parentParts содержит ВСЕ родительские paths.
 */
export function buildNavigation(routes = [], parentParts = []) {
  return routes
    .filter((route) => !isTechnicalRoute(route))
    .filter((route) => route.handle?.nav !== false)
    .map((route) => {
      const currentParts = [...parentParts, route.path];

      const to = buildFullPath(currentParts);

      return {
        ...route,
        to,

        children: buildNavigation(route.children || [], currentParts),
      };
    });
}

/**
 * Определяет, нужен ли dropdown.
 *
 * Услуги и Блог специально НЕ раскрываются.
 */
export function hasDropdown(route) {
  if (!route) return false;

  if (route.handle?.dropdown === false) {
    return false;
  }

  const path = normalizeSegment(route.path).toLowerCase();

  if (path === "uslugi-i-ceny" || path === "blog") {
    return false;
  }

  return route.children?.some(
    (child) => !child.index && child.handle?.nav !== false,
  );
}
