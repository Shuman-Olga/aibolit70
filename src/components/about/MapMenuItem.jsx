import { NavLink } from "react-router-dom";

import MapSubMenu from "./MapSubMenu";
import { withSlash } from "../../data/constans";

export default function MapMenuItem({ items }) {
  return (
    <li>
      <NavLink to={withSlash(`/${items.path}`)} role="button">
        {items.handle?.crumb}
      </NavLink>
      {items.children?.length > 0 && <MapSubMenu submenus={items} />}
    </li>
  );
}
