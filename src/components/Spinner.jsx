import Spinner from "react-bootstrap/Spinner";

export default function SpinnerLoad() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
