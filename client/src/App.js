import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import components here
import DynamicInput from "./components/common/InputComponent";
import DynamicButton from "./components/common/ButtonComponent";
import NavigationBar from "./components/layout/NavigationBar";
import CopyRight from "./components/layout/CopyRight";
// import centreLogo from "./icons/org_icon.png";

import { useAuth } from "./config/Context/auth";

const App = () => {
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation("app");

  const { login, isAuthenticated } = useAuth();
  // const [isLoading, setIsLoading] = useState(false); // Local loading state for API call
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
    // setIsLoading(true);
    setError(null);
    console.log("sign in button clicked");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        userName: username,
        password: password,
      });

      const authHeader = response.headers["authorization"]; // Get the token from the Authorization header
      let authToken = null;

      if (authHeader && authHeader.startsWith("Bearer ")) {
        authToken = authHeader.split(" ")[1]; // Extract the token
      } else {
        console.warn(
          "Authorization header not found or not in 'Bearer <token>' format. Checking response body for token."
        );
        authToken = response.data.token || response.data.accessToken; // Fallback
      }

      if (
        response.data.status === "success" &&
        response.data.userData &&
        authToken
      ) {
        login(response.data.userData, authToken); // pass token to login

        if (response.data.userData.role === "admin") {
          navigate("home-admin");
        } else if (response.data.userData.role === "organizer") {
          navigate("home-organizer");
        } else {
          navigate("home-volunteer");
        }

        alert(`Welcome ${response.data.message}`);
      } else {
        const message =
          response.data?.message || "Login failed. Please check credentials.";
        setError(message);
        alert(`Login Failed: ${error}`);
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
      alert(`${t("login_failed_message")} ${error}`);
    }
  };

  const signUp = (event) => {
    event.preventDefault();
    console.log("sign up button clicked");
    setError(null);

    if (isAuthenticated) {
      console.log("User already logged in. Cannot navigate to sign up.");
      alert(`${t("sign_out_first_message")}`);
    } else {
      navigate("/sign-up");
    }
  };

  return (
    <>
      <div className="app flex-box flex-column">
        <NavigationBar dontShowPageButtons={true} />
        <header className="app-header basic-box-padding">
          {/* <div className="basic-item-padding">
            <img className="centre-img" src={centreLogo} alt="Centre Logo"></img>
          </div> */}

          <h1>{t("name")}</h1>
          <h3>{t("desc")}</h3>
        </header>

        <div className="general-box flex-box flex-column smooth-shadow-box">
          <h2>{t("welcome")}</h2>

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

        <CopyRight />
      </div>
    </>
  );
};

export default App;
