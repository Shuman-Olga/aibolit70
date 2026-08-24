import React from "react";

const ChekUp = React.lazy(() => import("../pages/ChekUp"));

const chekupRoutes = [
  {
    path: "chek-ap",
    handle: { crumb: "Чек-апы", nav: true },

    children: [{ index: true, element: <ChekUp /> }],
  },
];

export default chekupRoutes;
