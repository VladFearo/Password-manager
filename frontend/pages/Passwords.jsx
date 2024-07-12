import React, { useState, useEffect } from 'react';
import { addPassword, getPasswords, updatePassword, deletePassword } from '../services/passwordService';
import '../styles/Passwords.css';

const Passwords = () => {
    const [passwords, setPasswords] = useState([]);
    const [form, setForm] = useState({ website: '', password: '', id: null });
    const [visiblePasswords, setVisiblePasswords] = useState({});

    useEffect(() => {
        loadPasswords();
    }, []);

    const loadPasswords = async () => {
        const data = await getPasswords();
        setPasswords(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.id) {
                await updatePassword(form);
            } else {
                await addPassword(form);
            }
            resetForm();
            loadPasswords();
        } catch (error) {
            console.error('Error handling submit:', error.response || error.message || error);
        }
    };

    const handleEdit = (password) => {
        setForm({ website: password.website, password: password.password, id: password._id });
    };

    const handleDelete = async (id) => {
        try {
            await deletePassword(id);
            loadPasswords();
        } catch (error) {
            console.error('Error handling delete:', error.response || error.message || error);
        }
    };

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const resetForm = () => {
        setForm({ website: '', password: '', id: null });
    };

    return (
        <div className="container">
            <h2>Password Manager</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Website"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
                <button type="submit">{form.id ? 'Save' : 'Add'} Password</button>
                {form.id && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>
            <ul>
                {passwords.map((password) => (
                    <li key={password._id}>
                        <span>{password.website}</span>
                        <input
                            type={visiblePasswords[password._id] ? 'text' : 'password'}
                            value={password.password}
                            readOnly
                        />
                        <button onClick={() => togglePasswordVisibility(password._id)}>
                            {visiblePasswords[password._id] ? 'Hide' : 'Show'}
                        </button>
                        <button onClick={() => handleEdit(password)}>Edit</button>
                        <button onClick={() => handleDelete(password._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Passwords;
