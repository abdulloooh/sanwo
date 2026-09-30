import React, { Component } from "react";

class TruncatedText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      isTruncated: false,
    };
    this.textRef = React.createRef();
  }

  componentDidMount() {
    this.checkTruncation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.checkTruncation();
    }
  }

  checkTruncation = () => {
    const element = this.textRef.current;
    if (element) {
      // Check if content is overflowing
      const isTruncated = element.scrollHeight > element.clientHeight || 
                          element.scrollWidth > element.clientWidth;
      if (isTruncated !== this.state.isTruncated) {
        this.setState({ isTruncated });
      }
    }
  };

  toggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    const { text, maxLines = 2 } = this.props;
    const { isExpanded, isTruncated } = this.state;

    if (!text) return null;

    return (
      <div className="truncated-text-wrapper">
        <div
          ref={this.textRef}
          className={`truncated-text ${isExpanded ? 'expanded' : 'collapsed'}`}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: isExpanded ? 'unset' : maxLines,
            WebkitBoxOrient: 'vertical',
            overflow: isExpanded ? 'visible' : 'hidden',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
          }}
        >
          {text}
        </div>
        {isTruncated && (
          <button
            type="button"
            className="truncate-toggle"
            onClick={this.toggleExpand}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              cursor: 'pointer',
              padding: '2px 4px',
              fontSize: '0.85em',
              fontWeight: '600',
              marginTop: '2px',
              textDecoration: 'underline',
            }}
          >
            {isExpanded ? 'less' : 'more'}
          </button>
        )}
      </div>
    );
  }
}

export default TruncatedText;
