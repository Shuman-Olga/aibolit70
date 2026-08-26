import { Container } from "react-bootstrap";

import ModalWindows from "../modal/Modal";
import FormCallingDoctor from "../modal/FormСalling";
import isReactSnap from "../../utilits/isReactSnap";
import OptimizedImage from "../common/OptimizedImage";

export default function BlockContacts() {
  return (
    <Container id="blockcontacts">
      <div className="d-flex justify-content-center">
        <hr className="w-50 d-inline-block" />
      </div>
      <div className="d-flex justify-content-around mt-4 block-flex">
        <div className="block-contact">
          <h3>Айболит детская медицинская служба</h3>

          <div className="d-flex align-items-center py-2">
            <OptimizedImage
              src={"auto.png"}
              alt="img-map"
              title="address"
              className="img me-3"
              loading="lazy"
              width={40}
              height={40}
            />

            <p>г. Томск, ул. Герцена 68, строение 2</p>
          </div>
          <div className="d-flex align-items-center py-2">
            <OptimizedImage
              src={"time.png"}
              alt="img-time"
              className="img me-3"
              title="time"
              width={40}
              height={40}
              loading="lazy"
            />

            <p>
              Мы работаем: <br />
              Пн-пт: 8:00-19:00
              <br />
              Сб: 10:00-14:00
            </p>
          </div>
          <div className="d-flex align-items-center py-2">
            <OptimizedImage
              src={"phone-tel.png"}
              loading="lazy"
              alt="img-phone"
              className="img me-3"
              title="phone"
              width={40}
              height={40}
            />

            <a href="tel:83822609243">
              <p className="phone">+7 (3822) 60-92-43</p>
            </a>
          </div>
          <div className="d-flex justify-content-center mt-4 ">
            <ModalWindows title="Вызов врача на дом" name="BlockContact">
              <FormCallingDoctor />
            </ModalWindows>
          </div>
        </div>
        <div className="block-map ">
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
                loading="lazy"
                style={{ position: "relative" }}></iframe>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
