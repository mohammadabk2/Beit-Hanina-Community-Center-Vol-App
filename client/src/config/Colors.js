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
  const topScrollBoxLight = "#dddddd";
  const backGroundBodyLight = "#f1f1f1";

  const eventColorDark = "#333336";
  const darkText = "#ffffff";
  const breakLineDark = "#9e9e9e";
  const inputBorderFocusDark = "#3498db";
  const inputBorderDark = "#555555";
  const buttonHoverDark = "#5050ba";
  const buttonBackgroundDark = "#7070ff";
  const buttonBorderDark = "#7070e0";
  const skillsShadowDark = "#7a7a7a";
  const bottomScrollBoxDark = "#292930";
  const topScrollBoxDark = "#292930";
  const backGroundBodyDark = "#333336";

  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("colorMode");
      if (savedMode) return savedMode === "light";

      return (
        window.matchMedia?.("(prefers-color-scheme: light)").matches ?? false
      );
    }
    return false;
  });

  useEffect(() => {
    // Set a transition on the root element for a smooth change
    // document.body.style.transition = "background-color 0.3s ease-in-out";

    const elementsToTransition = document.querySelectorAll(
      ".button, .general-box, body, input, .skills, .event-box, .flex-box, .dropdown-menu, .smooth-shadow-box, .flex-column, .navigation-box, .input-field,.line-break  "
    );
    elementsToTransition.forEach((element) => {
      element.style.transition = "all 0.4s ease-in-out"; // or specify properties
    });

    localStorage.setItem("colorMode", isLightMode ? "light" : "dark");
    document.documentElement.style.setProperty(
      "--top-scroll-box",
      isLightMode ? topScrollBoxLight : topScrollBoxDark,
      "important"
    );
    document.documentElement.style.setProperty(
      "--box-background-color",
      isLightMode ? eventColorLight : eventColorDark,
      "important"
    );
    document.documentElement.style.setProperty(
      "--drop-down-text-color",
      isLightMode ? lightText : darkText,
      "important"
    );
    document.documentElement.style.setProperty(
      "--body-color",
      isLightMode ? backGroundBodyLight : backGroundBodyDark,
      "important"
    );
    document.documentElement.style.setProperty(
      "--bottom-scroll-box",
      isLightMode ? bottomScrollBoxLight : bottomScrollBoxDark,
      "important"
    );

    document.documentElement.style.setProperty(
      "--line-break",
      isLightMode ? breakLineLight : breakLineDark,
      "important"
    );

    document.documentElement.style.setProperty(
      "--input-focus",
      isLightMode ? inputBorderFocusLight : inputBorderFocusDark,
      "important"
    );

    document.documentElement.style.setProperty(
      "--input-border",
      isLightMode ? inputBorderLight : inputBorderDark,
      "important"
    );

    document.documentElement.style.setProperty(
      "--button-hover",
      isLightMode ? buttonHoverLight : buttonHoverDark,
      "important"
    );

    document.documentElement.style.setProperty(
      "--button-text",
      isLightMode ? lightText : darkText,
      "important"
    );

    document.documentElement.style.setProperty(
      "--button-background",
      isLightMode ? buttonBackgroundLight : buttonBackgroundDark,
      "important"
    );

    document.documentElement.style.setProperty(
      "--button-border",
      isLightMode ? buttonBorderLight : buttonBorderDark,
      "important"
    );

    document.documentElement.style.setProperty(
      "--general-text",
      isLightMode ? lightText : darkText,
      "important"
    );

    document.documentElement.style.setProperty(
      "--skills-shadow",
      isLightMode ? skillsShadowLight : skillsShadowDark,
      "important"
    );

    return () => {
      // Remove the transition when the component unmounts or the effect re-runs.  This is optional,
      // but good practice if you want the transition to only apply when changing modes.
      // document.documentElement.style.transition = "none";
      elementsToTransition.forEach((element) => {
        element.style.transition = "none"; // or specify properties
      });
    };
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
