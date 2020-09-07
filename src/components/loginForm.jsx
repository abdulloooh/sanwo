import React from "react";
import { Container, Form as FormWrapper } from "react-bootstrap";
import Joi from "joi-browser";
import { Link, Redirect } from "react-router-dom";
import Form from "./common/form";
import authService from "../services/authService";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(30).required().label("username"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  };

  async doSubmit() {
    //call the server
    try {
      const { username, password } = this.state.data;
      await authService.login(username, password);

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
        <FormWrapper onSubmit={this.handleSubmit}>
          {this.renderInput("Username", "username", "username")}

          {this.renderInput("Password", "password", "password")}

          {this.renderButton("Login")}
        </FormWrapper>
        <br />
        <p>
          New user? <Link to="/register">Register</Link>
        </p>
      </Container>
    );
  }
}

export default LoginForm;
