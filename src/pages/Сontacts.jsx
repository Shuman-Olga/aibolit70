import { Container } from "react-bootstrap";

import isReactSnap from "../utilits/isReactSnap";
import SeoPage from "../components/Seo";
import OptimizedImage from "../components/common/OptimizedImage";

export default function Contacts() {
  return (
    <Container id="contacts" fluid>
      <SeoPage page="contacts" />
      <div className="page-h1">
        <Container>
          <h1>ООО "Айболит" Детская медицинская служба - Kонтакты</h1>
        </Container>
      </div>
      <Container className="my-4">
        <div className="d-flex justify-content-between fs-6 position">
          <div>
            <p>
              <span className="fw-bold">Наши контакты:</span>
            </p>
            <p>
              <span className="fw-bold">Телефон:</span> +7 (3822) 60-92-43
            </p>
            <p>
              <span className="fw-bold">Адрес:</span> 634021, г. Томск, ул.
              Герцена, д. 68, стр.2 (вход в "Томоко", 3 эт)
            </p>
            <p>
              <span className="fw-bold pe-2">E-mail:</span>
              <a
                href="mailto:aibolittom70@gmail.com?subject=С сайта Айболита"
                target="_self">
                aibolittom70@gmail.com
              </a>
            </p>
          </div>
          <div>
            <p>
              <span className="fw-bold">Наши реквизиты:</span>
            </p>
            <p>ООО "Айболит" </p>
            <p>ИНН 7017262021</p>
            <p>КПП 701701001</p>
            <p>ОГРН 1107017009164</p>
            <p>ОКАТО 69401000000 </p>
            <p>Р/С 40702810706290004715</p>
            <p>Корсчет 30101810500000000728</p>
            <p>ОАО "ТОМСКПРОМСТРОЙБАНК" г. Томск</p>
            <p>БИК 046902728</p>
          </div>
        </div>
        <div className="text-center mt-5 fs-6">
          <h3 className="fs-4">
            <OptimizedImage
              src={"time.png"}
              alt="clock"
              className="clock-png"
              title="Режим работы Айболит"
              loading="eager"
              decoding="async"
              width={40}
              height={40}
            />
            Режим работы детской медицинской слжбы "Айболит"
          </h3>
          <div className="d-flex justify-content-center">
            <hr className="w-50" />
          </div>

          <div>
            <p>Пн-пт: 08:00 - 19:00</p>
            <p>Суббота: 09:00 - 14:00</p>
            <p>Воскресенье : выходной</p>
          </div>
        </div>
        <div className="block-map my-3">
          <div style={{ position: "relative", overflow: "hidden" }}>
            <a
              href="https://yandex.ru/maps/org/aybolit_detskaya_meditsinskaya_sluzhba/1788754562/?utm_medium=mapframe&utm_source=maps"
              style={{
                color: "#eee",
                fontSize: "12px",
                position: "absolute",
                top: "0px",
              }}>
              Айболит детская медицинская служба
            </a>
            <a
              href="https://yandex.ru/maps/67/tomsk/category/home_care/680383784/?utm_medium=mapframe&utm_source=maps"
              style={{
                color: "#eee",
                fontSize: "12px",
                position: "absolute",
                top: "14px",
              }}>
              Медицинская помощь на дому в Томске
            </a>
            <a
              href="https://yandex.ru/maps/67/tomsk/category/nursing_service/184106094/?utm_medium=mapframe&utm_source=maps"
              style={{
                color: "#eee",
                fontSize: "12px",
                position: "absolute",
                top: "28px",
              }}>
              Патронажная служба в Томске
            </a>
            {!isReactSnap && (
              <iframe
                title="map"
                src="https://yandex.ru/map-widget/v1/org/aybolit_detskaya_meditsinskaya_sluzhba/1788754562/?ll=84.982875%2C56.474215&z=15"
                width="560"
                height="400"
                allowFullScreen
                style={{ position: "relative" }}></iframe>
            )}{" "}
          </div>
        </div>
        <hr />
        <div className="mb-2 fs-6">
          <p>
            <span className="fw-bold">Как проехать:</span>
          </p>
          <p>
            <OptimizedImage
              src={"auto.png"}
              alt="auto-png"
              className="auto-png"
              title="Ближайшие остановки общественного транспорта"
              loading="lazy"
              width={40}
              height={40}
            />
            Ближайшие остановки общественного транспорта:
          </p>
          <ul>
            <li>
              <p>Енисейская (трамвай №1, 2а, 4)</p>
            </li>
            <li>
              <p>
                Енисейская (троллейбусы 7; автобусы 3, 26, 27, 29, 31, 401, 510)
              </p>
            </li>
            <li>
              <p>
                пр. Комсомольский (троллейбусы 2, 6; автобусы 5, 8, 13, 16, 52,
                53, 131)
              </p>
            </li>
          </ul>
          <p>
            <br />
            <OptimizedImage
              src={"door.png"}
              alt="door-png"
              className="door-img"
              title="вход"
              loading="lazy"
              width={40}
              height={40}
            />
            Торговый центр Extra, вход с торца через "ТомОко", 3 этаж. <br />
            Возле Extra есть парковка.
          </p>
        </div>
      </Container>
    </Container>
  );
}
