import React from "react";

const Doctors = React.lazy(() => import("../pages/Doctors"));
const DoctorSadovnikova = React.lazy(
  () => import("../pages/doctors/DoctorSadovnikova"),
);
const DoctorPetuhova = React.lazy(
  () => import("../pages/doctors/DoctorPetuhova"),
);
const DoctorShevchenko = React.lazy(
  () => import("../pages/doctors/DoctorShevchenko"),
);
const DoctorOstrouhova = React.lazy(
  () => import("../pages/doctors/DoctorOstrouhova"),
);

const doctorsRoutes = [
  {
    path: "doctors",
    handle: {
      crumb: "Педиатры",
      nav: true,
      seo: {
        title: "Педиатры и детские врачи на дом в Томске | Айболит",
        description:
          "Педиатры и детские специалисты «Айболит» в Томске. Консультации, выезд врача на дом, патронаж новорожденных и программы наблюдения детей.",
        keywords:
          "педиатр Томск, педиатр на дом Томск, детский врач на дом, вызвать педиатра",
        image: "/assets/img/massage.jpg",
      },
    },

    children: [
      { index: true, element: <Doctors /> },
      {
        path: "sadovnikova-elena-gennadevna",
        element: <DoctorSadovnikova />,
        handle: {
          crumb: "Садовникова Елена Геннадьевна",
          seo: {
            title:
              "Садовникова Елена Геннадьевна — педиатр, аллерголог | Айболит",
            description:
              "Садовникова Елена Геннадьевна — педиатр и аллерголог. Консультации и наблюдение детей, включая выезд врача на дом в Томске.",
            keywords:
              "Садовникова Елена Геннадьевна, педиатр, аллерголог, педиатр на дом Томск",
            image: "/assets/img/Sadovnikova_Elena_Gennadevna.jpg",
          },
        },
      },
      {
        path: "petuhova-olga-viktorovna",
        element: <DoctorPetuhova />,
        handle: {
          crumb: "Петухова Ольга Викторовна",
          seo: {
            title:
              "Петухова Ольга Викторовна — педиатр, гастроэнтеролог | Айболит",
            description:
              "Петухова Ольга Викторовна — педиатр и гастроэнтеролог. Консультации, наблюдение ребенка и выезд врача на дом в Томске.",
            keywords:
              "Петухова Ольга Викторовна, педиатр, гастроэнтеролог, Томск",
            image: "/assets/img/Petuhova_Olga_Viktorovna.jpg",
          },
        },
      },
      {
        path: "shevchenko-anastasiya-nikolaevna",
        element: <DoctorShevchenko />,
        handle: {
          crumb: "Шевченко Анастасия Николаевна",
          seo: {
            title: "Шевченко Анастасия Николаевна — педиатр | Айболит",
            description:
              "Шевченко Анастасия Николаевна — врач-педиатр детской медицинской службы «Айболит» в Томске.",
            keywords: "Шевченко Анастасия Николаевна, педиатр Томск",
            image: "/assets/img/Shevchenko_Anastasiya_Nikolaevna.jpg",
          },
        },
      },
      {
        path: "ostrouhova-natalya-petrovna",
        element: <DoctorOstrouhova />,
        handle: {
          crumb: "Остроухова Наталья Петровна",
          seo: {
            title: "Остроухова Наталья Петровна — педиатр | Айболит",
            description:
              "Остроухова Наталья Петровна — врач-педиатр детской медицинской службы «Айболит» в Томске.",
            keywords: "Остроухова Наталья Петровна, педиатр Томск",
            image: "/assets/img/Ostrouhova_Natalya_Petrovna.jpg",
          },
        },
      },
    ],
  },
];

export default doctorsRoutes;
