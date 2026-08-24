import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function BtnScrollTop() {
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {scrollTop && (
        <Button
          onClick={scrollToTop}
          variant="warning"
          size="lg"
          id="btn-back-to-top">
          <span className="material-icons icon">arrow_upward</span>
        </Button>
      )}
    </>
  );
}
