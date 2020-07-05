import React, { Component } from "react";
import { getDebts } from "../services/fakeDebtList";
import DebtsTable from "./debtsTable";

class DebtsManager extends Component {
  state = {};

  componentDidMount() {
    let debts = getDebts();
    this.setState({ debts });
  }

  render() {
    return (
      <>
        <DebtsTable debts={this.state.debts} />
      </>
    );
  }
}

export default DebtsManager;
