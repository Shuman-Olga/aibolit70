import { Container } from "react-bootstrap";

import SeoPage from "../../components/Seo";
import { NavLink } from "react-router-dom";

export default function SvedeniyaSpecialistah() {
  return (
    <Container fluid id="page2">
      <SeoPage page="svedeniyaspecialistah" />
      <div className="page-h1">
        <Container>
          <h1>Сведения о специалистах</h1>
        </Container>
      </div>
      <Container className="d-flex justify-content-between my-4 position-block">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ФИО</th>
              <th scope="col">Должность</th>
              <th scope="col">Стаж по специальности</th>
              <th scope="col">Срок действия сертификата</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <NavLink
                  to={`/doctors/sadovnikova-elena-gennadevna/`}
                  className="nav-link"
                  target="_top"
                  rel="noopener noreferrer">
                  Садовникова Елена Геннадьевна
                </NavLink>
              </th>
              <td>Директор, Врач - педиатр, аллерголог</td>
              <td>32 года</td>
              <td>«Педиатрия» действует до 25.12.2024 г.</td>
            </tr>
            <tr>
              <th scope="row">
                <NavLink
                  to={`/doctors/petuhova-olga-viktorovna/`}
                  className="nav-link"
                  target="_top"
                  rel="noopener noreferrer">
                  Петухова Ольга Викторовна
                </NavLink>
              </th>
              <td>Главный врач, Врач - педиатр</td>
              <td>27 лет</td>
              <td>«Педиатрия» действует до 15.05.2024 г.</td>
            </tr>
            <tr>
              <th scope="row">
                <NavLink
                  to={`/doctors/shevchenko-anastasiya-nikolaevna/`}
                  className="nav-link"
                  target="_top"
                  rel="noopener noreferrer">
                  Шевченко Анастасия Николаевна
                </NavLink>
              </th>
              <td>Врач - педиатр, неонатолог</td>
              <td>32 года</td>
              <td>«Педиатрия» действует до 09.12.2025 г.</td>
            </tr>
            <tr>
              <th scope="row">
                <NavLink
                  to={`/doctors/ostrouhova-natalya-petrovna/`}
                  className="nav-link"
                  target="_top"
                  rel="noopener noreferrer">
                  Остроухова Наталья Петровна
                </NavLink>
              </th>
              <td>Врач - педиатр, Остеопатические техники</td>
              <td>31 год</td>
              <td>«Педиатрия» действует до 20.11.2025 г.</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </Container>
  );
}
