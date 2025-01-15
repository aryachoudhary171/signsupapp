import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Use your local IP address

export const signup = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post(${API_BASE_URL}/signup, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw 'An unexpected error occurred';
    }
  }
};

export const login = async (credentials: { email: string; password: string }) => {
  console.log("login function called with", credentials); // Debugging log
  try {
    const response = await axios.post(${API_BASE_URL}/login, credentials);
    console.log("Login response:", response.data); // Debugging log
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw 'An unexpected error occurred';
    }
  }
};