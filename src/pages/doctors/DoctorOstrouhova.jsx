import { Container } from "react-bootstrap";

import DoctorPage from "../../components/doctors/DoctorItem";
import { dataOstrouhova } from "../../data/dataDoctor/dataOstrouhova";

export default function DoctorOstrouhova() {
  return (
    <Container fluid id="doctor">
      <DoctorPage {...dataOstrouhova} />
    </Container>
  );
}
