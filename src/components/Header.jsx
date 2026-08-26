import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import ModalWindows from "./modal/Modal";
import Navbar from "./navigations/Navbar";
import FormCallingDoctor from "./modal/FormСalling";
import OptimizedImage from "./common/OptimizedImage";

export default function Header() {
  return (
    <Container fluid id="header" className="sticky-top">
      <div className="header-colum container my-3 d-flex align-items-center justify-content-around">
        <div className="block-logo">
          <NavLink to="/" className="navbar-brand">
            <OptimizedImage
              src={"aibolit_logo.png"}
              alt="logo-aibolit"
              className="img-fluid img-logo"
              title="logo-aibolit"
              loading="eager"
              decoding="async"
              width={252}
              height={82}
            />
          </NavLink>
          <p className="address">г. Томск, ул. Герцена 68, строение 2</p>
        </div>
        <div>
          <p className="phone">
            <a className="phone" href="tel:+73822609243">
              +7 (3822) 60-92-43
            </a>
          </p>
          <p className="date text-center fw-bolder">
            Пн-пт: 08:00 - 19:00
            <br /> Суб: 09:00 - 14:00
          </p>
        </div>
        <div>
          <ModalWindows title="Вызов врача на дом" name="Header">
            <FormCallingDoctor />
          </ModalWindows>
        </div>
      </div>
      <Navbar />
    </Container>
  );
}
