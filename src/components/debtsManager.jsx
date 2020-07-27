import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getDebts } from "../services/fakeDebtList";
import { getIndividualDebts } from "../services/fakeIndividualList";
import DebtsTable from "./debtsTable";

class DebtsManager extends Component {
  state = {};

  getDebts = (group) => {
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
    let debts = getDebts() || [];
    let individual = getIndividualDebts() || [];
    this.setState({ debts, individual, category: "classified" });
  }

  render() {
    const { selectedGroup } = this.props;
    if (this.state.debts && this.state.debts.length === 0)
      return (
        <p>
          Nothing to see yet, <Link to="/debts/new">Add New</Link> Debt
        </p>
      );

    return (
      <>
        {/* Heading is coming */}
        <DebtsTable
          debts={this.getDebts(selectedGroup)}
          category={
            selectedGroup._id === "individual" ? "individual" : "classified"
          }
        />
      </>
    );
  }
}

export default DebtsManager;
