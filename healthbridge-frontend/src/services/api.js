import axios from 'axios';

// Instantiate axios instance locked to your active Spring Boot server port
const API = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// Outbound request interceptor to automatically inject authorization tokens
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;