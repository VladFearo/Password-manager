import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/authService';

/**
 * Header component that displays the navigation bar.
 * It includes links to different pages and a logout button if the user is logged in.
 *
 * @component
 */
const Header = () => {
    const navigate = useNavigate();
    const user = getCurrentUser(); // Get the current logged-in user

    /**
     * Handle logout by calling the logout service and navigating to the login page.
     */
    const handleLogout = () => {
        logout(); // Perform logout
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* Brand name */}
                <a className="navbar-brand fw-bold fs-3" href="/">
                    Password Manager
                </a>
                {/* Navbar toggle for mobile */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            {/* Home link */}
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    {/* Passwords link */}
                                    <a className="nav-link" href="/passwords">Passwords</a>
                                </li>
                                <li className="nav-item">
                                    {/* Solid button for logout */}
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    {/* Solid button for login */}
                                    <a className="btn btn-primary ms-2" href="/login">
                                        Login
                                    </a>
                                </li>
                                <li className="nav-item">
                                    {/* Solid button for register */}
                                    <a className="btn btn-light ms-2" href="/register">
                                        Register
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
