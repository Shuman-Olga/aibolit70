import React from "react";

const Programs = React.lazy(() => import("../pages/Programs"));
const ProgramOne = React.lazy(() => import("../pages/programs/ProgramOne"));
const ProgramTwo = React.lazy(() => import("../pages/programs/ProgramTwo"));
const ProgramThree = React.lazy(() => import("../pages/programs/ProgramThree"));

const programsRoutes = [
  {
    path: "programmy-nablyudeniya-za-zdorovem",
    handle: { crumb: "Программы", nav: true },

    children: [
      {
        index: true,
        element: <Programs />,
      },
      {
        path: "malysh-houm-standart-ot-0-do-2-h-le",
        element: <ProgramOne />,
        handle: { crumb: "Малыш Хоум от 0 до 2 лет", nav: true },
      },
      {
        path: "zdorovyj-rebenok-houm-standart-ot-2",
        element: <ProgramTwo />,
        handle: { crumb: "Здоровый ребенок с 2 до 5 лет", nav: true },
      },
      {
        path: "zdorovyj-rebenok-houm-midi-ot-2-h-l",
        element: <ProgramThree />,
        handle: { crumb: "Педиатр рядом с 5 лет", nav: true },
      },
    ],
  },
];

export default programsRoutes;
