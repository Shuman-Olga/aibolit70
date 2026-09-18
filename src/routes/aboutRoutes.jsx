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
    handle: {
      crumb: "О нас",
      nav: true,
      seo: {
        title: "О нас — детская медицинская служба «Айболит» в Томске",
        description:
          "Детская медицинская служба «Айболит» в Томске: педиатр на дом, детские специалисты, вакцинация, анализы на дому и патронаж новорожденных.",
        keywords:
          "узкие специалисты на дом, педиатр на дом Томск, детский врач на дом",
        image: "/assets/img/massage.jpg",
      },
    },
    children: [
      { index: true, element: <About /> },
      {
        path: "kontroliruyushie-organizacii",
        element: <ControllingOrgan />,
        handle: {
          crumb: "Контролирующие организации",
          seo: {
            title: "Контролирующие организации | Айболит, Томск",
            description:
              "Контролирующие организации детской медицинской службы «Айболит» в Томске: сведения, контакты и информация для пациентов.",
            keywords:
              "Айболит в Томске, Герцена 68, детские врачи на дом Томск",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "licenzii",
        element: <Licenses />,
        handle: {
          crumb: "Лицензии",
          seo: {
            title: "Лицензия на медицинскую деятельность | Айболит, Томск",
            description:
              "Информация о лицензии на медицинскую деятельность детской медицинской службы «Айболит» в Томске. Документы и сведения для пациентов.",
            keywords:
              "лицензия Айболит, медицинская лицензия Томск, врачи на дом",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "documents",
        element: <Documents />,
        handle: {
          crumb: "Документы",
          seo: {
            title: "Документы детской медицинской службы «Айболит» | Томск",
            description:
              "Документы детской медицинской службы «Айболит» в Томске: лицензии, правила оказания медицинских услуг и информация для пациентов.",
            keywords:
              "Айболит детская медицинская служба, документы, информация для пациентов",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "nashi-partnery",
        element: <OurPartners />,
        handle: {
          crumb: "Наши партнеры",
          seo: {
            title: "Наши партнеры | Айболит в Томске",
            description:
              "Партнеры детской медицинской службы «Айболит» в Томске: страховые компании, программы ДМС и организации, с которыми мы сотрудничаем.",
            keywords: "партнеры Айболит Томск, детская медицинская служба",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "pravovaya-informaciya",
        element: <PravovyInformations />,
        handle: {
          crumb: "Правовая информация",
          seo: {
            title: "Правовая информация | Айболит в Томске",
            description:
              "Правовая информация детской медицинской службы «Айболит» в Томске: сведения об организации, медицинских услугах и правах пациентов.",
            keywords: "Айболит Томск, правовая информация, медицинские услуги",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "vacancies",
        element: <Vacancies />,
        handle: {
          crumb: "Вакансии",
          seo: {
            title: "Вакансии в детской медицинской службе «Айболит» | Томск",
            description:
              "Вакансии детской медицинской службы «Айболит» в Томске. Актуальные предложения для врачей и медицинских специалистов.",
            keywords: "вакансии педиатр Томск, вакансии врач Томск",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "map-site",
        element: <MapSite />,
        handle: {
          crumb: "Карта сайта",
          seo: {
            title: "Карта сайта детской медицинской службы «Айболит»",
            description:
              "Карта сайта «Айболит»: услуги, врачи, программы наблюдения, информация для пациентов и полезные материалы о здоровье детей.",
            keywords: "карта сайта",
            robots: "noindex, follow",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
    ],
  },
];

export default aboutRoutes;
