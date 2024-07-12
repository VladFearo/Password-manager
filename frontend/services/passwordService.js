import axios from 'axios';

const API_URL = 'http://localhost:5000/api/password';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const addPassword = async (passwordData) => {
  const response = await axios.post(`${API_URL}/add`, passwordData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const getPasswords = async () => {
  const response = await axios.get(`${API_URL}/all`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updatePassword = async (passwordData) => {
  const response = await axios.put(`${API_URL}/update`, passwordData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const deletePassword = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};
