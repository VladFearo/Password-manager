import axios from 'axios';
import { encryptData, decryptData } from '../utils/encryption';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (userData) => {
  const encryptedData = encryptData(userData);
  const response = await axios.post(`${API_URL}/register`, { data: encryptedData });
  return decryptData(response.data.data);
};

export const login = async (userData) => {
  const encryptedData = encryptData(userData);
  const response = await axios.post(`${API_URL}/login`, { data: encryptedData });
  const decryptedData = decryptData(response.data.data);
  if (decryptedData.token) {
    localStorage.setItem('user', JSON.stringify(decryptedData));
  }
  return decryptedData;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
