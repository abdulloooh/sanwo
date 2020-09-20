import React from "react";
import { Container, Form as FormWrapper } from "react-bootstrap";
import Joi from "joi-browser";
import { Link, Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import Form from "./common/form";
import authService from "../services/authService";
class LoginForm extends Form {
  state = {
    data: { username: "", email: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(25).required().label("username"),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("email"),
  };

  async doSubmit() {
    //call the server
    try {
      const { username, email } = this.state.data;
      //   await trackPromise(authService.login(email, password));

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 || ex.response.status === 401)
      ) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <Container className="mt-5">
        <h5>
          <u>Password Reset Request</u>
        </h5>
        <br />
        <FormWrapper onSubmit={this.handleSubmit}>
          {this.renderInput("Username", "username", "username")}

          {this.renderInput("Email", "email", "email", "email")}

          {this.renderButton("Submit")}
        </FormWrapper>
        <br />
        <p>
          Remember password now? <Link to="/login">Login</Link>
        </p>
      </Container>
    );
  }
}

export default LoginForm;
