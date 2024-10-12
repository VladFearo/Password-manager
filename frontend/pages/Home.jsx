import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';

/**
 * Handle logout by calling the logout service and reloading the page.
 */
const handleClick = () => {
  logout();
  window.location.reload(); // Reload the page to reflect logout state
};

/**
 * Home component that serves as the landing page.
 *
 * @component
 */
const Home = () => {
  const user = getCurrentUser(); // Get the current logged-in user

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{
        background: 'linear-gradient(135deg, #f8f9fa, #e0e7ff)', // Light gradient for a subtle background effect
        color: '#333', // Ensure text is readable on light background
      }}
    >
      {/* Welcome message */}
      <h1 className="display-4 mb-4 fw-bold text-center">Welcome to Password Manager</h1>
      <p className="lead text-center mb-4">
        Your secure solution to manage all your passwords efficiently and safely.
      </p>

      {user ? (
        <div className="alert alert-info text-center">
          Welcome back!
          <div className="d-flex flex-row gap-3 justify-content-center mt-3">
            {/* Button to navigate to the Passwords page */}
            <Link to="/passwords" className="btn btn-primary btn-lg">
              Manage Passwords
            </Link>
            {/* Logout button */}
            <button className="btn btn-secondary btn-lg" onClick={handleClick}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex gap-3 justify-content-center">
          {/* Login button */}
          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link>
          {/* Register button */}
          <Link to="/register" className="btn btn-secondary btn-lg">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
