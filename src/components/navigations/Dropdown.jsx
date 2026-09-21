import { NavLink } from "react-router-dom";

export default function Dropdown({ items, onClick }) {
  const children =
    items?.children?.filter(
      (child) =>
        !child.index && child.path !== "*" && child.handle?.nav === true,
    ) || [];

  if (!children.length) {
    return null;
  }

  return (
    <ul className="dropdown-menu">
      {children.map((child) => (
        <li key={child.to}>
          <NavLink to={child.to} className="dropdown-item" onClick={onClick}>
            {child.handle?.crumb}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
