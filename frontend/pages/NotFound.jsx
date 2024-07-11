import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h1 className="display-1 mb-4">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead mb-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary btn-lg">Go to Home</Link>
    </div>
  );
};

export default NotFound;
