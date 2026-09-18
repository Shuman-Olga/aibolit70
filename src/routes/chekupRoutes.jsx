import React from "react";

const ChekUp = React.lazy(() => import("../pages/ChekUp"));

const chekupRoutes = [
  {
    path: "chek-up",
    handle: {
      crumb: "Чек-апы",
      nav: true,
      seo: {
        title: "Чек-ап ребенка на дому в Томске | Айболит",
        description:
          "Комплексный чек-ап здоровья ребенка в Томске. Обследование и консультации детских специалистов на дому в медицинской службе «Айболит».",
        keywords:
          "чек ап ребенка Томск, комплексный осмотр ребенка, обследование ребенка на дому",
        image: "/assets/img/aibolit.png",
      },
    },

    children: [{ index: true, element: <ChekUp /> }],
  },
];

export default chekupRoutes;
