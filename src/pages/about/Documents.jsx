import { Container } from "react-bootstrap";

import SeoPage from "../../components/Seo";
import { dataPDFDocuments } from "../../data/dataDocumentsList";
import PDFItem from "../../components/PDFItem";

export default function Documents() {
  return (
    <Container fluid id="documents" className="mb-3">
      <SeoPage page="documents" />
      <div className="page-h1">
        <Container>
          <h1>Документы</h1>
        </Container>
      </div>
      <Container className="d-flex justify-content-between mt-4 position-block">
        <div>
          {dataPDFDocuments.map((item, index) => (
            <div className="my-5" key={index}>
              <PDFItem {...item} />
            </div>
          ))}
        </div>
      </Container>
    </Container>
  );
}
