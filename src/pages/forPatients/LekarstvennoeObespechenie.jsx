import { Container } from "react-bootstrap";

import PDFItem from "../../components/PDFItem";

export default function LekarstvennoeObespechenie() {
  return (
    <Container fluid id="lekarstvo" className="mb-3">
      <div className="page-h1">
        <Container>
          <h1>Лекарственное обеспечение</h1>
        </Container>
      </div>
      <Container className="d-flex justify-content-between my-4 position-block">
        <Container className="mt-4">
          <h4 className="text-center">
            Перечень жизненно необходимых и важнейших лекарственных препаратов
            для медицинского применения в 2026 году
          </h4>
          <ol className="my-3">
            <li className="my-2">
              перечень жизненно необходимых и важнейших лекарственных препаратов
              для медицинского применения;
            </li>
            <li className="my-2">
              перечень лекарственных препаратов, предназначенных для обеспечения
              лиц, больных гемофилией, муковисцидозом, гипофизарным нанизмом,
              болезнью Гоше, злокачественными новообразованиями лимфоидной,
              кроветворной и родственных им тканей, рассеянным склерозом,
              гемолитико-уремическим синдромом, юношеским артритом с системным
              началом, мукополисахаридозом I, II и VI типов, апластической
              анемией неуточненной, наследственным дефицитом факторов II
              (фибриногена), VII (лабильного), X (Стюарта - Прауэра), лиц после
              трансплантации органов и (или) тканей;
            </li>
            <li className="my-2">
              минимальный ассортимент лекарственных препаратов, необходимых для
              оказания медицинской помощи.
            </li>
          </ol>
          <PDFItem
            {...{
              title: "Перечень ЖНВЛП на 2026г.",
              pdf: "perechen_zhiznenno_neobhodimyh_i_vazhnejshih_lekarstvennyh_preparatov_dlya_medicinskogo_primeneniya.pdf",
            }}
          />
        </Container>
      </Container>
    </Container>
  );
}
