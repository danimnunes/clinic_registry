import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Ajust this to the backend API URL
});

export default api;
