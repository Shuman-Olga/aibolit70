import { Container } from "react-bootstrap";

import SeoPage from "../../components/Seo";
import DoctorPage from "../../components/doctors/DoctorItem";
import { dataShevchenko } from "../../data/dataDoctor/dataShevchenko";

export default function DoctorShevchenko() {
  return (
    <Container fluid id="doctor">
      <SeoPage page="sevchenko" />
      <DoctorPage {...dataShevchenko} />
    </Container>
  );
}
