import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import components here
import DynamicInput from "./components/InputComponent";
import DynamicButton from "./components/ButtonComponent";
import NavigationBar from "./components/NavigationBar";

import { useAuth } from "./config/Context/auth";

const App = () => {
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation("app");

  const { login, isAuthenticated, loadingInitial } = useAuth();
  const [isLoading, setIsLoading] = useState(false); // Local loading state for API call
  const [error, setError] = useState(null);

  //TODO these could be changed so that it doesnt save the value each letter
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const signIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log("sign in button clicked");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/logUser`, {
        userName: username,
        password: password,
      });

      if (response.data.status === "success" && response.data.userData) {
        login(response.data.userData);
        alert(`Welcome ${response.data.message}`);
      } else {
        const message =
          response.data?.message || "Login failed. Please check credentials.";
        setError(message);
        alert(`Login Failed: ${message}`);
      }
    } catch (err) {
      console.error("Error during sign in:", err);
      let errorMessage =
        "An unexpected error occurred. Please try again later.";

      // Check if the error is an Axios error with a response from the server
      if (err.response) {
        console.error("Server responded with status:", err.response.status);
        console.error("Response data:", err.response.data);

        // Check for specific error statuses (e.g., 401, 404) indicating login failure
        if (
          err.response.status === 401 ||
          err.response.status === 404 ||
          err.response.status === 403
        ) {
          errorMessage =
            err.response.data?.message || "Invalid username or password.";
        } else {
          errorMessage = `Server error (${err.response.status}). Please try again later.`;
        }
      } else if (err.request) {
        console.error("No response received:", err.request);
        errorMessage =
          "Could not connect to the server. Please check your network.";
      } else {
        console.error("Error setting up request:", err.message);
        errorMessage = "An error occurred before sending the request.";
      }
      setError(errorMessage);
      alert(`Login Failed: ${errorMessage}`);
    }
  };

  const signUp = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior //! probaibly change this
    console.log("sign up button clicked");
    navigate("/sign-up");
  };

  return (
    <div className="app flex-box flex-column">
      <NavigationBar dontShowPageButtons={true} />
      <header className="app-header">
        <h1>{t("name")}</h1>
      </header>
      <main>
        <div className="general-box flex-box flex-column smooth-shadow-box">
          <h1>{t("welcome")}</h1>
          <div className="input-field-box">
            <DynamicInput
              className="input-field"
              type="text"
              value={username}
              name="username-field"
              onChange={handleUserName}
              placeholder={t("user-name-placeholder")}
            />
            <DynamicInput
              className="input-field"
              type="password"
              value={password}
              name="password-field"
              onChange={handlePassword}
              placeholder={t("password-placeholder")}
            />
          </div>
          <div className="flex-box">
            <div>
              <DynamicButton
                className="button"
                onClick={signIn}
                text={t("sign-in")}
              />
            </div>
            <div>
              <DynamicButton
                className="button"
                onClick={signUp}
                text={t("sign-up")}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
