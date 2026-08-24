import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function BlockReklama1() {
  return (
    <Container
      id="blockreklamaone"
      className="d-flex justify-content-center my-5">
      <div className="block-reklama d-flex">
        <picture>
          <source
            srcSet={require("../../assets/img/reklama.avif")}
            type="image/avif"
          />
          <source
            srcSet={require("../../assets/img/reklama.webp")}
            type="image/webp"
          />
          <img
            src={require(`../../assets/img/reklama.png`)}
            alt="img-reklama "
            title="reklama"
            loading="lazy"
            width={438}
            height={205}
            style={{ width: "100%", height: "auto" }}
          />
        </picture>

        <div className="blockback text-center px-5 py-3">
          <p>Медицинские документы</p>
          <p>Для школы, детского сада, ВУЗа</p>
          <NavLink
            to="/uslugi-i-ceny/medicinskie-spravki-rebenku/"
            className="nav-link"
            target="_top"
            rel="noopener noreferrer">
            <button type="button" className="btn btn-outline-secondary">
              Подробнее
            </button>
          </NavLink>
        </div>
      </div>
    </Container>
  );
}
