import React from "react";
import { Container, Form as FormWrapper } from "react-bootstrap";
import Joi from "joi-browser";
import { trackPromise } from "react-promise-tracker";
import Form from "./common/form";
import { updateNextOfKin } from "../services/userService";
import { toast } from "react-toastify";
class NextOfKinForm extends Form {
  state = {
    data: { nextOfKin: "" },
    errors: {},
  };

  schema = {
    nextOfKin: Joi.string()
      .email({ minDomainSegments: 2 })
      .label("Next Of Kin"),
  };

  async doSubmit() {
    try {
      const { nextOfKin } = this.state.data;
      await trackPromise(updateNextOfKin(nextOfKin));

      toast.success("Success");

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
        <FormWrapper onSubmit={this.handleSubmit}>
          {this.renderInput(
            "Next of Kin",
            "nextOfKin",
            "Enter Next of Kin Email here...",
            "email"
          )}
          {this.renderButton("Update")}
        </FormWrapper>
      </Container>
    );
  }
}

export default NextOfKinForm;
