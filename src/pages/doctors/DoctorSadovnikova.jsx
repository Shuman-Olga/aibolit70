import { Container } from "react-bootstrap";

import DoctorPage from "../../components/doctors/DoctorItem";
import { dataSadovnikova } from "../../data/dataDoctor/dataSadovnikova";

export default function DoctorSadovnikova() {
  return (
    <Container fluid id="doctor">
      <DoctorPage {...dataSadovnikova} />
    </Container>
  );
}
