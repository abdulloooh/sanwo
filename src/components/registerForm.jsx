import React from "react";
import { Container, Form as FormWrapper } from "react-bootstrap";
import Joi from "joi-browser";
import { trackPromise } from "react-promise-tracker";
import { Link, Redirect } from "react-router-dom";
import authService from "../services/authService";
import { register } from "../services/userService";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(30).required().label("username"),
    password: Joi.string().min(5).max(255).required().label("Password"),
  };

  doSubmit = async () => {
    //call the server
    try {
      const { data: username } = await trackPromise(register(this.state.data));

      // authService.loginWithJWT(response.headers["x-auth-token"]);
      authService.saveCurrentUser(username);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <Container className="mt-5">
        <FormWrapper action="" onSubmit={this.handleSubmit}>
          {this.renderInput("Username", "username", "username")}
          {this.renderInput("Password", "password", "password")}
          {this.renderButton("Register")}
        </FormWrapper>
        <br />
        <p>
          Already a user? <Link to="/login">Login</Link>
        </p>
      </Container>
    );
  }
}

export default RegisterForm;
