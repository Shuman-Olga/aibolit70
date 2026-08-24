import { Container } from "react-bootstrap";

import BlockReklama3 from "../../components/reklama/BlockReklama3";
import SeoPage from "../../components/Seo";
import ModalWindows from "../../components/modal/Modal";
import FormCallingDoctor from "../../components/modal/FormСalling";

export default function DoctorNaDom() {
  return (
    <Container id="doctornadom" fluid>
      <SeoPage page="doctornadom" />
      <div className="page-h1">
        <Container>
          <h1>Вызов педиатра на дом в Томске</h1>
        </Container>
      </div>
      <Container>
        <BlockReklama3 />
        <div>
          <p>
            Если вам нужен хороший детский{" "}
            <span className="fw-bold">педиатр,</span> обращайтесь в Детскую
            медицинскую службу `Айболит`. Специалисты медицинской службы окажут
            своевременную квалифицированную помощь. Они имеют многолетний опыт
            работы и несут полную ответственность за здоровье юных пациентов.
          </p>
          <h4 className="text-center">
            Цена вызова детского врача на дом зависит от дальности расстояния
          </h4>
          <p className="fw-bold mt-5">Пригородные районы города:</p>
          <p>
            Микрорайон: Апрель, Аникино, Зеленая долина, Заварзино <br />{" "}
            Деревня: Позднеево, Эушта, Черная речка, Кисловка, Малая Михайловка,
            Новомихайловка <br /> Село: Тимирязево, Дзержинское, Тахатамышево,
            Коларово, Корнилово <br /> Поселок: Зональная станция, Ключи,
            Мирный, Трубочево, Кайдаловка, Росинка, Кайдаловка
          </p>
          <p className="fw-bold mt-5">Особо отдаленные районы:</p>
          <p>
            Деревня: Кандинка, Лоскутово, Протопопово, Воронино <br />
            Село: Кафтанчиково, Калтай, Курлек, Богашёво, Зоркальцево <br />
            Поселок: Ааэропорт, Синий утес, Светлый, Копылово, Рассвет
          </p>
        </div>
        <div className="block-table">
          <h2 className="py-5">Вызов детского специалиста на дом: ​</h2>
          <table className="table table-light table-striped text-start ">
            <tbody>
              <tr className="fs-5 table-group-divider table-info">
                <td className="px-3">
                  <p className="ms-5">Наименование услуги (прайс не полный)</p>
                </td>
                <td>
                  <p>Цена</p>
                </td>
              </tr>
              <tr>
                <td className="px-3">
                  <p className="fw-bold">
                    Прием детского врача на дому - (по Томску)
                  </p>
                  <p className="fw-bold"> - (Пригородные районы города)</p>
                  <p className="fw-bold"> - (Особо отдаленные районы)</p>
                </td>
                <td>
                  <p className="fw-bold">3 500 руб.</p>
                  <p className="fw-bold">4 000 руб.</p>
                  <p className="fw-bold">4 500 руб.</p>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <p>
            При вызове врача в указанную стоимость входит выезд и консультация.
          </p>
          <p>Все дополнительные услуги оплачиваются сверху.</p>
        </div>
        <div className="d-flex justify-content-center my-5">
          <ModalWindows title="Вызов врача на дом">
            <FormCallingDoctor />
          </ModalWindows>
        </div>
      </Container>
    </Container>
  );
}
