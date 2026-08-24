import { Container } from "react-bootstrap";
import { useState } from "react";

import SeoPage from "../../components/Seo";
import OtzyvItem from "../../components/forpatients/OtzyvItem";
import { dataOtzyvy } from "../../data/dataOtzyvy";
import MyPagination from "../../components/PaginationBlog";

export default function Otzyvy() {
  const POSTS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dataOtzyvy.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = dataOtzyvy
    .reverse()
    .slice(startIndex, startIndex + POSTS_PER_PAGE);
  return (
    <Container fluid id="page2">
      <SeoPage page="otzyvy" />
      <div className="page-h1">
        <Container>
          <h1>Отзывы</h1>
        </Container>
      </div>
      <Container className="d-flex justify-content-between my-4 position-block">
        <OtzyvItem currentPosts={currentPosts} />
      </Container>
      <MyPagination
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </Container>
  );
}
