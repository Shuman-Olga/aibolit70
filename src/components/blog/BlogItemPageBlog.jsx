import { NavLink } from "react-router-dom";

export default function BlogItem({ item }) {
  return (
    <div className="col block-posts" key={item.id}>
      <NavLink
        to={`${item.path}/`}
        className="nav-link"
        target="_top"
        rel="noopener noreferrer">
        <div className="card">
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
              className="card-img-top "
              alt="nevrolog_na_dom"
              title={item.title}
              loading="lazy"
              width={414}
              height={305}
            />
          </picture>
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
