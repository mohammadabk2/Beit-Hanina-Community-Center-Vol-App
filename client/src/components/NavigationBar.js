import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import DropDownMenu from "./DropDownMenu";
import { useLnOptions } from "../config/Language";
// import { useColorOptions } from "../config/Colors";

import settingsIcon from "../icons/settings_icon.jpg";
import profileIcon from "../icons/profile_icon.jpg";
import homeIcon from "../icons/home_icon.jpg";
import aboutIcon from "../icons/about_icon.jpg";
import darkModeIcon from "../icons/dark_mode.svg";
import lightModeIcon from "../icons/light_mode.svg";

const NavigationBar = () => {
  const navigate = useNavigate();

  const { t } = useTranslation("app");
  const lnOptions = useLnOptions();
  // const { isLightMode, handleModeChange } = useColorOptions();

  const goToSettings = () => {
    console.log("Settings button clicked");
    navigate("/settings");
  };

  const goToPersonalArea = () => {
    //TODO add a check if Admin org or volunteer
    console.log("Personal Area button clicked");
    navigate("/personal-area-vol");
  };

  const goToHome = () => {
    //TODO add a check if Admin org or volunteer
    console.log("Home button clicked");
    navigate("/home-volunteer");
    // navigate("/home-admin");
    // navigate("/home-organizer");
  };

  const goToAbout = () => {
    console.log("About button clicked");
    navigate("/about");
  };

  return (
    <div className="flex-box navigation-box">
      <DropDownMenu
        className="language-button"
        text={t("ln")}
        options={lnOptions}
      />
      {/* <div onClick={handleModeChange}> */}
      <div>
        <img
          className="navigation-button-image"
          // src={isLightMode ? lightModeIcon : darkModeIcon}
          src ={lightModeIcon}
          alt="Mode Switch"
        />
      </div>

      <div onClick={goToHome}>
        <img
          className="navigation-button-image"
          src={homeIcon}
          alt="Home icon"
        />
      </div>
      <div onClick={goToPersonalArea}>
        <img
          className="navigation-button-image"
          src={profileIcon}
          alt="Profile icon"
        />
      </div>
      <div onClick={goToSettings}>
        <img
          className="navigation-button-image"
          src={settingsIcon}
          alt="Settings icon"
        />
      </div>
      <div onClick={goToAbout}>
        <img
          className="navigation-button-image"
          src={aboutIcon}
          alt="About icon"
        />
      </div>
    </div>
  );
};

export default NavigationBar;
