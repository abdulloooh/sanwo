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
    data: {
      username: "",
      email: "",
      old_password: "",
      new_password: "",
      nextOfKin: "",
      backup1: "",
      backup2: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(25).label("username"),
    email: Joi.string().email({ minDomainSegments: 2 }).label("email"),
    old_password: Joi.string().min(5).max(255).label("Old Password"),
    new_password: Joi.string().min(5).max(255).label("New Password"),
    nextOfKin: Joi.string().email({ minDomainSegments: 2 }).label("Next Of Kin"),
    backup1: Joi.string().email({ minDomainSegments: 2 }).label("Backup 1"),
    backup2: Joi.string().email({ minDomainSegments: 2 }).label("Backup 2"),
  };

  async componentDidMount() {
    try {
      const { data } = await trackPromise(getUser());
      this.setState({ data });
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 || ex.response.status === 401 || ex.response.status === 403)
      )
        this.handleException(ex);
    }
  }

  doSubmit = async (e) => {
    e.preventDefault();
    let errors = this.validate();

    const { username, email, nextOfKin, backup1, backup2 } = this.state.data;
    if (!username || !email || !nextOfKin || !backup1 || !backup2) {
      errors = {};
      errors.backup2 = "Please fill in all fields";
    }

    this.setState({ errors: errors || {} });
    if (errors) return false;

    try {
      await trackPromise(authService.updateUser({ username, email, nextOfKin, backup1, backup2 }));

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
  };

  deleteConcern = async () => {
    if (
      window.confirm("Are you sure you want to delete your account with its associated records")
    ) {
      try {
        await trackPromise(authService.deleteUser());
      } catch (ex) {
        if (
          ex.response &&
          (ex.response.status === 400 || ex.response.status === 401 || ex.response.status === 403)
        )
          this.handleException(ex);
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

  changePassword = async (e) => {
    e.preventDefault();
    let errors = this.validate();

    if (!this.state.data.old_password || !this.state.data.new_password) {
      errors = {};
      errors.new_password = "Passwords should not be empty";
    }

    this.setState({ errors: errors || {} });
    if (errors) return false;

    try {
      const { old_password, new_password } = this.state.data;
      await trackPromise(authService.updatePassword(old_password, new_password));

      toast("Password update successful");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 406) {
        const errors = { ...this.state.errors };
        errors.old_password = ex.response.data;
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
  };

  render() {
    return (
      <Container className="mt-5">
        <h4>Profile</h4>
        <hr />
        <FormWrapper onSubmit={this.doSubmit}>
          {this.renderInput("Username", "username", "enter new username...")}
          {this.renderInput("Email", "email", "enter new email...", "email")}
          {this.renderInput("Next of Kin", "nextOfKin", "enter next of kin email here...", "email")}
          {this.renderInput("Backup 1", "backup1", "enter backup 1 email here...", "email")}
          {this.renderInput("Backup 2", "backup2", "enter backup 2 email here...", "email")}
          {this.renderButton("Update")}
        </FormWrapper>
        <div className="deleteButton">{this.renderClickButton("Delete Acccount")}</div>
        <br /> <br />
        <hr />
        <h4>Change Password</h4>
        <hr />
        <FormWrapper onSubmit={this.changePassword}>
          {this.renderInput("", "old_password", "old password", "password")}
          {this.renderInput("", "new_password", "new password", "password")}
          {this.renderButton("Update Password")}
        </FormWrapper>
      </Container>
    );
  }
}

export default Settings;
