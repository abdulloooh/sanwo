import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableBody from "./common/tableBody";
/*
Interface
==>debts
*/
class DebtsTable extends Component {
  columns = [
    {
      path: "name",
      label: false,
      content: (item) => <Link to={`/debts/${item._id}`}>{item.name}</Link>,
    },
    { path: "description", label: false },
    { path: "dateIncurred", label: "Incurred" },
    { path: "dateDue", label: "Due" },
    { path: "amount", label: "Amount" },
  ];

  render() {
    const { debts } = this.props;

    return (
      <table className="table">
        <TableBody data={debts} columns={this.columns} />
      </table>
    );
  }
}

export default DebtsTable;

//this was extracted here for consistency, i.e to avoid mixing low level codes with the high level codes where it was
