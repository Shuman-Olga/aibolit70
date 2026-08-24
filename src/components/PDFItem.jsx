import React from "react";
import { Button } from "react-bootstrap";

export default function PDFItem({ title, pdf }) {
  return (
    <>
      <div
        id="pdf-item"
        className="mb-3 d-flex justify-content-between align-items-center">
        <div className=" arrow-svg d-flex">
          <a href={`/docs/${pdf}`} download title="Скачать">
            <i className="bi bi-file-earmark-arrow-down me-2"></i>
            <h5>{title}</h5>
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
