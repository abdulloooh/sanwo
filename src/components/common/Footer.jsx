import React from "react";

const Container = () => {
  return (
    <p className="loginFooter">
      <small>
        Built with
        <span role="img" aria-label="heart emoji">
        {" "}
          💟
        </span>
        {" "}
        by 
        {" "}
        <a
          href="mailto:abdulllooohhh@gmail.com?subject=Contact from Sanwo App&body=Hello Abdullah,"
        >
          Abdullah |
          {" "}
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/abdulloooh/sanwo/"
        >
          Contribute |
          {" "}
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/abdulloooh/sanwo/issues"
        >
          Feedback?
        </a>
      </small>
    </p>
  );
};

export default Container;
