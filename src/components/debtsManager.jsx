import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getDebts as getAllDebts } from "../services/fakeDebtList";
import { getIndividualDebts } from "../services/fakeIndividualList";
import DebtsTable from "./debtsTable";
import { sortAndOrder, sortByDate } from "../utils/sorting";
import "../body.css";
import Filter from "./common/sortDropDown";
import { Row } from "react-bootstrap";

class DebtsManager extends Component {
  state = { sortBy: "dateDue", orderBy: "asc" }; //default
  sort = [
    { label: "Date Due", value: "dateDue" },
    { label: "Date Incurred", value: "dateIncurred" },
    { label: "Amount", value: "amount" },
  ];

  order = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  specialVars = {
    individual: "Total Balance",
    credit: "Total",
    debit: "Total",
  };

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
    let debts = getAllDebts() || [];
    let individual = getIndividualDebts() || [];
    //set colorcolor for total
    let totalValue = individual.filter(
      (i) => i.name === `${this.specialVars.individual}`
    );
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
      debts = this.state.debts;
      individual = this.state.individual;
    }
    debts =
      sortBy === "dateIncurred" || sortBy === "dateDue"
        ? sortByDate(debts, sortBy, orderBy, "desc") // "desc" passed here is just label for desc, asc is default
        : sortAndOrder(debts, sortBy, orderBy, "desc");
    individual = sortAndOrder(individual, "balance", "asc", "desc");

    let removeD = debts.filter((i) => i.common === "total");
    for (let item of removeD) {
      debts.splice(debts.indexOf(item), 1);
      debts.unshift(item);
    }

    let removeI = individual.filter(
      (i) => i.name === `${this.specialVars.individual}`
    );
    individual.splice(individual.indexOf(removeI[0]), 1);
    individual.unshift(removeI[0]);

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
            totalSummaryAmount: {
              name: `${this.specialVars.individual}`,
              content: (item) => (
                <span style={{ color: `${totalColor}`, fontWeight: "bold" }}>
                  {item}
                </span>
              ),
            },
            totalsLabel: {
              content: (item) => (
                <span style={{ color: "#007bff", fontWeight: "bold" }}>
                  {item}
                </span>
              ),
            },
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
