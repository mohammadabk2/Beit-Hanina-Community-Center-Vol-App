import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../config/Context/auth";

import DropDownMenu from "../common/DropDownMenu";
import { useLnOptions } from "../../config/options/Language";
import { useTheme } from "../../config/options/Colors";

import modeIconDark from "../../icons/light/NavBar/mode_icon.svg";
import profileIconLight from "../../icons/light/NavBar/profile_icon.svg";
import homeIconLight from "../../icons/light/NavBar/home_icon.svg";
import aboutIconLight from "../../icons/light/NavBar/about_icon.svg";

import modeIconLight from "../../icons/dark/NavBar/mode_icon.svg";
import profileIconDark from "../../icons/dark/NavBar/profile_icon.svg";
import homeIconDark from "../../icons/dark/NavBar/home_icon.svg";
import aboutIconDark from "../../icons/dark/NavBar/about_icon.svg";
// import settingsIconDark from "../icons/dark/settings_icon.svg";

const NavigationBar = () => {
  const { t } = useTranslation("navBar");
  const navigate = useNavigate();
  const location = useLocation();
  const lnOptions = useLnOptions();
  const { isLightMode, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();

  const goToPersonalArea = () => {
    //TODO add a check if Admin org or voulunteer
    console.log("Personal Area button clicked");
    navigate("/personal-area-vol");
  };

  const goToHome = () => {
    //TODO add a check if Admin org or voulunteer
    //TODO check if signed in
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
    <div className="flex-box navigation-box wrap-reverse flex-box-gap smooth-shadow-box">
      <div
        onClick={goToAbout}
        className={`flex-box flex-column${
          location.pathname === "/about" ? " active-nav" : ""
        }`}
      >
        <img
          className="navigation-button-image"
          src={isLightMode ? aboutIconLight : aboutIconDark}
          alt="About icon"
        />
        {t("about_page")}
      </div>
      {isAuthenticated && (
        <>
          <div
            onClick={goToPersonalArea}
            className={`flex-box flex-column${
              location.pathname.startsWith("/personal-area")
                ? " active-nav"
                : ""
            }`}
          >
            <img
              className="navigation-button-image"
              src={isLightMode ? profileIconLight : profileIconDark}
              alt="Profile icon"
            />
            {t("personal_area")}
          </div>

          <div
            onClick={goToHome}
            className={`flex-box flex-column${
              location.pathname.startsWith("/home") ? " active-nav" : ""
            }`}
          >
            <img
              className="navigation-button-image"
              src={isLightMode ? homeIconLight : homeIconDark}
              alt="Home icon"
            />
            {t("home_page")}
          </div>
        </>
      )}

      <div onClick={toggleTheme} className="flex-box flex-column">
        <img
          className="navigation-button-image"
          src={isLightMode ? modeIconDark : modeIconLight}
          alt="Mode Switch"
        />
        {!isLightMode && t("light_mode")}
        {isLightMode && t("dark_mode")}
      </div>

      <DropDownMenu
        className="language-button"
        text={t("ln")}
        options={lnOptions}
      />
    </div>
  );
};

export default NavigationBar;
