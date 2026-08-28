import { NavLink } from "react-router-dom";
import OptimizedImage from "../common/OptimizedImage";

export default function BlogItem({ item }) {
  return (
    <div className="col block-posts" key={item.id}>
      <NavLink
        to={`${item.path}/`}
        className="nav-link"
        target="_top"
        rel="noopener noreferrer">
        <div className="card">
          <OptimizedImage
            src={`${item.img}.jpg`}
            alt={item.title}
            title={item.title}
            loading="lazy"
            width={414}
            height={328}
            style={{ width: "100%", height: "auto" }}
          />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
