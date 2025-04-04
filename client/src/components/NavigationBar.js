import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import DropDownMenu from "./DropDownMenu";
import { useLnOptions } from "../config/options/Language";
import { useTheme } from "../config/options/Colors";

import modeIconDark from "../icons/light/mode_icon.svg";
import profileIconLight from "../icons/light/profile_icon.svg";
import homeIconLight from "../icons/light/home_icon.svg";
import aboutIconLight from "../icons/light/about_icon.svg";
// import settingsIconLight from "../icons/light/settings_icon.svg";

import modeIconLight from "../icons/dark/mode_icon.svg";
import profileIconDark from "../icons/dark/profile_icon.svg";
import homeIconDark from "../icons/dark/home_icon.svg";
import aboutIconDark from "../icons/dark/about_icon.svg";
// import settingsIconDark from "../icons/dark/settings_icon.svg";

const NavigationBar = ({ dontShowPageButtons }) => {
  const { t } = useTranslation("app");
  const navigate = useNavigate();
  const lnOptions = useLnOptions();
  const {isLightMode, toggleTheme} = useTheme();

  // const goToSettings = () => {
  //   console.log("Settings button clicked");
  //   navigate("/settings");
  // };

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
    <div className="flex-box navigation-box">
      <DropDownMenu
        className="language-button"
        text={t("ln")}
        options={lnOptions}
      />
      <div onClick={toggleTheme}>
        <img
          className="navigation-button-image"
          src={isLightMode ? modeIconDark : modeIconLight}
          alt="Mode Switch"
        />
      </div>

      {!dontShowPageButtons && (
        <>
          <div onClick={goToHome}>
            <img
              className="navigation-button-image"
              src={isLightMode ? homeIconLight : homeIconDark}
              alt="Home icon"
            />
          </div>
          <div onClick={goToPersonalArea}>
            <img
              className="navigation-button-image"
              src={isLightMode ? profileIconLight : profileIconDark}
              alt="Profile icon"
            />
          </div>
          {/* <div onClick={goToSettings}>
            <img
              className="navigation-button-image"
              src={isLightMode ? settingsIconLight : settingsIconDark}
              alt="Settings icon"
            />
          </div> */}
        </>
      )}

      <div onClick={goToAbout}>
        <img
          className="navigation-button-image"
          src={isLightMode ? aboutIconLight : aboutIconDark}
          alt="About icon"
        />
      </div>
    </div>
  );
};

NavigationBar.propTypes = {
  dontShowPageButtons: PropTypes.bool,
};

export default NavigationBar;
