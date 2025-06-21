// src/services/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // ✅ This is your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
