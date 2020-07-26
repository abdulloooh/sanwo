import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { FaShareAlt, FaWrench } from "react-icons/fa";

const NavbarNavGuest = () => {
  return (
    <Navbar bg="primary" variant="light">
      <Navbar.Brand as={NavLink} to="/">
        Abdullah
      </Navbar.Brand>

      <Nav className="mr-auto"></Nav>

      <Navbar.Brand as={NavLink} to="/debts/new">
        <small>NEW</small>
      </Navbar.Brand>
      <div className="nav-right-wrapper">
        <FaShareAlt />
        <FaWrench className="ml-4" />
      </div>
    </Navbar>
  );
};

export default NavbarNavGuest;
