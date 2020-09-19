import { Component } from "react";
import { logout } from "../services/authService";
import { trackPromise } from "react-promise-tracker";

class Logout extends Component {
  async componentDidMount() {
    await trackPromise(logout());
    window.location = "/login";
  }

  render() {
    return null;
  }
}

export default Logout;
