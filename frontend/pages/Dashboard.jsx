import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import '../styles/Dashboard.css';

/**
 * Dashboard component that serves as the main interface for logged-in users.
 *
 * @component
 */
const Dashboard = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically

    /**
     * Handle logout by calling the logout service and navigating to the login page.
     */
    const handleLogout = () => {
        logout(); // Perform logout
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
