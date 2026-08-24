import { Container } from "react-bootstrap";

import SeoPage from "../../components/Seo";
import MapMenuItem from "../../components/about/MapMenuItem";
import { routesMain } from "../../routes";

export default function MapSite() {
  return (
    <Container fluid id="mapsite">
      <SeoPage page="mapsite" />
      <div className="page-h1">
        <Container>
          <h1>Карта Сайта</h1>
        </Container>
      </div>
      <Container className="mt-4 position-block">
        <ul className="map">
          {routesMain.map((item, i) => {
            return <MapMenuItem items={item} key={i} />;
          })}
        </ul>
      </Container>
    </Container>
  );
}
