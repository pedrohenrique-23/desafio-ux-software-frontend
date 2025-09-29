// src/services/api.ts
import axios from 'axios';

// Vamos usar a URL de produção diretamente para garantir o deploy
const API_URL = 'https://desafio-ux-software-api.onrender.com';

export const api = axios.create({
  baseURL: API_URL,
});

// O interceptor continua o mesmo, não precisa mudar
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