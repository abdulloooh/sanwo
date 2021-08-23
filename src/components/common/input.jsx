import React from "react";
import styles from "./../../styles/formStyle.module.scss";

const Input = ({ label, error, ...rest }) => {
  return (
    <div className={styles.inputBlock}>
      <label>{label}</label>
      <input {...rest} />
      <small className={styles.textMuted}>{writeError(error)}</small>
    </div>
  );
};

function writeError(error) {
  return (
    error &&
    (error.constructor !== Array ? (
      <div key={error} className="alert alert-danger">
        {error}
      </div>
    ) : (
      error.map((err) => (
        <div key={err} className="alert alert-danger">
          {err}
        </div>
      ))
    ))
  );
}

export default Input;
