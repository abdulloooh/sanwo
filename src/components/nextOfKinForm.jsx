import React from "react";
import { Container, Form as FormWrapper } from "react-bootstrap";
import Joi from "joi-browser";
import { trackPromise } from "react-promise-tracker";
import Form from "./common/form";
import { updateNextOfKin } from "../services/userService";
import { toast } from "react-toastify";
class NextOfKinForm extends Form {
  state = {
    data: { nextOfKin: "", backup1: "", backup2: "" },
    errors: {},
  };

  schema = {
    nextOfKin: Joi.string().email({ minDomainSegments: 2 }).label("Next Of Kin"),
    backup1: Joi.string().email({ minDomainSegments: 2 }).label("Backup 1"),
    backup2: Joi.string().email({ minDomainSegments: 2 }).label("Backup 2"),
  };

  async doSubmit() {
    try {
      const { nextOfKin, backup1, backup2 } = this.state.data;
      await trackPromise(updateNextOfKin({ nextOfKin, backup1, backup2 }));

      toast.success("Success");
      localStorage.setItem("nextOfKins", true);

      setTimeout(() => {
        window.location = "/";
      }, 300);
    } catch (ex) {
      if (ex.response && ex.response.status === 406) {
        const errors = { ...this.state.errors };
        errors.nextOfKin = ex.response.data;
        this.setState({ errors });
      } else this.handleException(ex);
    }
  }

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
        <div className="nextofkin-header">
          <h2 className="nextofkin-title">Emergency Contacts</h2>
          <p className="nextofkin-subtitle">Configure your emergency contact information for account safety</p>
        </div>
        
        <div className="nextofkin-container">
          <div className="nextofkin-section">
            <div className="section-header">
              <h4 className="section-title">Emergency Contact Setup</h4>
              <p className="section-description">Provide trusted contacts who can be notified in case of account inactivity</p>
            </div>
            
            <div className="info-box">
              <div className="info-icon">⚠️</div>
              <div className="info-content">
                <h6>Emergency Notification System</h6>
                <p>
                  If your account is inactive for 60 days, Sanwo will send your debt summary to these contacts so they can settle your debts or recover money owed to you. <strong>No email is sent if your account is clean.</strong>
                </p>
                <p>
                  We require three email addresses to ensure at least one contact receives the notification.
                </p>
              </div>
            </div>
            
            <FormWrapper onSubmit={this.handleSubmit} className="nextofkin-form">
              <div className="form-section">
                <h5 className="form-section-title">Emergency Contacts</h5>
                {this.renderInput("Next of Kin", "nextOfKin", "Enter Next of Kin Email here...", "email")}
                {this.renderInput("Backup 1", "backup1", "Enter Backup 1 Email here...", "email")}
                {this.renderInput("Backup 2", "backup2", "Enter Backup 2 Email here...", "email")}
              </div>

              <div className="form-actions">
                {this.renderButton("Update Emergency Contacts")}
              </div>
            </FormWrapper>
          </div>
        </div>
      </Container>
    );
  }
}

export default NextOfKinForm;
