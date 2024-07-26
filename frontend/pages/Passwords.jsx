import React, { useState, useEffect } from 'react';
import { addPassword, getPasswords, updatePassword, deletePassword } from '../services/passwordService';
import '../styles/Passwords.css';

/**
 * Passwords component that manages the display and manipulation of passwords.
 *
 * @component
 */
const Passwords = () => {
    const [passwords, setPasswords] = useState([]); // State for storing passwords
    const [form, setForm] = useState({ website: '', password: '', id: null }); // State for the form input fields
    const [visiblePasswords, setVisiblePasswords] = useState({}); // State to manage visibility of passwords
    const [showFormPassword, setShowFormPassword] = useState(false); // State to manage form password visibility

    // Load passwords when the component mounts
    useEffect(() => {
        loadPasswords();
    }, []);

    /**
     * Load passwords from the server.
     */
    const loadPasswords = async () => {
        const data = await getPasswords();
        setPasswords(data);
    };

    /**
     * Handle form submission for adding or updating passwords.
     * @param {Object} e - The event object.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.id) {
                await updatePassword(form); // Update existing password
            } else {
                await addPassword(form); // Add new password
            }
            resetForm(); // Reset the form
            loadPasswords(); // Reload passwords
        } catch (error) {
            console.error('Error handling submit:', error.response || error.message || error);
        }
    };

    /**
     * Handle editing a password by setting the form state.
     * @param {Object} password - The password object to edit.
     */
    const handleEdit = (password) => {
        setForm({ website: password.website, password: password.password, id: password._id });
    };

    /**
     * Handle deleting a password by its ID.
     * @param {string} id - The ID of the password to delete.
     */
    const handleDelete = async (id) => {
        try {
            await deletePassword(id);
            loadPasswords(); // Reload passwords
        } catch (error) {
            console.error('Error handling delete:', error.response || error.message || error);
        }
    };

    /**
     * Toggle the visibility of a password.
     * @param {string} id - The ID of the password to toggle visibility.
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
                    <div className="input-group-append">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowFormPassword(!showFormPassword)}>
                            {showFormPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <button type="button" className="btn btn-primary m-2" onClick={generateStrongPassword}>Generate Strong Password</button>
                    <button type="submit" className="btn btn-success m-2">{form.id ? 'Save' : 'Add'} Password</button>
                    {form.id && <button type="button" className="btn btn-warning m-2" onClick={resetForm}>Cancel</button>}
                </div>
            </form>
            <ul className="list-group">
                {passwords.map((password) => (
                    <li key={password._id} className="list-group-item d-flex justify-content-between align-items-center">
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
                            <div className="input-group-append">
                                <button className="btn btn-success" onClick={() => handleEdit(password)}>Edit</button>
                            </div>
                            <div className="input-group-append">
                                <button className="btn btn-danger" onClick={() => handleDelete(password._id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Passwords;
