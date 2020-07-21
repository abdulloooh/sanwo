import React, { Component } from "react";
import { getDebts } from "../services/fakeDebtList";
import { getIndividualDebts } from "../services/fakeIndividualList";
import DebtsTable from "./debtsTable";

class DebtsManager extends Component {
  state = {};

  whoseMoney = (group) => {
    if (group._id !== "individual") {
      return (
        this.state.debts &&
        this.state.debts.filter((d) => d.status === group._id)
      );
    }
    //if not
    return this.state.individual;
  };

  componentDidMount() {
    let debts = getDebts();
    let individual = getIndividualDebts();
    this.setState({ debts, individual, category: "classified" });
  }

  render() {
    const { selectedGroup } = this.props;

    return (
      <>
        {/* Heading is coming */}
        <DebtsTable
          debts={this.whoseMoney(selectedGroup)}
          category={
            selectedGroup._id === "individual" ? "individual" : "classified"
          }
        />
      </>
    );
  }
}

export default DebtsManager;
