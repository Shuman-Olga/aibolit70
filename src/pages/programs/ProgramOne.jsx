import { Container, Tab, Tabs } from "react-bootstrap";

import BlockReklama1 from "../../components/reklama/BlockReklama1";
import SeoPage from "../../components/Seo";
import PDFItem from "../../components/PDFItem";
import OptimizedImage from "../../components/common/OptimizedImage";

export default function ProgramOne() {
  return (
    <Container id="programone" fluid>
      <SeoPage page="programone" />
      <div className="page-h1">
        <Container>
          <h1>Малыш Хоум ( от 0 до 2-х лет)</h1>
        </Container>
      </div>
      <Container className="my-4 text-center">
        <div>
          <OptimizedImage
            src={"uslugi1.jpg"}
            alt="img-program-one"
            className="progone-img"
            title="Программа Мылыш.Хоум | Айболит детская медицинская служба"
            loading="lazy"
            width={468}
            height={400}
          />

          <div className="lh-lg py-4">
            <p>
              Первый год жизни ребёнка особенно важен: именно в возрасте от 0 до
              года закладываются основы нашего здоровья. От того, как будет
              построена забота о ребёнке в этот период, во многом зависит, что
              ждёт его в будущем – насколько крепким станет его иммунитет,
              какими болезнями он будет болеть, к каким заболеваниям окажется
              предрасположен. Не случайно 90% всех прививок, плановых осмотров,
              анализов и исследований приходится именно на первый год жизни.
              Родители, исповедующие ответственный подход к здоровью ребёнка,
              неизбежно задумываются, как лучше всего обеспечить необходимый
              контроль за здоровьем своего малыша.
            </p>
          </div>
        </div>
        <h2 className="mb-5">В наших программах все продумано до мелочей</h2>
        <div className="block-table">
          <Tabs
            defaultActiveKey="full"
            id="uncontrolled-tab-example"
            className="mb-3">
            <Tab eventKey="full" title="Полная">
              <table className="table table-light table-striped text-start ">
                <tbody>
                  <tr>
                    <td className="px-3">
                      <p className="fw-bold">Ведущий врач педиатр</p>
                      <p className="ms-5">Наблюдение на дому</p>
                      <p className="ms-5">Вызов на дом при заболевании</p>
                    </td>
                    <td>
                      <p className="text-white-50">.</p>
                      <p className="fw-bold">ежемесячно</p>
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
                      <p>Кол-во</p>
                      <p className="fw-bold">6</p>
                      <p className="fw-bold">4</p>
                      <p className="fw-bold">4</p>
                      <p className="fw-bold">1</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <p className="fw-bold">
                        Плановые заборы анализов на дому
                      </p>
                      <p className="ms-5">
                        Общеклинический анализ крови (ОАК -развернутый)
                      </p>
                      <p className="ms-5">Общий анализ мочи (ОАМ)</p>
                      <p className="ms-5">Кал на яйца глист</p>
                      <p className="ms-5">Соскоб на энтеробиоз </p>
                      <p className="ms-5">Глюкоза крови </p>
                    </td>
                    <td>
                      <p>Кол-во</p>
                      <p className="fw-bold">3</p>
                      <p className="fw-bold">3</p>
                      <p className="fw-bold">1</p>
                      <p className="fw-bold">по назначению</p>
                      <p className="fw-bold">1</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <p className="fw-bold">УЗИ в клинике</p>
                      <p className="ms-5">УЗИ тазобедренных суставов</p>
                      <p className="ms-5">УЗИ органов брюшной полости</p>
                      <p className="ms-5"> УЗИ сердца</p>
                      <p className="ms-5"> УЗИ почек</p>
                      <p className="ms-5">
                        УЗИ головного мозга (нейросонография)
                      </p>
                    </td>
                    <td>
                      <p>Кол-во(в год)</p>
                      <p className="fw-bold">1</p>
                      <p className="fw-bold">1</p>
                      <p className="fw-bold">1</p>
                      <p className="fw-bold">1</p>
                      <p className="fw-bold">1</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <p className="fw-bold">Вакцинация *</p>
                      <p className="ms-5">Вирусный гепатит В </p>
                      <p className="ms-5">АКДС (коклюш, дифтерия, столбняк)</p>
                      <p className="ms-5">Полиомиелит</p>
                      <p className="ms-5">Корь, краснуха, паротит </p>
                      <p className="ms-5">Гемофильная инфекция</p>
                      <p className="ms-5">Пневмококковая инфекция</p>
                      <p className="ms-5">Ротофирусная инфекция</p>
                      <p className="ms-5">Менингококковая инфекция</p>
                    </td>
                    <td>
                      <p className="text-white-50">.</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <p className="fw-bold">
                        Мобильная связь с ведущим врачом-педиатром в рабочее
                        время с 08:00 до 20:00
                      </p>
                    </td>
                    <td>
                      <p className="fw-bold">+</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <p className="fw-bold">
                        Выдача медицинской документации (справка в бассейн,
                        справка по месту требования)
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
                      <p className="fw-bold">9 500 руб.**</p>
                      <p className="fw-bold">14 500 руб.**</p>
                    </td>
                  </tr>
                  <tr className="table-group-divider font-text">
                    <td colSpan={2} className="px-3">
                      <PDFItem
                        {...{
                          title: "ПРИЛОЖЕНИЕ к договору",
                          pdf: "prilozhenie-k-dogovoru-1.pdf",
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
                        Просим Вас уточнять актуальные цены у менеджеров по
                        телефону 60-92-43
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="profile" title="Личный педиатр">
              <table className="table table-light table-striped text-start ">
                <tbody>
                  <tr>
                    <td className="px-3">
                      <p className="fw-bold">Ведущий врач педиатр</p>
                      <p className="ms-5">Наблюдение на дому</p>
                      <p className="ms-5">Вызов на дом при заболевании</p>
                    </td>
                    <td>
                      <p className="text-white-50">.</p>
                      <p className="fw-bold">ежемесячно</p>
                      <p className="fw-bold">по показаниям</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <p className="fw-bold">Вакцинация *</p>
                      <p className="ms-5">Вирусный гепатит В </p>
                      <p className="ms-5">АКДС (коклюш, дифтерия, столбняк)</p>
                      <p className="ms-5">Полиомиелит</p>
                      <p className="ms-5">Корь, краснуха, паротит </p>
                      <p className="ms-5">Гемофильная инфекция</p>
                      <p className="ms-5">Пневмококковая инфекция</p>
                      <p className="ms-5">Ротофирусная инфекция</p>
                      <p className="ms-5">Менингококковая инфекция</p>
                    </td>
                    <td>
                      <p className="text-white-50">.</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                      <p className="fw-bold">+</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <p className="fw-bold">
                        Мобильная связь с ведущим врачом-педиатром в рабочее
                        время с 08:00 до 20:00
                      </p>
                    </td>
                    <td>
                      <p className="fw-bold">+</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3">
                      <p className="fw-bold">
                        Выдача медицинской документации (справка в бассейн,
                        справка по месту требования)
                      </p>
                    </td>
                    <td>
                      <p className="fw-bold">+</p>
                    </td>
                  </tr>
                  <tr className="fs-5 table-group-divider table-wi">
                    <td className="px-3">
                      <p className="fw-bold">Стоимость в месяц</p>
                      <p className="fw-bold">- за двух детей</p>
                    </td>
                    <td>
                      <p className="fw-bold">7 500 руб.**</p>
                      <p className="fw-bold">10 000 руб.**</p>
                    </td>
                  </tr>
                  <tr className="table-group-divider font-text">
                    <td colSpan={2} className="px-3">
                      <PDFItem
                        {...{
                          title: "ПРИЛОЖЕНИЕ к договору",
                          pdf: "prilozhenie-k-dogovoru-2.pdf",
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
                        Просим Вас уточнять актуальные цены у менеджеров по
                        телефону 60-92-43
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </div>
      </Container>
      <BlockReklama1 />
    </Container>
  );
}
