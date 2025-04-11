import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import components here
import DynamicInput from "./components/InputComponent";
import DynamicButton from "./components/ButtonComponent";
import NavigationBar from "./components/NavigationBar";

const App = () => {
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

    const API_BASE_URL = "http://localhost:5213"; //TODO change to vite or another secure method

    try {
      const response = await axios.post(`${API_BASE_URL}/api/logUser`, {
        userName: username,
        hash: password,
      });
      if (response.data.status === "success") {
        alert(`Welcome ${response.data.message}`);
        navigate("/home-volunteer");
      } else {
        alert("login fail");
      }
    } catch (err) {
      console.error("Error during sign in:", err);
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
