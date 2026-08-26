import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";

import { ModalContext } from "../../context/ModelContext";
import OptimizedImage from "../../components/common/OptimizedImage";

export default function ModalWindows(props) {
  const { modal, open, close } = useContext(ModalContext);
  return (
    <div id={`modalcalling${props.name}`}>
      <Button className="btn-showmodal" onClick={open}>
        <OptimizedImage
          src={"home.png"}
          alt="home"
          className="img home"
          title="home"
          loading="eager"
          decoding="async"
          width={40}
          height={40}
        />

        {props.title}
      </Button>

      <Modal show={modal} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
      </Modal>
    </div>
  );
}
