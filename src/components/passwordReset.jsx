import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

import Container from "./common/Container";
import Form from "./common/form";
import Footer from './common/Footer';
import authService from "../services/authService";
import { resetPassword } from "../services/userService";

import styles from "./../styles/Container.module.scss";

class PasswordReset extends Form {
  state = {
    data: { password: "", confirmPassword: "" },
    errors: {},
  };

  schema = {
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
      .label("password")
      .required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match" } } })
      .label("password"),
    resetPasswordToken: Joi.string(),
  };

  componentDidMount() {
    let data = { ...this.state.data };
    const resetPasswordToken = this.props.location.pathname.split("/")[2];
    data.resetPasswordToken = resetPasswordToken;
    this.setState({ data });
  }

  async doSubmit() {
    //call the server
    try {
      await trackPromise(
        resetPassword(
          this.state.data.password,
          this.state.data.resetPasswordToken
        )
      );

      toast("Password successfully updated");
      setTimeout(() => {
        window.location = "/login";
      }, 300);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data;
        this.setState({ errors });
      } else if (ex.response && ex.response.status === 401) {
        toast.error(ex.response.data);
        setTimeout(() => {
          window.location = "/login";
        }, 300);
      }
    }
  }

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <Container>
        <form onSubmit={this.handleSubmit} className={styles.Form}>
          <h2>
            <Link to="/login">SANWO</Link>
          </h2>
          <div>
            <small>Manage Your debts with SANWO</small>
            <h4>Create a new password for your SANWO account!</h4>
          </div>

          {this.renderInput(
            "New Password",
            "password",
            "enter password",
            "password"
          )}
          {this.renderInput(
            "Confirm Password",
            "confirmPassword",
            "enter password",
            "password"
          )}
          {this.renderButton("Submit")}
          <Footer />
        </form>
      </Container>
    );
  }
}

export default PasswordReset;
