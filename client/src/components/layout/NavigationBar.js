import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

import DropDownMenu from "../common/DropDownMenu";
import DynamicButton from "../common/ButtonComponent";
import { useLnOptions } from "../../config/options/Language";
import { useTheme } from "../../config/options/Colors";
import { useAuth } from "../../config/Context/auth";

import modeIconDark from "../../icons/light/NavBar/mode_icon.svg";
import profileIconLight from "../../icons/light/NavBar/profile_icon.svg";
import homeIconLight from "../../icons/light/NavBar/home_icon.svg";
import aboutIconLight from "../../icons/light/NavBar/about_icon.svg";
import orgIcon from "../../icons/org_icon.svg";

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
  const { isAuthenticated, role, logout } = useAuth();

  const goToPersonalArea = () => {
    if (role === "admin") {
      navigate("/personal-area-admin");
    } else if (role === "organizer") {
      navigate("/personal-area-org");
    } else if (role === "volunteer") {
      navigate("/personal-area-vol");
    } else {
      navigate("/");
    }
  };

  const goToHome = () => {
    console.log("Home button clicked");
    if (role === "admin") {
      navigate("/home-admin");
    } else if (role === "organizer") {
      navigate("/home-organizer");
    } else if (role === "volunteer") {
      navigate("/home-volunteer");
    } else {
      navigate("/");
    }
  };

  const goToAbout = () => {
    console.log("About button clicked");
    navigate("/about");
  };

  return (
    <div className="flex-box navigation-box wrap-reverse flex-box-gap smooth-shadow-box">
      {/* Left side navigation items */}
      <div className="flex-box flex-box-gap">
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
      </div>

      {/* Center organization icon */}
      <div className="flex-box flex-center org-icon-container">
        <img
          className="org-icon"
          src={orgIcon}
          alt="Organization icon"
        />
      </div>

      {/* Right side controls */}
      <div className="flex-box flex-box-gap">
        <DropDownMenu
          className="language-button"
          text={t("ln")}
          options={lnOptions}
        />

        <div onClick={toggleTheme} className="flex-box flex-column">
          <img
            className="navigation-button-image"
            src={isLightMode ? modeIconDark : modeIconLight}
            alt="Mode Switch"
          />
          {!isLightMode && t("light_mode")}
          {isLightMode && t("dark_mode")}
        </div>

        {isAuthenticated && (
          <DynamicButton
            className="button"
            text={t("sign_out")}
            onClick={logout}
          />
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
