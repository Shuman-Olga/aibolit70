export default function ControlingOrganItem({
  name,
  address,
  phone,
  email,
  timeofwork,
  site,
}) {
  return (
    <div>
      <div className=" arrow-svg">
        <svg
          preserveAspectRatio="none"
          data-bbox="24 33 152.001 134"
          viewBox="24 33 152.001 134"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          data-type="shape"
          role="presentation"
          aria-hidden="true"
        >
          <g>
            <path d="M159.621 121.057L109.217 38.8c-4.726-7.737-16.025-7.732-20.745.009L26.236 140.885c-7.475 12.26 5.093 26.906 18.453 21.504l100.386-40.592c9.257-3.675 14.546-.74 14.546-.74z"></path>
            <path d="M173.822 144.873l-4.835-7.931c-3.723-6.107-11.357-8.624-18.015-5.94l-43.744 17.637 49.153 17.467c12.971 4.609 24.58-9.524 17.441-21.233z"></path>
          </g>
        </svg>
      </div>
      <span className="fw-bold fs-5">{name}</span>
      <div className="my-4">
        <p>
          <span className="fw-bold">Адрес:</span> {address}
        </p>
        <p>
          <span className="fw-bold">Телефон:</span>
          {phone}
        </p>
        <p>
          <span className="fw-bold">Адрес электронной почты: </span>
          {email}
        </p>
        <p>{timeofwork}</p>

        <p>
          <span className="fw-bold">Сайт:</span> &nbsp;
          <a href={site} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </p>
      </div>
    </div>
  );
}
