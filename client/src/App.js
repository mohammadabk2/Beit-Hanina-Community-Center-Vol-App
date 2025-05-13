import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// import components here
import DynamicInput from "./components/common/InputComponent";
import DynamicButton from "./components/common/ButtonComponent";
import NavigationBar from "./components/layout/NavigationBar";
import CopyRight from "./components/layout/CopyRight";
// import centreLogo from "./icons/org_icon.png";

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

  const signIn = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior //! probaibly change this
    console.log("sign in button clicked");
    console.log(username);
    console.log(password); //! testing only remove security risk
    //! testing only Ultra security risk
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
      <header className="app-header basic-box-padding">
        {/* <div className="basic-item-padding">
          <img className="centre-img" src={centreLogo} alt="Centre Logo"></img>
        </div> */}

        <div className="basic-item-padding">{t("name")}</div>
        <div className="basic-item-padding">{t("desc")}</div>
      </header>

      <div className="general-box flex-box flex-column smooth-shadow-box">
        <div>{t("welcome")}</div>

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
  );
};

export default App;
