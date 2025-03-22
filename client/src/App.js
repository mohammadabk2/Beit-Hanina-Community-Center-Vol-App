import React, { useState } from "react";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  useNavigate,
} from "react-router-dom";


// import components here
import DynamicInput from "./components/InputComponent";
import DynamicButton from "./components/ButtonComponent";
import DropDownMenu from "./components/DropDownMenu";
import { lnOptions } from "./components/language";

function App() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //TODO these could be changed so that it doesnt save the value each letter
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const signIn = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior //! probaibly change this
    console.log("sign in button clicked");
    console.log(username);
    console.log(password); //! testing only remove security risk
  };

  const navigate = useNavigate();
  const signUp = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior //! probaibly change this
    console.log("sign up button clicked");
    navigate("/sign-up");
  };

  const { t, i18n } = useTranslation("app");
  const options = [
    {
      label: "ar",
      href: "#option1",
      onClick: () => {
        i18n.changeLanguage("ar"); // Change language
        console.log("Language changed to Arabic"); // Log message
      },
    },
    {
      label: "en",
      href: "#option2",
      onClick: () => {
        i18n.changeLanguage("en"); // Change language
        console.log("Language changed to English"); // Log message
      },
    },
    // { label: "hb", href: "#option3", onClick: () => console.log("hebrew clicked") },
  ];


  return (
    <div className="app flex-box flex-column">
      <div className="drop-down">
        <DropDownMenu
          className="language-button"
          text={t("ln")}
          options={lnOptions}
        />

      </div>
      <header className="app-header">
        <h1>{t("name")}</h1>
      </header>
      <main>

        <div className="sign-in-box flex-container smooth-shadow-box">
          <h1>{t("welcome")}</h1>
          <div className="input-field-box flex-container">
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
          <div className="button-box flex-container">
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
}

export default App;
