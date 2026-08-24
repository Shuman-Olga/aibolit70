import { Container } from "react-bootstrap";

import BlockReklama from "../../components/reklama/BlockReklama1";
import SeoPage from "../../components/Seo";
import PDFItem from "../../components/PDFItem";

export default function ProgramThree() {
  return (
    <Container id="programthree" fluid>
      <SeoPage page="programthree" />

      <div className="page-h1">
        <Container>
          <h1>Педиатр рядом ( c 5-ти лет)</h1>
        </Container>
      </div>
      <Container className="my-4 text-center">
        <div>
          <picture>
            <source
              srcSet={require("../../assets/img/detskii_vrach_rebenok.avif")}
              type="image/avif"
            />
            <source
              srcSet={require("../../assets/img/detskii_vrach_rebenok.webp")}
              type="image/webp"
            />
            <img
              src={require(`../../assets/img/detskii_vrach_rebenok.jpg`)}
              alt="img-program-three"
              className="progthree-img"
              title="Здоровый ребенок Педиатр рядом ( c 2-х лет)"
              loading="lazy"
              width={576}
              height={411}
            />
          </picture>

          <div className="lh-lg py-4">
            <p className="text-center">
              Данная программа предназначена для наблюдения ребенка возрастом от
              5 - ти лет.
            </p>
          </div>
        </div>
        <div className="block-table">
          <h2 className="py-5">Состав программы</h2>
          <table className="table table-light table-striped text-start ">
            <tbody>
              <tr>
                <td className="px-3">
                  <p className="fw-bold">Ведущий врач педиатр</p>
                  <p className="ms-5">Наблюдение на дому</p>
                  <p className="ms-5">Вызов на дом при заболевании</p>
                </td>
                <td>
                  <p>.</p>
                  <p className="fw-bold">ежемесячно(1 раз в мес)</p>
                  <p className="fw-bold">по показаниям</p>
                </td>
              </tr>
              <tr>
                <td className="px-3">
                  <p className="fw-bold">
                    Плановые осмотры врачами-специалистами на дому{" "}
                  </p>
                  <p className="ms-5">Невролог</p>
                  <p className="ms-5">Хирург-ортопед</p>
                  <p className="ms-5">Офтальмолог</p>
                  <p className="ms-5">Оториноларинголог </p>
                </td>
                <td>
                  <p>в год</p>
                  <p className="fw-bold">1 </p>
                  <p className="fw-bold">1 </p>
                  <p className="fw-bold">1</p>
                  <p className="fw-bold">1 </p>
                </td>
              </tr>
              <tr>
                <td className="px-3">
                  <p className="fw-bold">Плановые заборы анализов на дому</p>
                  <p className="ms-5">
                    Общеклинический анализ крови (ОАК -развернутый)
                  </p>
                  <p className="ms-5">Общий анализ мочи (ОАМ)</p>
                  <p className="ms-5">Кал на яйца глист</p>
                </td>
                <td>
                  <p>в год</p>
                  <p className="fw-bold">1</p>
                  <p className="fw-bold">1 </p>
                  <p className="fw-bold">1 </p>
                </td>
              </tr>
              <tr>
                <td className="px-3">
                  <p className="fw-bold">Вакцинация *</p>
                  <p className="ms-5">
                    Вакцинация по индивидуальному календарю
                  </p>
                </td>
                <td>
                  <p>.</p>
                  <p className="fw-bold">+</p>
                </td>
              </tr>
              <tr>
                <td className="px-3">
                  <p className="fw-bold">
                    Мобильная связь с ведущим врачом-педиатром в рабочее время с
                    08:00 до 20:00
                  </p>
                </td>
                <td>
                  <p className="fw-bold">+</p>
                </td>
              </tr>
              <tr>
                <td className="px-3">
                  <p className="fw-bold">
                    Выдача медицинской документации (справка в бассейн, справка
                    по месту требования)
                  </p>
                </td>
                <td>
                  <p className="fw-bold">+</p>
                </td>
              </tr>
              <tr className="fs-5 table-group-divider table-warning">
                <td className="px-3">
                  <p className="fw-bold">Стоимость в месяц</p>
                  <p className="fw-bold">- за двух детей</p>
                </td>
                <td>
                  <p className="fw-bold">6 000 руб.**</p>
                  <p className="fw-bold">9 000 руб.**</p>
                </td>
              </tr>
              <tr className="table-group-divider font-text ">
                <td colSpan={2} className="px-3">
                  <PDFItem
                    {...{
                      title: "ПРИЛОЖЕНИЕ к договору",
                      pdf: "prilozhenie-k-dogovoru-4.pdf",
                    }}
                  />

                  <p>* стоимость вакцины входит в программу</p>
                  <p>
                    ** для отдельных районов города и Томского района
                    предусмотрено повышение стоимости услуг в зависимости от
                    дальности расстояния
                  </p>
                  <p>МИНИМАЛЬНЫЙ СРОК заключения ДОГОВОРА 3 МЕСЯЦА</p>
                  <p>Первый платеж – за 3 месяца, оплачивается сразу.</p>
                  <p className="font-size-min">
                    Информация и цены, представленные на сайте, являются
                    справочными и не являются публичной офертой.
                  </p>
                  <p className="font-size-min">
                    Просим Вас уточнять актуальные цены у менеджеров по телефону
                    60-92-43
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
      <BlockReklama />
    </Container>
  );
}
