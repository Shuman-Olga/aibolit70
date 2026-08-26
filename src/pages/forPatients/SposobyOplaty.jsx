import { Container } from "react-bootstrap";

import SeoPage from "../../components/Seo";
import OptimizedImage from "../../components/common/OptimizedImage";

export default function SposobyOplaty() {
  return (
    <Container fluid id="page2">
      <SeoPage page="sposobyoplaty" />
      <div className="page-h1">
        <Container>
          <h1>Способы оплаты</h1>
        </Container>
      </div>
      <Container className="d-flex justify-content-between my-4 position-block">
        <div>
          <h4>Оплата наличными</h4>
          <div className="my-3">
            <OptimizedImage
              src={"оплата_наличные.jpg"}
              alt="оплата_наличные"
              className="me-5"
              title="наличные"
              loading="lazy"
              width={100}
              height={103}
            />
            Оплата производится наличными деньгами врачу после приема или
            оказания услуг
          </div>
          <div className="my-3">
            <h4>Банковским переводом</h4>
            <OptimizedImage
              src={"оплата_перевод.jpg"}
              alt="оплата_перевод"
              className="me-5"
              title="оплата"
              loading="lazy"
              width={100}
              height={103}
            />
            Вы можете оплатить услуги переводом через Сбербанк онлайн, после
            приема или оказания услуг
          </div>
        </div>
      </Container>
    </Container>
  );
}
