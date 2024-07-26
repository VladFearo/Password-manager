import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/Login.css';

/**
 * Login component that provides a form for user login.
 *
 * @component
 */
const Login = () => {
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate(); // Hook to navigate programmatically

    /**
     * Handle form submission for login.
     * @param {Object} e - The event object.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting to login with:', { email, password });
            const user = await login({ email, password }); // Attempt to login
            console.log('Login successful:', user);
            navigate('/passwords'); // Redirect to the passwords page upon successful login
        } catch (err) {
            console.error('Login failed:', err.message);
            setError(err.message);
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card p-4 shadow">
                <h2 className="card-title text-center mb-4">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message if any */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
