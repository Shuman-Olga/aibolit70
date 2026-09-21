import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function MenuItems({ items, onClick }) {
  const children =
    items?.children?.filter(
      (child) =>
        !child.index && child.path !== "*" && child.handle?.nav === true,
    ) || [];

  /*
   * Услуги и Блог специально не раскрываем.
   */
  const showDropdown =
    children.length > 0 &&
    items.handle?.dropdown !== false &&
    items.path !== "/uslugi-i-ceny/" &&
    items.path !== "uslugi-i-ceny" &&
    items.path !== "/blog/" &&
    items.path !== "blog";

  return (
    <li className={`nav-item ${showDropdown ? "dropdown" : ""} d-flex`}>
      <NavLink to={items.to} className="nav-link text-dark" onClick={onClick}>
        {items.handle?.crumb}
      </NavLink>

      {showDropdown && (
        <>
          <button
            type="button"
            id={`dropdown-${items.to.replace(/\//g, "-")}`}
            className="btn dropdown-toggle dropdown-toggle-split ms-1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-haspopup="true">
            <span className="visually-hidden">
              Открыть меню {items.handle?.crumb}
            </span>
          </button>

          <Dropdown items={items} onClick={onClick} />
        </>
      )}
    </li>
  );
}
