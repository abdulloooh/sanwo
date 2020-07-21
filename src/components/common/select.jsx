import React from "react";
import { Form } from "react-bootstrap";
// value for each option : option label,option value

const Select = ({ label, options, error, ...rest }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" {...rest}>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </Form.Control>
      <Form.Text className="text-muted">{writeError(error)}</Form.Text>
    </Form.Group>
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

export default Select;
