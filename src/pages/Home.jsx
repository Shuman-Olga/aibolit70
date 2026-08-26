import { Container } from "react-bootstrap";
import React from "react";

import SeoPage from "../components/Seo";

const BlockImg = React.lazy(() => import("../components/home/BlockImg"));
const BlockInfo = React.lazy(() => import("../components/home/BlockInfo"));
const BlockAdvantages = React.lazy(
  () => import("../components/home/BlockAdvantages"),
);
const BlockDoctors = React.lazy(
  () => import("../components/home/BlockDoctors"),
);
const BlockContacts = React.lazy(
  () => import("../components/home/BlockContacts"),
);

// import Banner from "../components/home/Banner";
// import WorkOnHolidays from "../components/home/WorkOnHolidays";

export default function Home() {
  return (
    <Container fluid id="home">
      <SeoPage page="home" />
      {/* <WorkOnHolidays /> */}
      <BlockImg />
      {/* <Banner /> */}
      <BlockInfo />
      <BlockAdvantages />
      <BlockDoctors />
      <BlockContacts />
    </Container>
  );
}
