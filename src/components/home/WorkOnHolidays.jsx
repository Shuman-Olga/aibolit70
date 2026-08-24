import { Container } from "react-bootstrap";
import WOHimg1 from "../../assets/img/pngwing.png";
import WOHimg2 from "../../assets/img/snooww.jpg";
import WOHimg3 from "../../assets/img/snegovik.png";
import WOHimg4 from "../../assets/img/holiday_1_9_may.jpg";

export default function WorkOnHolidays() {
  return (
    <Container fluid id="workonholidays">
      <div
        className="blockmessage d-flex justify-content-center align-items-center py-3  mb-3  "
        // style={{ backgroundImage: `url(${WOHimg2})` }}
      >
        {/* <img src={WOHimg1} alt="holiday" className="me-4 w-25" /> */}
        <div className="text-center">
          <p className=" fs-4 fw-bold fst-italic">
            График работы в новогодние праздники
          </p>
          <p className=" fs-5 fw-bold">31 декабря, 1-3, 7 января выходной!</p>
          <p className=" fs-5 fw-bold">
            5, 6, 8, 9 января работаем в обычном режиме
          </p>
          <p className=" fs-5 fw-bold">Запись по телефону 8(382-2) 60-92-43.</p>
        </div>
        {/* <img src={WOHimg3} alt="holiday" className="ms-4" /> */}
        <div className="text-center m-2">
          {/* <p className=" fs-4 fw-bold fst-italic">
            Режим работы в праздничные дни
          </p> */}
          {/* <p className=" fs-5 fw-bold">1, 2 мая и 9 мая - выходной</p> */}
          {/* <p className=" fs-5 fw-bold">3, 4 ноября - выходной</p>
          <p className=" fs-5 fw-bold">
            В остальные дни мы работаем в обычном режиме.
          </p> */}
          {/* <p className=" fs-5 fw-bold">
            Запись по телефонам 8(382-2) 60-92-43.
          </p> */}
        </div>
        {/* <img src={WOHimg4} alt="holiday" className="w-25 ms-4" /> */}
      </div>
    </Container>
  );
}
