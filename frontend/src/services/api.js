import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyOTP = async (data) => {
  try {
    const response = await api.post('/verify-otp', data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};