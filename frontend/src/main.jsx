import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { logout } from '../services/authService';

// Add Axios interceptor for handling token expiration globally
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.error('Token expired, logging out...');
      logout();
      window.location.href = '/login';  // Redirect to the login page
    }
    return Promise.reject(error);
  }
);

/**
 * The entry point of the application.
 * It renders the App component into the root element of the HTML document.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>
);
