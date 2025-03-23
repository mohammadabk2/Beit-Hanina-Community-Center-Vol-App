import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import pages here
import App from "./App";
import SignUpPage from "./pages/SignUpPage/SignUp";
import HomePage from "./pages/HomePage/Home";
import SettingsPage from "./pages/SettingsPage/Settings";
import PersonalAreaPage from "./pages/PersonalAreaPage/PersonalArea"

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/personal-area" element={<PersonalAreaPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
