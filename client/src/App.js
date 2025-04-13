import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// import components here
import DynamicInput from "./components/InputComponent";
import DynamicButton from "./components/ButtonComponent";
import NavigationBar from "./components/NavigationBar";

// ✅ الشعار من مجلد icons
import logo from "./icons/org_icon.png";

const App = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const signIn = (event) => {
    event.preventDefault();
    console.log("sign in button clicked");
    console.log(username, password);
    if (username === "vol" && password === "vol") {
      navigate("/home-volunteer");
    } else if (username === "org" && password === "org") {
      navigate("/home-organizer");
    } else if (username === "admin" && password === "admin") {
      navigate("/home-admin");
    } else {
      alert("Enter Valid Sign in details");
    }
  };

  const signUp = (event) => {
    event.preventDefault();
    console.log("sign up button clicked");
    navigate("/sign-up");
  };

  const { t } = useTranslation("app");

  return (
    <div className="app flex-box flex-column">
      <NavigationBar dontShowPageButtons={true} />

      <header className="app-header">
        {/* ✅ الشعار */}
        <img
          src={logo}
          alt="Center Logo"
          style={{ width: "130px", marginBottom: "1rem" }}
        />
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
            <DynamicButton
              className="button"
              onClick={signIn}
              text={t("sign-in")}
            />
            <DynamicButton
              className="button"
              onClick={signUp}
              text={t("sign-up")}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
