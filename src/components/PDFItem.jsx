import React from "react";
import { Button } from "react-bootstrap";
import Icon from "./common/Icon";

export default function PDFItem({ title, pdf }) {
  return (
    <>
      <div
        id="pdf-item"
        className="mb-3 d-flex justify-content-between align-items-center">
        <div className=" arrow-svg d-flex">
          <a href={`/docs/${pdf}`} download title="Скачать">
            <Icon name="download" size={18} /> <h5>{title}</h5>
          </a>
        </div>
        <Button
          href={`/docs/${pdf}`}
          variant="success"
          target="_blank"
          rel="noopener noreferrer"
          className="btn mx-4">
          Посмотерть
        </Button>
      </div>
      <hr />
    </>
  );
}
