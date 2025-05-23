import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null); // Add token state

  const navigate = useNavigate();

  // Check localStorage on initial load for persistent login
  // Runs once on login only
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("authToken"); // Load token
    if (storedUserData && storedToken) {
      setUserData(JSON.parse(storedUserData));
      setToken(storedToken); // Set token
      setIsAuthenticated(true);
    }
  }, []);

  const login = (data, authToken) => {
    // Accept authToken as an argument
    setUserData(data);
    setToken(authToken); // Set the token in state
    setIsAuthenticated(true);
    localStorage.setItem("userData", JSON.stringify(data));
    localStorage.setItem("authToken", authToken); // Store token in localStorage
  };

  const logout = () => {
    setUserData(null);
    setToken(null); // Clear token on logout
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken"); // Remove token from localStorage
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
