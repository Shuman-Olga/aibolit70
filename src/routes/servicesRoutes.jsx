import React from "react";

const Uslugi = React.lazy(() => import("../pages/Uslugi"));
const DoctorNaDom = React.lazy(() => import("../pages/uslugi/DoctorNaDom"));
const Pediatr = React.lazy(() => import("../pages/uslugi/Pediatr"));
const MedicalCertificates = React.lazy(
  () => import("../pages/uslugi/MedicalCertificates"),
);
const SanatornoKurortnayaKarta = React.lazy(
  () => import("../pages/uslugi/medicalcertificates/SanatornoKurortnayaKarta"),
);
const SpravkavShkolu = React.lazy(
  () => import("../pages/uslugi/medicalcertificates/SpravkavShkolu"),
);
const SpravkavDetskiiSad = React.lazy(
  () => import("../pages/uslugi/medicalcertificates/SpravkavDetskiiSad"),
);
const SpravkavBassein = React.lazy(
  () => import("../pages/uslugi/medicalcertificates/SpravkavBassein"),
);
const SpravkavZdorove = React.lazy(
  () => import("../pages/uslugi/medicalcertificates/SpravkaZdorove"),
);
const SpravkaForma026u = React.lazy(
  () => import("../pages/uslugi/medicalcertificates/SpravkaForma026u"),
);
const MedicinskayaSpravka079u = React.lazy(
  () => import("../pages/uslugi/medicalcertificates/MedicinskayaSpravka079u"),
);

const servicesRoutes = [
  {
    path: "uslugi-i-ceny",
    handle: { crumb: "Услуги", nav: true, dropdown: false },
    children: [
      { index: true, element: <Uslugi /> },
      {
        path: "vyzov-pediatra-na-dom",
        element: <DoctorNaDom />,
        handle: { crumb: "Врач на дом" },
      },
      {
        path: "pediatr",
        element: <Pediatr />,
        handle: { crumb: "Педиатры" },
      },
      {
        path: "medicinskie-spravki-rebenku",
        handle: { crumb: "Справки" },

        children: [
          {
            index: true,
            element: <MedicalCertificates />,
          },
          {
            path: "sanatorno-kurortnaya-karta-dlya-det",
            element: <SanatornoKurortnayaKarta />,
            handle: { crumb: "Санаторно-курортная карта" },
          },
          {
            path: "spravka-v-shkolu",
            element: <SpravkavShkolu />,
            handle: { crumb: "Справка в школу" },
          },
          {
            path: "spravka-v-detskii-sad",
            element: <SpravkavDetskiiSad />,
            handle: { crumb: "Справка в сад" },
          },
          {
            path: "spravka-v-bassein",
            element: <SpravkavBassein />,
            handle: { crumb: "Справка в бассейн" },
          },
          {
            path: "spravka-o-sostoyanii-zdorovya-reben",
            element: <SpravkavZdorove />,
            handle: { crumb: "Справка о состоянии здоровья" },
          },
          {
            path: "spravka-poforme-026-u",
            element: <SpravkaForma026u />,
            handle: { crumb: "Справка - 026у" },
          },
          {
            path: "spravka-po-forme-079-u",
            element: <MedicinskayaSpravka079u />,
            handle: { crumb: "Справка в лагерь - 079у" },
          },
        ],
      },
    ],
  },
];

export default servicesRoutes;
