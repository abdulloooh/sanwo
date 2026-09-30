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

    const isLong = text.length > 80;

    return (
      <span className="description-content">
        <span className={isExpanded || !isLong ? "description-full" : "description-clamped"}>
          {text}
        </span>
        {isLong && (
          <>
            {" "}
            <button
              type="button"
              className="description-more"
              onClick={this.toggleExpand}
            >
              {isExpanded ? "less" : "more"}
            </button>
          </>
        )}
      </span>
    );
  }
}

export default DescriptionCell;
