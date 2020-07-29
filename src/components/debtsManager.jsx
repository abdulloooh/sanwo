import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getDebts } from "../services/fakeDebtList";
import { getIndividualDebts } from "../services/fakeIndividualList";
import DebtsTable from "./debtsTable";
import { sortAndOrder, sortByDate } from "../utils/sorting";
import "../body.css";
import Filter from "./common/sortDropDown";
import { Row } from "react-bootstrap";

class DebtsManager extends Component {
  state = { sortBy: "dateDue", orderBy: "asc" };
  sort = [
    { label: "Date Due", value: "dateDue" },
    { label: "Date Incurred", value: "dateIncurred" },
    { label: "Amount", value: "amount" },
  ];

  order = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];
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
    //set color for total
    let totalValue = individual.filter((i) => i.name === "Total Balance");
    let totalColor = Number(totalValue[0].balance) < 0 ? "red" : "green";

    this.setState({ debts, individual, category: "classified", totalColor });
    this.sortAndUpdate(
      this.state.sortBy,
      this.state.orderBy,
      debts,
      individual
    );
  }

  // componentDidUpdate(prevProps) {
  //   const { sortBy, orderBy } = this.props;
  //   let { debts, individual } = this.state;
  //   if (prevProps.orderBy !== orderBy || prevProps.sortBy !== sortBy) {
  //     console.log("sd");
  //     this.sortAndUpdate(debts, individual);
  //   }
  // }

  sortAndUpdate = (sortBy, orderBy, unsortedDebts, unsortedIndividual) => {
    if (unsortedDebts && unsortedIndividual) {
      var debts = unsortedDebts,
        individual = unsortedIndividual;
    } else {
      var { debts, individual } = this.state;
    }
    debts =
      sortBy === "dateIncurred" || sortBy === "dateDue"
        ? sortByDate(debts, sortBy, orderBy, "desc")
        : sortAndOrder(debts, sortBy, orderBy, "desc");
    individual = sortAndOrder(individual, "balance", "asc", "desc");

    let remove = individual.filter((i) => i.name === "Total Balance");
    console.log(remove, individual);
    individual.splice(individual.indexOf(remove[0]), 1);
    individual.unshift(remove[0]);

    this.setState({ debts, individual });
  };

  render() {
    const { selectedGroup } = this.props;
    const { sortBy, orderBy, totalColor } = this.state;
    if (this.state.debts && this.state.debts.length === 0)
      return (
        <p>
          Nothing to see yet, <Link to="/debts/new">Add New</Link> Debt
        </p>
      );
    return (
      <>
        {selectedGroup._id !== "individual" && (
          <div className="filter" style={{ textAlign: "center" }}>
            <Row style={{ textAlign: "center" }}>
              <Filter
                data={this.sort}
                activeItem={sortBy}
                onClick={this.handleSort}
              />
              <Filter
                data={this.order}
                activeItem={orderBy}
                onClick={this.handleOrder}
              />
            </Row>
          </div>
        )}
        <DebtsTable
          debts={this.getDebts(selectedGroup)}
          category={
            selectedGroup._id === "individual" ? "individual" : "classified"
          }
          specialCol={{
            name: "Total Balance",
            content: (item) => (
              <span style={{ color: `${totalColor}`, fontWeight: "bold" }}>
                {item}
              </span>
            ),
          }}
        />
      </>
    );
  }

  handleSort = (selected) => {
    const sortBy = selected.value;
    let { orderBy } = this.state;
    this.sortAndUpdate(sortBy, orderBy);
    this.setState({ sortBy });
  };

  handleOrder = (selected) => {
    const orderBy = selected.value;
    let { sortBy } = this.state;
    this.sortAndUpdate(sortBy, orderBy);
    this.setState({ orderBy });
  };
}

export default DebtsManager;
