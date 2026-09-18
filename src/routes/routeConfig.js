/**
 * ЕДИНЫЙ ИСТОЧНИК МАРШРУТОВ
 *
 * ВАЖНО:
 * - здесь НЕТ React;
 * - здесь НЕТ JSX;
 * - файл можно читать как из браузерного webpack, так и из Node.js;
 * - sitemap, react-snap и SEO checker используют этот же конфиг.
 */

const routeConfig = [
  // =========================================================
  // ГЛАВНАЯ
  // =========================================================

  {
    path: "/",
    component: "Home",
    handle: {
      crumb: "Главная",
      nav: true,
      sitemap: true,
      seo: {
        title: "Вызов педиатра на дом в Томске | Айболит",
        description:
          "Вызов педиатра и детских специалистов на дом в Томске. Анализы на дому, вакцинация, программы наблюдения и патронаж новорожденных.",
        keywords:
          "Айболит, детская медицинская служба, клиника, вызвать детский врач, вызов, педиатр, программы наблюдения, анализы, ребенок, новорожденного, на дом, цена, Томск, пригород",
        image: "/assets/img/aibolit.png",
      },
    },
    children: [],
  },

  // =========================================================
  // О НАС
  // =========================================================

  {
    path: "/o-nas/",
    component: "About",
    handle: {
      crumb: "О нас",
      nav: true,
      sitemap: true,
      seo: {
        title: "О нас — детская медицинская служба «Айболит» в Томске",
        description:
          "Детская медицинская служба «Айболит» в Томске: педиатр на дом, детские специалисты, вакцинация, анализы на дому и патронаж новорожденных.",
        keywords:
          "узкие специалисты на дом, педиатр на дом Томск, детский врач на дом",
        image: "/assets/img/massage.jpg",
      },
    },
    children: [
      {
        path: "kontroliruyushie-organizacii/",
        component: "ControllingOrgan",
        handle: {
          crumb: "Контролирующие организации",
          sitemap: true,
          seo: {
            title: "Контролирующие организации | Айболит, Томск",
            description:
              "Контролирующие организации детской медицинской службы «Айболит» в Томске: сведения, контакты и информация для пациентов.",
            keywords:
              "Айболит в Томске, Герцена 68, детские врачи на дом Томск",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "licenzii/",
        component: "Licenses",
        handle: {
          crumb: "Лицензии",
          sitemap: true,
          seo: {
            title: "Лицензия на медицинскую деятельность | Айболит, Томск",
            description:
              "Информация о лицензии на медицинскую деятельность детской медицинской службы «Айболит» в Томске. Документы и сведения для пациентов.",
            keywords:
              "лицензия Айболит, медицинская лицензия Томск, врачи на дом",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "documents/",
        component: "Documents",
        handle: {
          crumb: "Документы",
          sitemap: true,
          seo: {
            title: "Документы детской медицинской службы «Айболит» | Томск",
            description:
              "Документы детской медицинской службы «Айболит» в Томске: лицензии, правила оказания медицинских услуг и информация для пациентов.",
            keywords:
              "Айболит детская медицинская служба, документы, информация для пациентов",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "nashi-partnery/",
        component: "OurPartners",
        handle: {
          crumb: "Наши партнеры",
          sitemap: true,
          seo: {
            title: "Наши партнеры | Айболит в Томске",
            description:
              "Партнеры детской медицинской службы «Айболит» в Томске: страховые компании, программы ДМС и организации, с которыми мы сотрудничаем.",
            keywords: "партнеры Айболит Томск, детская медицинская служба",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "pravovaya-informaciya/",
        component: "PravovyInformation",
        handle: {
          crumb: "Правовая информация",
          sitemap: true,
          seo: {
            title: "Правовая информация | Айболит в Томске",
            description:
              "Правовая информация детской медицинской службы «Айболит» в Томске: сведения об организации, медицинских услугах и правах пациентов.",
            keywords: "Айболит Томск, правовая информация, медицинские услуги",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "vacancies/",
        component: "Vacancies",
        handle: {
          crumb: "Вакансии",
          sitemap: true,
          seo: {
            title: "Вакансии в детской медицинской службе «Айболит» | Томск",
            description:
              "Вакансии детской медицинской службы «Айболит» в Томске. Актуальные предложения для врачей и медицинских специалистов.",
            keywords: "вакансии педиатр Томск, вакансии врач Томск",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "map-site/",
        component: "MapSite",
        handle: {
          crumb: "Карта сайта",
          sitemap: false,
          seo: {
            title: "Карта сайта детской медицинской службы «Айболит»",
            description:
              "Карта сайта «Айболит»: услуги, врачи, программы наблюдения, информация для пациентов и полезные материалы о здоровье детей.",
            keywords: "карта сайта",
            robots: "noindex, follow",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
    ],
  },

  // =========================================================
  // ВРАЧИ
  // =========================================================

  {
    path: "/doctors/",
    component: "Doctors",
    handle: {
      crumb: "Педиатры",
      nav: true,
      sitemap: true,
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
      {
        path: "sadovnikova-elena-gennadevna/",
        component: "DoctorSadovnikova",
        handle: {
          crumb: "Садовникова Елена Геннадьевна",
          sitemap: true,
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
        path: "petuhova-olga-viktorovna/",
        component: "DoctorPetuhova",
        handle: {
          crumb: "Петухова Ольга Викторовна",
          sitemap: true,
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
        path: "shevchenko-anastasiya-nikolaevna/",
        component: "DoctorShevchenko",
        handle: {
          crumb: "Шевченко Анастасия Николаевна",
          sitemap: true,
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
        path: "ostrouhova-natalya-petrovna/",
        component: "DoctorOstrouhova",
        handle: {
          crumb: "Остроухова Наталья Петровна",
          sitemap: true,
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

  // =========================================================
  // ПРОГРАММЫ
  // =========================================================

  {
    path: "/programmy-nablyudeniya-za-zdorovem/",
    component: "Programs",
    handle: {
      crumb: "Программы",
      nav: true,
      sitemap: true,
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
      {
        path: "malysh-houm-standart-ot-0-do-2-h-le/",
        component: "ProgramOne",
        handle: {
          crumb: "Малыш Хоум от 0 до 2 лет",
          sitemap: true,
          seo: {
            title: "Программа «Малыш Хоум» от 0 до 2 лет | Айболит",
            description:
              "Программа наблюдения за здоровьем ребенка от рождения до 2 лет с педиатром детской медицинской службы «Айболит» в Томске.",
            image: "/assets/img/fibroma-u-rebenka.jpg",
          },
        },
      },
      {
        path: "zdorovyj-rebenok-houm-standart-ot-2/",
        component: "ProgramTwo",
        handle: {
          crumb: "Здоровый ребенок с 2 до 5 лет",
          sitemap: true,
          seo: {
            title: "Программа «Здоровый ребенок» от 2 до 5 лет | Айболит",
            description:
              "Программа наблюдения за здоровьем ребенка от 2 до 5 лет в детской медицинской службе «Айболит» в Томске.",
            image: "/assets/img/fibroma-u-rebenka.jpg",
          },
        },
      },
      {
        path: "zdorovyj-rebenok-houm-midi-ot-2-h-l/",
        component: "ProgramThree",
        handle: {
          crumb: "Педиатр рядом с 5 лет",
          sitemap: true,
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

  // =========================================================
  // ЧЕК-АП
  // =========================================================

  {
    path: "/chek-up/",
    component: "ChekUp",
    handle: {
      crumb: "Чек-апы",
      nav: true,
      sitemap: true,
      seo: {
        title: "Чек-ап ребенка на дому в Томске | Айболит",
        description:
          "Комплексный чек-ап здоровья ребенка в Томске. Обследование и консультации детских специалистов на дому в медицинской службе «Айболит».",
        keywords:
          "чек ап ребенка Томск, комплексный осмотр ребенка, обследование ребенка на дому",
        image: "/assets/img/aibolit.png",
      },
    },
    children: [],
  },

  // =========================================================
  // УСЛУГИ
  // =========================================================

  {
    path: "/uslugi-i-ceny/",
    component: "Uslugi",
    handle: {
      crumb: "Услуги",
      nav: true,
      sitemap: true,
      seo: {
        title: "Вызов педиатра и врача на дом в Томске | Айболит",
        description:
          "Вызов педиатра и детского врача на дом в Томске. Анализы на дому, узкие специалисты, программы наблюдения и консультации для детей.",
        keywords:
          "вызов педиатра на дом Томск, педиатр на дом, детский врач на дом Томск, анализы на дому",
        image: "/assets/img/uslugi1.jpg",
      },
    },
    children: [
      {
        path: "vyzov-pediatra-na-dom/",
        component: "DoctorNaDom",
        handle: {
          crumb: "Врач на дом",
          sitemap: true,
          seo: {
            title: "Вызов педиатра на дом в Томске | Айболит",
            description:
              "Вызов педиатра на дом в Томске. Детский врач проведет консультацию ребенка на дому в удобное для вас время.",
            keywords:
              "вызов педиатра на дом Томск, педиатр на дом, детский врач на дом",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "pediatr/",
        component: "Pediatr",
        handle: {
          crumb: "Педиатры",
          sitemap: true,
          seo: {
            title: "Педиатр на дом в Томске | Айболит",
            description:
              "Консультация педиатра для ребенка в Томске. Вызов детского врача на дом в медицинской службе «Айболит».",
            keywords:
              "педиатр на дом Томск, детский педиатр Томск, вызвать педиатра",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "medicinskie-spravki-rebenku/",
        component: "MedicalCertificates",
        handle: {
          crumb: "Справки",
          sitemap: true,
          seo: {
            title: "Медицинские справки для ребенка в Томске | Айболит",
            description:
              "Оформление медицинских справок для детей в Томске: справка в школу, детский сад, бассейн, лагерь и другие медицинские документы.",
            keywords:
              "медицинские справки ребенку Томск, справка в школу, справка в детский сад",
            image: "/assets/img/uslugi1.jpg",
          },
        },
        children: [
          {
            path: "sanatorno-kurortnaya-karta-dlya-det/",
            component: "SanatornoKurortnayaKarta",
            handle: {
              crumb: "Санаторно-курортная карта",
              sitemap: true,
              seo: {
                title: "Санаторно-курортная карта для ребенка | Айболит",
                description:
                  "Оформление санаторно-курортной карты для ребенка в Томске.",
                image: "/assets/img/uslugi1.jpg",
              },
            },
          },
          {
            path: "spravka-v-shkolu/",
            component: "SpravkavShkolu",
            handle: {
              crumb: "Справка в школу",
              sitemap: true,
              seo: {
                title: "Справка в школу для ребенка в Томске | Айболит",
                description:
                  "Оформление медицинской справки в школу для ребенка в Томске.",
                image: "/assets/img/uslugi1.jpg",
              },
            },
          },
          {
            path: "spravka-v-detskii-sad/",
            component: "SpravkavDetskiiSad",
            handle: {
              crumb: "Справка в детский сад",
              sitemap: true,
              seo: {
                title: "Справка в детский сад в Томске | Айболит",
                description:
                  "Оформление медицинской справки для ребенка в детский сад в Томске.",
                image: "/assets/img/uslugi1.jpg",
              },
            },
          },
          {
            path: "spravka-v-bassein/",
            component: "SpravkavBassein",
            handle: {
              crumb: "Справка в бассейн",
              sitemap: true,
              seo: {
                title: "Справка в бассейн для ребенка в Томске | Айболит",
                description:
                  "Оформление медицинской справки для посещения бассейна ребенком в Томске.",
                image: "/assets/img/uslugi1.jpg",
              },
            },
          },
          {
            path: "spravka-o-sostoyanii-zdorovya-reben/",
            component: "SpravkavZdorove",
            handle: {
              crumb: "Справка о состоянии здоровья",
              sitemap: true,
              seo: {
                title: "Справка о состоянии здоровья ребенка | Айболит",
                description:
                  "Оформление справки о состоянии здоровья ребенка в Томске.",
                image: "/assets/img/uslugi1.jpg",
              },
            },
          },
          {
            path: "spravka-poforme-026-u/",
            component: "SpravkaForma026u",
            handle: {
              crumb: "Справка — 026у",
              sitemap: true,
              seo: {
                title: "Медицинская карта 026у для ребенка | Айболит",
                description:
                  "Оформление медицинской карты 026у для ребенка в Томске.",
                image: "/assets/img/uslugi1.jpg",
              },
            },
          },
          {
            path: "spravka-po-forme-079-u/",
            component: "MedicinskayaSpravka079u",
            handle: {
              crumb: "Справка в лагерь — 079у",
              sitemap: true,
              seo: {
                title: "Справка 079у для ребенка в Томске | Айболит",
                description:
                  "Оформление медицинской справки 079у для ребенка перед поездкой в детский лагерь.",
                image: "/assets/img/uslugi1.jpg",
              },
            },
          },
        ],
      },
    ],
  },

  // =========================================================
  // ПАЦИЕНТАМ
  // =========================================================

  {
    path: "/pacientam/",
    component: "ForPatients",
    handle: {
      crumb: "Пациентам",
      nav: true,
      sitemap: true,
      seo: {
        title: "Информация для пациентов | Айболит в Томске",
        description:
          "Информация для пациентов «Айболит»: специалисты, подготовка к исследованиям, способы оплаты, документы и полезные сведения.",
        keywords: "Айболит Томск, информация для пациентов, педиатр на дом",
        image: "/assets/img/uslugi1.jpg",
      },
    },
    children: [
      {
        path: "prices/",
        component: "Prices",
        handle: {
          crumb: "Цены",
          sitemap: true,
          seo: {
            title:
              "Цены на услуги детской медицинской службы «Айболит» | Томск",
            description:
              "Цены на услуги педиатров и детских специалистов медицинской службы «Айболит» в Томске.",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "sposoby-oplaty/",
        component: "SposobyOplaty",
        handle: {
          crumb: "Способы оплаты",
          sitemap: true,
          seo: {
            title: "Способы оплаты | Айболит Томск",
            description:
              "Информация о способах оплаты медицинских услуг детской медицинской службы «Айболит».",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "lekarstvennoe-obespechenie/",
        component: "LekarstvennoeObespechenie",
        handle: {
          crumb: "Лекарственное обеспечение",
          sitemap: true,
          seo: {
            title: "Лекарственное обеспечение | Айболит Томск",
            description:
              "Информация о лекарственном обеспечении пациентов детской медицинской службы «Айболит».",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "pravila-podgotovki/",
        component: "PravilaPodgotovki",
        handle: {
          crumb: "Правила подготовки к исследованиям",
          sitemap: true,
          seo: {
            title: "Правила подготовки к исследованиям | Айболит",
            description:
              "Правила подготовки детей к медицинским исследованиям и анализам в детской медицинской службе «Айболит».",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "svedeniya-o-specialistah/",
        component: "SvedeniyaSpecialistah",
        handle: {
          crumb: "Сведения о специалистах",
          sitemap: true,
          seo: {
            title: "Сведения о специалистах | Айболит Томск",
            description:
              "Сведения о врачах и медицинских специалистах детской медицинской службы «Айболит» в Томске.",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "nalogovyj-vychet/",
        component: "NalogovyjVychet",
        handle: {
          crumb: "Налоговый вычет",
          sitemap: true,
          seo: {
            title: "Налоговый вычет за медицинские услуги | Айболит",
            description:
              "Информация о получении налогового вычета за медицинские услуги в детской медицинской службе «Айболит».",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
      {
        path: "otzyvy/",
        component: "Otzyvy",
        handle: {
          crumb: "Отзывы",
          sitemap: true,
          seo: {
            title: "Отзывы о детской медицинской службе «Айболит» | Томск",
            description:
              "Отзывы пациентов о детской медицинской службе «Айболит» в Томске.",
            image: "/assets/img/uslugi1.jpg",
          },
        },
      },
    ],
  },

  // =========================================================
  // БЛОГ
  // =========================================================

  {
    path: "/blog/",
    component: "Blog",
    handle: {
      crumb: "Блог",
      nav: true,
      sitemap: true,
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
      {
        path: "detskij-nevrolog-na-dom/",
        component: "Post1",
        handle: {
          crumb: "Детский невролог",
          sitemap: true,
          seo: {
            title: "Детский невролог на дом в Томске | Айболит",
            description:
              "Когда ребенку необходим детский невролог и в каких случаях можно вызвать специалиста на дом в Томске.",
            keywords:
              "детский невролог на дом Томск, невролог ребенку, детский врач",
            image: "/assets/img/aibolit.png",
          },
        },
      },
      {
        path: "kalendar-vakcinacija/",
        component: "Post2",
        handle: {
          crumb: "Календарь вакцинаций",
          sitemap: true,
          seo: {
            title: "Календарь вакцинации детей | Айболит, Томск",
            description:
              "Календарь вакцинации детей: основные прививки, сроки вакцинации и полезная информация для родителей.",
            keywords:
              "календарь вакцинации детей, прививки детям Томск, вакцинация",
            image: "/assets/img/aibolit.png",
          },
        },
      },
      {
        path: "detskij-hirurg-na-dom/",
        component: "Post3",
        handle: {
          crumb: "Детский хирург",
          sitemap: true,
          seo: {
            title: "Детский хирург на дом в Томске | Айболит",
            description:
              "Когда ребенку нужна консультация детского хирурга и когда специалист может приехать на дом.",
            keywords: "детский хирург на дом Томск, хирург ребенку",
            image: "/assets/img/aibolit.png",
          },
        },
      },
      {
        path: "patronaj-novorojdennogo/",
        component: "Post4",
        handle: {
          crumb: "Патронаж новорожденного",
          sitemap: true,
          seo: {
            title: "Патронаж новорожденного на дому в Томске | Айболит",
            description:
              "Патронаж новорожденного: наблюдение ребенка педиатром на дому и рекомендации родителям.",
            keywords:
              "патронаж новорожденного Томск, педиатр новорожденному на дом",
            image: "/assets/img/aibolit.png",
          },
        },
      },
      {
        path: "adaptaciya-k-detskomu-sadu/",
        component: "Post5",
        handle: {
          crumb: "Адаптация в детском саду",
          sitemap: true,
          seo: {
            title: "Адаптация ребенка к детскому саду | Айболит",
            description:
              "Полезные рекомендации родителям по адаптации ребенка к детскому саду.",
            keywords: "адаптация ребенка к детскому саду, ребенок детский сад",
            image: "/assets/img/aibolit.png",
          },
        },
      },
      {
        path: "kak-pomoch-rebenku-perenesti-jaru/",
        component: "Post6",
        handle: {
          crumb: "Как помочь ребенку перенести жару",
          sitemap: true,
          seo: {
            title: "Как помочь ребенку перенести жару | Айболит",
            description:
              "Рекомендации родителям о том, как помочь ребенку безопасно перенести жару.",
            keywords: "ребенок жара, как помочь ребенку в жару",
            image: "/assets/img/aibolit.png",
          },
        },
      },
      {
        path: "detskii-lor-vrach-na-dom/",
        component: "Post7",
        handle: {
          crumb: "Детский ЛОР врач на дом",
          sitemap: true,
          seo: {
            title: "Детский ЛОР на дом в Томске | Айболит",
            description:
              "Когда ребенку нужна консультация ЛОР-врача и когда можно вызвать детского ЛОРа на дом.",
            keywords: "детский ЛОР на дом Томск, ЛОР ребенку",
            image: "/assets/img/aibolit.png",
          },
        },
      },
      {
        path: "vizov-pediatra-na-dom/",
        component: "Post8",
        handle: {
          crumb: "Вызов педиатра на дом",
          sitemap: true,
          seo: {
            title: "Вызов педиатра на дом в Томске | Айболит",
            description:
              "В каких случаях ребенку необходим осмотр педиатра и как вызвать детского врача на дом в Томске.",
            keywords: "вызов педиатра на дом Томск, педиатр на дом",
            image: "/assets/img/aibolit.png",
          },
        },
      },
      {
        path: "pentaksim/",
        component: "Post9",
        handle: {
          crumb: "Пентаксим",
          sitemap: true,
          seo: {
            title: "Пентаксим — вакцинация детей | Айболит, Томск",
            description:
              "Информация о вакцинации детей вакциной Пентаксим: показания, схема вакцинации и вопросы родителей.",
            keywords: "Пентаксим Томск, вакцина Пентаксим, вакцинация детей",
            image: "/assets/img/aibolit.png",
          },
        },
      },
      {
        path: "kompleksnyj-osmotr-rebenka-na-domu/",
        component: "Post10",
        handle: {
          crumb: "Чек-ап детский на дому",
          sitemap: true,
          seo: {
            title: "Комплексный осмотр ребенка на дому в Томске | Айболит",
            description:
              "Комплексный осмотр и оценка состояния здоровья ребенка на дому.",
            keywords: "чек ап ребенка Томск, осмотр ребенка на дому",
            image: "/assets/img/aibolit.png",
          },
        },
      },
      {
        path: "sovetov-vracha-allergologa/",
        component: "Post11",
        handle: {
          crumb: "Советы врача-аллерголога",
          sitemap: true,
          seo: {
            title: "Советы детского аллерголога | Айболит, Томск",
            description:
              "Полезные рекомендации детского аллерголога для родителей.",
            keywords: "детский аллерголог Томск, аллергия у ребенка",
            image: "/assets/img/aibolit.png",
          },
        },
      },
      {
        path: "vnimanie-pollinoz/",
        component: "Post12",
        handle: {
          crumb: "Внимание, поллиноз!",
          sitemap: true,
          seo: {
            title: "Поллиноз у детей: симптомы и рекомендации | Айболит",
            description:
              "Поллиноз у детей: основные симптомы, сезонные проявления и рекомендации родителям.",
            keywords: "поллиноз у детей, аллергия, аллерголог Томск",
            image: "/assets/img/aibolit.png",
          },
        },
      },
    ],
  },

  // =========================================================
  // КОНТАКТЫ
  // =========================================================

  {
    path: "/kontakty/",
    component: "Contacts",
    handle: {
      crumb: "Контакты",
      nav: true,
      sitemap: true,
      seo: {
        title: "Контакты детской медицинской службы «Айболит» | Томск",
        description:
          "Контакты «Айболит» в Томске: адрес, телефон и информация для записи на вызов педиатра и детских специалистов на дом.",
        keywords:
          "Айболит Томск контакты, детская медицинская служба Томск, педиатр на дом Томск",
        image: "/assets/img/phone-tel.png",
      },
    },
    children: [],
  },

  // =========================================================
  // ПОИСК
  // =========================================================

  {
    path: "/search/",
    component: "SearchPage",
    handle: {
      crumb: "Поиск",
      sitemap: false,
      seo: {
        title: "Поиск по сайту | Айболит",
        description:
          "Поиск информации на сайте детской медицинской службы «Айболит».",
        robots: "noindex, follow",
      },
    },
    children: [],
  },
];

module.exports = routeConfig;
