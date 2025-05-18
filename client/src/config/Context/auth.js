import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check localStorage on initial load for persistent login
  // Runs once on login only
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("UserID");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      localStorage.removeItem("UserID");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    if (!userData || !userData.role) {
      console.error("Login attempted with invalid userData:", userData);
      // Handle this error appropriately, maybe show a message
      return;
    }
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData)); // Persist user data

    if (userData.role) {
      if (userData.role === "admin") {
        navigate("/home-admin");
      } else if (userData.role === "organizer") {
        navigate("/home-organizer");
      } else if (userData.role === "volunteer") {
        navigate("/home-volunteer");
      } else {
        console.warn(
          "User logged in but role is not recognized for navigation:",
          userData.role
        );
        //TODO change to error message
        navigate("/");
      }
    } else {
      console.error("Userdata.role is not a valid object:", userData.role);
      //TODO change to error message
      navigate("/");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userData");
    navigate("/");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loadingInitial: loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
