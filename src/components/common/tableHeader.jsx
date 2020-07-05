import React, { Component } from "react";

//columns: Array
//sortColumn : obj
//onSort : func
class TableHeader extends Component {
  raiseSort = (path) => {
    let order = "asc";
    if (path === this.props.sortColumn.path) {
      order = this.props.sortColumn.order === "asc" ? "desc" : "asc";
    }
    this.props.onSort({ path, order });
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => {
                this.raiseSort(column.path);
              }}
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
