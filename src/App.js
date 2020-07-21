import React from "react";
import { Switch, Route } from "react-router-dom";
import NavbarNavGuest from "./components/common/navbarNavGuest";
import Body from "./components/body";
import DebtForm from "./components/debtForm";
import "./App.css";

function App() {
  return (
    <>
      <NavbarNavGuest />
      <Switch>
        <Route path="/debts/:id" component={DebtForm}></Route>
        <Route path="/debts/new" component={DebtForm}></Route>
        <Route path="/">
          <Body />
        </Route>
      </Switch>
    </>
  );
}

export default App;
