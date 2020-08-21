import React, { Component } from "react";

//data
//columns
class TableBody extends Component {
  renderCell = (item, column, specialCol) => {
    if (item.common && specialCol)
      return specialCol.totalsLabel.content(item[column.path]);

    if (column.content) return column.content(item);

    return specialCol && item.name === specialCol.totalSummaryAmount.name
      ? specialCol.totalSummaryAmount.content(item[column.path])
      : item[column.path];
  };

  render() {
    const { data, columns, specialCol } = this.props;
    return (
      <tbody>
        {data &&
          data.map((item) => (
            <tr key={item._id || item.name}>
              <td>
                {columns.map((c) => (
                  <p
                    className={
                      c.path === "description" ? "description" : "" //for external styling of description
                    }
                    key={c.path}
                  >
                    {/* label */}
                    {this.excludeAmountOrBalance(c) && c.label && `${c.label}:`}

                    {/* value */}
                    {this.excludeAmountOrBalance(c) &&
                      this.renderCell(item, c, specialCol)}
                  </p>
                ))}
              </td>
              <td>
                {this.renderCell(
                  item,
                  columns.find((c) => !this.excludeAmountOrBalance(c)), //that is include amount or balance
                  specialCol
                )}
              </td>
            </tr>
          ))}
      </tbody>
    );
  }

  excludeAmountOrBalance(column) {
    return !(column.path === "amount" || column.path === "balance");
  }
}

export default TableBody;
