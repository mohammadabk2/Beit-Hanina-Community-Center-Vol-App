import { useState, useEffect } from "react";

export const useColorOptions = () => {
  const eventColorLight = "#f5f5f5";
  const lightText = "#000000";
  const lightLine = "#7c7c7c";
  const lightBlue = "blue";
  const lightGrey = "#ccc";
  const buttonHoveLight = "#a8a8a8";
  const buttonBackgroundLight = "#d1d1d1";
  const buttonColorLight = "#c2c2c2";
  const skillsShadowLight = "#e0e0e0";
  const bottomScrollBox1 = "#dddddd"

  const darkColor = "#28242c";
  const darkText = "#ffffff";
  const darkLine = "#904040";
  const darkBlue = "#3498db";
  const darkGrey = "#555";
  const buttonHoverDark = "#555555";
  const buttonBackgroundDark = "#7a7a7a";
  const buttonColorDark = "#6b6b6b";
  const skillsShadowDark = "#7a7a7a";
  const eventColorDark = "#f5f5f5";

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
      "--general-background-color",
      isLightMode ? eventColorLight : darkColor
    );
    document.documentElement.style.setProperty(
      "--drop-down-text-color",
      isLightMode ? lightText : darkText
    );
    document.documentElement.style.setProperty(
      "--border-hover-color",
      isLightMode ? "#0000001a" : darkColor
    );
    document.documentElement.style.setProperty(
      "--scroll-box-top-bottom",
      isLightMode ? "#0000001a" : darkColor
    );
    document.documentElement.style.setProperty(
      "--body-color",
      isLightMode ? "#f1f1f1" : darkColor
    );
    document.documentElement.style.setProperty(
      "--bottom-scroll-box",
      isLightMode ? bottomScrollBox1 : darkColor
    );

    document.documentElement.style.setProperty(
      "--line-break",
      isLightMode ? lightLine : darkLine
    );

    document.documentElement.style.setProperty(
      "--input-outline",
      isLightMode ? lightBlue : darkBlue
    );

    document.documentElement.style.setProperty(
      "--input-border",
      isLightMode ? lightGrey : darkGrey
    );

    document.documentElement.style.setProperty(
      "--button-hover",
      isLightMode ? buttonHoveLight : buttonHoverDark
    );

    document.documentElement.style.setProperty(
      "--button-border",
      isLightMode ? lightText : darkText
    );

    document.documentElement.style.setProperty(
      "--button-background",
      isLightMode ? buttonBackgroundLight : buttonBackgroundDark
    );

    document.documentElement.style.setProperty(
      "--button-color",
      isLightMode ? buttonColorLight : buttonColorDark
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
