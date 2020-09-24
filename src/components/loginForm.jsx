import React from "react";
import { Container, Form as FormWrapper } from "react-bootstrap";
import Joi from "joi-browser";
import { Link, Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import Form from "./common/form";
import authService from "../services/authService";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(25).required().label("username"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  };

  async doSubmit() {
    //call the server
    try {
      const { username, password } = this.state.data;
      await trackPromise(authService.login(username, password));

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

          {this.renderInput(
            "Password",
            "password",
            "password",
            "password",
            "on"
          )}
          <p>
            <Link to="/forgetpassword">Forget Password?</Link>
          </p>
          {this.renderButton("Login")}
        </FormWrapper>
        <br />
        <p>
          New user? <Link to="/register">Register</Link> <br />
        </p>
        <p className="loginFooter">
          <small>
            Built with{" "}
            <span role="img" aria-label="heart emoji">
              💟
            </span>{" "}
            by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/abdulloooh"
            >
              Abdullah |
            </a>{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/abdulloooh/sanwo/"
            >
              Contribute |{" "}
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/abdulloooh"
            >
              Feedback?{" "}
            </a>
          </small>
        </p>
      </Container>
    );
  }
}

export default LoginForm;
