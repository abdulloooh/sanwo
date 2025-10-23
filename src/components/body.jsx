import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ListGroup from "./common/listGroup";
import DebtsManager from "./debtsManager";
import "../styles/body.scss";

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
    const queryParams = new URLSearchParams(this.props.location.search);
    const tab = queryParams.get("tab");

    const item = items.find((i) => i._id === tab) || items[0];
    this.setState({ selectedGroup: item });
  }

  componentDidUpdate(prevProps) {
    // Re-check when location changes
    if (prevProps.location.search !== this.props.location.search) {
      const queryParams = new URLSearchParams(this.props.location.search);
      const tab = queryParams.get("tab");
      
      const item = items.find((i) => i._id === tab) || items[0];
      this.setState({ selectedGroup: item });
    }
  }

  handleDataLoaded = (debts, individual) => {
    // Check if current tab has data, if not, switch to first tab with data
    const currentTab = this.state.selectedGroup._id;
    const hasData = this.checkTabHasData(currentTab, debts, individual);
    
    if (!hasData) {
      const firstTabWithData = this.findFirstTabWithData(debts, individual);
      if (firstTabWithData && firstTabWithData._id !== currentTab) {
        console.log(`Switching from ${currentTab} to ${firstTabWithData._id} because ${currentTab} has no data`);
        this.setState({ selectedGroup: firstTabWithData });
      }
    }
  };

  checkTabHasData = (tabId, debts, individual) => {
    if (tabId === "individual") {
      const hasData = individual && individual.length > 0;
      console.log(`Checking individual tab: ${hasData}`, individual);
      return hasData;
    } else {
      // Check for actual debt records (excluding summary data)
      const hasData = debts && debts.some(debt => debt.status === tabId && debt.common !== "total");
      console.log(`Checking ${tabId} tab: ${hasData}`, debts?.filter(debt => debt.status === tabId && debt.common !== "total"));
      return hasData;
    }
  };

  findFirstTabWithData = (debts, individual) => {
    // Check each tab in order of preference
    for (const item of items) {
      if (this.checkTabHasData(item._id, debts, individual)) {
        console.log(`Found first tab with data: ${item._id}`);
        return item;
      }
    }
    // If no tab has data, return the first tab (default)
    console.log('No tab has data, returning default');
    return items[0];
  };

  handleSelectedGroup = (item) => {
    this.setState({ selectedGroup: item });
  };

  render() {
    const { selectedGroup } = this.state;

    return (
      <Container>
        <Row>
          <Col lg={2} md={3} sm={12}>
            <ListGroup
              items={items}
              keyProperty="_id"
              valueProperty="label"
              selectedItem={selectedGroup}
              onItemSelect={this.handleSelectedGroup}
            />
          </Col>

          <Col lg={10} md={9} sm={12}>
            <DebtsManager 
              selectedGroup={selectedGroup} 
              onDataLoaded={this.handleDataLoaded}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Body;
