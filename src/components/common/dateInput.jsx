import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
  currentDate = new Date(),
  onDateChange,
  dateFormat,
  label,
  registerWhichDate,
  path,
  error,
  ...rest
}) => {
  return (
    <Form.Group {...rest}>
      <Row style={{ maxWidth: "60vw" }}>
        <Col>
          <Form.Label>{label}: &nbsp;</Form.Label>
        </Col>
        <Col>
          <DatePicker
            onInputClick={() => registerWhichDate(path)}
            selected={new Date(currentDate)}
            onChange={onDateChange}
            dateFormat={dateFormat}
          />
        </Col>
      </Row>
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

export default DateInput;
