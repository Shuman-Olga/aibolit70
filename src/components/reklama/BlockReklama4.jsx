import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function BlockReklama4() {
  return (
    <Container
      id="blockreklamafour"
      className="d-flex justify-content-center my-5">
      <div className="block-reklama d-flex">
        <img
          src={require("../../assets/img/reklama4.png")}
          alt="img-reklama"
          title="reklama"
        />
        <div className="blockback text-center px-5 py-3">
          <p>Вызов врача на ДОМ</p>
          <NavLink
            to="/uslugi-i-ceny/vyzov-pediatra-na-dom/"
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
