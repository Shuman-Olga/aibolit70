import { Container } from "react-bootstrap";
import { useState } from "react";

import SeoPage from "../components/Seo";
import BlogItem from "../components/blog/BlogItemPageBlog";
import { dataBlog } from "../data/dataBlog";
import MyPagination from "../components/PaginationBlog";

export default function Blog() {
  const POSTS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dataBlog.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = dataBlog.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <Container id="blog" fluid>
      <SeoPage page="blog" />
      <div className="page-h1">
        <Container>
          <h1>Блог</h1>
        </Container>
      </div>
      <Container className="my-5">
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
          {currentPosts.map((post) => (
            <BlogItem item={post} />
          ))}
        </div>
      </Container>

      <MyPagination
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </Container>
  );
}
