import React from "react";
import { Container, Form as FormWrapper } from "react-bootstrap";
import Joi from "joi-browser";
import { trackPromise } from "react-promise-tracker";
import { Link, Redirect } from "react-router-dom";
import authService from "../services/authService";
import { register } from "../services/userService";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(30).label("username").required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("email"),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
      .label("Password")
      .required(),
  };

  doSubmit = async () => {
    //call the server
    try {
      const { data } = await trackPromise(register(this.state.data));

      // authService.loginWithJWT(response.headers["x_auth_token"]);
      authService.saveCurrentUser(data.username);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <Container className="mt-4">
        <div style={{ color: "rgb(0, 123, 255)" }}>
          Sanwo is a debt management system{" "}
          <span role="img" aria-label="emoji">
            🏦
          </span>{" "}
          for recording of debts owed to you{" "}
          <span role="img" aria-label="emoji">
            🤑
          </span>{" "}
          and by you{" "}
          <span role="img" aria-label="emoji">
            💰
          </span>{" "}
          , calculates your debit and credit balance, prepares your record
          summary{" "}
          <span role="img" aria-label="emoji">
            👨‍💻
          </span>{" "}
          and alert{" "}
          <span role="img" aria-label="emoji">
            🔈
          </span>{" "}
          you via your email daily for any new due debts (if any)
        </div>{" "}
        <hr />
        <FormWrapper action="" onSubmit={this.handleSubmit}>
          {this.renderInput("Username", "username", "enter username")}
          {this.renderInput("Email", "email", "your email", "email")}
          {this.renderInput(
            "Password",
            "password",
            "your password",
            "password",
            "new-password"
          )}
          {this.renderButton("Register")}
        </FormWrapper>
        <hr />
        <p>
          Already a user? <Link to="/login">Login</Link>
        </p>
        {/* <p className="registerFooter">
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
        </p> */}
      </Container>
    );
  }
}

export default RegisterForm;
