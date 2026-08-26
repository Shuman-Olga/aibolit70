import { Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import OptimizedImage from "../common/OptimizedImage";

export default function BlockReklama3() {
  return (
    <Container
      id="blockreklamathree"
      className="d-flex justify-content-center my-5">
      <div className="block-reklama d-flex">
        <div className="block-img">
          <OptimizedImage
            src={"reklama-3.jpg"}
            alt="img-reklama "
            title="reklama"
            loading="lazy"
            width={400}
            height={300}
          />
        </div>

        <div className="blockback text-center px-5 py-3">
          <NavLink
            to="/programmy-nablyudeniya-za-zdorovem/"
            className="nav-link fs-5 mb-3"
            target="_top"
            rel="noopener noreferrer">
            Комплексные программы для детей
          </NavLink>
          <Nav>
            <NavLink
              to="/programmy-nablyudeniya-za-zdorovem/malysh-houm-standart-ot-0-do-2-h-le/"
              className="nav-link"
              target="_top"
              rel="noopener noreferrer">
              "Малыш Хоум" от 0 до 2-х лет
            </NavLink>
            <NavLink
              to="/programmy-nablyudeniya-za-zdorovem/zdorovyj-rebenok-houm-standart-ot-2/"
              className="nav-link"
              target="_top"
              rel="noopener noreferrer">
              "Здоровый ребенок" от 2-х до 5 лет
            </NavLink>
            <NavLink
              to="/programmy-nablyudeniya-za-zdorovem/zdorovyj-rebenok-houm-midi-ot-2-h-l/"
              className="nav-link"
              target="_top"
              rel="noopener noreferrer">
              "Педиатр рядом" от 5-ти лет
            </NavLink>
          </Nav>
        </div>
      </div>
    </Container>
  );
}
