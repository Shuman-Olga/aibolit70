import { Container } from "react-bootstrap";

export default function OtzyvItem({ currentPosts }) {
  return (
    <Container className="">
      {currentPosts.map((item) => (
        <Container key={item.id} className="border my-4 p-4">
          <p className="fw-bold">{item.name}</p>
          <p className="fw-light">Отзыв о </p>
          <p className="fw-bold"> {item.forname}</p>
          <p>{item.otzyv}</p>
          <p className="fw-light">{item.date} г.</p>
        </Container>
      ))}
    </Container>
  );
}
