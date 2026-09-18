import React from "react";

const Blog = React.lazy(() => import("../pages/Blog"));

const posts = [
  {
    path: "detskij-nevrolog-na-dom",
    component: () => import("../pages/posts/Post1"),
    title: "Детский невролог",
    seo: {
      title: "Детский невролог на дом в Томске | Айболит",
      description:
        "Когда ребенку необходим детский невролог и в каких случаях можно вызвать специалиста на дом в Томске.",
      keywords: "детский невролог на дом Томск, невролог ребенку, детский врач",
      image: "/assets/img/aibolit.png",
    },
  },
  {
    path: "kalendar-vakcinacija",
    component: () => import("../pages/posts/Post2"),
    title: "Календарь вакцинаций",
    seo: {
      title: "Календарь вакцинации детей | Айболит, Томск",
      description:
        "Календарь вакцинации детей: основные прививки, сроки вакцинации и полезная информация для родителей.",
      keywords: "календарь вакцинации детей, прививки детям Томск, вакцинация",
      image: "/assets/img/aibolit.png",
    },
  },
  {
    path: "detskij-hirurg-na-dom",
    component: () => import("../pages/posts/Post3"),
    title: "Детский хирург",
    seo: {
      title: "Детский хирург на дом в Томске | Айболит",
      description:
        "Когда ребенку нужна консультация детского хирурга и когда специалист может приехать на дом.",
      keywords: "детский хирург на дом Томск, хирург ребенку",
      image: "/assets/img/aibolit.png",
    },
  },
  {
    path: "pentaksim",
    component: () => import("../pages/posts/Post9"),
    title: "Пентаксим",
    seo: {
      title: "Пентаксим — вакцинация детей | Айболит, Томск",
      description:
        "Информация о вакцинации детей вакциной Пентаксим: показания, схема вакцинации и вопросы родителей.",
      keywords: "Пентаксим Томск, вакцина Пентаксим, вакцинация детей",
      image: "/assets/img/aibolit.png",
    },
  },
  {
    path: "patronaj-novorojdennogo",
    component: () => import("../pages/posts/Post4"),
    title: "Патронаж новорожденного",
    seo: {
      title: "Патронаж новорожденного на дому в Томске | Айболит",
      description:
        "Патронаж новорожденного: наблюдение ребенка педиатром на дому и рекомендации родителям.",
      keywords: "патронаж новорожденного Томск, педиатр новорожденному на дом",
      image: "/assets/img/aibolit.png",
    },
  },
  {
    path: "adaptaciya-k-detskomu-sadu",
    component: () => import("../pages/posts/Post5"),
    title: "Адаптация в детском саду",
    seo: {
      title: "Адаптация ребенка к детскому саду | Айболит",
      description:
        "Полезные рекомендации родителям по адаптации ребенка к детскому саду.",
      keywords: "адаптация ребенка к детскому саду, ребенок детский сад",
      image: "/assets/img/aibolit.png",
    },
  },
  {
    path: "kak-pomoch-rebenku-perenesti-jaru",
    component: () => import("../pages/posts/Post6"),
    title: "Как помочь ребенку перенести жару",
    seo: {
      title: "Как помочь ребенку перенести жару | Айболит",
      description:
        "Рекомендации родителям о том, как помочь ребенку безопасно перенести жару.",
      keywords: "ребенок жара, как помочь ребенку в жару",
      image: "/assets/img/aibolit.png",
    },
  },
  {
    path: "detskii-lor-vrach-na-dom",
    component: () => import("../pages/posts/Post7"),
    title: "Детский ЛОР врач на дом",
    seo: {
      title: "Детский ЛОР на дом в Томске | Айболит",
      description:
        "Когда ребенку нужна консультация ЛОР-врача и когда можно вызвать детского ЛОРа на дом.",
      keywords: "детский ЛОР на дом Томск, ЛОР ребенку",
      image: "/assets/img/aibolit.png",
    },
  },
  {
    path: "vizov-pediatra-na-dom",
    component: () => import("../pages/posts/Post8"),
    title: "Вызов педиатра на дом",
    seo: {
      title: "Вызов педиатра на дом в Томске | Айболит",
      description:
        "В каких случаях ребенку необходим осмотр педиатра и как вызвать детского врача на дом в Томске.",
      keywords: "вызов педиатра на дом Томск, педиатр на дом",
      image: "/assets/img/aibolit.png",
    },
  },
  {
    path: "kompleksnyj-osmotr-rebenka-na-domu",
    component: () => import("../pages/posts/Post10"),
    title: "Чек-ап детский на дому",
    seo: {
      title: "Комплексный осмотр ребенка на дому в Томске | Айболит",
      description:
        "Комплексный осмотр и оценка состояния здоровья ребенка на дому.",
      keywords: "чек ап ребенка Томск, осмотр ребенка на дому",
      image: "/assets/img/aibolit.png",
    },
  },
  {
    path: "sovetov-vracha-allergologa",
    component: () => import("../pages/posts/Post11"),
    title: "Советы врача-аллерголога",
    seo: {
      title: "Советы детского аллерголога | Айболит, Томск",
      description: "Полезные рекомендации детского аллерголога для родителей.",
      keywords: "детский аллерголог Томск, аллергия у ребенка",
      image: "/assets/img/aibolit.png",
    },
  },
  {
    path: "vnimanie-pollinoz",
    component: () => import("../pages/posts/Post12"),
    title: "Внимание, поллиноз!",
    seo: {
      title: "Поллиноз у детей: симптомы и рекомендации | Айболит",
      description:
        "Поллиноз у детей: основные симптомы, сезонные проявления и рекомендации родителям.",
      keywords: "поллиноз у детей, аллергия, аллерголог Томск",
      image: "/assets/img/aibolit.png",
    },
  },
];

const blogRoutes = [
  {
    path: "blog",
    handle: {
      crumb: "Блог",
      nav: true,
      dropdown: false,
      seo: {
        title: "Блог о здоровье детей | Айболит, Томск",
        description:
          "Блог детской медицинской службы «Айболит»: здоровье детей, вакцинация, уход за ребенком, советы педиатров и полезная информация для родителей.",
        keywords:
          "здоровье детей, вакцинация, педиатр, детский врач, Айболит Томск",
        image: "/assets/img/aibolit.png",
      },
    },
    children: [
      { index: true, element: <Blog /> },
      ...posts.map((post) => {
        const Component = React.lazy(post.component);
        return {
          path: post.path,
          element: <Component />,
          handle: { crumb: post.title, seo: post.seo },
        };
      }),
    ],
  },
];

export default blogRoutes;
