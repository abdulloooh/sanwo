import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ListGroup from "./common/listGroup";
import DebtsManager from "./debtsManager";
import "../body.scss";

const items = [
  { _id: "cr", label: "Owed to Me" },
  { _id: "dr", label: "Owed by Me" },
  { _id: "individual", label: "Summary" },
];
class Body extends Component {
  state = {
    selectedGroup: {},
  };

  componentDidMount() {
    const item = { ...items[0] };
    this.setState({ selectedGroup: item });
  }

  handleSelectedGroup = (item) => {
    this.setState({ selectedGroup: item });
  };

  render() {
    const { selectedGroup } = this.state;

    return (
      <Container>
        <Row>
          <Col lg={2}>
            <ListGroup
              items={items}
              keyProperty="_id"
              valueProperty="label"
              selectedItem={selectedGroup}
              onItemSelect={this.handleSelectedGroup}
            />
          </Col>

          <Col lg>
            <DebtsManager selectedGroup={selectedGroup} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Body;
