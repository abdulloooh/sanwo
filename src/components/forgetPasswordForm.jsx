import React from "react";
import Joi from "joi-browser";
import { Link, Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

import authService from "../services/authService";
import { forgetPassword } from "../services/userService";
import Container from "./common/Container";
import Form from "./common/form";
import Footer from './common/Footer';

import styles from "./../styles/Container.module.scss";

class ForgetPassword extends Form {
  state = {
    data: { username: "", email: "" },
    errors: {},
    mailSent: "",
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
      await trackPromise(forgetPassword(this.state.data));
      this.setState({
        mailSent:
          "If your details are right, A link has been sent to your registered email, kindly follow the link to reset your password",
        data: {},
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
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
        {this.state.mailSent && (
          <div className="alert alert-danger">{this.state.mailSent}</div>
        )}

        <form onSubmit={this.handleSubmit} className={styles.Form}>
          <h2>
            <Link to="/login">SANWO</Link>
          </h2>
          <div>
            <small>Manage Your debts with SANWO</small>
            <h4>Recover your SANWO account!</h4>
          </div>

          {this.renderInput("Username", "username", "enter username")}

          {this.renderInput("Email", "email", "enter email", "email")}

          {this.renderButton("Submit")}

          <hr />

          <Footer />
        </form>
      </Container>
    );
  }
}

export default ForgetPassword;
