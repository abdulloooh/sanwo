import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FaShareAlt, FaWrench } from "react-icons/fa";

const NavbarNavGuest = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Abdullah
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <div className="nav-right-wrapper">
        <FaShareAlt />
        <FaWrench className="ml-4" />
      </div>
    </Navbar>
  );
};

export default NavbarNavGuest;
