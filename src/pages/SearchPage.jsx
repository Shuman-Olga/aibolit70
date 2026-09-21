import { useEffect, useMemo, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import routeConfig from "../routes/routeConfig";
import Icon from "../components/common/Icon";

// =========================================================
// SEARCH DATA
// =========================================================

function normalizePath(path = "") {
  if (!path) return "";

  return path
    .replace(/^\/+/, "")
    .replace(/\/{2,}/g, "/")
    .replace(/\/$/, "");
}

function joinPaths(parentPath = "", childPath = "") {
  const parent = normalizePath(parentPath);
  const child = normalizePath(childPath);

  if (!parent && !child) return "/";

  const result = [parent, child].filter(Boolean).join("/");

  return `/${result}/`;
}

function collectSearchPages(routes, parentPath = "") {
  return routes.flatMap((route) => {
    const currentPath =
      route.path === "/" && !parentPath
        ? "/"
        : joinPaths(parentPath, route.path);

    const pages = [];

    if (
      route.handle?.seo?.title &&
      route.handle.seo.robots !== "noindex, follow"
    ) {
      pages.push({
        title: route.handle.seo.title,
        description: route.handle.seo.description || "",
        keywords: route.handle.seo.keywords || "",
        urlname: currentPath,
      });
    }

    if (route.children?.length) {
      pages.push(...collectSearchPages(route.children, currentPath));
    }

    return pages;
  });
}

const searchPages = collectSearchPages(routeConfig);

// =========================================================
// COMPONENT
// =========================================================

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search-text") || "";

  const [search, setSearch] = useState(initialSearch);

  const resultSearch = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return searchPages.filter((item) => {
      const haystack = [item.title, item.description, item.keywords]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [search]);

  // Синхронизация поля поиска с URL
  useEffect(() => {
    const query = searchParams.get("search-text") || "";

    if (query !== search) {
      setSearch(query);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (query) {
      setSearchParams({
        "search-text": query,
      });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Container id="search-page" fluid>
      <Container className="my-4">
        <form
          role="search"
          method="get"
          onSubmit={handleSubmit}
          className="d-flex w-25">
          <input
            className="form-control me-2"
            title="Поиск по сайту"
            type="search"
            name="search-text"
            value={search}
            onChange={handleChange}
            placeholder="Поиск"
            aria-label="Поиск по сайту"
          />

          <button
            className="btn"
            type="submit"
            title="Найти"
            aria-label="Найти">
            <Icon name="search" size={18} />
          </button>
        </form>
      </Container>

      <Container className="my-4">
        <h3>Результаты поиска:</h3>

        <Nav className="flex-column">
          {resultSearch.map((item) => (
            <Nav.Link key={item.urlname} href={item.urlname}>
              {item.title}
            </Nav.Link>
          ))}

          {search.trim() && resultSearch.length === 0 && (
            <h4>По вашему запросу ничего не найдено</h4>
          )}
        </Nav>
      </Container>
    </Container>
  );
}
