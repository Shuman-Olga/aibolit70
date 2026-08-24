import { Container } from "react-bootstrap";

import DoctorItem from "./doctorItems";
import { dataSadovnikova } from "../../data/dataDoctor/dataSadovnikova";
import { dataPetuhova } from "../../data/dataDoctor/dataPetuhova";
import { dataShevchenko } from "../../data/dataDoctor/dataShevchenko";
import { dataOstrouhova } from "../../data/dataDoctor/dataOstrouhova";

export default function BlockDoctors() {
  return (
    <Container fluid id="blockdoctors" className="py-5 ">
      <Container>
        <h2 className="h2-blockdoctors">Наши педиатры</h2>
        <hr className="w-25 "></hr>
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 mb-5 container">
          <DoctorItem data={dataSadovnikova} />
          <DoctorItem data={dataPetuhova} />
          <DoctorItem data={dataShevchenko} />
          <DoctorItem data={dataOstrouhova} />
        </div>
      </Container>
    </Container>
  );
}
