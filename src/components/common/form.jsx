import React, { Component } from "react";
import Joi from "@hapi/joi";
import Input from "./input";
import Select from "./select";
import _ from "lodash";
import DateInput from "./dateInput";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const errors = {};
    // const options = { abortEarly: false };
    // const result = Joi.validate(this.state.data, this.schema, options);
    const { error } = Joi.compile(this.schema).validate(this.state.data);

    if (!error) return null;

    // error.details.map((error) => {
    //   if (errors[error.path[0]])
    //     return errors[error.path[0]].push(error.message);
    //   else return (errors[error.path[0]] = new Array(error.message));
    // });
    //because I want to collect all errors, if not I should  only get first and not an array

    error.details.map((error) => {
      //needs to ensure we only get the first error from top
      if (!errors[error.path[0]]) errors[error.path[0]] = error.message;
      return null;
    });

    return errors;
  };

  validateProperty = (path, value) => {
    const { error } = this.schema[path].validate(value);
    // const result = Joi.validate(value, this.schema[path]).error;
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return false;
    // const username = this.username.current.value;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const { name: path, value } = input;
    // console.log(value);
    const data = { ...this.state.data };
    data[path] = value;
    this.setState({ data });

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(path, value);
    if (!errorMessage) delete errors[path];
    else errors[path] = errorMessage;

    this.setState({ errors });
  };

  handleDateChange = (date) => {
    const data = { ...this.state.data };
    data[this.whichDate] = date.toDateString();
    this.setState({ data });
  };

  registerWhichDate = (whichDate) => {
    this.whichDate = whichDate;
  };

  renderInput(label, path, type = "text") {
    const { errors, data } = this.state;
    return (
      <Input
        id={path}
        label={label}
        name={path}
        type={type}
        value={_.get(data, path)}
        onChange={this.handleChange}
        error={errors[path]}
        autoComplete="new-password"
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
    const { data } = this.state;
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
}
export default Form;
