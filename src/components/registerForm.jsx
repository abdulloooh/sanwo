import React from "react";
import Joi from "joi-browser";
import { trackPromise } from "react-promise-tracker";
import { Link, Redirect } from "react-router-dom";

import authService from "../services/authService";
import { register } from "../services/userService";
import Container from "./common/Container";
import Form from "./common/form";

import styles from "./../styles/Container.module.scss";

class RegisterForm extends Form {
  state = {
    data: { username: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(30).label("username").required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required().label("email"),
    password: Joi.string().min(5).max(255).required().label("Password").required(),
  };

  doSubmit = async () => {
    //call the server
    try {
      const {
        data: { username, token },
      } = await trackPromise(register(this.state.data));

      authService.saveCurrentUser({ username, token });
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
      <Container>
        {/* <div style={{ color: "rgb(0, 123, 255)" }}>
          Sanwo is a debt management system
          <span role="img" aria-label="emoji">
            🏦
          </span>
          for recording of debts owed to you
          <span role="img" aria-label="emoji">
            🤑
          </span>
          and by you
          <span role="img" aria-label="emoji">
            💰
          </span>
          , calculates your debit and credit balance, prepares your record
          summary
          <span role="img" aria-label="emoji">
            👨‍💻
          </span>
          and alert
          <span role="img" aria-label="emoji">
            🔈
          </span>
          you via your email daily for any new due debts (if any)
        </div>
        <hr /> */}
        <form onSubmit={this.handleSubmit} className={styles.Form}>
          <h2>
            <Link to="/login">SANWO</Link>
          </h2>
          <div>
            <small>Manage Your debts with SANWO</small>
          </div>

          {this.renderInput("Username", "username", "enter username")}
          {this.renderInput("Email", "email", "your email", "email")}
          {this.renderInput("Password", "password", "your password", "password", "new-password")}
          {this.renderButton("Register")}

          <hr />
          <p>
            Already a user? <Link to="/login">Login</Link>
          </p>
        </form>
      </Container>
    );
  }
}

export default RegisterForm;
