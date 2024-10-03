import React, { useState, useEffect } from 'react';
import { addPassword, getPasswords, updatePassword, deletePassword, checkIfPasswordPwned } from '../services/passwordService';
import '../styles/Passwords.css';

const Passwords = () => {
    const [passwords, setPasswords] = useState([]);
    const [form, setForm] = useState({ website: '', password: '', id: null });
    const [visiblePasswords, setVisiblePasswords] = useState({});
    const [showFormPassword, setShowFormPassword] = useState(false);
    const [pwnedStatuses, setPwnedStatuses] = useState({});

    // Load passwords when the component mounts and check for breaches
    useEffect(() => {
        loadPasswords();
    }, []);

    /**
     * Load passwords from the server and check for breaches.
     */
    const loadPasswords = async () => {
        try {
            const data = await getPasswords();
            setPasswords(data);

            // Check the pwned status after passwords are loaded
            if (data.length > 0) {
                checkPasswordsForBreaches(data);
            }
        } catch (error) {
            console.error('Error loading passwords:', error);
        }
    };

    /**
     * Handle form submission for adding or updating passwords.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (form.id) {
                await updatePassword(form);
            } else {
                await addPassword(form);
            }

            resetForm();
            // Reload passwords once after adding/updating
            loadPasswords();
        } catch (error) {
            console.error('Error handling submit:', error.response || error.message || error);
        }
    };

    /**
     * Automatically check if all passwords have been pwned.
     */
    const checkPasswordsForBreaches = async (passwords) => {
        const statuses = {};
        for (let password of passwords) {
            const isPwned = await checkIfPasswordPwned(password.password);
            statuses[password._id] = isPwned ? 'compromised' : 'safe';
        }
        setPwnedStatuses(statuses);
    };

    /**
     * Handle editing a password by setting the form state.
     */
    const handleEdit = (password) => {
        setForm({ website: password.website, password: password.password, id: password._id });
    };

    /**
     * Handle deleting a password by its ID.
     */
    const handleDelete = async (id) => {
        try {
            await deletePassword(id);
            loadPasswords(); // Reload passwords after deletion
        } catch (error) {
            console.error('Error handling delete:', error.response || error.message || error);
        }
    };

    /**
     * Toggle the visibility of a password.
     */
    const togglePasswordVisibility = (id) => {
        setVisiblePasswords((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    /**
     * Reset the form state to its initial values.
     */
    const resetForm = () => {
        setForm({ website: '', password: '', id: null });
    };

    /**
     * Generate a strong random password and set it in the form state.
     */
    const generateStrongPassword = () => {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
        const length = 16;
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        setForm({ ...form, password });
    };

    return (
        <div className="container">
            <h2>Password Manager</h2>

            {/* Form for adding/editing passwords */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Website"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    required
                />
                <div className="input-group mb-2">
                    <input
                        type={showFormPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    <div className="input-group-append d-flex align-items-center mx-2">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="togglePasswordVisibility"
                                checked={showFormPassword}
                                onChange={() => setShowFormPassword(!showFormPassword)}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="togglePasswordVisibility"
                                style={{ marginLeft: '8px' }}
                            >
                                {showFormPassword ? 'Hide' : 'Show'}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mb-2">
                    <button type="button" className="btn btn-primary m-2" onClick={generateStrongPassword}>Generate Strong Password</button>
                    <button type="submit" className="btn btn-success m-2">{form.id ? 'Save' : 'Add'} Password</button>
                    {form.id && <button type="button" className="btn btn-warning m-2" onClick={resetForm}>Cancel</button>}
                </div>
            </form>

            {/* Titles for Passwords and Breach Status */}
            <div className="row mb-2">
                <div className="col-8">
                    <h5>Passwords</h5>
                </div>
                <div className="col-4 text-center">
                    <h5>Breach Status</h5>
                </div>
            </div>

            {/* Password and Breach Status List */}
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        {passwords.map((password) => (
                            <li key={password._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {/* Password Website and Input */}
                                <div className="col-8">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>{password.website}</span>
                                        <div className="input-group">
                                            <input
                                                type={visiblePasswords[password._id] ? 'text' : 'password'}
                                                className="form-control"
                                                value={password.password}
                                                readOnly
                                            />
                                            <div className="input-group-append">
                                                <button className="btn btn-secondary" onClick={() => togglePasswordVisibility(password._id)}>
                                                    {visiblePasswords[password._id] ? 'Hide' : 'Show'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Password Breach Status */}
                                <div className="col-4 text-center">
                                    {pwnedStatuses[password._id] === 'compromised' ? (
                                        <span className="text-danger">❌ Compromised</span>
                                    ) : pwnedStatuses[password._id] === 'safe' ? (
                                        <span className="text-success">✅ Safe</span>
                                    ) : (
                                        <span className="text-warning">⚠️ Checking</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Passwords;
