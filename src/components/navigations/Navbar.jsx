import { useEffect, useRef } from "react";
import Collapse from "bootstrap/js/dist/collapse";

import { routesMain } from "../../routes/index";

import MenuItems from "./MenuItems";
import Search from "../Search";
import Icon from "../common/Icon";

import { buildNavigation } from "./navigationUtils";

export default function Navbar() {
  const collapseRef = useRef(null);

  const menu = buildNavigation(routesMain?.[0]?.children || []);

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
