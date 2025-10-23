import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { FaHome, FaArrowLeft, FaSearch } from "react-icons/fa";

const NotFound = () => {
  return (
    <Container className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <div className="error-code">404</div>
          <div className="error-icon">
            <FaSearch />
          </div>
        </div>
        
        <div className="not-found-header">
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-subtitle">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="not-found-actions">
          <Button 
            as={Link} 
            to="/" 
            variant="primary" 
            size="lg"
            className="not-found-btn"
          >
            <FaHome className="mr-2" />
            Go Home
          </Button>
          
          <Button 
            variant="outline-primary" 
            size="lg"
            className="not-found-btn"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
