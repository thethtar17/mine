// src/services/userService.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the logged-in user's name
export const getUserName = async () => {
  try {
    const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
    const response = await api.get('/user', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.name; // Return the user's name
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
