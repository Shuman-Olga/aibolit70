import { Container } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const status = error?.status || 404;

  const title = status === 404 ? "Страница не найдена" : "Произошла ошибка";

  const description =
    status === 404
      ? "К сожалению, такой страницы не существует или она была перемещена."
      : "Попробуйте обновить страницу или вернуться на главную.";
  return (
    <Container fluid id="error">
      <Container className="my-5">
        <h1>
          {status} — {title}
        </h1>

        <p>{description}</p>

        <section className="error-container">
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
          <span className="zero">
            <span className="screen-reader-text">0</span>
          </span>
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
        </section>

        <div className="link-container">
          <Link href="/" className="more-link">
            На главную
          </Link>
        </div>
      </Container>
    </Container>
  );
}
