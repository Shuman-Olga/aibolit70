import { NavLink } from "react-router-dom";
import { withSlash } from "../../data/constans";

export default function Dropdown({ items, onClick }) {
  if (!items.children) return null;

  return (
    <ul className="dropdown-menu position-absolute">
      {items.children
        .filter((child) => !child.index)
        .map((child) => (
          <li key={child.path}>
            <NavLink
              className="dropdown-item"
              // target="_top"
              // rel="noopener noreferrer"
              to={withSlash(`/${items.path}/${child.path}`)}
              onClick={onClick}>
              {child.handle?.crumb}
            </NavLink>
          </li>
        ))}
    </ul>
  );
}
