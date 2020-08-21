import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableBody from "./common/tableBody";
import { Table } from "react-bootstrap";
/*
Interface
==>debts
*/
class DebtsTable extends Component {
  columns = [
    {
      path: "name",
      label: false,
      content: (item) => (
        <Link style={{ color: "rgb(0, 123, 150)" }} to={`/debts/${item._id}`}>
          <u>{item.name}</u>
        </Link>
      ),
    },
    { path: "amount", label: "Amount" },
    { path: "description", label: false },
    { path: "dateIncurred", label: "Incurred" },
    { path: "dateDue", label: "Due" },
  ];
  individualColumns = [
    {
      path: "name",
      label: false,
      content: (item) => <strong>{item.name}</strong>,
    },
    { path: "tome", label: "Owed To Me" },
    { path: "byme", label: "Owed By Me" },
    { path: "balance", label: "Balance" },
  ];

  render() {
    const { debts, category, specialCol } = this.props;

    return (
      <Table id="debtBody" hover responsive>
        <TableBody
          data={debts}
          columns={
            category === "individual" ? this.individualColumns : this.columns
          }
          specialCol={specialCol}
        />
      </Table>
    );
  }
}

export default DebtsTable;

//this was extracted here for consistency, i.e to avoid mixing low level codes with the high level codes where it was
