import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";

import { ModalState } from "../context/ModelContext";
// import Footer from "../components/Footer";
import Header from "../components/Header";
// import CookieNotice from "../components/CookieNotice";
// import ModalCallback from "../components/modal/ModalCallback";
// import BtnScrollTop from "../components/button/BtnScrollTop";
import Breadcrumbs from "../components/Breadcrumbs";
import SpinnerLoad from "../components/Spinner";

const Footer = lazy(() => import("../components/Footer"));
const CookieNotice = lazy(() => import("../components/CookieNotice"));
const ModalCallback = lazy(() => import("../components/modal/ModalCallback"));
const BtnScrollTop = lazy(() => import("../components/button/BtnScrollTop"));

export default function Layout() {
  return (
    <ModalState>
      <Container fluid>
        <CookieNotice />
        <Header />
        <Breadcrumbs />
        <Suspense fallback={<SpinnerLoad />}>
          <Outlet />
        </Suspense>
        <ModalCallback />
        <BtnScrollTop />
        <Footer />
      </Container>
    </ModalState>
  );
}
