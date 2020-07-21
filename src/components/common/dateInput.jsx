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
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
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
