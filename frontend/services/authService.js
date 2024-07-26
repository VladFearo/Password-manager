import axios from 'axios';
import { encryptData, decryptData } from '../utils/encryption';

const API_URL = 'http://localhost:5000/api/auth';

/**
 * Registers a new user.
 * @param {Object} userData - The user data to register.
 * @returns {Object} - The decrypted response data.
 */
export const register = async (userData) => {
  try {
    const encryptedData = encryptData(userData); // Encrypt the user data
    const response = await axios.post(`${API_URL}/register`, { data: encryptedData }); // Send a POST request to the register endpoint
    return decryptData(response.data.data); // Decrypt and return the response data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // If the error response has a message, throw that message
      throw new Error(error.response.data.message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from server. Please check your network connection.');
    } else {
      // Something happened in setting up the request
      throw new Error('Error in setting up the request.');
    }
  }
};

/**
 * Logs in a user.
 * @param {Object} userData - The user data to login.
 * @returns {Object} - The decrypted response data.
 */
export const login = async (userData) => {
  try {
    const encryptedData = encryptData(userData); // Encrypt the user data
    const response = await axios.post(`${API_URL}/login`, { data: encryptedData }); // Send a POST request to the login endpoint
    const decryptedData = decryptData(response.data.data); // Decrypt the response data
    if (decryptedData.token) {
      localStorage.setItem('user', JSON.stringify(decryptedData)); // Store the user data in local storage if a token is present
    }
    return decryptedData;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // If the error response has a message, throw that message
      throw new Error(error.response.data.message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from server. Please check your network connection.');
    } else {
      // Something happened in setting up the request
      throw new Error('Error in setting up the request.');
    }
  }
};

/**
 * Logs out the current user.
 */
export const logout = () => {
  localStorage.removeItem('user'); // Remove the user data from local storage
};

/**
 * Gets the currently logged-in user.
 * @returns {Object|null} - The current user data or null if no user is logged in.
 */
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user')); // Retrieve and parse the user data from local storage
};
