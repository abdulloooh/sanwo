import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaShareAlt, FaWrench } from "react-icons/fa";

const NavbarNavGuest = ({ username }) => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="primary" variant="light">
      <Navbar.Brand as={NavLink} to="/">
        {username}
      </Navbar.Brand>
      {username !== "Debt Manager" && (
        <Navbar.Brand as={NavLink} to="/debts/new">
          <small>NEW</small>
        </Navbar.Brand>
      )}
      <Nav className="mr-auto"></Nav>

      <div className="nav-right-wrapper">
        {/* <FaShareAlt /> */}
        {username !== "Debt Manager" && (
          <Navbar.Brand as={NavLink} to="/settings">
            <FaWrench className="ml-4" />
          </Navbar.Brand>
        )}
      </div>
      {username !== "Debt Manager" && (
        <Navbar.Brand as={NavLink} to="/logout">
          Logout
        </Navbar.Brand>
      )}
    </Navbar>
  );
};

export default NavbarNavGuest;
