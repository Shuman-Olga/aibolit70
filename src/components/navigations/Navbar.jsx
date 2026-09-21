import { useEffect, useRef } from "react";
import Collapse from "bootstrap/js/dist/collapse";

import routeConfig from "../../routes/routeConfig";
import MenuItems from "./MenuItems";
import Search from "../Search";
import Icon from "../common/Icon";

function normalizePath(path = "") {
  return String(path).trim().replace(/^\/+/, "").replace(/\/+$/, "");
}

function buildPath(parentPath, currentPath) {
  const current = normalizePath(currentPath);

  if (!current) {
    return parentPath || "/";
  }

  const parent = normalizePath(parentPath);

  return parent ? `/${parent}/${current}/` : `/${current}/`;
}

function prepareRoutes(routes = [], parentPath = "") {
  return routes
    .filter((route) => {
      if (!route) return false;
      if (route.index) return false;
      if (route.path === "*") return false;

      // Не показываем служебные страницы
      if (route.path === "/search/" || route.path === "search") {
        return false;
      }

      // Главная не нужна в основном меню
      if (route.path === "/") {
        return false;
      }

      // В меню попадают только явно разрешённые пункты
      return route.handle?.nav === true;
    })
    .map((route) => {
      const fullPath = buildPath(parentPath, route.path);

      return {
        ...route,
        to: fullPath,
        children: prepareRoutes(route.children || [], fullPath),
      };
    });
}

export default function Navbar() {
  const collapseRef = useRef(null);

  // ВАЖНО:
  // меню строим из routeConfig, а не из routesMain
  const menu = prepareRoutes(routeConfig);

  const closeMenu = () => {
    if (!collapseRef.current) return;

    const bsCollapse =
      Collapse.getInstance(collapseRef.current) ||
      new Collapse(collapseRef.current, {
        toggle: false,
      });

    bsCollapse.hide();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (collapseRef.current && !collapseRef.current.contains(event.target)) {
        const bsCollapse =
          Collapse.getInstance(collapseRef.current) ||
          new Collapse(collapseRef.current, {
            toggle: false,
          });

        bsCollapse.hide();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className="navbar navbar-expand-lg navbar-light"
      aria-label="Основная навигация">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Открыть меню">
          <Icon name="list" size={24} />
        </button>

        <div
          ref={collapseRef}
          className="collapse navbar-collapse"
          id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {menu.map((item) => (
              <MenuItems key={item.to} items={item} onClick={closeMenu} />
            ))}
          </ul>

          <Search />
        </div>
      </div>
    </nav>
  );
}
