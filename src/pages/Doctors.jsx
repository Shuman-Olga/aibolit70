import { Container } from "react-bootstrap";

import DoctorItem from "../components/doctors/DoctorItemPageDoctors";
import BlockReklama3 from "../components/reklama/BlockReklama3";
import SeoPage from "../components/Seo";
import { dataSadovnikova } from "../data/dataDoctor/dataSadovnikova";
import { dataPetuhova } from "../data/dataDoctor/dataPetuhova";
import { dataShevchenko } from "../data/dataDoctor/dataShevchenko";
import { dataOstrouhova } from "../data/dataDoctor/dataOstrouhova";

export default function Doctors() {
  return (
    <Container fluid id="doctors">
      <SeoPage page="doctors" />
      <div className="page-h1">
        <Container>
          <h1>Наши педиатры</h1>
        </Container>
      </div>
      <div className="container text-start">
        <div className="row row-cols-1 row-cols-md-2 g-4 m-4">
          <DoctorItem {...dataSadovnikova} />
          <DoctorItem {...dataPetuhova} />
          <DoctorItem {...dataShevchenko} />
          <DoctorItem {...dataOstrouhova} />
        </div>
      </div>
      <BlockReklama3 />
    </Container>
  );
}
