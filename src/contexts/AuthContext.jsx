import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const savedAuth = sessionStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  const login = (authData) => {
    setAuthState(authData);
    sessionStorage.setItem('auth', JSON.stringify(authData));
  };

  const logout = () => {
    setAuthState(null);
    sessionStorage.removeItem('auth');
  };

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('auth');
    if (savedAuth) {
      setAuthState(JSON.parse(savedAuth));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
