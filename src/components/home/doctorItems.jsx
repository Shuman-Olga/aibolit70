import { NavLink } from "react-router-dom";

export default function DoctorItem(props) {
  return (
    <NavLink
      to={`/doctors/` + props.data.path + `/`}
      className="nav-link"
      target="_top"
      rel="noopener noreferrer">
      <div className="col">
        <div className="card  h-100">
          <picture>
            <source
              srcSet={require(`../../assets/img/${props.data.img}.avif`)}
              type="image/avif"
            />
            <source
              srcSet={require(`../../assets/img/${props.data.img}.webp`)}
              type="image/webp"
            />
            <img
              src={require(`../../assets/img/${props.data.img}.jpg`)}
              loading="lazy"
              className="card-img-top"
              alt={props.data.firstname}
              title={props.data.title}
              width={207}
              height={226}
              style={{ width: "100%", height: "auto" }}
            />
          </picture>

          <div className="card-body ">
            <p className="card-text text-center">{props.data.lastname}</p>
            <p className="card-text text-center">{props.data.firstname}</p>
            <p className="card-text text-center">{props.data.surname}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
