import { NavLink } from "react-router-dom";
import OptimizedImage from "../common/OptimizedImage";

export default function DoctorItem({
  firstname,
  lastname,
  surname,
  path,
  img,
  listdoctorname,
}) {
  return (
    <div className="col d-flex justify-content-around">
      <div className="card w-75">
        <NavLink
          to={`${path}/`}
          className="nav-link"
          target="_top"
          rel="noopener noreferrer">
          <OptimizedImage
            src={`${img}.jpg`}
            alt={firstname}
            title={lastname}
            loading="lazy"
            width={448}
            height={490}
          />
        </NavLink>
        <div className="card-body">
          <NavLink
            to={`${path}/`}
            className="nav-link"
            target="_top"
            rel="noopener noreferrer">
            <div className="fw-bold fs-5 text-name">
              <p className="mb-0">{lastname}</p>
              <p className="mb-0">{firstname}</p>
              <p className="mb-2">{surname}</p>
            </div>
          </NavLink>
          <div>
            {listdoctorname.map((item, index) => (
              <p key={index} className="mb-0 mb-1">
                {item.doctorname}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
