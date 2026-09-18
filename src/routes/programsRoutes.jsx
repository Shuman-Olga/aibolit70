import React from "react";

const Programs = React.lazy(() => import("../pages/Programs"));
const ProgramOne = React.lazy(() => import("../pages/programs/ProgramOne"));
const ProgramTwo = React.lazy(() => import("../pages/programs/ProgramTwo"));
const ProgramThree = React.lazy(() => import("../pages/programs/ProgramThree"));

const programsRoutes = [
  {
    path: "programmy-nablyudeniya-za-zdorovem",
    handle: {
      crumb: "Программы",
      nav: true,
      seo: {
        title: "Программы наблюдения за детьми | Айболит, Томск",
        description:
          "Программы наблюдения за здоровьем детей в Томске: регулярное наблюдение педиатра, профилактика, консультации и патронаж новорожденных на дому.",
        keywords:
          "программы наблюдения за здоровьем детей, патронаж новорожденного, программы наблюдения Томск",
        image: "/assets/img/fibroma-u-rebenka.jpg",
      },
    },

    children: [
      { index: true, element: <Programs /> },
      {
        path: "malysh-houm-standart-ot-0-do-2-h-le",
        element: <ProgramOne />,
        handle: {
          crumb: "Малыш Хоум от 0 до 2 лет",
          seo: {
            title: "Программа «Малыш Хоум» от 0 до 2 лет | Айболит",
            description:
              "Программа наблюдения за здоровьем ребенка от рождения до 2 лет с педиатром детской медицинской службы «Айболит» в Томске.",
            image: "/assets/img/fibroma-u-rebenka.jpg",
          },
        },
      },
      {
        path: "zdorovyj-rebenok-houm-standart-ot-2",
        element: <ProgramTwo />,
        handle: {
          crumb: "Здоровый ребенок с 2 до 5 лет",
          seo: {
            title: "Программа «Здоровый ребенок» от 2 до 5 лет | Айболит",
            description:
              "Программа наблюдения за здоровьем ребенка от 2 до 5 лет в детской медицинской службе «Айболит» в Томске.",
            image: "/assets/img/fibroma-u-rebenka.jpg",
          },
        },
      },
      {
        path: "zdorovyj-rebenok-houm-midi-ot-2-h-l",
        element: <ProgramThree />,
        handle: {
          crumb: "Педиатр рядом с 5 лет",
          seo: {
            title: "Программа наблюдения за ребенком | Айболит, Томск",
            description:
              "Программа наблюдения за здоровьем ребенка с педиатром детской медицинской службы «Айболит» в Томске.",
            image: "/assets/img/fibroma-u-rebenka.jpg",
          },
        },
      },
    ],
  },
];

export default programsRoutes;
