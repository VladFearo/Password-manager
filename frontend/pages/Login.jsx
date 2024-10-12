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

        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Login</h2>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <div className="input-group">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </div>
                </form>
            </div>
        </div>

    );
};


export default Login;
