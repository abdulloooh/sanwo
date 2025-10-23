import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { /*FaShareAlt,*/ FaWrench, FaPlus } from "react-icons/fa";
import NavbarDarkModeToggle from "./NavbarDarkModeToggle";
import ShareButton from "./ShareButton";

const NavbarNavGuest = ({ username, neglect = [], history }) => {
  const isNeglectedPathStatus = neglect.includes(history.location.pathname);

  return !isNeglectedPathStatus ? (
    <Navbar collapseOnSelect expand="sm" bg="primary" variant="light">
      <Navbar.Brand as={NavLink} to="/">
        {username}
      </Navbar.Brand>
      {username !== "Sanwo" && (
        <div className="navbar-icons-container">
          <NavLink 
            to="/debts/new" 
            className="navbar-add-debt-btn"
            title="Add new debt"
            aria-label="Add new debt"
          >
            <FaPlus />
          </NavLink>
          
          <NavLink 
            to="/settings" 
            className="navbar-settings-btn"
            title="Settings"
            aria-label="Settings"
          >
            <FaWrench />
          </NavLink>
          
          <ShareButton 
            title="Sanwo - Debt Management App"
            description="Manage your debts efficiently with Sanwo. Track what you owe and what others owe you."
          />
          
          <NavbarDarkModeToggle />
        </div>
      )}
      <Nav className="mr-auto"></Nav>

      <div className="nav-right-wrapper">
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