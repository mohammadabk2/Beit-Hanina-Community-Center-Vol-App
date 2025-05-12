import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import DropDownMenu from "./DropDownMenu";
import { useLnOptions } from "../config/options/Language";
import { useTheme } from "../config/options/Colors";

import modeIconDark from "../icons/light/NavBar/mode_icon.svg";
import profileIconLight from "../icons/light/NavBar/profile_icon.svg";
import homeIconLight from "../icons/light/NavBar/home_icon.svg";
import aboutIconLight from "../icons/light/NavBar/about_icon.svg";

import modeIconLight from "../icons/dark/NavBar/mode_icon.svg";
import profileIconDark from "../icons/dark/NavBar/profile_icon.svg";
import homeIconDark from "../icons/dark/NavBar/home_icon.svg";
import aboutIconDark from "../icons/dark/NavBar/about_icon.svg";
// import settingsIconDark from "../icons/dark/settings_icon.svg";

const NavigationBar = ({ dontShowPageButtons }) => {
  const { t } = useTranslation("navBar");
  const navigate = useNavigate();
  const location = useLocation();
  const lnOptions = useLnOptions();
  const { isLightMode, toggleTheme } = useTheme();

  // const goToSettings = () => {
  //   console.log("Settings button clicked");
  //   navigate("/settings");
  // };

  const goToPersonalArea = () => {
    console.log("Personal Area button clicked");
    navigate("/personal-area-vol");
  };

  const goToHome = () => {
    console.log("Home button clicked");
    navigate("/home-volunteer");
    // navigate("/home-admin");
    // navigate("/home-organizer");
  };

  const goToAbout = () => {
    console.log("About button clicked");
    navigate("/about");
  };

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const getActive = () => {
    if (location.pathname.startsWith("/about")) return "about";
    if (location.pathname.startsWith("/personal-area")) return "personal";
    if (location.pathname.startsWith("/home")) return "home";
    return null;
  };
  const active = getActive();

  return (
    <div className="flex-box navigation-box wrap-reverse flex-box-gap">
      <div onClick={goToAbout} className="flex-box flex-column">
        <span className={`icon-circle${active === "about" ? " active" : ""}`}>
          <img
            className="navigation-button-image"
            src={isLightMode ? aboutIconLight : aboutIconDark}
            alt="About icon"
          />
        </span>
        {t("about_page")}
      </div>
      {!dontShowPageButtons && (
        <>
          <div onClick={goToPersonalArea} className="flex-box flex-column">
            <span
              className={`icon-circle${active === "personal" ? " active" : ""}`}
            >
              <img
                className="navigation-button-image"
                src={isLightMode ? profileIconLight : profileIconDark}
                alt="Profile icon"
              />
            </span>
            {t("personal_area")}
          </div>

          <div onClick={goToHome} className="flex-box flex-column">
            <span
              className={`icon-circle${active === "home" ? " active" : ""}`}
            >
              <img
                className="navigation-button-image"
                src={isLightMode ? homeIconLight : homeIconDark}
                alt="Home icon"
              />
            </span>
            {t("home_page")}
          </div>
        </>
      )}

      <div onClick={handleToggleTheme} className="flex-box flex-column">
        <span className="icon-circle">
          <img
            className="navigation-button-image"
            src={isLightMode ? modeIconDark : modeIconLight}
            alt="Mode Switch"
          />
        </span>
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

NavigationBar.propTypes = {
  dontShowPageButtons: PropTypes.bool,
};

export default NavigationBar;
