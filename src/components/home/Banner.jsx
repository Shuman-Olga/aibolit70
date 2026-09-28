import { Container } from "react-bootstrap";
import OptimizedImage from "../common/OptimizedImage";

export default function Banner() {
  return (
    <Container id="blockbanner" className=" py-5">
      <h2 className="h2-banner ">Наши новости</h2>
      <hr className="w-50" />
      <div className="d-flex "></div>
    </Container>
  );
}
