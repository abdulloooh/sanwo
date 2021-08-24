import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { /*FaShareAlt,*/ FaWrench } from "react-icons/fa";

const NavbarNavGuest = ({ username, neglect = [], history }) => {
  const isNeglectedPathStatus = neglect.includes(history.location.pathname);

  return !isNeglectedPathStatus ? (
    <Navbar collapseOnSelect expand="sm" bg="primary" variant="light">
      <Navbar.Brand as={NavLink} to="/">
        {username}
      </Navbar.Brand>
      {username !== "Sanwo" && (
        <Navbar.Brand as={NavLink} to="/debts/new">
          <small>NEW</small>
        </Navbar.Brand>
      )}
      {username !== "Sanwo" && (
        <Navbar.Brand as={NavLink} to="/settings">
          <FaWrench className="ml-2" />
        </Navbar.Brand>
      )}
      <Nav className="mr-auto"></Nav>

      <div className="nav-right-wrapper">
        {/* <FaShareAlt /> */}

        {username !== "Sanwo" && (
          <Navbar.Brand as={NavLink} to="/logout">
            <small>Logout</small>
          </Navbar.Brand>
        )}
      </div>
    </Navbar>
  ) : null;
};

export default withRouter(NavbarNavGuest);
