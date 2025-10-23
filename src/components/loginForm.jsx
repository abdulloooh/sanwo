import React from "react";
import Joi from "joi-browser";
import { Link, Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

import Container from "./common/Container";
import Form from "./common/form";
import authService from "../services/authService";

import styles from "./../styles/Container.module.scss";

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
      if (ex.response && (ex.response.status === 400 || ex.response.status === 401)) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <Container>
        <form className={styles.Form} onSubmit={this.handleSubmit}>
          <h2>
            <Link to="/login">SANWO</Link>
          </h2>

          {this.renderInput("Username", "username", "enter username")}

          {this.renderInput("Password", "password", "enter password", "password", "on")}
          <p>
            <Link to="/forgetpassword">Forgot Password?</Link>
          </p>
          {this.renderButton("Login")}

          <hr />
          <p>
            New user? <Link to="/register">Register</Link> <br />
          </p>
        </form>
      </Container>
    );
  }
}

export default LoginForm;