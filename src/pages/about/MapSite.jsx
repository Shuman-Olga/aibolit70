import { Container } from "react-bootstrap";

import MapMenuItem from "../../components/about/MapMenuItem";
import routeConfig from "../../routes/routeConfig";

export default function MapSite() {
  return (
    <Container fluid id="mapsite">
      <div className="page-h1">
        <Container>
          <h1>Карта сайта</h1>
        </Container>
      </div>

      <Container className="mt-4 position-block">
        <ul className="map">
          {routeConfig
            .filter((item) => {
              if (!item) return false;
              if (item.path === "/") return false;
              if (item.path === "search" || item.path === "/search/") {
                return false;
              }
              if (item.path === "*") return false;

              return item.handle?.sitemap !== false;
            })
            .map((item) => (
              <MapMenuItem items={item} key={item.path} />
            ))}
        </ul>
      </Container>
    </Container>
  );
}
