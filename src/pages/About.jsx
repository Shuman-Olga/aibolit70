import { Container } from "react-bootstrap";

import BlockAdvantages from "../components/home/BlockAdvantages";
import SeoPage from "../components/Seo";

export default function About() {
  return (
    <Container fluid id="about">
      <SeoPage page="about" />
      <div className="page-h1">
        <Container>
          <h1>О нас</h1>
        </Container>
      </div>
      <Container>
        <div className="d-flex justify-content-center mt-5">
          <picture>
            <source
              srcSet={require("../assets/img/massage.avif")}
              type="image/avif"
            />
            <source
              srcSet={require("../assets/img/massage.webp")}
              type="image/webp"
            />
            <img
              src={require(`../assets/img/massage.jpg`)}
              loading="lazy"
              width={700}
              height={467}
              alt="foto-aibolot"
              className="foto"
              title="foto"
            />
          </picture>
        </div>
        <div className="text mt-4">
          <p className="text-about">
            <span className="text-bold">
              Детская медицинская служба "Айболит"
            </span>{" "}
            предлагает широкий спектр услуг по оказанию{" "}
            <span className="text-italic">
              медицинской помощи детям на дому
            </span>
            . С момента своего создания в 2001 году, мы нацелены на обеспечение
            качественного{" "}
            <span className="text-italic">
              обслуживания детей от 0 до 18 лет{" "}
            </span>
            с индивидуальным подходом к каждому пациенту.
          </p>
          <h5 className="my-4">
            Вот некоторые ключевые моменты о нашей службе:
          </h5>
          <div>
            <ul>
              <li>
                <p>
                  <span className="text-bold">
                    {" "}
                    Квалифицированные специалисты:
                  </span>{" "}
                  У нас работают высококвалифицированные врачи и{" "}
                  <span className="text-italic">узкие специалисты </span>,
                  которые готовы оказать помощь в любое время.
                </p>
              </li>
              <li>
                <p>
                  <span className="text-bold"> Персональный лечащий врач:</span>{" "}
                  Каждый пациент получает персонального врача, который
                  контролирует весь процесс лечения и при необходимости
                  привлекает других специалистов.
                </p>
              </li>
              <li>
                <p>
                  <span className="text-bold"> Удобство вызова:</span> Вы можете{" "}
                  <span className="text-italic"> вызвать педиатра </span>
                  или узкого специалиста, позвонив по номеру 8 (3822) 60-92-43
                  или оставив заявку на обратный звонок.
                </p>
              </li>
              <li>
                <p>
                  {" "}
                  <span className="text-bold"> График работы:</span> Мы работаем
                  с 08:00 до 19:00 в будние дни и с 09:00 до 14:00 в субботу,
                  что позволяет вам получить помощь в удобное для вас время.
                </p>
              </li>
              <li>
                <p>
                  {" "}
                  <span className="text-bold"> Доступность:</span> На
                  сегодняшний день наш сервис доступен жителям Томска и
                  близлежащих районов.
                </p>
              </li>
            </ul>
          </div>
          <p className="text-about">
            Мы стремимся к качеству, оперативности и доступности медицинского
            обслуживания, чтобы обеспечить здоровье и комфорт ваших детей. Мы
            всегда на связи и готовы помочь!
          </p>
        </div>
      </Container>
      <div className="container-fluid line">
        <h2>Детская медицинская служба "Айболит" поможет Вам!</h2>
      </div>
      <BlockAdvantages />
    </Container>
  );
}
