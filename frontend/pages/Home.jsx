import React from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';

const handleClick = () => {
  logout();
  window.location.reload();
}


const Home = () => {
  const user = getCurrentUser();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h1 className="display-4 mb-4">Welcome to Password Manager</h1>
      <p className="lead text-center mb-4">Your secure solution to manage all your passwords.</p>
      {user ? (
        <div className="alert alert-info text-center">
          Welcome!
          <div className="d-flex flex-row gap-1 mt-3">
            <Link to="/passwords" className="btn btn-primary btn-lg">Passwords</Link>
            <button className='btn btn-secondary btn-lg' onClick={handleClick}>Logout</button>
          </div>
        </div>
      ) : (
        <div className="d-flex gap-3">
          <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
          <Link to="/register" className="btn btn-secondary btn-lg">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
