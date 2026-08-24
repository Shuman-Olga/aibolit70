import { Container } from "react-bootstrap";

import SeoPage from "../../components/Seo";
import DoctorPage from "../../components/doctors/DoctorItem";
import { dataSadovnikova } from "../../data/dataDoctor/dataSadovnikova";

export default function DoctorSadovnikova() {
  return (
    <Container fluid id="doctor">
      <SeoPage page="sadovnikova" />
      <DoctorPage {...dataSadovnikova} />
    </Container>
  );
}
