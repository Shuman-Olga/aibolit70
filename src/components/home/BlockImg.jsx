import { Link, NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import ModalWindows from "../modal/Modal";
import FormCallingDoctor from "../modal/FormСalling";
import OptimizedImage from "../common/OptimizedImage";

export default function BlockImg() {
  return (
    <Container id="blockimg" className="">
      <div className="position-relative position-img">
        <OptimizedImage
          src={"img-home.jpg"}
          alt="img-background"
          className="img-background"
          loading="eager"
          width={1200}
          height={600}
          // style={{ width: "100%", height: "auto" }}
          decoding="async"
          title="foto"
        />

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
              <OptimizedImage
                src={"home.png"}
                alt="img-home"
                className="block-btn-img"
                title="img-home"
                loading="eager"
                decoding="async"
                width={82}
                height={82}
              />

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
              <OptimizedImage
                src={"calling.png"}
                alt="img-programm"
                className="block-btn-img2"
                title="img-programm"
                loading="eager"
                decoding="async"
                width={63}
                height={63}
              />

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
              <OptimizedImage
                src={"analyzes.png"}
                alt="img-analyz"
                className="block-btn-img"
                title="img-analyz"
                loading="eager"
                decoding="async"
                width={82}
                height={61}
              />

              <p className="text-center">Анализы</p>
            </div>
          </div>
        </NavLink>
      </div>
    </Container>
  );
}
