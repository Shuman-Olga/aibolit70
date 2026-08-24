import { Container } from "react-bootstrap";

import SeoPage from "../components/Seo";

export default function ForPatients() {
  return (
    <Container fluid id="forpatients">
      <SeoPage page="forpatients" />
      <div className="page-h1">
        <Container>
          <h1>Информация пациентам</h1>
        </Container>
      </div>
      <Container className="d-flex justify-content-between my-4 position-block">
        <div className="text-center mt-5 fs-6">
          <h3 className="fs-4">
            <img
              src={require(`../assets/img/time.png`)}
              alt="clock"
              className="clock-png "
              title="Режим работы Айболит"
            />
            Режим работы детской медицинской слжбы &quot;Айболит &quot;
          </h3>
          <div className="d-flex justify-content-center">
            <hr className="w-50" />
          </div>

          <div>
            <p className="text-center">Пн-Пт: 08:00 - 19:00</p>
            <p className="text-center">Сб: 09:00 - 14:00</p>
            <p className="text-center">Вс: выходной</p>
          </div>
        </div>
      </Container>
    </Container>
  );
}
