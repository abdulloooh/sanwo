import React from "react";
import { Container, Form as FormWrapper } from "react-bootstrap";
import Joi from "joi-browser";
import { trackPromise } from "react-promise-tracker";
import Form from "./common/form";
import authService from "../services/authService";
import { toast } from "react-toastify";
class Settings extends Form {
  state = {
    data: { username: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(25).required().label("username"),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("email"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  };

  async doSubmit() {
    //call the server
    try {
      const { username, email, password } = this.state.data;
      await trackPromise(authService.updateUser(username, email, password));

      toast.success("Success");

      // setTimeout(() => {
      window.location = "/";
      // }, 500);
    } catch (ex) {
      if (ex.response && ex.response.status === 406) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      } else {
        // console.log(ex.response);
        // return false;
        toast.error("Invalid request");
        // setTimeout(() => {
        window.location = "/";
        // }, 500);
      }
    }
  }

  deleteConcern = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account with its associated records"
      )
    ) {
      try {
        await trackPromise(authService.deleteUser());
      } catch (ex) {
        if (
          ex.response &&
          (ex.response.status === 400 ||
            ex.response.status === 401 ||
            ex.response.status === 403)
        )
          this.handleException();
      }
      window.location = "/login";
    } else this.props.history.push("/");
  };

  render() {
    return (
      <Container className="mt-5">
        You can change any of username, email and password but all fields must
        be filled with either new or old detail. Whatever you submit will be
        your new username, email and password
        <FormWrapper onSubmit={this.handleSubmit}>
          {this.renderInput("", "username", "old/new username")}
          {this.renderInput("", "email", "old/new email", "email")}
          {this.renderInput("", "password", "old/new password", "password")}
          {this.renderButton("Update")}
        </FormWrapper>
        {this.renderClickButton("Delete Acccount")}
      </Container>
    );
  }
}

export default Settings;
