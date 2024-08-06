import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';

const AuthContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(null);

  const login = (token, userId, user) => {
    sessionStorage.setItem('Token', token);
    sessionStorage.setItem('UserId', userId);
    setUserId(user);
    setTokenId(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('UserId');
    setUserId(null);
    setTokenId(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem('Token');
    const storedUserId = sessionStorage.getItem('UserId');
    if (storedUserId && storedToken) {
      setUserId(storedUserId);
      setTokenId(storedToken);
      setIsAuthenticated(true);
    } else setIsAuthenticated(false);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ userId, tokenId, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
