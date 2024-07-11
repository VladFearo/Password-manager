import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h1 className="display-4 mb-4">Welcome to Password Manager</h1>
      <p className="lead text-center mb-4">Your secure solution to manage all your passwords.</p>
      <div className="d-flex gap-3">
        <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
        <Link to="/register" className="btn btn-secondary btn-lg">Register</Link>
      </div>
    </div>
  );
};

export default Home;
