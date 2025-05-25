import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null); // Add token state
  const [userId, setUserId] = useState(null); // Load userId

  const navigate = useNavigate();

  // Check localStorage on initial load for persistent login
  // Runs once on login only
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("authToken"); // Load token
    const storedUserId = localStorage.getItem("userId");

    if (storedUserData && storedToken) {
      setUserData(JSON.parse(storedUserData));
      setToken(storedToken); // Set token
      setUserId(storedUserId);
      setIsAuthenticated(true);
    } else {
      // Clear any incomplete stored data if one piece is missing
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      setIsAuthenticated(false);
      setUserData(null);
      setToken(null);
      setUserId(null);
    }
  }, []);

  const login = (data, authToken) => {
    const newUserId = data?.id || data?.userId; // Extract userId from data

    if (!newUserId) {
      console.error(
        "Login attempted, but userId is missing from userData:",
        data
      );
      // You might want to throw an error or handle this more gracefully
      return;
    }

    // Accept authToken as an argument
    setUserData(data);
    setToken(authToken); // Set the token in state
    setUserId(newUserId);
    setIsAuthenticated(true);

    localStorage.setItem("userData", JSON.stringify(data));
    localStorage.setItem("authToken", authToken); // Store token in localStorage
    localStorage.setItem("userId", newUserId); // Store userId in localStorage
  };

  const logout = () => {
    setUserData(null);
    setToken(null); // Clear token on logout
    setUserId(null); // CLear userId on logout
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken"); // Remove token from localStorage
    localStorage.removeItem("userId"); // Remove userID from localStorage
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, token, userId, login, logout }}
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
