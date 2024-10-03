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
  const encryptedData = encryptData(passwordData);
  try {
    const response = await axios.post(`${API_URL}/add`, { data: encryptedData }, {
      headers: getAuthHeader(),
    });
    console.log('Add Password Response:', response.data);
    return decryptData(response.data.data);
  } catch (error) {
    console.error('Error adding password:', error.response || error.message);
    throw new Error(error.response ? error.response.data.message || 'Add password failed' : 'Network error');
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

/**
 * Helper function to convert an ArrayBuffer to a hexadecimal string.
 * @param {ArrayBuffer} buffer - The buffer to convert.
 * @returns {string} - The hexadecimal string.
 */
const arrayBufferToHex = (buffer) => {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
};

/**
 * Check if a password has been pwned using Have I Been Pwned API.
 * 
 * @param {string} password - The password to check.
 * @returns {Promise<boolean>} - Returns true if the password has been compromised, false otherwise.
 */
export const checkIfPasswordPwned = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hash = arrayBufferToHex(hashBuffer);

  const prefix = hash.slice(0, 5); // First 5 characters of SHA-1 hash
  const suffix = hash.slice(5);    // Remaining characters

  try {
      const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
      const hashes = response.data.split('\n');
      const compromised = hashes.some(h => h.split(':')[0] === suffix);
      return compromised;  // Returns true if password is pwned
  } catch (error) {
      console.error('Error checking pwned password:', error);
      return false;
  }
};
