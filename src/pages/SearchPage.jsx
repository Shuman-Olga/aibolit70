import { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { dataSeo } from "../data/Seo/dataSeoPage";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState([searchParams.get("search-text")]);
  const [resultSearch, setResultsearch] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    const result = dataSeo.filter((item) =>
      item.title.toLowerCase().includes(search),
    );
    setResultsearch(result);
  }
  console.log(search);
  useEffect(() => {
    const result = dataSeo.filter((item) =>
      item.title.toLowerCase().includes(search),
    );
    setResultsearch(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container id="search-page" fluid>
      <Container className="my-4">
        <form
          role="search"
          method="post"
          onSubmit={handleSubmit}
          className="d-flex w-25">
          <input
            className="form-control me-2"
            title="search"
            type="search"
            name="search-text"
            value={search || ""}
            onChange={handleChange}
            placeholder="Поиск"
          />
          <button className="btn " type="submit" title="btn-search-page">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </Container>
      <Container className="my-4">
        <h3>Результаты поиска:</h3>
        <Nav className="flex-column">
          {resultSearch.map((item, index) => (
            <Nav.Link key={index} href={item.urlname}>
              {item.title}
            </Nav.Link>
          ))}
          {resultSearch.length === 0 && (
            <h4>По вашему запросу ничего не найдено</h4>
          )}
        </Nav>
      </Container>
    </Container>
  );
}
