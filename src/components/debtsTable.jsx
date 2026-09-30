import React, { Component } from "react";
import { Link } from "react-router-dom";
import TableBody from "./common/tableBody";
import { Table } from "react-bootstrap";
import "../styles/empty-state.scss";
/*
Interface
==>debts
*/
class DebtsTable extends Component {
  columns = [
    {
      path: "name",
      label: false,
      content: (item) => {
        const isOverdue = item.dateDue && Date.now() > Date.parse(item.dateDue);
        const isCleared = item.clearedAt != null;
        const color = isCleared ? "gray" : (isOverdue ? "red" : "rgb(0, 123, 150)");
        
        return (
          <Link 
            style={{ 
              color: color,
              textDecoration: isCleared ? 'line-through' : 'none'
            }} 
            to={`/debts/${item._id}`}
          >
            <u>{item.name}</u>
            {isCleared && <span style={{ marginLeft: '8px', fontSize: '0.85em' }}>✓</span>}
          </Link>
        );
      },
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
    const { debts, category, selectedGroupId, specialCol } = this.props;

    // Show empty state for cleared tab if no cleared debts
    if (selectedGroupId === "cleared" && (!debts || debts.length === 0)) {
      return (
        <div className="empty-state">
          <div className="empty-state-icon">✓</div>
          <h4 className="empty-state-title">No cleared debts yet</h4>
          <p className="empty-state-text">
            Debts you mark as paid or settled will appear here.
          </p>
        </div>
      );
    }

    return (
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <Table id="debtBody" hover responsive>
          <TableBody
            data={debts}
            columns={
              category === "individual" ? this.individualColumns : this.columns
            }
            specialCol={specialCol}
          />
        </Table>
      </div>
    );
  }
}

export default DebtsTable;

//this was extracted here for consistency, i.e to avoid mixing low level codes with the high level codes where it was
