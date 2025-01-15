import axios from 'axios';

const API_BASE_URL = 'http://10.1.6.157:3000'; // Replace with actual URL

export const signup = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error: any) { // Explicitly cast error to 'any'
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw 'An unexpected error occurred';
    }
  }
};

export const login = async (credentials: { email: string; password: string }) => {
  console.log("login function called with", credentials);
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    console.log("Login response:", response.data);
    return response.data;
  } catch (error: any) { // Explicitly cast error to 'any'
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw 'An unexpected error occurred';
    }
  }
};