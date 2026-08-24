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
    handle: { crumb: "Педиатры", nav: true },

    children: [
      {
        index: true,
        element: <Doctors />,
      },

      {
        path: "sadovnikova-elena-gennadevna",
        element: <DoctorSadovnikova />,
        handle: { crumb: "Садовникова Елена Геннадьевна", nav: true },
      },
      {
        path: "petuhova-olga-viktorovna",
        element: <DoctorPetuhova />,
        handle: { crumb: "Петухова Ольга Викторовна", nav: true },
      },
      {
        path: "shevchenko-anastasiya-nikolaevna",
        element: <DoctorShevchenko />,
        handle: { crumb: "Шевченко Анастасия Николаевна", nav: true },
      },
      {
        path: "ostrouhova-natalya-petrovna",
        element: <DoctorOstrouhova />,
        handle: { crumb: "Остроухова Наталья Петровна", nav: true },
      },
    ],
  },
];

export default doctorsRoutes;
