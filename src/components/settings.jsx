import React from "react";
import { Container, Form as FormWrapper } from "react-bootstrap";
import Joi from "joi-browser";
import { trackPromise } from "react-promise-tracker";
import Form from "./common/form";
import authService from "../services/authService";
import { getUser } from "../services/userService";
import { toast } from "react-toastify";
class Settings extends Form {
  state = {
    data: { username: "", email: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(25).required().label("username"),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("email"),
    // password: Joi.string().min(5).max(255).required().label("Password"),
  };

  async componentDidMount() {
    try {
      const { data } = await trackPromise(getUser());
      this.setState({ data });
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 ||
          ex.response.status === 401 ||
          ex.response.status === 403)
      )
        this.handleException(ex);
    }
  }

  async doSubmit() {
    //call the server
    try {
      const { username, email } = this.state.data;
      await trackPromise(authService.updateUser(username, email));

      toast.success("Success");

      setTimeout(() => {
        window.location = "/";
      }, 300);
    } catch (ex) {
      if (ex.response && ex.response.status === 406) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      } else {
        // console.log(ex.response);
        // return false;
        toast.error("Invalid request");
        setTimeout(() => {
          window.location = "/";
        }, 300);
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

  handleException(err) {
    if (err.response.data === "Please log in again") {
      toast.error(err.response.data);
      localStorage.removeItem("username");
      setTimeout(() => {
        window.location = "/login";
      }, 300);
      return;
    }

    toast.error(err.response.data);
    setTimeout(() => {
      window.location = "/";
    }, 300);
  }

  render() {
    return (
      <Container className="mt-5">
        Feel free to change your username or email here
        <FormWrapper onSubmit={this.handleSubmit}>
          {this.renderInput("", "username", "old/new username")}
          {this.renderInput("", "email", "old/new email", "email")}
          {/* {this.renderInput("", "password", "old/new password", "password")} */}
          {this.renderButton("Update")}
        </FormWrapper>
        {this.renderClickButton("Delete Acccount")}
      </Container>
    );
  }
}

export default Settings;
