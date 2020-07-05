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
              {columns.map((column) => (
                <td key={column.path}>{this.renderCell(item, column)}</td>
              ))}
            </tr>
          ))}
      </tbody>
    );
  }
}

export default TableBody;
