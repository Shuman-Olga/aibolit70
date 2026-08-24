import { Link, NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import ModalWindows from "../modal/Modal";
import FormCallingDoctor from "../modal/FormСalling";

export default function BlockImg() {
  return (
    <Container id="blockimg" className="">
      <div className="position-relative position-img">
        <picture>
          <source
            srcSet={require("../../assets/img/img-home.avif")}
            type="image/avif"
          />
          <source
            srcSet={require("../../assets/img/img-home.webp")}
            type="image/webp"
          />
          <img
            src={require("../../assets/img/img-home.jpg")}
            alt="img-background"
            className="img-background"
            loading="eager"
            width={1800}
            height={630}
            style={{ width: "100%", height: "auto" }}
            decoding="async"
            title="foto"
          />
        </picture>

        <h4 className="position-absolute top-0 end-0 mt-5 me-5 h4-text">
          Заботимся о здоровье ваших детей с 2001 года
        </h4>
        <div className="position-absolute bottom-50 end-0 me-5 btn-callback">
          <ul>
            <li>
              <NavLink
                to="uslugi-i-ceny/pediatr/"
                target="_top"
                rel="noopener noreferrer"
                relative="path">
                ПЕДИАТРЫ
              </NavLink>
            </li>
            <li>
              <Link
                to="programmy-nablyudeniya-za-zdorovem/"
                target="_top"
                rel="noopener noreferrer">
                ДЕТСКИЕ МЕДИЦИНСКИЕ ПРОГРАММЫ
              </Link>
            </li>
            <li>
              <Link to="chek-ap/" target="_top" rel="noopener noreferrer">
                МЕДОСМОТРЫ (Чек-ап)
              </Link>
            </li>
            <li>
              <Link to="uslugi-i-ceny/" target="_top" rel="noopener noreferrer">
                Онлайн КОНСУЛЬТАЦИЯ С ПЕДИАТРОМ
              </Link>
            </li>
          </ul>{" "}
          <ModalWindows title="Вызов врача на дом" name="Header">
            <FormCallingDoctor />
          </ModalWindows>
        </div>
      </div>
      <div className=" wrapper-block-btn">
        <NavLink
          to="uslugi-i-ceny/vyzov-pediatra-na-dom/"
          className="nav-link"
          target="_top"
          rel="noopener noreferrer">
          <div className="block-btn color1">
            <div className="block-btn-border">
              <picture>
                <source
                  srcSet={require("../../assets/img/home.avif")}
                  type="image/avif"
                />
                <source
                  srcSet={require("../../assets/img/home.webp")}
                  type="image/webp"
                />
                <img
                  src={require("../../assets/img/home.png")}
                  alt="img-home"
                  className="block-btn-img"
                  title="img-home"
                  loading="eager"
                  decoding="async"
                  width={82}
                  height={82}
                />
              </picture>

              <p className="text-center">Вызов врача на дом</p>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="programmy-nablyudeniya-za-zdorovem/"
          className="nav-link"
          target="_top"
          rel="noopener noreferrer">
          <div className="block-btn color2">
            <div className="block-btn-border">
              <picture>
                <source
                  srcSet={require("../../assets/img/calling.avif")}
                  type="image/avif"
                />
                <source
                  srcSet={require("../../assets/img/calling.webp")}
                  type="image/webp"
                />
                <img
                  src={require("../../assets/img/calling.png")}
                  alt="img-programm"
                  className="block-btn-img2"
                  title="img-programm"
                  loading="eager"
                  decoding="async"
                  width={63}
                  height={63}
                />
              </picture>

              <p className="text-center">Программы</p>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/"
          className="nav-link"
          target="_top"
          rel="noopener noreferrer">
          <div className="block-btn color3">
            <div className="block-btn-border">
              <picture>
                <source
                  srcSet={require("../../assets/img/analyzes.avif")}
                  type="image/avif"
                />
                <source
                  srcSet={require("../../assets/img/analyzes.webp")}
                  type="image/webp"
                />
                <img
                  src={require("../../assets/img/analyzes.png")}
                  alt="img-analyz"
                  className="block-btn-img"
                  title="img-analyz"
                  loading="eager"
                  decoding="async"
                  width={82}
                  height={61}
                />
              </picture>

              <p className="text-center">Анализы</p>
            </div>
          </div>
        </NavLink>
      </div>
    </Container>
  );
}
