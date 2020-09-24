import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import _ from "lodash";
import DateInput from "./dateInput";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const errors = {};
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    // const { error } = Joi.compile(this.schema).validate(this.state.data);
    if (!error) return null;
    error.details.map((error) => {
      //needs to ensure we only get the first error from top
      if (!errors[error.path[0]]) errors[error.path[0]] = error.message;
      return null;
    });

    return errors;
  };

  validateProperty = (path, value) => {
    if (path === "confirmPassword") return null;
    const { error } = this.schema[path].validate(value);
    // const result = Joi.validate(value, this.schema[path]).error;
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return false;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const { name: path, value } = input;
    const data = { ...this.state.data };
    data[path] = path === "amount" ? parseInt(value) : value;
    this.setState({ data });

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(path, value);
    if (!errorMessage) delete errors[path];
    else errors[path] = errorMessage;

    this.setState({ errors });
  };

  handleDateChange = (date) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const { whichDate } = this;
    data[whichDate] = date.toDateString();
    //try to validate date
    const response = this.isDatesValid(data.dateIncurred, data.dateDue);
    if (!response) {
      delete errors["dateDue"];
      this.setState({ errors });
    } else this.setState({ errors: response });
    /**
     * design quack:
     * no response: only ascertain no error in date, delete date error and set errors to old
     * if response: response is entire error object, set errors to response
     */
    this.setState({ data });
  };

  isDatesValid = (dateIncurred, dateDue) => {
    const errors = { ...this.state.errors };

    const error = new Date(dateIncurred) > new Date(dateDue);
    if (!error) return null;

    errors["dateDue"] =
      "Due date must be greater than or equal to incurred date";

    return errors;
  };

  registerWhichDate = (whichDate) => {
    this.whichDate = whichDate;
  };

  renderInput(label, path, placeholder, type = "text", newPassword) {
    const { errors, data } = this.state;
    return (
      <Input
        id={path}
        label={label}
        name={path}
        type={type}
        value={_.get(data, path) || ""}
        onChange={this.handleChange}
        error={errors[path]}
        autoComplete={newPassword}
        placeholder={placeholder}
      />
    );
  }

  renderSelect(label, path, options) {
    const { errors, data } = this.state;
    return (
      <Select
        label={label}
        id={path}
        name={path}
        value={_.get(data, path)}
        onChange={this.handleChange}
        options={options}
        error={errors[path]}
      ></Select>
    );
  }

  renderDate(label, path) {
    const { data, errors } = this.state;
    const currentDate = _.get(data, path);
    return (
      <DateInput
        registerWhichDate={this.registerWhichDate}
        currentDate={
          this.registerWhichDate === "dateDue" ? currentDate + 30 : currentDate
        }
        dateFormat="MMMM d, yyyy"
        onDateChange={this.handleDateChange}
        label={label}
        path={path}
        value={currentDate}
        error={errors[path]}
      />
    );
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderClickButton(label) {
    return (
      <button
        style={{ marginTop: "10px" }}
        type="button"
        className="btn btn-primary"
        onClick={this.deleteConcern}
      >
        {label}
      </button>
    );
  }
}
export default Form;
