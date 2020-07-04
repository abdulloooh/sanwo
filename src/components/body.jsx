import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Features from "./features";
import Pricing from "./pricing";
import ListGroup from "./common/listGroup";

const items = [
  { _id: "by_me", label: "Owed by Me" },
  { _id: "to_me", label: "Owed to Me" },
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
            {" "}
            <Switch>
              <Route path="/debttome" component={Features} />
              <Route path="/debtbyme" component={Pricing} />
              <Route path="/individuals" component={Pricing} />
            </Switch>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Body;
