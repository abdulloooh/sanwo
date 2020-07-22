import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
  currentDate = new Date(),
  onDateChange,
  dateFormat,
  label,
  registerWhichDate,
  path,
  ...rest
}) => {
  return (
    <Form.Group {...rest}>
      <Form.Label>{label}: &nbsp;</Form.Label>
      <DatePicker
        onInputClick={() => registerWhichDate(path)}
        selected={new Date(currentDate)}
        onChange={onDateChange}
        dateFormat={dateFormat}
      />
    </Form.Group>
  );
};

export default DateInput;
