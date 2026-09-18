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
    handle: {
      crumb: "Пациентам",
      nav: true,
      seo: {
        title: "Информация для пациентов | Айболит в Томске",
        description:
          "Информация для пациентов «Айболит»: специалисты, подготовка к исследованиям, способы оплаты, документы и полезные сведения.",
        keywords: "Айболит Томск, информация для пациентов, педиатр на дом",
        image: "/assets/img/uslugi1.jpg",
      },
    },

    children: [
      { index: true, element: <ForPatients /> },
      {
        path: "prices",
        element: <Prices />,
        handle: {
          crumb: "Цены",
          seo: {
            title:
              "Цены на услуги детской медицинской службы «Айболит» | Томск",
            description:
              "Цены на услуги педиатров и детских специалистов медицинской службы «Айболит» в Томске.",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "sposoby-oplaty",
        element: <SposobyOplaty />,
        handle: {
          crumb: "Способы оплаты",
          seo: {
            title: "Способы оплаты | Айболит Томск",
            description:
              "Информация о способах оплаты медицинских услуг детской медицинской службы «Айболит».",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "lekarstvennoe-obespechenie",
        element: <LekarstvennoeObespechenie />,
        handle: {
          crumb: "Лекарственное обеспечение",
          seo: {
            title: "Лекарственное обеспечение | Айболит Томск",
            description:
              "Информация о лекарственном обеспечении пациентов детской медицинской службы «Айболит».",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "pravila-podgotovki",
        element: <PravilaPodgotovkiIssledovaniyam />,
        handle: {
          crumb: "Правила подготовки к исследованиям",
          seo: {
            title: "Правила подготовки к исследованиям | Айболит",
            description:
              "Правила подготовки детей к медицинским исследованиям и анализам в детской медицинской службе «Айболит».",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "svedeniya-o-specialistah",
        element: <SvedeniyaSpecialistah />,
        handle: {
          crumb: "Сведения о специалистах",
          seo: {
            title: "Сведения о специалистах | Айболит Томск",
            description:
              "Сведения о врачах и медицинских специалистах детской медицинской службы «Айболит» в Томске.",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "nalogovyj-vychet",
        element: <NalogovyjVychet />,
        handle: {
          crumb: "Налоговый вычет",
          seo: {
            title: "Налоговый вычет за медицинские услуги | Айболит",
            description:
              "Информация о получении налогового вычета за медицинские услуги в детской медицинской службе «Айболит».",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "otzyvy",
        element: <Otzyvy />,
        handle: {
          crumb: "Отзывы",
          seo: {
            title: "Отзывы о детской медицинской службе «Айболит» | Томск",
            description:
              "Отзывы пациентов о детской медицинской службе «Айболит» в Томске.",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
    ],
  },
];

export default patientsRoutes;
