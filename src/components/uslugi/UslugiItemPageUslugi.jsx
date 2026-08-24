import { NavLink } from "react-router-dom";

import { dataUslugi } from "../../data/dataUslugi";

export default function UslugiItems() {
  return (
    <>
      {dataUslugi.map((item) => (
        <NavLink
          to={item.path ? `${item.path}/` : ""}
          className="nav-link"
          target="_top"
          rel="noopener noreferrer"
          key={item.id}>
          <div className="w-75 mb-3 p-3">
            <div className="text-center mb-2">
              <h2>{item.title}</h2>
            </div>

            <div className="d-flex block-foto">
              <div>
                <picture>
                  <source
                    srcSet={require(`../../assets/img/${item.img}.avif`)}
                    type="image/avif"
                  />
                  <source
                    srcSet={require(`../../assets/img/${item.img}.webp`)}
                    type="image/webp"
                  />
                  <img
                    src={require(`../../assets/img/${item.img}.jpg`)}
                    alt="foto-doctor"
                    title={item.title}
                    width="190"
                    height="160"
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className="p-3">
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </>
  );
}
