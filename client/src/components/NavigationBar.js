import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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

const NavigationBar = ({ dontShowPageButtons }) => {
  const { t } = useTranslation("app");
  const navigate = useNavigate();
  const lnOptions = useLnOptions();
  const { isLightMode, toggleTheme } = useTheme();

  const goToPersonalArea = () => navigate("/personal-area-vol");
  const goToHome = () => navigate("/home-volunteer");
  const goToAbout = () => navigate("/about");

  const labelStyle = {
    fontSize: "0.75rem",
    color: "white",
    marginTop: "0.25rem",
    textAlign: "center",
  };

  return (
    <div
      className="navigation-box"
      style={{
        direction: "ltr",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1rem",
      }}
    >
      {/* الأيقونات */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          alignItems: "center",
        }}
      >
        {/* About */}
        <div onClick={goToAbout} style={{ cursor: "pointer" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              className="navigation-button-image"
              src={isLightMode ? aboutIconLight : aboutIconDark}
              alt="About"
            />
            <span style={labelStyle}>{t("about-label")}</span>
          </div>
        </div>

        {/* Profile */}
        {!dontShowPageButtons && (
          <div onClick={goToPersonalArea} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                className="navigation-button-image"
                src={isLightMode ? profileIconLight : profileIconDark}
                alt="Profile"
              />
              <span style={labelStyle}>{t("profile-label")}</span>
            </div>
          </div>
        )}

        {/* Home */}
        {!dontShowPageButtons && (
          <div onClick={goToHome} style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img
                className="navigation-button-image"
                src={isLightMode ? homeIconLight : homeIconDark}
                alt="Home"
              />
              <span style={labelStyle}>{t("home-label")}</span>
            </div>
          </div>
        )}

        {/* Theme */}
        <div onClick={toggleTheme} style={{ cursor: "pointer" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              className="navigation-button-image"
              src={isLightMode ? modeIconDark : modeIconLight}
              alt="Theme"
            />
            <span style={labelStyle}>{t("theme-label")}</span>
          </div>
        </div>
      </div>

      {/* زر اللغة */}
      <div>
        <DropDownMenu
          className="language-button"
          text={t("ln")}
          options={lnOptions}
        />
      </div>
    </div>
  );
};

NavigationBar.propTypes = {
  dontShowPageButtons: PropTypes.bool,
};

export default NavigationBar;
