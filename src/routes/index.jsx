import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";

import blogRoutes from "./blogRoutes";
import doctorsRoutes from "./doctorsRoutes";
import patientsRoutes from "./patientsRoutes";
import programsRoutes from "./programsRoutes";
import chekupRoutes from "./chekupRoutes";
import servicesRoutes from "./servicesRoutes";
import aboutRoutes from "./aboutRoutes";

const Home = React.lazy(() => import("../pages/Home"));
const SearchPage = React.lazy(() => import("../pages/SearchPage"));
const Contacts = React.lazy(() => import("../pages/Сontacts"));
const ErrorPage = React.lazy(() => import("../pages/ErrorPage"));

export const routesMain = [
  {
    path: "/",
    element: <Layout />,
    handle: { crumb: "Главная", nav: true },
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: {
          seo: {
            title: "Вызов педиатра на дом в Томске | Айболит",
            description:
              "Вызов педиатра и детских специалистов на дом в Томске. Анализы на дому, вакцинация, программы наблюдения и патронаж новорожденных.",
            keywords:
              "Айболит, детская медицинская служба, клиника, вызвать детский врач, вызов, педиатр, программы наблюдения, анализы, ребенок, новорожденного, на дом, цена, Томск, пригород",
            image: "/assets/img/aibolit.png",
          },
        },
      },
      ...aboutRoutes,
      ...doctorsRoutes,
      ...programsRoutes,
      ...chekupRoutes,
      ...servicesRoutes,
      ...patientsRoutes,
      ...blogRoutes,
      {
        path: "kontakty",
        element: <Contacts />,
        handle: {
          crumb: "Контакты",
          nav: true,
          seo: {
            title: "Контакты детской медицинской службы «Айболит» | Томск",
            description:
              "Контакты «Айболит» в Томске: адрес, телефон и информация для записи на вызов педиатра и детских специалистов на дом.",
            keywords:
              "Айболит Томск контакты, детская медицинская служба Томск, педиатр на дом Томск",
            image: "/assets/img/phone-tel.png",
          },
        },
      },
      {
        path: "search",
        element: <SearchPage />,
        handle: {
          crumb: "Поиск",
          seo: {
            title: "Поиск по сайту | Айболит",
            description:
              "Поиск информации на сайте детской медицинской службы «Айболит».",
            robots: "noindex, follow",
          },
        },
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
];

const router = createBrowserRouter(routesMain);
export default router;
