import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";

import { ModalState } from "../context/ModelContext";

import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import SpinnerLoad from "../components/Spinner";
import Seo from "../components/Seo";
import Analytics from "../components/Analytics";

const Footer = lazy(() => import("../components/Footer"));
const CookieNotice = lazy(() => import("../components/CookieNotice"));
const ModalCallback = lazy(() => import("../components/modal/ModalCallback"));
const BtnScrollTop = lazy(() => import("../components/button/BtnScrollTop"));

export default function Layout() {
  return (
    <ModalState>
      <Seo />
      <Analytics />
      <Container fluid>
        <Header />
        <Breadcrumbs />

        <Suspense fallback={<SpinnerLoad />}>
          <CookieNotice />

          <Outlet />

          <ModalCallback />
          <BtnScrollTop />
          <Footer />
        </Suspense>
      </Container>
    </ModalState>
  );
}
