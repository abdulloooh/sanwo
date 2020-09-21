import React from "react";
import { Container, Form as FormWrapper } from "react-bootstrap";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import Form from "./common/form";
import authService from "../services/authService";
import { resetPassword } from "../services/userService";
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
      <Container className="mt-5">
        <h5>
          <u>Password Reset</u>
        </h5>
        <br />

        <FormWrapper onSubmit={this.handleSubmit}>
          {this.renderInput(
            "New Password",
            "password",
            "password...",
            "password"
          )}
          {this.renderInput(
            "Confirm Password",
            "confirmPassword",
            "password...",
            "password"
          )}
          {this.renderButton("Submit")}
        </FormWrapper>
        <br />
      </Container>
    );
  }
}

export default PasswordReset;
