import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function HintAgreement() {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip id="tooltip-bottom">
          Сотрудник дал свое согласие на распространение ПД
        </Tooltip>
      }>
      <span className="material-icons">info</span>
    </OverlayTrigger>
  );
}
