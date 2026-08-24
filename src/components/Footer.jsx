import { Container, Nav } from "react-bootstrap";

import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <Container id="footer" fluid className="d-flex justify-content-around">
      <div className="block-1">
        <h3>О Айболите</h3>
        <Nav className="flex-column mt-3">
          <NavLink
            to="/"
            className="nav-link"
            target="_top"
            rel="noopener noreferrer">
            Главная
          </NavLink>
          <NavLink
            to="o-nas/"
            className="nav-link"
            target="_top"
            rel="noopener noreferrer">
            О нас
          </NavLink>
          <NavLink
            to="doctors/"
            className="nav-link"
            target="_top"
            rel="noopener noreferrer">
            Педиатры
          </NavLink>
          <NavLink
            to="programmy-nablyudeniya-za-zdorovem/"
            className="nav-link"
            target="_top"
            rel="noopener noreferrer">
            Программы
          </NavLink>
          <NavLink
            to="uslugi-i-ceny/"
            className="nav-link"
            target="_top"
            rel="noopener noreferrer">
            Услуги
          </NavLink>
          <NavLink
            to="pacientam/"
            className="nav-link"
            target="_top"
            rel="noopener noreferrer">
            Пациентам
          </NavLink>
          <NavLink
            to="blog/"
            className="nav-link"
            target="_top"
            rel="noopener noreferrer">
            Блог
          </NavLink>
          <NavLink
            to="kontakty/"
            className="nav-link"
            target="_top"
            rel="noopener noreferrer">
            Контакты
          </NavLink>
        </Nav>
      </div>
      <div className="text-center">
        <picture>
          <source
            srcSet={require("../assets/img/aibolit_logo.avif")}
            type="image/avif"
          />
          <source
            srcSet={require("../assets/img/aibolit_logo.webp")}
            type="image/webp"
          />
          <img
            src={require("../assets/img/aibolit_logo.png")}
            loading="lazy"
            alt="logo"
            className="w-25 img mb-4"
            title="logo"
            width={188}
            height={61}
          />
        </picture>

        <div className=" block-colum d-flex justify-content-between align-items-center ">
          <div>
            <a
              href="mailto:aibolittom70@gmail.com"
              target="_self"
              className="fs-4">
              <p className="email">aibolittom70@gmail.com</p>
            </a>
            <p className="adress">г. Томск, ул. Герцена 68, строение 2</p>
          </div>
          <div>
            <a
              href="/docs/politika-obrabotki-personalnyh-dannyh-ooo-ajbolit.pdf"
              target="_blank"
              rel="noopener noreferrer">
              Политика обработки персональных данных
            </a>
          </div>
        </div>
        <a
          href="https://vk.com/aibolittomsk"
          target="_blank"
          rel="noopener noreferrer">
          <img
            src={require("../assets/img/vk-img.png")}
            alt="logo-vk"
            className="img-vk mt-4"
            title="vk"
          />
        </a>

        <p className="fw-light mt-4">
          Информация и цены, представленные на сайте, являются справочными и не
          являются публичной офертой.
        </p>
      </div>
      <div className="block-3">
        <h3 className="mb-5">Свяжитесь с нами</h3>
        <div className="my-5 text-center">
          <a href="tel:83822609243" target="_self">
            <p className="phone fs-4">+7 (3822) 60-92-43</p>
          </a>
        </div>
      </div>
    </Container>
  );
}
