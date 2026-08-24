import React from "react";

export default function Search() {
  return (
    <div id="search">
      <form className="d-flex" method="get" action="/search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Поиск"
          aria-label="Поиск"
          name="search-text"
          title="search-header"
        />
        <button
          className="btn btn-outline-success"
          type="submit"
          title="btn-search-header"
        >
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
}
