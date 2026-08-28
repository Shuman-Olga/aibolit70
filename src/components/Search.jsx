import React from "react";
import Icon from "./common/Icon";

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
          title="btn-search-header">
          <Icon name="search" size={18} />
        </button>
      </form>
    </div>
  );
}
