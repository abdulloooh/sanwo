import React, { Component } from "react";
import { getDebts } from "../services/fakeDebtList";
import DebtsTable from "./debtsTable";

class DebtsManager extends Component {
  state = {};

  whoseMoney = (group) => {
    if (group._id === "individual") {
      /*do sth */
    }
    return (
      this.state.debts && this.state.debts.filter((d) => d.status === group._id)
    );
  };

  componentDidMount() {
    let debts = getDebts();
    this.setState({ debts });
  }

  render() {
    const { selectedGroup } = this.props;

    return (
      <>
        {/* Heading is coming */}
        <DebtsTable debts={this.whoseMoney(selectedGroup)} />
      </>
    );
  }
}

export default DebtsManager;
