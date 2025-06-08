import api from './api';

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
}

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
}