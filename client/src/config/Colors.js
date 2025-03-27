import { useState, useEffect } from "react";

export const useColorOptions = () => {
  const darkColor = "#28242c";
  const lightColor = "#f1f1f1";
  const darkText = "#ffffff";
  const lightText = "#000000";
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--common-colour-1",
      isLightMode ? lightColor : darkColor
    );
    document.documentElement.style.setProperty(
      "--common-colour-2",
      isLightMode ? lightText : darkText
    );
    document.documentElement.style.setProperty(
      "--common-colour-3",
      isLightMode ? lightColor : darkColor
    );
    document.documentElement.style.setProperty(
      "--common-colour-4",
      isLightMode ? lightColor : darkColor
    );
  }, [isLightMode]);

  const handleModeChange = () => {
    console.log("Clicked light mode icon");
    setIsLightMode((prevMode) => !prevMode);
  };

  //   const handleModeChange = () => {
  //     console.log("Clicked light mode icon");

  //     setIsLightMode((prevMode) => {
  //       const newMode = !prevMode; // Toggle the mode
  //       document.body.style.backgroundColor = newMode ? darkColor : lightColor;
  //       return newMode;
  //     });
  //   };

  return {
    isLightMode,
    handleModeChange,
  };
};
