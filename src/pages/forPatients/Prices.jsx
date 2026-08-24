import { Container, Table } from "react-bootstrap";

import { dataPrices } from "../../data/dataPrices";
import SeoPage from "../../components/Seo";

export default function Prices() {
  return (
    <Container fluid id="prices">
      <SeoPage page="prices" />
      <div className="page-h1">
        <Container>
          <h1>Стоимость услуг</h1>
        </Container>
      </div>
      <Container>
        <div className="block-table my-4">
          <Table striped responsive="sm">
            <thead className="table-success px-3">
              <tr className="fs-5">
                <th scope="col">Наименование услуги</th>
                <th scope="col">Цена</th>
              </tr>
            </thead>
            {dataPrices.map((item) => (
              <tbody key={item.id}>
                <tr key={item.id}>
                  <td colSpan={2}>
                    <p className="fw-bold">{item.title}</p>
                  </td>
                </tr>
                {item.listprices.map((item) => (
                  <tr key={item.id}>
                    <td className="px-3">
                      <p className="ms-5">{item.name}</p>
                    </td>
                    <td>
                      <p>{item.price} руб.</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </Table>
          <div>
            <p className="fw-bold mt-3">* Пригородные:</p>
            <p>
              Микрорайон: Апрель, Аникино, Зеленая долина, Заварзино <br />{" "}
              Деревня: Позднеево, Эушта, Черная речка, Кисловка, Малая
              Михайловка, Новомихайловка <br /> Село: Тимирязево, Дзержинское,
              Тахатамышево, Коларово, Корнилово <br /> Поселок: Зональная
              станция, Ключи, Мирный, Трубочево, Кайдаловка, Росинка, Кайдаловка
            </p>
            <p className="fw-bold mt-5">** Особо отдаленные:</p>
            <p>
              Деревня: Кандинка, Лоскутово, Протопопово, Воронино <br />
              Село: Кафтанчиково, Калтай, Курлек, Богашёво, Зоркальцево <br />
              Поселок: Ааэропорт, Синий утес, Светлый, Копылово, Рассвет
            </p>
            <p>
              *** для отдельных мест города и Томского района предусмотрено
              повышение стоимости услуг в зависимости от дальности расстояния
            </p>
          </div>
        </div>
      </Container>
    </Container>
  );
}
