import { Container } from "react-bootstrap";

import DoctorPage from "../../components/doctors/DoctorItem";
import { dataShevchenko } from "../../data/dataDoctor/dataShevchenko";

export default function DoctorShevchenko() {
  return (
    <Container fluid id="doctor">
      <DoctorPage {...dataShevchenko} />
    </Container>
  );
}
