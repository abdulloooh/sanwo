import React from "react";
import { Container, Form as FormWrapper } from "react-bootstrap";
import Joi from "joi-browser";
import { Link, Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import Form from "./common/form";
import authService from "../services/authService";
import { forgetPassword } from "../services/userService";
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
      <Container className="mt-5">
        <h5>
          <u>Password Reset Request</u>
        </h5>
        <br />

        {this.state.mailSent && (
          <div className="alert alert-danger">{this.state.mailSent}</div>
        )}

        <FormWrapper onSubmit={this.handleSubmit}>
          {this.renderInput("Username", "username", "username")}

          {this.renderInput("Email", "email", "email", "email")}

          {this.renderButton("Submit")}
        </FormWrapper>
        <br />
        <p>
          <Link to="/login">Login?</Link>
        </p>
      </Container>
    );
  }
}

export default ForgetPassword;
