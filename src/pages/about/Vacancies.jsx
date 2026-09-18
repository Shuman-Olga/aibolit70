import React from "react";
import { Container } from "react-bootstrap";

export default function Vacancies() {
  return (
    <Container fluid id="vacancies">
      <div className="page-h1">
        <Container>
          <h1>Вакансии</h1>
        </Container>
      </div>
      <Container className="d-flex justify-content-between my-4 position-block">
        <div>Свободных вакансий нет</div>
      </Container>
    </Container>
  );
}
