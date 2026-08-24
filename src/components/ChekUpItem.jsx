import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Card, CardGroup } from "react-bootstrap";

import { dataChekUp } from "../data/dataChekUp";

export default function ChekUpItem() {
  return (
    <CardGroup className="my-4">
      {dataChekUp.map((item) => (
        <Card key={item.id}>
          <Card.Header>
            {item.title} <br /> НА ДОМУ
          </Card.Header>
          <Card.Body>
            <ul>
              {item.listChekUp.map((item, index) => (
                <li className="my-2" key={index}>
                  {item.nameEl}
                </li>
              ))}
            </ul>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item className="text-center fw-bold">
              {item.price} ₽
            </ListGroup.Item>
          </ListGroup>
        </Card>
      ))}
    </CardGroup>
  );
}
