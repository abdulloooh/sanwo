import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavbarNavGuest from "./components/common/navbarNavGuest";
import Body from "./components/body";
import DebtForm from "./components/debtForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer />
      <NavbarNavGuest />
      <Switch>
        <Route path="/register" component={RegisterForm}></Route>
        <Route path="/login" component={LoginForm}></Route>
        <ProtectedRoute path="/debts/:id" component={DebtForm}></ProtectedRoute>
        <ProtectedRoute path="/debts/new" component={DebtForm}></ProtectedRoute>
        <Redirect path="/debts" to="/" />
        <ProtectedRoute exact path="/" component={Body}></ProtectedRoute>
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </>
  );
}

export default App;
