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
        handle: { crumb: "Контакты", nav: true },
      },
      {
        path: "search",
        element: <SearchPage />,
        handle: { crumb: "Поиск" },
      },
      {
        path: "*",
        element: <ErrorPage />, // fallback
      },
    ],
  },
];

const router = createBrowserRouter(routesMain);
export default router;
