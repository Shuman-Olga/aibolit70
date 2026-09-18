import { NavLink } from "react-router-dom";

import Dropdown from "./Dropdown";
import { hasDropdown } from "./navigationUtils";

export default function MenuItems({ items, onClick }) {
  const showDropdown = hasDropdown(items);

  return (
    <li className={`nav-item ${showDropdown ? "dropdown" : ""} d-flex`}>
      <NavLink to={items.to} className="nav-link text-dark" onClick={onClick}>
        {items.handle?.crumb}
      </NavLink>

      {showDropdown && (
        <>
          <button
            type="button"
            id={`dropdown-${items.path}`}
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
