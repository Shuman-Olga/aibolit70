import { Container } from "react-bootstrap";

export default function Banner() {
  return (
    <Container id="blockbanner" className=" py-5">
      <h2 className="h2-banner ">Наши новости</h2>
      <hr className="w-50" />
      <div className="d-flex ">
        <img
          src={require("../../assets/img/photo_2025-02-25_22-24-03.jpg")}
          alt="img-background"
          className="w-50 rounded float-start"
        />
        <div className="ms-5">
          <h3> Дорогие будущие мамы!🌷</h3>
          <p>
            Вы готовитесь к самому важному событию в своей жизни и хотите знать,
            как правильно подготовиться к родам, благополучно родить и
            качественно восстановиться после этого удивительного опыта? 🤱💕
          </p>
          <p>
            Погрузитесь в уникальный авторский курс
            <a
              href=" https://app.leadteh.ru/w/deZRb"
              className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
            >
              {" "}
              "Твои Не Идеальные Роды"{" "}
            </a>{" "}
            <span className="fst-italic fw-bold">Натальи Мороз</span> – врача
            акушера-гинеколога, который поможет вам справиться с любыми
            вопросами и переживаниями на пути к материнству!
          </p>
          <h4>🔍 Что вас ждет на курсе?</h4>
          <ul>
            <li>
              11 глубоких лекций по 2-3 часа в прямом эфире с сессиями вопросов
              и ответов
            </li>
            <li>Знания от 6 опытных беременных и кормящих спикеров</li>
            <li>
              Доступ в закрытый онлайн-клуб для будущих и новорожденных мам
            </li>
            <li>Удобные шпаргалки и чек-листы для вашей уверенности</li>
            <li>Розыгрыши и полезные подарки для каждой участницы!</li>
          </ul>
          <p className="fw-bold">🎉 Специальное предложение! 🎉</p>
          <p>
            В рамках курса пройдет розыгрыш 6 сертификатов по 6.000 рублей от
            детской медицинской службы Айболит! Для жителей г. Томска это
            включает 2 вызова педиатра на дом и 2 онлайн-приема, а для остальных
            регионов – 5 онлайн-приемов.
          </p>
          <p>
            Не упустите возможность стать частью этого важного и познавательного
            путешествия в мир материнства. Записывайтесь на курс
            <a
              href=" https://app.leadteh.ru/w/deZRb"
              className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
            >
              {" "}
              "Твои Не Идеальные Роды"{" "}
            </a>{" "}
            и сделайте первый шаг к уверенности и благополучию!
          </p>
          <p>📍 Стартуем уже 26 февраля! </p>
          <p>
            👣 Записаться можно по ссылке{" "}
            <a
              href=" https://app.leadteh.ru/w/deZRb"
              className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
            >
              https://app.leadteh.ru/w/deZRb
            </a>
          </p>
          <p>
            💖 Не упустите шанс стать частью этого уникального события! Ждем
            вас!💖
          </p>
          <p></p>
        </div>
      </div>
    </Container>
  );
}
