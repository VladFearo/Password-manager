import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import PasswordStrengthBar from 'react-password-strength-bar';

/**
 * Register component that provides a form for user registration.
 *
 * @component
 */
const Register = () => {
    const [name, setName] = useState(''); // State for name input
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password input
    const [error, setError] = useState(''); // State for error message
    const [success, setSuccess] = useState(''); // State for success message
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [passwordScore, setPasswordScore] = useState(0); // Track password strength score

    /**
     * Handle form submission for registration.
     * @param {Object} e - The event object.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match'); // Set error if passwords do not match
            return;
        }
        // Check if password strength is strong enough
        if (passwordScore < 3) { // If password is too weak (score < 3)
            setError('Password is too weak. Please choose a stronger password.');
            return;
        }
        try {
            await register({ name, email, password }); // Attempt to register
            setSuccess('Registration successful!'); // Set success message
            setError(''); // Clear error
            setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
        } catch (err) {
            setError(err.message); // Set error if registration fails
            setSuccess(''); // Clear success message
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="card-title text-center mb-4">Register</h2>

                {/* Display error message if any */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Display success message if any */}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            placeholder="Enter your full name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            placeholder="Enter your email"
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
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <PasswordStrengthBar
                            password={password}
                            onChangeScore={setPasswordScore}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm your password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Register button */}
                    <button type="submit" className="btn btn-primary btn-block w-100">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
