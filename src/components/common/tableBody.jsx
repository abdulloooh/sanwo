import React, { Component } from "react";

//data
//columns
class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return item[column.path];
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data &&
          data.map((item) => (
            <tr key={item._id}>
              <td>
                {columns.map((column) => (
                  <p
                    className={
                      column.path === "description" ? "description" : ""
                    }
                    key={column.path}
                  >
                    {!(column.path === "amount") &&
                      this.renderCell(item, column)}
                  </p>
                ))}
              </td>
              <td>
                {this.renderCell(
                  item,
                  columns.find((c) => c.path === "amount")
                )}
              </td>
            </tr>
          ))}
      </tbody>
    );
  }
}

export default TableBody;
