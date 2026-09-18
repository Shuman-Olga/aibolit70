import { Container } from "react-bootstrap";

import DoctorPage from "../../components/doctors/DoctorItem";
import { dataPetuhova } from "../../data/dataDoctor/dataPetuhova";

export default function DoctorPetuhova() {
  return (
    <Container fluid id="doctor">
      <DoctorPage {...dataPetuhova} />
    </Container>
  );
}
