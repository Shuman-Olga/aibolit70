import { routesMain } from "../../routes/index";
import MenuItems from "./MenuItems";
import Search from "../Search";
import Collapse from "bootstrap/js/dist/collapse";
// export default function Navbar() {
//   const menu = routesMain[0].children.filter((route) => route.handle?.nav);
//   return (
//     <nav id="navbar" className="navbar navbar-expand-lg navbar-light ">
//       <div className="container-fluid">
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Переключатель навигации">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse " id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
//             {menu.map((item, i) => (
//               <MenuItems key={i} items={item} />
//             ))}
//           </ul>
//           <Search />
//         </div>
//       </div>
//     </nav>
//   );
// }
import { useEffect, useRef } from "react";

export default function Navbar() {
  const menu = routesMain[0].children.filter((route) => route.handle?.nav);
  const collapseRef = useRef();

  const closeMenu = () => {
    if (!collapseRef.current) return;

    const bsCollapse =
      Collapse.getInstance(collapseRef.current) ||
      new Collapse(collapseRef.current, { toggle: false });

    bsCollapse.hide();
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (collapseRef.current && !collapseRef.current.contains(e.target)) {
        const bsCollapse =
          Collapse.getInstance(collapseRef.current) ||
          new Collapse(collapseRef.current, { toggle: false });

        bsCollapse.hide();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent">
          <i className="bi bi-list"></i>
        </button>
        <div
          ref={collapseRef}
          className="collapse navbar-collapse"
          id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {menu.map((item) => (
              <MenuItems key={item.path} items={item} onClick={closeMenu} />
            ))}
          </ul>
          <Search />
        </div>
      </div>
    </nav>
  );
}
