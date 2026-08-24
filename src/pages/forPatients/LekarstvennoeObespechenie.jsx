import { Container } from "react-bootstrap";

import PDFItem from "../../components/PDFItem";
import SeoPage from "../../components/Seo";

export default function LekarstvennoeObespechenie() {
  return (
    <Container fluid id="lekarstvo" className="mb-3">
      <SeoPage page="lekarstvo" />
      <div className="page-h1">
        <Container>
          <h1>Лекарственное обеспечение</h1>
        </Container>
      </div>
      <Container className="d-flex justify-content-between my-4 position-block">
        <Container className="mt-4">
          <h4 className="text-center">
            Перечень жизненно необходимых и важнейших лекарственных препаратов
            для медицинского применения в 2024 году
          </h4>
          <ol className="my-3">
            <li className="my-2">
              Перечень жизненно необходимых и важнейших лекарственных препаратов
              для медицинского применения согласно приложению N 1; (в ред.
              распоряжения Правительства РФ от 12.10.2020 N 2626-р)
            </li>
            <li className="my-2">
              Перечень лекарственных препаратов для медицинского применения, в
              том числе лекарственных препаратов для медицинского применения,
              назначаемых по решению врачебных комиссий медицинских организаций,
              согласно приложению N 2; (перечень утратил силу. - Распоряжение
              Правительства РФ от 23.11.2020 N 3073-р)
            </li>
            <li className="my-2">
              Перечень лекарственных препаратов, предназначенных для обеспечения
              лиц, больных гемофилией, муковисцидозом, гипофизарным нанизмом,
              болезнью Гоше, злокачественными новообразованиями лимфоидной,
              кроветворной и родственных им тканей, рассеянным склерозом,
              гемолитико-уремическим синдромом, юношеским артритом с системным
              началом, мукополисахаридозом I, II и VI типов, апластической
              анемией неуточненной, наследственным дефицитом факторов II
              (фибриногена), VII (лабильного), X (Стюарта - Прауэра), лиц после
              трансплантации органов и (или) тканей, согласно приложению N 3; (в
              ред. распоряжения Правительства РФ от 26.04.2020 N 1142-р)
            </li>
          </ol>
          <PDFItem
            {...{
              title: "Перечень ЖНВЛП на 2024г.",
              pdf: "perechen_zhiznenno_neobhodimyh_i_vazhnejshih_lekarstvennyh_preparatov_dlya_medicinskogo_primeneniya_2024.pdf",
            }}
          />
        </Container>
      </Container>
    </Container>
  );
}
