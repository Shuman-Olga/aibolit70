import { Container } from "react-bootstrap";

import AdvantageItem from "./advantageItems";
import { datalistAdvantage } from "../../data/dataAdvantage";

export default function BlockAdvantages() {
  return (
    <Container id="blockadvantages" className="text-center py-5">
      <h2 className="text-uppercase">Приемущество для родителей</h2>
      <hr className="w-50 "></hr>
      <div className="row row-cols-1 row-cols-md-5 g-5 mt-4">
        {datalistAdvantage.map((item, index) => (
          <AdvantageItem data={item} key={index} />
        ))}
      </div>
    </Container>
  );
}
