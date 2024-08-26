import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(null);

  const login = (user) => {
    sessionStorage.setItem('User', JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('User');
    localStorage.removeItem('Problems');
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('User'));
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    } else setIsAuthenticated(false);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
