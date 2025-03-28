import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import DropDownMenu from "./DropDownMenu";
import { useLnOptions } from "../config/Language";

import settingsIcon from "../icons/settings_icon.png";
import profileIcon from "../icons/profile_icon.png";
import homeIcon from "../icons/home_icon.jpg";
import aboutIcon from "../icons/about_icon.jpg";

const NavigationBar = () => {
  const { t } = useTranslation("app");
  const navigate = useNavigate();
  const lnOptions = useLnOptions();

  const goToSettings = () => {
    console.log("Settings button clicked");
    navigate("/settings");
  };

  const goToPersonalArea = () => {
    //TODO add a check if Admin org or voulunteer
    console.log("Personal Area button clicked");
    navigate("/personal-area-vol");
  };

  const goToHome = () => {
    //TODO add a check if Admin org or voulunteer
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
      <div onClick={goToHome}>
        <img
          className="navigation-button-image"
          src={homeIcon}
          alt="Home icon"
        ></img>
      </div>
      <div onClick={goToPersonalArea}>
        <img
          className="navigation-button-image"
          src={profileIcon}
          alt="profile icon"
        ></img>
      </div>
      <div onClick={goToSettings}>
        <img
          className="navigation-button-image"
          src={settingsIcon}
          alt="settings icon"
        ></img>
      </div>
      <div onClick={goToAbout}>
        <img
          className="navigation-button-image"
          src={aboutIcon}
          alt="about icon"
        ></img>
      </div>
    </div>
  );
};

export default NavigationBar;
