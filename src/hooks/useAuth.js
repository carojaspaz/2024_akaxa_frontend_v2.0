// src/hooks/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { login } from '../services/authService';

const useAuth = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const data = await login(username, password);
      const decodedToken = jwtDecode(data.token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        setError('Token has expired');
      } else {
        sessionStorage.setItem('auth', 'true');
        sessionStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return {
    handleLogin,
    error,
  };
};

export default useAuth;
