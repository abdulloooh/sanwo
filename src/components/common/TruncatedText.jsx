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

    const maxLength = 100;
    const isLong = text.length > maxLength;

    if (!isLong) {
      return text;
    }

    if (isExpanded) {
      return (
        <>
          {text}{" "}
          <span
            role="button"
            tabIndex={0}
            className="description-link"
            onClick={this.toggleExpand}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                this.toggleExpand(e);
              }
            }}
          >
            less
          </span>
        </>
      );
    }

    // Truncated: find a good break point
    let truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > maxLength - 20) {
      truncated = truncated.substring(0, lastSpace);
    }

    return (
      <>
        {truncated}...{" "}
        <span
          role="button"
          tabIndex={0}
          className="description-link"
          onClick={this.toggleExpand}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              this.toggleExpand(e);
            }
          }}
        >
          more
        </span>
      </>
    );
  }
}

export default DescriptionCell;
