import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * The entry point of the application.
 * It renders the App component into the root element of the HTML document.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>
);
