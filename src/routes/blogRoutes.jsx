import React from "react";

const Blog = React.lazy(() => import("../pages/Blog"));

const posts = [
  {
    path: "detskij-nevrolog-na-dom",
    component: () => import("../pages/posts/Post1"),
    title: "Детский невролог",
  },
  {
    path: "kalendar-vakcinacija",
    component: () => import("../pages/posts/Post2"),
    title: "Календарь вакцинаций",
  },
  {
    path: "detskij-hirurg-na-dom",
    component: () => import("../pages/posts/Post3"),
    title: "Детский хирург",
  },
  {
    path: "pentaksim",
    component: () => import("../pages/posts/Post9"),
    title: "Пентаксим",
  },
  {
    path: "patronaj-novorojdennogo",
    component: () => import("../pages/posts/Post4"),
    title: "Патронаж новорожденного",
  },
  {
    path: "adaptaciya-k-detskomu-sadu",
    component: () => import("../pages/posts/Post5"),
    title: "Адаптация в детском саду",
  },
  {
    path: "kak-pomoch-rebenku-perenesti-jaru",
    component: () => import("../pages/posts/Post6"),
    title: "Как помочь ребенку перенести жару",
  },
  {
    path: "detskii-lor-vrach-na-dom",
    component: () => import("../pages/posts/Post7"),
    title: "Детский ЛОР врач на дом",
  },
  {
    path: "vizov-pediatra-na-dom",
    component: () => import("../pages/posts/Post8"),
    title: "Вызов педиатра на дом",
  },
  {
    path: "kompleksnyj-osmotr-rebenka-na-domu",
    component: () => import("../pages/posts/Post10"),
    title: "Чек-ап детский на дому",
  },
  {
    path: "sovetov-vracha-allergologa",
    component: () => import("../pages/posts/Post11"),
    title: "Советы врача-аллерголога",
  },
  {
    path: "vnimanie-pollinoz",
    component: () => import("../pages/posts/Post12"),
    title: "Внимание, поллиноз!",
  },
];

const blogRoutes = [
  {
    path: "blog",
    handle: { crumb: "Блог", nav: true, dropdown: false },

    children: [
      {
        index: true,
        element: <Blog />,
      },

      ...posts.map((post) => {
        const Component = React.lazy(post.component);

        return {
          path: post.path,
          element: <Component />,
          handle: { crumb: post.title },
        };
      }),
    ],
  },
];

export default blogRoutes;
