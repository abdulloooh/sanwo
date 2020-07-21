import React from "react";
import { Form } from "react-bootstrap";
const Input = ({ label, error, ...rest }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} />
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

export default Input;
