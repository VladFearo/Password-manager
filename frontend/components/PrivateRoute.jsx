import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

/**
 * A wrapper component for protecting routes that require authentication.
 * If the user is not logged in, they will be redirected to the login page.
 *
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {React.ReactNode} props.children - The child components to render if the user is authenticated.
 * @returns {React.ReactNode} - The child components or a redirect to the login page.
 */
const PrivateRoute = ({ children }) => {
    const user = getCurrentUser(); // Get the current logged-in user

    // If the user is authenticated, render the children components
    // Otherwise, redirect to the login page
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
