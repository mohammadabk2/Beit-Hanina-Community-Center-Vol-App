import { useState, useEffect } from "react";

//TODO problem it defaults to dark mode
export const useColorOptions = () => {
  const darkColor = "#28242c";
  const lightColor = "#f1f1f1";
  const darkText = "#ffffff";
  const lightText = "#000000";
  const darkLine = "#904040"; //! jad set this to what you like best
  const lightLine = "#7c7c7c";
  const lightBlue = "blue";
  const darkBlue = "#3498db";
  const lightGrey = "#ccc";
  const darkGrey = "#555";
  const buttonHoveLight = "#a8a8a8";
  const buttonHoverDark = "#555555";
  const buttonBackgroundLight = "#d1d1d1";
  const buttonBackgroundDark = "#7a7a7a";
  const buttonColorLight = "#c2c2c2";
  const buttonColorDark = "#6b6b6b";
  const skillsShadowLight = "#e0e0e0";
  const skillsShadowDark = "#7a7a7a";

  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--general-background-color",
      isLightMode ? lightColor : darkColor
    );
    document.documentElement.style.setProperty(
      "--drop-down-text-color",
      isLightMode ? lightText : darkText
    );
    document.documentElement.style.setProperty(
      "--border-hover-color",
      isLightMode ? lightColor : darkColor
    );
    document.documentElement.style.setProperty(
      "--scroll-box-top-bottom",
      isLightMode ? lightColor : darkColor
    );
    document.documentElement.style.setProperty(
      "--body-color",
      isLightMode ? lightColor : darkColor
    );
    document.documentElement.style.setProperty(
      "--bottom-scroll-box",
      isLightMode ? lightColor : darkColor
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
