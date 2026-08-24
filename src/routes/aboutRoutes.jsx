import React from "react";

const About = React.lazy(() => import("../pages/About"));
const ControllingOrgan = React.lazy(
  () => import("../pages/about/ControllingOrgan"),
);
const Licenses = React.lazy(() => import("../pages/about/Licenses"));
const Documents = React.lazy(() => import("../pages/about/Documents"));
const OurPartners = React.lazy(() => import("../pages/about/OurPartners"));
const PravovyInformations = React.lazy(
  () => import("../pages/about/PravovyInformation"),
);
const Vacancies = React.lazy(() => import("../pages/about/Vacancies"));
const MapSite = React.lazy(() => import("../pages/about/MapSite"));

const aboutRoutes = [
  {
    path: "o-nas",
    handle: { crumb: "О нас", nav: true },
    children: [
      {
        index: true,
        element: <About />,
      },
      {
        path: "kontroliruyushie-organizacii",
        element: <ControllingOrgan />,
        handle: { crumb: "Контролирующие организации", nav: true },
      },
      {
        path: "licenzii",
        element: <Licenses />,
        handle: { crumb: "Лицензии", nav: true },
      },
      {
        path: "documents",
        element: <Documents />,
        handle: { crumb: "Документы", nav: true },
      },
      {
        path: "nashi-partnery",
        element: <OurPartners />,
        handle: { crumb: "Наши партнеры", nav: true },
      },
      {
        path: "pravovaya-informaciya",
        element: <PravovyInformations />,
        handle: { crumb: "Правовая информация", nav: true },
      },
      {
        path: "vacancies",
        element: <Vacancies />,
        handle: { crumb: "Вакансии", nav: true },
      },
      {
        path: "map-site",
        element: <MapSite />,
        handle: { crumb: "Карта сайта", nav: true },
      },
    ],
  },
];

export default aboutRoutes;
