import React, { useState, useEffect, useContext, createContext, useMemo } from "react";

// 1. Create the Context
// We initialize with undefined, and add a check in the consumer hook
// to ensure it's used within the provider.
const ThemeContext = createContext(undefined);

// 2. Create the Provider Component
export const ThemeProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(() => {
    // Check if running in a browser environment
    if (typeof window !== "undefined") {
      try {
        const savedMode = localStorage.getItem("colorMode");
        if (savedMode) {
          return savedMode === "light";
        }
        // Check system preference if no saved mode
        return window.matchMedia?.("(prefers-color-scheme: light)").matches ?? false;
      } catch (error) {
        // Handle potential localStorage access errors (e.g., private Browse)
        console.error("Error accessing localStorage:", error);
        // Fallback to system preference or default to dark
        return window.matchMedia?.("(prefers-color-scheme: light)").matches ?? false;
      }
    }
    // Default for non-browser environments (SSR) or if window check fails
    return false; // Default to dark mode on server or if window unavailable
  });

  // Effect to update localStorage and document attribute when mode changes
  useEffect(() => {
    // Only run this effect in the browser
    if (typeof window !== "undefined") {
        const mode = isLightMode ? 'light' : 'dark';
        try {
            localStorage.setItem('colorMode', mode);
        } catch (error) {
            console.error("Error setting localStorage:", error);
        }
        // Apply the theme attribute to the root HTML element
        document.documentElement.setAttribute('data-theme', mode);
    }
  }, [isLightMode]); // Re-run only when isLightMode changes

  // Function to toggle the mode
  const handleModeChange = () => {
    console.log("Toggling theme mode");
    setIsLightMode((prevMode) => !prevMode);
  };

  // Memoize the context value to prevent unnecessary re-renders
  // of consumers if the provider re-renders for other reasons.
  const value = useMemo(() => ({
    isLightMode,
    toggleTheme: handleModeChange // Renamed for clarity in consumer
  }), [isLightMode]); // Only recreate the value object when isLightMode changes

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Create a Custom Hook to Consume the Context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // This error is helpful for developers using the hook incorrectly
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
