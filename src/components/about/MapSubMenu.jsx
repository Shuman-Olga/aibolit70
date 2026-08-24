import { NavLink } from "react-router-dom";
import { withSlash } from "../../data/constans";

export default function MapSubMenu({ submenus }) {
  console.log(submenus, submenus.path);
  return (
    <ul>
      {submenus.children
        .filter((child) => !child.index)
        .map((submenu, index) => (
          <li className="nav-item" key={index}>
            <NavLink to={withSlash(`/${submenu.path}/`)}>
              {submenu.handle?.crumb}
            </NavLink>
            {submenu.children && (
              <ul>
                {submenu.children
                  .filter((child) => !child.index)
                  .map((sub1, index) => (
                    <li className="nav-item" key={index}>
                      <NavLink to={withSlash(`/${submenu.path}/${sub1.path}/`)}>
                        {sub1.handle?.crumb}
                      </NavLink>
                      <ul>
                        {sub1.children && (
                          <>
                            {sub1.children.slice(1).map((sub2, index) => (
                              <li className="nav-item" key={index}>
                                <NavLink
                                  to={withSlash(
                                    `/${submenu.path}/${sub1.path}/${sub2.path}`,
                                  )}>
                                  {sub2.handle?.crumb}
                                </NavLink>
                              </li>
                            ))}
                          </>
                        )}
                      </ul>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
    </ul>
  );
}
