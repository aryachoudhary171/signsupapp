// import axios from 'axios';

// const API_BASE_URL = 'http://10.1.6.157:3000'; // Replace with actual URL

// export const signup = async (userData: { name: string; email: string; password: string }) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
//     return response.data;
//   } catch (error: any) { // Explicitly cast error to 'any'
//     if (axios.isAxiosError(error)) {
//       throw error.response?.data || error.message;
//     } else {
//       throw 'An unexpected error occurred';
//     }
//   }
// };

// export const login = async (credentials: { email: string; password: string }) => {
//   console.log("login function called with", credentials);
//   try {
//     const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
//     console.log("Login response:", response.data);
//     return response.data;
//   } catch (error: any) { // Explicitly cast error to 'any'
//     if (axios.isAxiosError(error)) {
//       throw error.response?.data || error.message;
//     } else {
//       throw 'An unexpected error occurred';
//     }
//   }
// };


import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.0.110:3000'; // Replace with actual URL

// Function to save token to AsyncStorage
const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token); // Store the token in AsyncStorage
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// Function to get token from AsyncStorage
const getToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken'); // Retrieve the token from AsyncStorage
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Function to remove token from AsyncStorage
const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken'); // Remove token from AsyncStorage
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export const signup = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    // Save token after successful signup
    if (response.data.token) {
      await saveToken(response.data.token); // Store token
    }
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw 'An unexpected error occurred';
    }
  }
};

export const login = async (credentials: { email: string; password: string }) => {
  console.log('login function called with', credentials);
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    console.log('Login response:', response.data);
    // Save token after successful login
    if (response.data.token) {
      await saveToken(response.data.token); // Store token
    }
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw 'An unexpected error occurred';
    }
  }
};

// Function to get user appointments (with authentication)
export const fetchAppointments = async () => {
  try {
    const token = await getToken();
    if (!token) throw 'No token found, please log in first';

    const response = await axios.get(`${API_BASE_URL}/appointment`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token for authenticated request
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw 'An unexpected error occurred';
    }
  }
};

// Function to create a new appointment (with authentication)
export const createAppointment = async (appointmentData: {
  fullname: string;
  contact_info: string;
  date: string;
  timeslot: string;
  reason: string;
  doctorId: number;
  hospitalId: number;
}) => {
  try {
    const token = await getToken();
    if (!token) throw 'No token found, please log in first';

    const response = await axios.post(
      `${API_BASE_URL}/appointment/create`,
      appointmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authenticated request
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw 'An unexpected error occurred';
    }
  }
};

// Function to log out the user and remove token
export const logout = async () => {
  try {
    await removeToken(); // Remove token from AsyncStorage
    console.log('Logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
