import { Container } from "react-bootstrap";

import SeoPage from "../components/Seo";
import ChekUpItem from "../components/ChekUpItem";
import BlockReklama2 from "../components/reklama/BlockReklama2";
import OptimizedImage from "../components/common/OptimizedImage";

export default function ChekUp() {
  return (
    <Container id="chek-ap" fluid>
      <SeoPage page="chekap" />
      <div className="page-h1">
        <Container>
          <h1>Чек-апы (медицинские осмотры)</h1>
        </Container>
      </div>
      <Container className="my-4">
        <div>
          <OptimizedImage
            src={"uslugi3.jpg"}
            alt="foto-aibolit"
            className="img-thumbnail foto w-25"
            title="Программы наблюдения за здоровьем ребенка"
            loading="lazy"
            width={314}
            height={272}
          />

          <p>
            <span className="fw-bold">Педиатрический Check-up </span> — это
            важная процедура, которая позволяет родителям получить полное
            представление о здоровье их ребенка. Обычно в рамках такого
            обследования проводятся различные диагностические тесты и
            <span className="fst-italic"> анализы</span>, включая физикальное
            обследование, лабораторные анализы, анализы мочи и крови, а также
            ультразвуковые исследования, если это необходимо.
          </p>
          <p>
            После завершения обследования родители получают подробный отчет,
            который включает:
          </p>
          <ol className="ulandimg">
            <li className="my-2">
              <span className="fw-bold">Заключения врачей: </span>мнения
              специалистов о здоровье ребенка, наличие или отсутствие патологий.
            </li>
            <li className="my-2">
              <span className="fw-bold">Результаты анализов: </span>информация о
              проведенных тестах, их результаты и интерпретация.
            </li>
            <li className="my-2">
              <span className="fw-bold">Рекомендации: </span>советы по
              дальнейшему наблюдению, профилактике и, при необходимости,
              лечению.
            </li>
          </ol>
          <p>
            Такой комплексный подход помогает выявить возможные проблемы на
            ранней стадии и принять меры для их решения, обеспечивая тем самым
            благополучие и здоровье ребенка.
          </p>
        </div>
        <h4 className="text-center mt-5">Выберите Check-up</h4>
        <div className="my-5">
          <ChekUpItem />
        </div>
        <BlockReklama2 />
      </Container>
    </Container>
  );
}
