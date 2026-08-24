import { NavLink } from "react-router-dom";

import { dataProgramItem } from "../../data/dataProgramItem";

export default function ProgramItem() {
  return (
    <>
      {dataProgramItem.map((item) => (
        <NavLink
          to={`${item.path}/`}
          className="nav-link"
          target="_top"
          rel="noopener noreferrer"
          key={item.id}>
          <div className="d-flex justify-content-between align-items-center card-prog">
            <div className="block d-flex align-items-center m-5">
              <svg
                preserveAspectRatio="none"
                data-bbox="20 20 160 160"
                viewBox="20 20 160 160"
                height="200"
                width="200"
                xmlns="http://www.w3.org/2000/svg"
                data-type="shape"
                role="presentation"
                aria-hidden="true"
                aria-labelledby="svgcid--3t87u8y3y60z">
                <title id="svgcid--3t87u8y3y60"></title>
                <g>
                  <path d="M180 100l-80 80-80-80 80-80 80 80z"></path>
                </g>
              </svg>
            </div>
            <div className="font-text ">
              <h4>{item.title}</h4>
              {item.listelement.map((el, i) => (
                <p key={i} className="fw-bold">
                  {el.name}
                </p>
              ))}
            </div>
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
                  alt="img"
                  title="Малыш Хоум. Стандарт"
                  loading="lazy"
                  width={576}
                  height={410}
                />
              </picture>
            </div>
          </div>
        </NavLink>
      ))}
    </>
  );
}
