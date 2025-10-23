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
        <div className="settings-header">
          <h2 className="settings-title">Account Settings</h2>
          <p className="settings-subtitle">Manage your profile and account preferences</p>
        </div>
        
        <div className="settings-container">
          <div className="settings-section">
            <div className="section-header">
              <h4 className="section-title">Profile Information</h4>
              <p className="section-description">Update your personal details</p>
            </div>
            
            <FormWrapper onSubmit={this.doSubmit} className="settings-form">
              <div className="form-section">
                <h5 className="form-section-title">Basic Information</h5>
                {this.renderInput("Username", "username", "Enter your username", "text")}
                {this.renderInput("Email", "email", "Enter your email address", "email")}
              </div>
              
              <div className="form-section">
                <h5 className="form-section-title">Emergency Contacts</h5>
                <div className="info-box">
                  <div className="info-icon">⚠️</div>
                  <div className="info-content">
                    <h6>Important Notice</h6>
                    <p>
                      If your account is inactive for 60 days, <strong>Sanwo</strong> will send an email of your debt account to your Next of Kin and Backup emails so they can take necessary steps to settle your debts or retrieve money owed to you. <strong>No email will be sent if your debt account is clean.</strong>
                    </p>
                  </div>
                </div>
                {this.renderInput("Next of Kin", "nextOfKin", "Enter next of kin email", "email")}
                {this.renderInput("Backup Contact 1", "backup1", "Enter first backup email", "email")}
                {this.renderInput("Backup Contact 2", "backup2", "Enter second backup email", "email")}
              </div>

              <div className="form-actions">
                {this.renderButton("Update Profile")}
              </div>
            </FormWrapper>
          </div>

          <div className="settings-section">
            <div className="section-header">
              <h4 className="section-title">Security</h4>
              <p className="section-description">Change your password</p>
            </div>
            
            <FormWrapper onSubmit={this.changePassword} className="settings-form">
              <div className="form-section">
                <h5 className="form-section-title">Password Change</h5>
                {this.renderInput("Current Password", "old_password", "Enter your current password", "password")}
                {this.renderInput("New Password", "new_password", "Enter your new password", "password")}
              </div>

              <div className="form-actions">
                {this.renderButton("Update Password")}
              </div>
            </FormWrapper>
          </div>

          <div className="settings-section danger-section">
            <div className="section-header">
              <h4 className="section-title danger-title">Danger Zone</h4>
              <p className="section-description">Irreversible and destructive actions</p>
            </div>
            
            <div className="danger-content">
              <div className="danger-warning">
                <div className="warning-icon">🚨</div>
                <div className="warning-content">
                  <h6>Delete Account</h6>
                  <p>Permanently delete your account and all associated debt records. This action cannot be undone.</p>
                </div>
              </div>
              
              <div className="danger-actions">
                {this.renderClickButton("Delete Account", "danger")}
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default Settings;
