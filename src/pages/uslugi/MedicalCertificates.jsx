import { Container } from "react-bootstrap";

import BlockReklama2 from "../../components/reklama/BlockReklama2";
import SeoPage from "../../components/Seo";
import SpravkiItem from "../../components/uslugi/SpravkiItem";

export default function MedicalCertificates() {
  return (
    <Container id="medical-certificates" fluid>
      <SeoPage page="spravki" />
      <div className="page-h1">
        <Container>
          <h1>Медицинские справки ребенку</h1>
        </Container>
      </div>
      <Container>
        <BlockReklama2 />
        <div className="my-4">
          <p>
            Детская медицинская служба "Айболит" предлагает квалифицированные
            услуги по оформлению медицинских справок для детских садов, школ,
            санаториев, бассейнов и других учреждений. Мы располагаем всеми
            необходимыми лицензиями и гарантируем, что вы получите подлинные
            документы, заверенные подписями врачей и печатями.
          </p>
          <p>
            Сэкономьте время и избегите риска, связанного с непроверенными
            предложениями о покупке медицинских справок без врачебного осмотра.
            Наша команда специалистов предлагает быстрое оформление медицинских
            карт и справок, конкурентоспособные цены и заботливое отношение к
            здоровью ваших детей. Мы понимаем, насколько важен этот процесс для
            вас и ваших малышей, поэтому гарантируем индивидуальный подход и
            высокое качество услуг.
          </p>
        </div>

        <SpravkiItem />
      </Container>
    </Container>
  );
}
