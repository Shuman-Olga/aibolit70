import { Container } from "react-bootstrap";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const status = error?.status || 404;
  const message = error?.statusText || "Страница не найдена";

  return (
    <Container fluid id="error">
      <Container className="my-5">
        <h1>404 - Упс! Такой страницы нет</h1>

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
          <a target="_blank" href="/" className="more-link">
            На главную
          </a>
        </div>
      </Container>
    </Container>
  );
}
