import { Container } from "react-bootstrap";

import SeoPage from "../../components/Seo";
import DoctorPage from "../../components/doctors/DoctorItem";
import { dataOstrouhova } from "../../data/dataDoctor/dataOstrouhova";

export default function DoctorOstrouhova() {
  return (
    <Container fluid id="doctor">
      <SeoPage page="ostrouhova" />
      <DoctorPage {...dataOstrouhova} />
    </Container>
  );
}
