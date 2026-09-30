import React, { Component } from "react";

class DescriptionCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toggleExpand = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    const { text } = this.props;
    const { isExpanded } = this.state;

    if (!text) return null;

    // Simple approach: show full text if short, truncate if long
    const isLong = text.length > 80; // ~2 lines worth

    if (!isLong) {
      return <span>{text}</span>;
    }

    return (
      <span className="description-cell">
        <span className={isExpanded ? "description-full" : "description-truncated"}>
          {text}
        </span>
        {" "}
        <button
          type="button"
          className="description-toggle"
          onClick={this.toggleExpand}
        >
          {isExpanded ? "less" : "more"}
        </button>
      </span>
    );
  }
}

export default DescriptionCell;
