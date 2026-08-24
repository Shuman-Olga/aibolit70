import { Container } from "react-bootstrap";

import SeoPage from "../../components/Seo";
import { dataPravoInfa } from "../../data/dataPravoInfa";
import PDFItem from "../../components/PDFItem";

export default function PravovyInformations() {
  return (
    <Container fluid id="pravoinfa">
      <SeoPage page="pravovainfa" />
      <div className="page-h1">
        <Container>
          <h1>Правовая информация</h1>
        </Container>
      </div>
      <Container className="d-flex justify-content-between mt-4 position-block">
        <div>
          <h4>Свидетельство о государственной регистрации </h4>
          <div className="mt-4">
            <p>
              Общество с ограниченной ответственностью &quot;Детская медицинская
              служба &quot;Айболит&quot;, дата регистрации 20 мая 2010г.
            </p>
            <p>
              Учредители: Садовникова Елена Геннадьевна - директор, Петухова
              Ольга Викторовна - главный врач.
            </p>
          </div>

          <PDFItem
            {...{
              title:
                "Выписка из единого государствееного реестра юридитческих  лиц (ЕГРЮЛ)",
              pdf: "vypiska_iz_EGRYuL.pdf",
            }}
          />
          {dataPravoInfa.map((item, index) => (
            <div className="my-5" key={index}>
              <h4>{item.title}</h4>
              <PDFItem {...item} />
            </div>
          ))}
        </div>
      </Container>
    </Container>
  );
}
