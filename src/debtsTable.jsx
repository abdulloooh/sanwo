import React, { Component } from "react";
import { Link } from "react-router-dom";
// import authService from "../services/authService";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
//sortColumn : object
//onSort
class debtsTable extends Component {
  columns = [
    {
      path: "name",
      label: false,
      content: (item) => <Link to={`/debts/${item._id}`}>{item.value}</Link>,
    },
    { path: "description", label: false },
    { path: "dateIncurred", label: "Incurred" },
    { path: "dateDue", label: "Due" },
    { path: "amount", label: "Amount" },
  ];

  render() {
    const { debts, onSort, sortColumn } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={debts} columns={this.columns} />
      </table>
    );
  }
}

export default debtsTable;

//this was extracted here for consistency, i.e to avoid mixing low level codes with the high level codes where it was
