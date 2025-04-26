import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import components here
import DynamicInput from "./components/InputComponent";
import DynamicButton from "./components/ButtonComponent";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //TODO these could be changed so that it doesnt save the value each letter
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const signIn = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior //! probaibly change this
    console.log("sign in button clicked");
    console.log(username);
    console.log(password); //! testing only remove security risk

    try {
      const response = await axios.post(`${API_BASE_URL}/api/logUser`, {
        userName: username,
        password: password,
      });
      if (response.data.status === "success" && response.data.userData) {
        if (Array.isArray(response.data.userData.role)) {
          alert(`Welcome ${response.data.message}`);
          if (response.data.userData.role.includes("admin")) {
            navigate("/home-admin");
          } else if (response.data.userData.role.includes("org")) {
            navigate("/home-organizer");
          } else if (response.data.userData.role.includes("vol")) {
            navigate("/home-volunteer");
          } else {
            alert("Invalid User Type");
          }
        } else {
          alert("User not registered");
        }
      } else {
        alert("login fail");
      }
    } catch (err) {
      console.error("Error during sign in:", err);

      // Check if the error is an Axios error with a response from the server
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with status:", err.response.status);
        console.error("Response data:", err.response.data);

        // Check for specific error statuses (e.g., 401, 404) indicating login failure
        if (
          err.response.status === 401 ||
          err.response.status === 404 ||
          err.response.status === 403
        ) {
          // Use the error message from the backend if available, otherwise use a generic one
          const errorMessage =
            err.response.data?.message || "Invalid username or password.";
          alert(`Login Failed: ${errorMessage}`);
        } else {
          // Handle other server errors (like 500 Internal Server Error)
          alert(
            "An unexpected error occurred on the server. Please try again later."
          );
        }
      } else if (err.request) {
        // The request was made but no response was received (e.g., network error)
        console.error("No response received:", err.request);
        alert(
          "Login Failed: Could not connect to the server. Please check your network connection."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", err.message);
        alert("Login Failed: An error occurred before sending the request.");
      }
    }
  };

  const navigate = useNavigate();
  const signUp = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior //! probaibly change this
    console.log("sign up button clicked");
    navigate("/sign-up");
  };

  const { t } = useTranslation("app");

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
