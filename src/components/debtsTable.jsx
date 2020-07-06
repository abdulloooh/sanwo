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
      content: (item) => <Link to={`/debts/${item._id}`}>{item.name}</Link>,
    },
    { path: "amount", label: "Amount" },
    { path: "description", label: false },
    { path: "dateIncurred", label: "Incurred" },
    { path: "dateDue", label: "Due" },
  ];

  render() {
    const { debts } = this.props;

    return (
      <Table id="debtBody" hover responsive>
        <TableBody data={debts} columns={this.columns} />
      </Table>
    );
  }
}

export default DebtsTable;

//this was extracted here for consistency, i.e to avoid mixing low level codes with the high level codes where it was
