import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavbarNavGuest from "./components/common/navbarNavGuest";
import Body from "./components/body";
import DebtForm from "./components/debtForm";
import LoginForm from "./components/loginForm";
import forgetPasswordForm from "./components/forgetPasswordForm";
import passwordReset from "./components/passwordReset";
import Logout from "./components/logoutForm";
import RegisterForm from "./components/registerForm";
import NextOfKinForm from "./components/nextOfKinForm";
import Settings from "./components/settings";
import ProtectedRoute from "./components/common/protectedRoute";
import NotFound from "./components/notFound";
import authService from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const username = authService.getCurrentUser() || "Sanwo";
  return (
    <>
      <ToastContainer />
      <NavbarNavGuest username={username} />
      <Switch>
        <Route path="/register" component={RegisterForm}></Route>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/forgetpassword" component={forgetPasswordForm}></Route>
        <Route path="/password-reset" component={passwordReset}></Route>
        <Route path="/logout" component={Logout}></Route>

        <ProtectedRoute path="/debts/:id" component={DebtForm}></ProtectedRoute>
        <ProtectedRoute path="/debts/new" component={DebtForm}></ProtectedRoute>
        <ProtectedRoute path="/nextofkin" component={NextOfKinForm} />
        <ProtectedRoute path="/settings" component={Settings}></ProtectedRoute>
        <ProtectedRoute exact path="/" component={Body}></ProtectedRoute>

        <Redirect path="/debts" to="/" />

        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </>
  );
}

export default App;
