import { jwtDecode } from 'jwt-decode';


export const getUserRoles = () => {
  const token = localStorage.getItem('token');
  if (!token) return [];
  try {
    const decoded = jwtDecode(token);
    // print decoded
    console.log('Decoded JWT:', decoded);
    return decoded.user_roles || [];
  } catch {
    return [];
  }
};

export const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;

    const now = Date.now() / 1000; // timestamp in seconds
    return exp < now;
  } catch {
    return true;
  }
};

export const logout = () => {
    localStorage.removeItem('token');
  };
  