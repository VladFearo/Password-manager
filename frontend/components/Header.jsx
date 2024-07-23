import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/authService';

const Header = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Password Manager</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/passwords">Passwords</a>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={handleLogout} >Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
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
