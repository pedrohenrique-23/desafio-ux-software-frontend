// src/services/api.ts
import axios from 'axios';

const API_URL = 'https://desafio-ux-software-api.onrender.com';

export const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para adicionar o token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);