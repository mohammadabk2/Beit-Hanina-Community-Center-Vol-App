import { useState, useEffect , } from "react";

export const useColorOptions = () => {

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
    const mode = isLightMode ? 'light' : 'dark';
    localStorage.setItem('colorMode', mode);
    document.documentElement.setAttribute('data-theme', mode); // Set attribute instead
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
