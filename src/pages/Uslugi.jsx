import { Container } from "react-bootstrap";

import BlockReklama3 from "../components/reklama/BlockReklama3";
import SeoPage from "../components/Seo";
import UslugiItems from "../components/uslugi/UslugiItemPageUslugi";

export default function Uslugi() {
  return (
    <Container fluid id="services">
      <SeoPage page="services" />
      <div className="page-h1">
        <Container>
          <h1>Услуги</h1>
        </Container>
      </div>
      <Container>
        <BlockReklama3 />
        <UslugiItems />
      </Container>
    </Container>
  );
}
