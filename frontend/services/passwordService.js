import axios from 'axios';
import { encryptData, decryptData } from '../utils/encryption';

const API_URL = 'http://localhost:5000/api/password';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const addPassword = async (passwordData) => {
  const encryptedData = encryptData(passwordData);
  try {
    const response = await axios.post(`${API_URL}/add`, { data: encryptedData }, {
      headers: getAuthHeader(),
    });
    console.log('Add Password Response:', response.data);
    return decryptData(response.data.data);
  } catch (error) {
    console.error('Error adding password:', error);
    throw new Error('Add password failed');
  }
};

export const getPasswords = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: getAuthHeader(),
    });
    console.log('Get Passwords Response:', response.data.data);
    return decryptData(response.data.data);
  } catch (error) {
    console.error('Error getting passwords:', error);
    throw new Error('Get passwords failed');
  }
};

export const updatePassword = async (passwordData) => {
  const encryptedData = encryptData(passwordData);
  try {
    const response = await axios.put(`${API_URL}/update`, { data: encryptedData }, {
      headers: getAuthHeader(),
    });
    console.log('Update Password Response:', response.data);
    return decryptData(response.data.data);
  } catch (error) {
    console.error('Error updating password:', error);
    throw new Error('Update password failed');
  }
};

export const deletePassword = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: getAuthHeader(),
    });
    console.log('Delete Password Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting password:', error);
    throw new Error('Delete password failed');
  }
};
