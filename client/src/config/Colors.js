import { useState, useEffect } from "react";

export const useColorOptions = () => {
  const eventColorLight = "#f5f5f5";
  const lightText = "#000000";
  const breakLineLight = "#7c7c7c";
  const inputBorderFocusLight = "blue";
  const inputBorderLight = "#cccccc";
  const buttonHoverLight = "#a8a8a8";
  const buttonBackgroundLight = "#d1d1d1";
  const buttonBorderLight = "#c2c2c2";
  const skillsShadowLight = "#e0e0e0";
  const bottomScrollBoxLight = "#dddddd";
  const backGroundBodyLight = "#f1f1f1";

  const eventColorDark = "#f5f5f5";
  const darkText = "#ffffff";
  const breakLineDark = "#904040";
  const inputBorderFocusDark = "#3498db";
  const inputBorderDark = "#555555";
  const buttonHoverDark = "#555555";
  const buttonBackgroundDark = "#7a7a7a";
  const buttonBorderDark = "#6b6b6b";
  const skillsShadowDark = "#7a7a7a";
  const bottomScrollBoxDark = "#dddddd";
  const backGroundBodyDark = "black";

  // const [isLightMode, setIsLightMode] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof window !== "undefined") {
      // Check for saved preference first
      const savedMode = localStorage.getItem("colorMode");
      if (savedMode) return savedMode === "light";

      // Fallback to system preference
      return (
        window.matchMedia?.("(prefers-color-scheme: light)").matches ?? false
      );
    }
    return false;
  });

  useEffect(() => {
    // to save option between pages
    localStorage.setItem("colorMode", isLightMode ? "light" : "dark");

    document.documentElement.style.setProperty(
      "--box-background-color",
      isLightMode ? eventColorLight : eventColorDark
    );
    document.documentElement.style.setProperty(
      "--drop-down-text-color",
      isLightMode ? lightText : darkText
    );
    document.documentElement.style.setProperty(
      "--body-color",
      isLightMode ? backGroundBodyLight : backGroundBodyDark
    );
    document.documentElement.style.setProperty(
      "--bottom-scroll-box",
      isLightMode ? bottomScrollBoxLight : bottomScrollBoxDark
    );

    document.documentElement.style.setProperty(
      "--line-break",
      isLightMode ? breakLineLight : breakLineDark
    );

    document.documentElement.style.setProperty(
      "--input-focus",
      isLightMode ? inputBorderFocusLight : inputBorderFocusDark
    );

    document.documentElement.style.setProperty(
      "--input-border",
      isLightMode ? inputBorderLight : inputBorderDark
    );

    document.documentElement.style.setProperty(
      "--button-hover",
      isLightMode ? buttonHoverLight : buttonHoverDark
    );

    document.documentElement.style.setProperty(
      "--button-text",
      isLightMode ? lightText : darkText
    );

    document.documentElement.style.setProperty(
      "--button-background",
      isLightMode ? buttonBackgroundLight : buttonBackgroundDark
    );

    document.documentElement.style.setProperty(
      "--button-border",
      isLightMode ? buttonBorderLight : buttonBorderDark
    );

    document.documentElement.style.setProperty(
      "--general-text",
      isLightMode ? lightText : darkText
    );

    document.documentElement.style.setProperty(
      "--skills-shadow",
      isLightMode ? skillsShadowLight : skillsShadowDark
    );
  }, [isLightMode]);

  const handleModeChange = () => {
    console.log("Clicked light/dark mode icon");
    setIsLightMode((prevMode) => !prevMode);
  };

  return {
    isLightMode,
    handleModeChange,
  };
};
