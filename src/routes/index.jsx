import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";
import routeConfig from "./routeConfig";

const ErrorPage = React.lazy(() => import("../pages/ErrorPage"));

// =========================================================
// COMPONENT LOADERS
// =========================================================

const componentLoaders = {
  Home: () => import("../pages/Home"),

  About: () => import("../pages/About"),
  ControllingOrgan: () => import("../pages/about/ControllingOrgan"),
  Licenses: () => import("../pages/about/Licenses"),
  Documents: () => import("../pages/about/Documents"),
  OurPartners: () => import("../pages/about/OurPartners"),
  PravovyInformation: () => import("../pages/about/PravovyInformation"),
  Vacancies: () => import("../pages/about/Vacancies"),
  MapSite: () => import("../pages/about/MapSite"),

  Doctors: () => import("../pages/Doctors"),
  DoctorSadovnikova: () => import("../pages/doctors/DoctorSadovnikova"),
  DoctorPetuhova: () => import("../pages/doctors/DoctorPetuhova"),
  DoctorShevchenko: () => import("../pages/doctors/DoctorShevchenko"),
  DoctorOstrouhova: () => import("../pages/doctors/DoctorOstrouhova"),

  Programs: () => import("../pages/Programs"),
  ProgramOne: () => import("../pages/programs/ProgramOne"),
  ProgramTwo: () => import("../pages/programs/ProgramTwo"),
  ProgramThree: () => import("../pages/programs/ProgramThree"),

  ChekUp: () => import("../pages/ChekUp"),

  Uslugi: () => import("../pages/Uslugi"),
  DoctorNaDom: () => import("../pages/uslugi/DoctorNaDom"),
  Pediatr: () => import("../pages/uslugi/Pediatr"),
  MedicalCertificates: () => import("../pages/uslugi/MedicalCertificates"),

  SanatornoKurortnayaKarta: () =>
    import("../pages/uslugi/medicalcertificates/SanatornoKurortnayaKarta"),

  SpravkavShkolu: () =>
    import("../pages/uslugi/medicalcertificates/SpravkavShkolu"),

  SpravkavDetskiiSad: () =>
    import("../pages/uslugi/medicalcertificates/SpravkavDetskiiSad"),

  SpravkavBassein: () =>
    import("../pages/uslugi/medicalcertificates/SpravkavBassein"),

  SpravkavZdorove: () =>
    import("../pages/uslugi/medicalcertificates/SpravkaZdorove"),

  SpravkaForma026u: () =>
    import("../pages/uslugi/medicalcertificates/SpravkaForma026u"),

  MedicinskayaSpravka079u: () =>
    import("../pages/uslugi/medicalcertificates/MedicinskayaSpravka079u"),

  ForPatients: () => import("../pages/ForPatients"),

  Prices: () => import("../pages/forPatients/Prices"),

  SposobyOplaty: () => import("../pages/forPatients/SposobyOplaty"),

  LekarstvennoeObespechenie: () =>
    import("../pages/forPatients/LekarstvennoeObespechenie"),

  PravilaPodgotovki: () => import("../pages/forPatients/PravilaPodgotovki"),

  SvedeniyaSpecialistah: () =>
    import("../pages/forPatients/SvedeniyaSpecialistah"),

  NalogovyjVychet: () => import("../pages/forPatients/NalogovyjVychet"),

  Otzyvy: () => import("../pages/forPatients/Otzyvy"),

  Blog: () => import("../pages/Blog"),

  Post1: () => import("../pages/posts/Post1"),
  Post2: () => import("../pages/posts/Post2"),
  Post3: () => import("../pages/posts/Post3"),
  Post4: () => import("../pages/posts/Post4"),
  Post5: () => import("../pages/posts/Post5"),
  Post6: () => import("../pages/posts/Post6"),
  Post7: () => import("../pages/posts/Post7"),
  Post8: () => import("../pages/posts/Post8"),
  Post9: () => import("../pages/posts/Post9"),
  Post10: () => import("../pages/posts/Post10"),
  Post11: () => import("../pages/posts/Post11"),
  Post12: () => import("../pages/posts/Post12"),

  Contacts: () => import("../pages/Сontacts"),

  SearchPage: () => import("../pages/SearchPage"),
};

// =========================================================
// LAZY COMPONENT
// =========================================================

function getComponent(componentName) {
  if (!componentName) {
    return null;
  }

  const loader = componentLoaders[componentName];

  if (!loader) {
    throw new Error(
      `Route component "${componentName}" is not registered in componentLoaders.`,
    );
  }

  return React.lazy(loader);
}

// =========================================================
// PATH
// =========================================================

function normalizePath(path = "") {
  if (!path || path === "/") {
    return "/";
  }

  return String(path).replace(/^\/+/, "").replace(/\/+$/, "");
}

function joinPaths(parentPath = "", currentPath = "") {
  const current = String(currentPath || "").trim();

  if (!current || current === "/") {
    return parentPath || "/";
  }

  const parent = normalizePath(parentPath);
  const child = normalizePath(current);

  if (!parent || parent === "/") {
    return `/${child}/`;
  }

  return `/${parent}/${child}/`;
}

// =========================================================
// FLATTEN ROUTES
// =========================================================
//
// ВАЖНО:
//
// routeConfig хранит иерархию для:
// - sitemap
// - navigation
// - SEO
//
// Но React Router здесь получает ПЛОСКИЕ маршруты.
//
// Поэтому:
//
// /o-nas/
// /o-nas/licenzii/
// /o-nas/documents/
//
// являются самостоятельными React Router routes.
//

function flattenRoutes(routes = [], parentPath = "") {
  const result = [];

  for (const route of routes) {
    if (!route) {
      continue;
    }

    const fullPath = joinPaths(parentPath, route.path);

    const routerRoute = {
      path: fullPath,
      handle: route.handle,
    };

    if (route.component) {
      const Component = getComponent(route.component);

      routerRoute.element = <Component />;
    }

    if (route.errorElement) {
      const ErrorComponent = getComponent(route.errorElement);

      routerRoute.errorElement = <ErrorComponent />;
    }

    result.push(routerRoute);

    if (Array.isArray(route.children) && route.children.length > 0) {
      result.push(...flattenRoutes(route.children, fullPath));
    }
  }

  return result;
}

// =========================================================
// ROOT ROUTE
// =========================================================

const rootRoute = {
  element: <Layout />,
  errorElement: <ErrorPage />,
  handle: {
    crumb: "Главная",
  },

  children: flattenRoutes(routeConfig),
};

// =========================================================
// REACT ROUTER
// =========================================================

export const routesMain = [rootRoute];

const router = createBrowserRouter(routesMain);

export default router;
