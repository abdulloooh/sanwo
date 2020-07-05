import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Pricing from "./pricing";
import ListGroup from "./common/listGroup";
import DebtsManager from "./debtsManager";

const items = [
  { _id: "byme", label: "Owed by Me" },
  { _id: "tome", label: "Owed to Me" },
  { _id: "individual", label: "Individuals" },
];
class Body extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg={4} sm={4}>
            <ListGroup items={items} keyProperty="_id" valueProperty="label" />
          </Col>

          <Col lg>
            <Switch>
              <Route path="/byme" component={DebtsManager} />
              <Route path="/tome" component={Pricing} />
              <Route path="/individual" component={Pricing} />
            </Switch>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Body;
