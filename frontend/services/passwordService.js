import axios from 'axios';
import { encryptData, decryptData } from '../utils/encryption';

const API_URL = 'http://localhost:5000/api/password';

/**
 * Get the authorization header for the current user.
 * @returns {Object} - The authorization header with the user's token.
 */
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

/**
 * Add a new password.
 * @param {Object} passwordData - The password data to add.
 * @returns {Object} - The decrypted response data.
 * @throws {Error} - If adding the password fails.
 */
export const addPassword = async (passwordData) => {
  const encryptedData = encryptData(passwordData); // Encrypt the password data
  try {
    const response = await axios.post(`${API_URL}/add`, { data: encryptedData }, {
      headers: getAuthHeader(), // Include the authorization header
    });
    console.log('Add Password Response:', response.data);
    return decryptData(response.data.data); // Decrypt and return the response data
  } catch (error) {
    console.error('Error adding password:', error);
    throw new Error('Add password failed');
  }
};

/**
 * Get all passwords for the current user.
 * @returns {Array} - The decrypted list of passwords.
 * @throws {Error} - If getting the passwords fails.
 */
export const getPasswords = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: getAuthHeader(), // Include the authorization header
    });
    console.log('Get Passwords Response:', response.data.data);
    return decryptData(response.data.data); // Decrypt and return the response data
  } catch (error) {
    console.error('Error getting passwords:', error);
    throw new Error('Get passwords failed');
  }
};

/**
 * Update an existing password.
 * @param {Object} passwordData - The password data to update.
 * @returns {Object} - The decrypted response data.
 * @throws {Error} - If updating the password fails.
 */
export const updatePassword = async (passwordData) => {
  const encryptedData = encryptData(passwordData); // Encrypt the password data
  try {
    const response = await axios.put(`${API_URL}/update`, { data: encryptedData }, {
      headers: getAuthHeader(), // Include the authorization header
    });
    console.log('Update Password Response:', response.data);
    return decryptData(response.data.data); // Decrypt and return the response data
  } catch (error) {
    console.error('Error updating password:', error);
    throw new Error('Update password failed');
  }
};

/**
 * Delete a password by its ID.
 * @param {string} id - The ID of the password to delete.
 * @returns {Object} - The response data.
 * @throws {Error} - If deleting the password fails.
 */
export const deletePassword = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: getAuthHeader(), // Include the authorization header
    });
    console.log('Delete Password Response:', response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error deleting password:', error);
    throw new Error('Delete password failed');
  }
};
