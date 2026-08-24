import { Container } from "react-bootstrap";

import SeoPage from "../../components/Seo";
import DoctorPage from "../../components/doctors/DoctorItem";
import { dataPetuhova } from "../../data/dataDoctor/dataPetuhova";

export default function DoctorPetuhova() {
  return (
    <Container fluid id="doctor">
      <SeoPage page="petuhova" />
      <DoctorPage {...dataPetuhova} />
    </Container>
  );
}
