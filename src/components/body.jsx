import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ListGroup from "./common/listGroup";
import DebtsManager from "./debtsManager";
import "../body.css";
import Filter from "./filtering";
const items = [
  { _id: "cr", label: "Owed to Me" },
  { _id: "dr", label: "Owed by Me" },
  { _id: "individual", label: "Individuals" },
];
class Body extends Component {
  state = {
    selectedGroup: {},
    activeSort: "due",
    activeOrder: "asc",
  };

  sort = [
    { label: "Date Due", value: "due" },
    { label: "Date Incurred", value: "inc" },
    { label: "Amount", value: "am" },
  ];

  order = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  componentDidMount() {
    const item = { ...items[0] };
    this.setState({ selectedGroup: item });
  }

  handleSelectedGroup = (item) => {
    this.setState({ selectedGroup: item });
  };

  render() {
    const { selectedGroup, activeSort, activeOrder } = this.state;

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
            <div className="filter" style={{ textAlign: "center" }}>
              <Row style={{ textAlign: "center" }}>
                <Filter
                  data={this.sort}
                  activeItem={activeSort}
                  onClick={this.handleSort}
                />
                <Filter
                  data={this.order}
                  activeItem={activeOrder}
                  onClick={this.handleOrder}
                />
              </Row>
            </div>
            <DebtsManager selectedGroup={selectedGroup} />
          </Col>
        </Row>
      </Container>
    );
  }
  handleSort = (selected) => {
    this.setState({ activeSort: selected.value });
  };

  handleOrder = (selected) => {
    this.setState({ activeOrder: selected.value });
  };
}

export default Body;
