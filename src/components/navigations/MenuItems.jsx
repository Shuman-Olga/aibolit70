import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";
import { withSlash } from "../../data/constans";

export default function MenuItems({ items, onClick }) {
  const hasChildren =
    items.handle?.dropdown !== false && items.children?.some((c) => !c.index);
  // const hasChildren = items.children?.some((c) => !c.index);
  return (
    <li className={`nav-item ${hasChildren ? "dropdown" : ""} d-flex `}>
      <NavLink
        to={withSlash(`/${items.path || ""}`)}
        className="nav-link text-dark"
        onClick={onClick}
        // target="_top"
        // rel="noopener noreferrer"
      >
        {items.handle?.crumb}
      </NavLink>

      {hasChildren && (
        <>
          <button
            id={`dropdown-${items.path}`}
            className="btn dropdown-toggle dropdown-toggle-split ms-1 "
            data-bs-toggle="dropdown"
            aria-expanded="false"
            // target="_top"
            // rel="noopener noreferrer"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>

          <Dropdown items={items} onClick={onClick} />
        </>
      )}
    </li>
  );
}
