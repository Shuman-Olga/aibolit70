import React from "react";

const ForPatients = React.lazy(() => import("../pages/ForPatients"));
const Prices = React.lazy(() => import("../pages/forPatients/Prices"));
const SposobyOplaty = React.lazy(
  () => import("../pages/forPatients/SposobyOplaty"),
);
const LekarstvennoeObespechenie = React.lazy(
  () => import("../pages/forPatients/LekarstvennoeObespechenie"),
);
const PravilaPodgotovkiIssledovaniyam = React.lazy(
  () => import("../pages/forPatients/PravilaPodgotovki"),
);
const SvedeniyaSpecialistah = React.lazy(
  () => import("../pages/forPatients/SvedeniyaSpecialistah"),
);
const NalogovyjVychet = React.lazy(
  () => import("../pages/forPatients/NalogovyjVychet"),
);
const Otzyvy = React.lazy(() => import("../pages/forPatients/Otzyvy"));

const patientsRoutes = [
  {
    path: "pacientam",
    handle: { crumb: "Пациентам", nav: true },

    children: [
      { index: true, element: <ForPatients /> },
      {
        path: "prices",
        element: <Prices />,
        handle: { crumb: "Цены", nav: true },
      },
      {
        path: "sposoby-oplaty",
        element: <SposobyOplaty />,
        handle: { crumb: "Способы оплаты", nav: true },
      },
      {
        path: "lekarstvennoe-obespechenie",
        element: <LekarstvennoeObespechenie />,
        handle: { crumb: "Лекарственное обеспечение", nav: true },
      },
      {
        path: "pravila-podgotovki",
        element: <PravilaPodgotovkiIssledovaniyam />,
        handle: { crumb: "Правила подготовки к исследованиям", nav: true },
      },
      {
        path: "svedeniya-o-specialistah",
        element: <SvedeniyaSpecialistah />,
        handle: { crumb: "Сведения о специалистах", nav: true },
      },
      {
        path: "nalogovyj-vychet",
        element: <NalogovyjVychet />,
        handle: { crumb: "Налоговый вычет", nav: true },
      },
      {
        path: "otzyvy",
        element: <Otzyvy />,
        handle: { crumb: "Отзывы", nav: true },
      },
    ],
  },
];

export default patientsRoutes;
