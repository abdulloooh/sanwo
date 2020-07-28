import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getDebts } from "../services/fakeDebtList";
import { getIndividualDebts } from "../services/fakeIndividualList";
import DebtsTable from "./debtsTable";
import sortAndOrder from "../utils/sorting";
class DebtsManager extends Component {
  state = {};

  getDebts = (group) => {
    if (group._id !== "individual") {
      return (
        //sort with one of dateIncurred, dateDue, Amount. Then asc or desc
        this.state.debts &&
        this.state.debts.filter((d) => d.status === group._id)
      );
    }
    //if not
    //sort
    return this.state.individual;
  };

  componentDidMount() {
    let debts = getDebts() || [];
    let individual = getIndividualDebts() || [];
    this.setState({ debts, individual, category: "classified" });
  }

  componentDidUpdate(prevProps) {
    const { sortBy, orderBy } = this.props;
    if (prevProps.orderBy !== orderBy || prevProps.sortBy !== sortBy) {
      let { debts, individual } = this.state;
      debts = sortAndOrder(debts, sortBy, orderBy, "desc");
      individual = sortAndOrder(individual, "balance", orderBy, "desc");
      this.setState({ debts, individual });
    }
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
