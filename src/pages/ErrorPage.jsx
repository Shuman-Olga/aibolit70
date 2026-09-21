import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>404 — Страница не найдена | Айболит</title>
        <meta name="description" content="Запрашиваемая страница не найдена." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <main className="container py-5">
        <div className="text-center">
          <h1>404</h1>

          <p className="lead">Страница не найдена.</p>

          <Link to="/" className="btn btn-primary">
            Вернуться на главную
          </Link>
        </div>
      </main>
    </>
  );
}
