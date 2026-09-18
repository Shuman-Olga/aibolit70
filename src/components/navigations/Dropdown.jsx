import { NavLink } from "react-router-dom";

export default function Dropdown({ items, onClick }) {
  const children =
    items?.children?.filter(
      (child) =>
        !child.index && child.path !== "*" && child.handle?.nav !== false,
    ) || [];

  if (!children.length) {
    return null;
  }

  return (
    <ul className="dropdown-menu position-absolute">
      {children.map((child) => (
        <li key={child.to}>
          <NavLink className="dropdown-item" to={child.to} onClick={onClick}>
            {child.handle?.crumb}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
