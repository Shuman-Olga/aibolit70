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
    handle: {
      crumb: "Услуги",
      nav: true,
      dropdown: false,
      seo: {
        title: "Вызов педиатра и врача на дом в Томске | Айболит",
        description:
          "Вызов педиатра и детского врача на дом в Томске. Анализы на дому, узкие специалисты, программы наблюдения и консультации для детей.",
        keywords:
          "вызов педиатра на дом Томск, педиатр на дом, детский врач на дом Томск, анализы на дому",
        image: "/assets/img/uslugi1.jpg",
      },
    },
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
          { index: true, element: <Uslugi /> },
          {
            path: "vyzov-pediatra-na-dom",
            element: <DoctorNaDom />,
            handle: {
              crumb: "Врач на дом",
              seo: {
                title: "Вызов педиатра на дом в Томске | Айболит",
                description:
                  "Вызов педиатра на дом в Томске. Детский врач проведет консультацию ребенка на дому в удобное для вас время.",
                keywords:
                  "вызов педиатра на дом Томск, педиатр на дом, детский врач на дом",
                image: "/assets/img/uslugi1.jpg",
              },
            },
          },
          {
            path: "pediatr",
            element: <Pediatr />,
            handle: {
              crumb: "Педиатры",
              seo: {
                title: "Педиатр на дом в Томске | Айболит",
                description:
                  "Консультация педиатра для ребенка в Томске. Вызов детского врача на дом в медицинской службе «Айболит».",
                keywords:
                  "педиатр на дом Томск, детский педиатр Томск, вызвать педиатра",
                image: "/assets/img/uslugi1.jpg",
              },
            },
          },
          {
            path: "medicinskie-spravki-rebenku",
            handle: {
              crumb: "Справки",
              seo: {
                title: "Медицинские справки для ребенка в Томске | Айболит",
                description:
                  "Оформление медицинских справок для детей в Томске: справка в школу, детский сад, бассейн, лагерь и другие медицинские документы.",
                keywords:
                  "медицинские справки ребенку Томск, справка в школу, справка в детский сад",
                image: "/assets/img/uslugi1.jpg",
              },
            },
            children: [
              { index: true, element: <MedicalCertificates /> },
              {
                path: "sanatorno-kurortnaya-karta-dlya-det",
                element: <SanatornoKurortnayaKarta />,
                handle: {
                  crumb: "Санаторно-курортная карта",
                  seo: {
                    title: "Санаторно-курортная карта для ребенка | Айболит",
                    description:
                      "Оформление санаторно-курортной карты для ребенка в Томске.",
                    image: "/assets/img/uslugi1.jpg",
                  },
                },
              },
              {
                path: "spravka-v-shkolu",
                element: <SpravkavShkolu />,
                handle: {
                  crumb: "Справка в школу",
                  seo: {
                    title: "Справка в школу для ребенка в Томске | Айболит",
                    description:
                      "Оформление медицинской справки в школу для ребенка в Томске.",
                    image: "/assets/img/uslugi1.jpg",
                  },
                },
              },
              {
                path: "spravka-v-detskii-sad",
                element: <SpravkavDetskiiSad />,
                handle: {
                  crumb: "Справка в детский сад",
                  seo: {
                    title: "Справка в детский сад в Томске | Айболит",
                    description:
                      "Оформление медицинской справки для ребенка в детский сад в Томске.",
                    image: "/assets/img/uslugi1.jpg",
                  },
                },
              },
              {
                path: "spravka-v-bassein",
                element: <SpravkavBassein />,
                handle: {
                  crumb: "Справка в бассейн",
                  seo: {
                    title: "Справка в бассейн для ребенка в Томске | Айболит",
                    description:
                      "Оформление медицинской справки для посещения бассейна ребенком в Томске.",
                    image: "/assets/img/uslugi1.jpg",
                  },
                },
              },
              {
                path: "spravka-o-sostoyanii-zdorovya-reben",
                element: <SpravkavZdorove />,
                handle: {
                  crumb: "Справка о состоянии здоровья",
                  seo: {
                    title: "Справка о состоянии здоровья ребенка | Айболит",
                    description:
                      "Оформление справки о состоянии здоровья ребенка в Томске.",
                    image: "/assets/img/uslugi1.jpg",
                  },
                },
              },
              {
                path: "spravka-poforme-026-u",
                element: <SpravkaForma026u />,
                handle: {
                  crumb: "Справка — 026у",
                  seo: {
                    title: "Медицинская карта 026у для ребенка | Айболит",
                    description:
                      "Оформление медицинской карты 026у для ребенка в Томске.",
                    image: "/assets/img/uslugi1.jpg",
                  },
                },
              },
              {
                path: "spravka-po-forme-079-u",
                element: <MedicinskayaSpravka079u />,
                handle: {
                  crumb: "Справка в лагерь — 079у",
                  seo: {
                    title: "Справка 079у для ребенка в Томске | Айболит",
                    description:
                      "Оформление медицинской справки 079у для ребенка перед поездкой в детский лагерь.",
                    image: "/assets/img/uslugi1.jpg",
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

export default servicesRoutes;
